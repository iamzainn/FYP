/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Higher-Order Component (HOC) for Editor Components
 * Provides standard behavior and props to editor components
 */
import React from 'react';
import { EditorElement } from '@/providers/editor/editor-provider';
import { ComponentConfig, BaseComponentProps, EditorComponentHelpers } from '../types';
import { useEditorComponentHelpers } from '../hooks';
import ComponentWrapper from '@/components/editor/ComponentWrapper';
import Recursive from '@/components/editor/recursive';

// Extended base props to include isChildOfContainer
export interface ExtendedBaseProps extends BaseComponentProps {
  isChildOfContainer?: boolean;
}

/**
 * HOC that adds standard editor component behavior
 * 
 * @param Component The component to wrap
 * @param config Component configuration
 * @returns Enhanced component with editor functionality
 */
export function withEditorComponent<P extends ExtendedBaseProps>(
  Component: React.ComponentType<P & EditorComponentHelpers>,
  config: ComponentConfig
) {
  // Display name for debugging
  const displayName = `withEditorComponent(${Component.displayName || Component.name || 'Component'})`;
  
  // Create the wrapped component
  const WrappedComponent = (props: P) => {
    const { element, isChildOfContainer, ...restProps } = props;
    
    // Get standard helpers and behavior
    const helpers = useEditorComponentHelpers(element);
    
    // Enhanced renderChild that passes isChildOfContainer prop
    const renderChild = (child: EditorElement) => (
      <Recursive 
        key={child.id} 
        element={{
          ...child,
          isChildOfContainer: true
        } as EditorElement} 
      />
    );
    
    // Debug the component rendering
    if (process.env.NODE_ENV === 'development') {
      console.debug(`Rendering ${displayName} for element ${element.id} (${element.type})`);
    }
    
    // Render with standard wrapper
    return (
      <ComponentWrapper 
        element={element}
        isChildOfContainer={isChildOfContainer}
      >
        <Component
          element={element}
          isChildOfContainer={isChildOfContainer}
          {...helpers}
          renderChild={renderChild}
          {...(restProps as any)}
        />
      </ComponentWrapper>
    );
  };
  
  // Set display name for debugging
  WrappedComponent.displayName = displayName;
  
  return WrappedComponent;
}