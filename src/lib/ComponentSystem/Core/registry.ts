/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 
 * Component Registry
 * Manages registration and retrieval of all component types
 */
import { v4 as uuid } from 'uuid';
import { ComponentConfig, ComponentRegistry, RegisteredComponent } from './types';
import { EditorElement } from '@/providers/editor/editor-provider';
import { EditorBtns } from '@/lib/constants';

console.log("Registry module loaded", Date.now());

/**
 * Component Registry Implementation
 * Maintains a registry of all available components and handles instance creation.
 */
class ComponentRegistryImpl implements ComponentRegistry {
  private components: Record<string, RegisteredComponent> = {};
  
  /**
   * Register a component type along with its configuration and React component.
   */
  registerComponent(config: ComponentConfig, Component: React.ComponentType<any>): void {
    if (this.components[config.type as string]) {
      console.warn(`Component type "${config.type}" is already registered. Overwriting.`);
    }
    
    // Store the component and its config
    this.components[config.type as string] = {
      Component,
      config,
      // Include the createInstance method bound to this type
      createInstance: () => this.createInstance(config.type)
    };
    
    if (process.env.NODE_ENV === 'development') {
      console.debug(`Registered component: ${config.type} (${config.category})`);
    }
  }
  
  /**
   * Get a registered component's details by type.
   */
  getComponent(type: string): RegisteredComponent | undefined {
    return this.components[type];
  }
  
  /**
   * Get all registered components. Returns a copy.
   */
  getAllComponents(): Record<string, RegisteredComponent> {
    return { ...this.components };
  }
  
  /**
   * Get components filtered by category.
   */
  getComponentsByCategory(category: string): RegisteredComponent[] {
    return Object.values(this.components).filter(
      component => component.config.category === category
    );
  }
  
  /**
   * Create a new EditorElement instance for a given component type.
   * This function uses the registered ComponentConfig to populate default values.
   */
  createInstance(type: EditorBtns): Partial<EditorElement> {
    const componentRegistration = this.getComponent(type as string);
    if (!componentRegistration) {
      const errorMsg = `Component type "${type}" not found in registry. Cannot create instance.`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    
    const config = componentRegistration.config;
    
    // Start building the EditorElement using defaults from the config
    const element: Partial<EditorElement> = {
      id: uuid(),
      type: config.type,
      name: config.name, // Use registered name as default instance name
      styles: config.styles ? { ...config.styles } : {},
      customSettings: config.customSettings ? { ...config.customSettings } : {},
      responsiveSettings: config.responsiveSettings ? JSON.parse(JSON.stringify(config.responsiveSettings)) : { mobile: {}, tablet: {} },
      // Initialize content based on whether it's expected to be an array (container) or object (leaf)
      // The actual content population happens below.
      content: config.childrenConfig ? [] : (config.content || {}),
    };
    
    // --- Handle Content Initialization ---
    // For container components (those with childrenConfig)
    if (config.childrenConfig) {
      element.content = []; // Ensure content is an array for containers
      const { createDefaultChildren, defaultChildren } = config.childrenConfig;
      
      if (typeof createDefaultChildren === 'function') {
        // Use the custom function if provided
        try {
          element.content = createDefaultChildren();
        } catch (error) {
          console.error(`Error executing createDefaultChildren for ${config.type}:`, error);
          element.content = []; // Fallback to empty array on error
        }
      } else if (Array.isArray(defaultChildren) && defaultChildren.length > 0) {
        // Create instances based on defaultChildren types
        element.content = defaultChildren.map(childType => {
          try {
            // Recursively call createInstance for each child type
            // Note: Ensure childType is a valid EditorBtns value
            return this.createInstance(childType as EditorBtns);
          } catch (error) {
            console.warn(`Could not create default child instance of type "${childType}" for parent "${config.type}": ${error}`);
            return null; // Return null for failed creations
          }
        }).filter(Boolean) as EditorElement[]; // Filter out any nulls
      }
    }
    // For leaf components, copy default content if defined in config
    else if (config.content && typeof config.content === 'object' && !Array.isArray(config.content)) {
      element.content = { ...config.content };
    }
    
    // Debug log for component instance creation
    if (process.env.NODE_ENV === 'development') {
      console.debug(`Created instance of ${config.type}:`, JSON.parse(JSON.stringify(element)));
    }
    
    return element;
  }
}

// Export a singleton instance of the registry
export const componentRegistry = new ComponentRegistryImpl();
console.log("Registry created and instance logic centralized.");
