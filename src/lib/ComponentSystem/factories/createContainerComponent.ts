/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Factory for creating container components
 * Creates components that can contain other components, like HeroSection, Header, etc.
 */
import React from 'react';
import { BaseComponentProps, EditorComponentHelpers, ComponentChildrenConfig, ComponentSettingDefinition, StyleFieldDefinition } from '../Core/types';
import { withEditorComponent } from '../Core/HOC/withEditorComponent';
import { componentRegistry } from '../Core/registry';
import { createComponentConfig } from './createComponentConfig';
import { EditorElement } from '@/providers/editor/editor-provider';

console.log('📦 createContainerComponent.ts loading');
console.log('📦 Importing createComponentConfig:', { createComponentConfig });

export interface ContainerComponentConfig {
  type: string;
  name: string;
  category?: 'layout' | 'elements' | 'compound';
  
  // Style-related (actual CSS)
  defaultStyles?: React.CSSProperties;
  styleFields?: StyleFieldDefinition[];
  
  // Custom settings (non-CSS controls like layout variants)
  customSettings?: ComponentSettingDefinition[];
  defaultCustomSettings?: Record<string, any>;
  
  // Child components
  children: ComponentChildrenConfig;
  
  // The rendering function
  render: (
    props: BaseComponentProps & EditorComponentHelpers & {
      childrenContainer?: React.ReactNode;
    }
  ) => React.ReactNode;
}

/**
 * Creates a container component that can have children
 */
export function createContainerComponent(config: ContainerComponentConfig) {
  console.log(`Creating container component: ${config.type}`);
  
  // Add safety check
  if (typeof createComponentConfig !== 'function') {
    console.error('createComponentConfig is not a function in createContainerComponent!',
      { createComponentConfig });
    throw new Error('Component system initialization error: createComponentConfig is not available');
  }
  
  console.log('🏗️ createContainerComponent called for:', config?.type);
  
  // Create the base container component
  const ContainerComponent = (props: BaseComponentProps & EditorComponentHelpers) => {
    const { element, renderChild } = props;
    
    // Create a component that renders all children
    const ChildrenContainer = () => {
      // Check if content exists and is an array
      if (!element.content || !Array.isArray(element.content) || element.content.length === 0) {
        return null;
      }
      
      // Use simple inline rendering to avoid JSX parsing issues
      return React.createElement(
        React.Fragment,
        null,
        element.content.map((child) => 
          renderChild(child as EditorElement)
        )
      );
    };
    
    // Call the provided render function with the children container
    return config.render({
      ...props,
      childrenContainer: React.createElement(ChildrenContainer, null)
    });
  };
  
  // Add before the line that causes the error
  console.log('⚠️ Before componentConfig = createComponentConfig. createComponentConfig is:', createComponentConfig);
  
  // Generate the component config
  const componentConfig = createComponentConfig({
    type: config.type,
    name: config.name,
    category: config.category || 'layout',
    defaultStyles: config.defaultStyles || {},
    customSettings: config.customSettings || [],
    defaultCustomSettings: config.defaultCustomSettings || {},
    styleFields: config.styleFields || [],
    responsiveStyles: true,
    children: config.children
  });
  
  // Enhance with editor component behavior
  const EnhancedComponent = withEditorComponent(ContainerComponent, componentConfig);
  
  // Register the component
  componentRegistry.registerComponent(componentConfig, EnhancedComponent);
  
  // Return the enhanced component
  return EnhancedComponent;
}