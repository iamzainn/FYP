/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Factory for creating leaf components (no children)
 * Creates simple components like Button, Heading, Image, etc.
 */
import React from 'react';
import { BaseComponentProps, EditorComponentHelpers, ComponentConfig } from '../Core/types';
import { withEditorComponent } from '../Core/HOC/withEditorComponent';
import { componentRegistry } from '../Core/registry';

console.log('📦 createLeafComponent.ts loading');

/**
 * Configuration specific to Leaf Components (no children).
 * Extends the base ComponentConfig.
 */
export interface LeafComponentConfig extends Omit<ComponentConfig, 'childrenConfig' | 'content'> {
  // Redefine content specifically for leaf components (object, not array)
  content?: Record<string, any>; // Default content values
  inlineTextEditField?: string;
  // Render function signature for leaf components
  render: (props: BaseComponentProps & EditorComponentHelpers) => React.ReactNode;
}

/**
 * Factory function to create and register a Leaf Component.
 * Leaf components do not render children directly.
 */
export function createLeafComponent(config: LeafComponentConfig) {
  console.log(`Creating leaf component: ${config.type}`);
  
  // Define the actual React component using the provided render function
  const LeafComponent = (props: BaseComponentProps & EditorComponentHelpers) => {
    // Simple pass-through to the provided render function
    return config.render(props);
  };
  LeafComponent.displayName = `${config.name}Component`; // For DevTools

  // The config object passed to this factory *is* the final ComponentConfig
  // We just need to ensure the render function is attached correctly if it wasn't part of the initial object literal definition style
  const finalConfig: ComponentConfig = {
    ...config,
    render: config.render, 
    
    // Ensure render is part of the config object being registered
    childrenConfig: undefined, // Explicitly ensure no children config for leaf components
  };

  // Enhance the base component with editor capabilities using the HOC
  // Pass the finalConfig to the HOC if it needs it (check HOC implementation)
  const EnhancedComponent = withEditorComponent(LeafComponent, finalConfig);

  // Register the component type with the registry
  componentRegistry.registerComponent(finalConfig, EnhancedComponent);

  // Return the enhanced component (useful for direct use or testing, though usually components are rendered via the registry)
  return EnhancedComponent;
}