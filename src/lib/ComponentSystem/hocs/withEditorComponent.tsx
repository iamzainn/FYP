/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Higher-Order Component (HOC) for Editor Components
 * Provides standard behavior and props to editor components
 */
import React from 'react';
import { EditorElement } from '@/providers/editor/editor-provider';
import {  BaseComponentProps, EditorComponentHelpers } from '../Core/types';
import { useEditorComponentHelpers } from '../Core/hooks';
import ComponentWrapper from '@/components/editor/ComponentWrapper';
import Recursive from '@/components/editor/recursive';

/**
 * HOC that adds standard editor component behavior
 * 
 * @param Component The component to wrap
 * @param config Component configuration
 * @returns Enhanced component with editor functionality
 */
export function withEditorComponent<P extends BaseComponentProps>(
  Component: React.ComponentType<P & EditorComponentHelpers>,
//   config: ComponentConfig
) {
  // Display name for debugging
  const displayName = `withEditorComponent(${Component.displayName || Component.name || 'Component'})`;
  
  // Create the wrapped component
  const WrappedComponent = (props: P) => {
    const { element, ...restProps } = props;
    
    // Get standard helpers and behavior
    const helpers = useEditorComponentHelpers(element);
    
    // Enhanced renderChild that passes isChildOfContainer prop
    const renderChild = (child: EditorElement) => {
      // Create a copy of the child with isChildOfContainer set
      // This ensures the responsive cascade works correctly
      const childWithParentInfo = {
        ...child,
        isChildOfContainer: true,
        // Store parent type to help with responsive child effects
        parentType: element.type
      } as EditorElement;
      
      return (
        <Recursive 
          key={child.id} 
          element={childWithParentInfo} 
        />
      );
    };
    
    // Render with standard wrapper
    return (
      <ComponentWrapper 
        element={element}
        isChildOfContainer={props.isChildOfContainer}
      >
        <Component
          element={element}
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