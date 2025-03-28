/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Core type definitions for the component system
 * This file defines the interfaces and types used throughout the component system
 */
import { EditorElement, DeviceTypes } from '@/providers/editor/editor-provider';
import React from 'react';

/**
 * Setting definition for a component control
 * Note: These are NOT CSS styles but component-specific controls
 */
export interface ComponentSettingDefinition {
  id: string;
  label: string;
  type: 'select' | 'color' | 'number' | 'text' | 'boolean' | 'range' | 'image';
  options?: Array<{ value: string; label: string }>;
  defaultValue?: any;
  min?: number;
  max?: number;
  step?: number;
  affectsStyles?: StyleAffect[];
}

export interface StyleAffect {
  property: string;
  valueMap?: Record<string, any>;
  transform?: (value: any) => any;
}

/**
 * Content field definition
 */
export interface ContentFieldDefinition {
  id: string;
  label: string;
  type: 'text' | 'richText' | 'image' | 'link' | 'select';
  options?: Array<{ value: string; label: string }>;
  defaultValue?: any;
}

/**
 * Style field definition for the style panel
 */
export interface StyleFieldDefinition {
  property: string;
  label: string;
  control: 'color' | 'select' | 'range' | 'text' | 'dimensions';
  options?: Array<{ value: string; label: string }>;
  responsive?: boolean;
}

/**
 * Configuration for a component's allowed children
 */
export interface ComponentChildrenConfig {
  allowed: string[];
  defaultChildren?: string[];
  maxChildren?: number;
  createDefaultChildren?: () => any[];
}

/**
 * Full component configuration
 */
export interface ComponentConfig {
  type: string;
  name: string;
  category: 'layout' | 'elements' | 'compound';
  defaultStyles?: React.CSSProperties;
  defaultContent?: any;
  defaultCustomSettings?: Record<string, any>;
  styleFields?: StyleFieldDefinition[];
  contentFields?: ContentFieldDefinition[];
  customSettings?: ComponentSettingDefinition[];
  responsiveStyles?: boolean;
  children?: ComponentChildrenConfig;
}

/**
 * Helper props provided to components by the HOC
 */
export interface EditorComponentHelpers {
  isSelected: boolean;
  isHovered: boolean;
  isEditing: boolean;
  isLiveMode: boolean;
  styles: React.CSSProperties;
  getContentValue: (fieldId: string, defaultValue?: any) => any;
  getCustomSetting: (settingId: string, defaultValue?: any) => any;
  renderChild: (childElement: EditorElement) => React.ReactNode;
  setContent: (fieldId: string, value: any) => void;
  setCustomSetting: (settingId: string, value: any) => void;
  updateStyle: (property: string, value: any) => void;
  getResponsiveValue: (property: string, defaultValue?: any) => any;
  device: DeviceTypes;
  windowWidth?: number;
}

/**
 * Base component props
 */
export interface BaseComponentProps {
  element: EditorElement;
  isChildOfContainer?: boolean;
}

/**
 * Registry item for a registered component
 */
export interface RegisteredComponent {
  Component: React.ComponentType<any>;
  config: ComponentConfig;
  createInstance: () => Partial<EditorElement>;
}

/**
 * Component registry
 */
export interface ComponentRegistry {
  registerComponent: (config: ComponentConfig, Component: React.ComponentType<any>) => void;
  getComponent: (type: string) => RegisteredComponent | undefined;
  getAllComponents: () => Record<string, RegisteredComponent>;
  getComponentsByCategory: (category: string) => RegisteredComponent[];
  createInstance: (type: string) => Partial<EditorElement>;
}

// Responsive styles
export interface ResponsiveStyles {
  desktop?: React.CSSProperties;
  tablet?: React.CSSProperties;
  mobile?: React.CSSProperties;
} 