/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Core type definitions for the component system
 * This file defines the interfaces and types used throughout the component system
 */
import React from 'react';
import { EditorElement, DeviceTypes } from '@/providers/editor/editor-provider';
import { EditorBtns } from '@/lib/constants';

/**
 * Base props received by all editor components.
 */
export interface BaseComponentProps {
  element: EditorElement;
  isChildOfContainer?: boolean; // Optional prop passed by HOC
}

export interface EditorActionDefinition {
  id: string;
  label: string;
 actionType: 'addChild';
 payload?: {
  elementTypeToAdd: EditorBtns;
 }
}



/**
 * Helper functions and state provided to editor components via HOC/hooks.
 */
export interface EditorComponentHelpers {
  isSelected: boolean;
  isHovered: boolean; // Placeholder for potential hover state
  isEditing: boolean; // Placeholder for potential inline editing state
  isLiveMode: boolean;
  styles: React.CSSProperties; // Computed styles for the current device/state
  device: DeviceTypes;
  windowWidth: number; // Current window width
  
  // Data access helpers
  getContentValue: <T = any>(fieldId: string, defaultValue?: T) => T;
  getCustomSetting: <T = any>(settingId: string, defaultValue?: T) => T;
  getResponsiveValue: <T = any>(property: keyof React.CSSProperties, defaultValue?: T) => T;
  
  // Data update helpers
  updateStyle: (property: keyof React.CSSProperties, value: any) => void;
  setContent: (fieldId: string, value: any) => void; // Only works for non-container elements
  setCustomSetting: (settingId: string, value: any) => void;
  
  // Child rendering helper (for container components)
  renderChild: (childElement: EditorElement) => React.ReactNode;
}

/**
 * Defines a field for managing component content (e.g., text, src).
 */
export interface ContentFieldDefinition {
  id: string; // Corresponds to key in EditorElement.content object
  label: string;
  type: 'text' | 'textarea' | 'image' | 'icon' | 'link' | 'select'; // Add more as needed
  defaultValue?: any;
  options?: { value: string | number | boolean; label: string }[]; // For select
}

/**
 * Defines a style property that can be controlled via the settings panel.
 */
export interface StyleFieldDefinition {
  property: keyof React.CSSProperties;
  label: string;
  type: 'slider' | 'select' | 'color' | 'text' | 'number'; // Input type in settings panel
  options?: { value: string | number; label: string }[]; // For select type
  min?: number; // For slider/number
  max?: number; // For slider/number
  step?: number; // For slider/number
}

/**
 * Defines how a parent component's setting affects a specific type of child component.
 */
export interface ChildEffect {
  // The type of child component targeted by this effect
  targetType: EditorBtns;

  // Maps the parent's setting value to the desired updates on the child.
  // The key is the value of the parent's setting (e.g., 'standard', 'centered').
  // The value is an object specifying the style and/or customSetting updates for the child.
  valueMap: Record<string | number, { // Key: Parent setting value
    styles?: Partial<React.CSSProperties>;       // Styles to apply/override on child
    customSettings?: Record<string, any>;      // Custom settings to apply/override on child
  }>;

  // TODO: Consider adding an optional 'transform' function for more complex logic later if needed:
  // transform?: (parentValue: any, childElement: EditorElement) => {
  //   styles?: Partial<React.CSSProperties>;
  //   customSettings?: Record<string, any>;
  // };
}

/**
 * Defines a custom setting for the component (non-style control).
 */
export interface ComponentSettingDefinition {
  id: string; // Corresponds to key in EditorElement.customSettings
  label: string;
  type: 'select' | 'boolean' | 'text' | 'number' | 'range' | 'color'; // Input type in settings panel
  options?: { value: string | number | boolean; label: string }[]; // For select
  defaultValue?: any;
  min?: number; // For range/number
  max?: number; // For range/number
  step?: number; // For range/number
  
 
  // Defines how this setting affects the component's *own* styles
  affectsStyles?: StyleEffect[];

  // << NEW >> Defines how this setting affects child components
  affectsChildren?: ChildEffect[];
}

/**
 * Defines how a custom setting translates to a CSS style.
 */
export interface StyleEffect {
  property: keyof React.CSSProperties;
  // Correct the key type to exclude boolean
  valueMap?: Record<string | number, string | number>;
  // Optional: Provide a function to transform the setting value to a style value
  transform?: (value: any) => string | number;
}

/**
 * Configuration for child elements within a container component.
 */
export interface ChildrenConfig {
  // List of allowed component types (strings matching EditorBtns)
  allowed?: EditorBtns[];
  // List of component types (strings) to create by default when container is added
  defaultChildren?: EditorBtns[];
  // Optional function to generate more complex default children structures
  createDefaultChildren?: () => Partial<EditorElement>[];
}

/**
 * The unified configuration object used to register a component type.
 * Closely mirrors the structure of EditorElement for defaults.
 */
export interface ComponentConfig {
  // Core Identification
  type: EditorBtns; // Matches EditorElement.type (Required)
  name: string;    // Matches EditorElement.name (Required)
  category: 'layout' | 'elements' | 'compound'; // For UI grouping
  icon?: React.ComponentType<any>; // Icon for the component tab (Optional)
  
  // Default values applied when creating an instance (mirror EditorElement structure)
  styles?: React.CSSProperties;           // Default CSS styles
  content?: Record<string, any> | EditorElement[]; // Default content (object for leaf, array for container - though default children are preferred for containers)
  customSettings?: Record<string, any>;   // Default custom settings values
  responsiveSettings?: {                  // Default responsive overrides
    mobile?: Partial<React.CSSProperties>;
    tablet?: Partial<React.CSSProperties>;
  };
  
  // Definitions for the editor controls
  contentFields?: ContentFieldDefinition[];     // Defines editable content fields
  styleFields?: StyleFieldDefinition[];         // Defines controllable style properties
  customSettingFields?: ComponentSettingDefinition[];
  editorActions?: EditorActionDefinition[];
  
  // Defines custom settings controls
  
  // Configuration specific to container components
  childrenConfig?: ChildrenConfig;
  
  // The actual React component rendering function
  render: (props: BaseComponentProps & EditorComponentHelpers) => React.ReactNode;
  
  // TODO: Define structure for advanced compound component settings if needed
  // customControlSettings?: any; // Settings affecting only this component instance
  // customCompoundControlSettings?: any; // Settings affecting children
}

/**
 * Structure stored within the component registry for each registered component type.
 */
export interface RegisteredComponent {
  // The actual React component (enhanced by HOC)
  Component: React.ComponentType<any>;
  // The configuration used to register this component type
  config: ComponentConfig;
  // Function to create a default EditorElement instance for this type
  createInstance: () => Partial<EditorElement>;
}

/**
 * Interface for the component registry service.
 */
export interface ComponentRegistry {
  registerComponent: (config: ComponentConfig, Component: React.ComponentType<any>) => void;
  getComponent: (type: string) => RegisteredComponent | undefined;
  getAllComponents: () => Record<string, RegisteredComponent>;
  getComponentsByCategory: (category: string) => RegisteredComponent[];
  createInstance: (type: EditorBtns) => Partial<EditorElement>;
}

// Responsive styles
export interface ResponsiveStyles {
  desktop?: React.CSSProperties;
  tablet?: React.CSSProperties;
  mobile?: React.CSSProperties;
} 