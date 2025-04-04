import { EditorElement } from '@/providers/editor/editor-provider'
import React from 'react'
import Container from './BUILDER/Components/Container'
import { componentRegistry } from '@/lib/ComponentSystem/Core/registry'

// No direct component imports needed!

type Props = {
  element: EditorElement & { isChildOfContainer?: boolean }
}

const Recursive = ({ element }: Props) => {
  // Check for registered components first
  const registeredComponent = componentRegistry.getComponent(element.type as string);
  if (registeredComponent) {
    const { Component } = registeredComponent;
    return <Component element={element} />;
  }
  
  // Fall back to the body container
  if (element.type === '__body') {
    return <Container element={element} />
  }
  
  console.warn(`Unknown component type: ${element.type}`);
  return null;
}

export default Recursive 