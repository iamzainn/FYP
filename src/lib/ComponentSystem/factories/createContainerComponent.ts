/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Factory for creating container components
 * Creates components that can contain other components, like HeroSection, Header, etc.
 */
import React from 'react';
import { BaseComponentProps, EditorComponentHelpers, ComponentConfig, ChildrenConfig } from '../Core/types';
import { withEditorComponent } from '../Core/HOC/withEditorComponent';
import { componentRegistry } from '../Core/registry';
import { EditorElement } from '@/providers/editor/editor-provider';

console.log('📦 createContainerComponent.ts loading');

/**
 * Configuration specific to Container Components.
 * Extends the base ComponentConfig and requires childrenConfig.
 */
export interface ContainerComponentConfig extends Omit<ComponentConfig, 'render'> {
  // Container components must define children configuration
  childrenConfig: ChildrenConfig;

  // Render function signature requires childrenContainer prop
  render: (
    props: BaseComponentProps & EditorComponentHelpers & {
      childrenContainer: React.ReactNode; // The rendered children passed by the HOC
    }
  ) => React.ReactNode;
}

/**
 * Factory function to create and register a Container Component.
 * Container components are responsible for rendering their children.
 */
export function createContainerComponent(config: ContainerComponentConfig) {
  console.log(`Creating container component: ${config.type}`);

  // Define the actual React container component
  const ContainerComponent = (props: BaseComponentProps & EditorComponentHelpers) => {
    const { element, renderChild } = props; // Get renderChild helper from HOC

    // Define a simple component inline that renders all children using the renderChild helper
    const RenderChildren = () => {
      if (!element.content || !Array.isArray(element.content) || element.content.length === 0) {
        return null; // No children to render
      }
      // Use React.Fragment for mapping children
      return React.createElement(
        React.Fragment,
        null,
        element.content.map((child: EditorElement) => renderChild(child))
      );
    };

    // Call the user-provided render function, passing the rendered children
    // Use React.createElement explicitly for the childrenContainer prop
    return config.render({
      ...props,
      childrenContainer: React.createElement(RenderChildren),
    });
  };
  ContainerComponent.displayName = `${config.name}ContainerComponent`; // For DevTools


  // Prepare the final config for registration.
  // We register the ContainerComponent which includes the logic for handling children.
  const finalConfig: ComponentConfig = {
    ...(config as Omit<ContainerComponentConfig, 'render'>), // Spread the rest of the config
    render: ContainerComponent, // Use the ContainerComponent itself as the render function for the registry
  };

  // Enhance with editor capabilities using the HOC
  const EnhancedComponent = withEditorComponent(ContainerComponent, finalConfig);

  // Register the component type with the registry
  componentRegistry.registerComponent(finalConfig, EnhancedComponent);

  // Return the enhanced component
  return EnhancedComponent;
}