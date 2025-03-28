/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 
 * Component Registry
 * Manages registration and retrieval of all component types
 */
import { v4 as uuid } from 'uuid';
import { ComponentConfig, ComponentRegistry, RegisteredComponent } from './types';
import { EditorElement } from '@/providers/editor/editor-provider';


console.log("Registry module loaded", Date.now());

/**
 * Component Registry Implementation
 * Maintains a registry of all available components
 */
class ComponentRegistryImpl implements ComponentRegistry {
  private components: Record<string, RegisteredComponent> = {};
  
  /**
   * Register a component in the registry
   */
  registerComponent(config: ComponentConfig, Component: React.ComponentType<any>): void {
    if (this.components[config.type]) {
      console.warn(`Component type "${config.type}" is already registered. Overwriting.`);
    }
    
    // Create a function to create instances of this component
    const createInstance = () => {
      // Generate a new element with default values
      const element: Partial<EditorElement> = {
        id: uuid(),
        name: config.name,
        type: config.type as any,
        styles: { ...config.defaultStyles },
        customSettings: { ...config.defaultCustomSettings },
      };
      
      // Add content based on configuration
      if (config.defaultContent) {
        element.content = { ...config.defaultContent };
      } else if (config.children) {
        // For container components, initialize with empty array
        element.content = [];
      }
      
      // Add responsive settings if enabled
      if (config.responsiveStyles) {
        element.responsiveSettings = {
          mobile: {},
          tablet: {}
        };
      }
      
      // Debug log for component creation
      if (process.env.NODE_ENV === 'development') {
        console.debug(`Created instance of ${config.type}:`, element);
      }
      
      return element;
    };
    
    // Store the component in the registry
    this.components[config.type] = {
      Component,
      config,
      createInstance
    };
    
    if (process.env.NODE_ENV === 'development') {
      console.debug(`Registered component: ${config.type} (${config.category})`);
    }
  }
  
  /**
   * Get a component by type
   */
  getComponent(type: string): RegisteredComponent | undefined {
    return this.components[type];
  }
  
  /**
   * Get all registered components
   */
  getAllComponents(): Record<string, RegisteredComponent> {
    return { ...this.components }; // Return a copy to prevent mutations
  }
  
  /**
   * Get components by category
   */
  getComponentsByCategory(category: string): RegisteredComponent[] {
    return Object.values(this.components).filter(
      component => component.config.category === category
    );
  }
  
  /**
   * Create a new instance of a component
   */
  createInstance(type: string): Partial<EditorElement> {
    const component = this.getComponent(type);
    if (!component) {
      console.error(`Component type "${type}" not found in registry.`);
      throw new Error(`Component type "${type}" not found in registry.`);
    }
    
    // Generate a new element with default values
    const element: Partial<EditorElement> = {
      id: uuid(),
      name: component.config.name,
      type: component.config.type as any,
      styles: { ...component.config.defaultStyles },
      customSettings: { ...component.config.defaultCustomSettings },
    };
    
    // Add content based on configuration
    if (component.config.defaultContent) {
      element.content = { ...component.config.defaultContent };
    } else if (component.config.children) {
      // For container components, initialize with child components
      if (component.config.children.createDefaultChildren) {
        // Use the function to create default children
        element.content = component.config.children.createDefaultChildren();
      } else if (component.config.children.defaultChildren && component.config.children.defaultChildren.length > 0) {
        // Create default children based on the types
        element.content = component.config.children.defaultChildren.map(childType => {
          try {
            // Attempt to create instances of default children
            return this.createInstance(childType);
          } catch (error) {
            console.warn(`Could not create default child of type "${childType}": ${error}`);
            return null;
          }
        }).filter(Boolean); // Remove any null values
      } else {
        // Empty array when no default children are specified
        element.content = [];
      }
    }
    
    // Add responsive settings if enabled
    if (component.config.responsiveStyles) {
      element.responsiveSettings = {
        mobile: {},
        tablet: {}
      };
    }
    
    // Debug log for component creation
    if (process.env.NODE_ENV === 'development') {
      console.debug(`Created instance of ${component.config.type}:`, element);
    }
    
    return element;
  }
}

// Export a singleton instance of the registry
export const componentRegistry = new ComponentRegistryImpl();
console.log("Registry created");
