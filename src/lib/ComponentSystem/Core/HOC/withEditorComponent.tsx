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
 * @param Component The base component render function (Leaf or Container)
 * @param config The ComponentConfig (primarily used here for display name)
 * @returns Enhanced component with editor functionality
 */
export function withEditorComponent<P extends BaseComponentProps>(
  // Component here is the basic render function from the factory (e.g., LeafComponent or ContainerComponent)
  Component: React.ComponentType<P & EditorComponentHelpers>,
  config: ComponentConfig
) {
  // Display name for debugging in React DevTools
  const displayName = `withEditor(${config.name || Component.displayName || Component.name || 'Component'})`;

  // Create the wrapped component that receives the raw props (like 'element')
  const WrappedComponent = (props: P) => {
    const { element, ...restProps } = props;

    // --- Inject Editor Context and Helpers ---
    // This hook provides computed styles, interaction state (isSelected), and update functions (setContent, etc.)
    const helpers = useEditorComponentHelpers(element);

    // --- Define Child Rendering Logic ---
    // This helper function will be passed down to container components via props.
    // It uses the Recursive component to render a child element.
    const renderChild = (childElement: EditorElement): React.ReactNode => {
        // Pass the child element to the Recursive component
        // Add a unique key for React's reconciliation algorithm
        return React.createElement(Recursive, {
            key: childElement.id, // Use element ID as key
            element: childElement
        });
    };

    // --- Render the Component ---
    // 1. Render the outer ComponentWrapper (handles selection outlines, drag handles etc. - assuming)
    // 2. Render the actual user-defined Component, passing:
    //    - The original element props
    //    - The injected helpers (styles, isSelected, setContent, etc.)
    //    - The renderChild helper function
    //    - Any other props passed down
    return (
      <ComponentWrapper
        element={element}
      // Add any other props ComponentWrapper might need
      >
        <Component
          {...(restProps as P)} // Pass original props (excluding element)
          element={element}      // Pass the element data
          {...helpers}           // Spread the injected helpers
          renderChild={renderChild} // Pass the child rendering function
        />
      </ComponentWrapper>
    );
  };

  // Set display name for easier debugging
  WrappedComponent.displayName = displayName;

  // Return the enhanced component
  return WrappedComponent;
}

// Check if the HOC file in the factories directory is still needed
// If src/lib/ComponentSystem/hocs/withEditorComponent.tsx is the canonical one,
// delete src/lib/ComponentSystem/Core/HOC/withEditorComponent.tsx