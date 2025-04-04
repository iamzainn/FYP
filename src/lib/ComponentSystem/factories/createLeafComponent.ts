/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Factory for creating leaf components (no children)
 * Creates simple components like Button, Heading, Image, etc.
 */
import React from 'react';
import { BaseComponentProps, EditorComponentHelpers, ComponentSettingDefinition, ContentFieldDefinition, StyleFieldDefinition } from '../Core/types';
import { withEditorComponent } from '../Core/HOC/withEditorComponent';
import { componentRegistry } from '../Core/registry';
import { createComponentConfig } from './createComponentConfig';

console.log('📦 createLeafComponent.ts loading');
console.log('📦 Importing createComponentConfig:', { createComponentConfig });

 export interface LeafComponentConfig {
  type: string;
  name: string;
  category?: 'layout' | 'elements' | 'compound';
  
  // Style-related (actual CSS)
  defaultStyles?: React.CSSProperties;
  styleFields?: StyleFieldDefinition[];
  
  // Content (text, image sources, URLs)
  contentFields?: ContentFieldDefinition[];
  defaultContent?: any;
  
  // Custom settings (non-CSS controls like variants)
  customSettings?: ComponentSettingDefinition[];
  defaultCustomSettings?: Record<string, any>;
  
  // The rendering function
  render: (props: BaseComponentProps & EditorComponentHelpers) => React.ReactNode;
}

/**
 * Creates a leaf component (without children)
 */
export function createLeafComponent(config: LeafComponentConfig) {
  console.log(`Creating leaf component: ${config.type}`);
  
  // Create the component
  const LeafComponent = (props: BaseComponentProps & EditorComponentHelpers) => {
    return config.render(props);
  };
  
  // Generate the component config
  const componentConfig = createComponentConfig({
    type: config.type,
    name: config.name,
    category: config.category || 'elements',
    defaultStyles: config.defaultStyles || {},
    contentFields: config.contentFields || [],
    defaultContent: config.defaultContent || {},
    customSettings: config.customSettings || [],
    defaultCustomSettings: config.defaultCustomSettings || {},
    styleFields: config.styleFields || [],
    responsiveStyles: true
  });
  
  // Enhance with editor component behavior
  const EnhancedComponent = withEditorComponent(LeafComponent, componentConfig);
  
  // Register the component
  componentRegistry.registerComponent(componentConfig, EnhancedComponent);
  
  // Return the enhanced component
  return EnhancedComponent;
}