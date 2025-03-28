import { EditorElement } from '@/providers/editor/editor-provider'
import React from 'react'
import Container from './BUILDER/Components/Container'
import HeaderComponent from './BUILDER/Components/HeaderComponent'
import NavigationComponent from './BUILDER/Components/NavigationComponent'
import NavItemComponent from './BUILDER/Components/NavItemComponent'
import ImageComponent from './BUILDER/Components/ImageComponent'
import LogoComponent from './BUILDER/Components/LogoComponent'
import { componentRegistry } from '@/lib/ComponentSystem/Core/registry'

// Import standardized components
import HeroSectionComponent from '@/lib/ComponentSystem/Core/components/HeroSection'
import HeadingComponent from '@/lib/ComponentSystem/Core/components/Heading'
import ButtonComponent from '@/lib/ComponentSystem/Core/components/Button'

type Props = {
  element: EditorElement & { isChildOfContainer?: boolean }
}

const Recursive = ({ element }: Props) => {
  // Check for standardized components first
  const registeredComponent = componentRegistry.getComponent(element.type as string);
  if (registeredComponent) {
    const { Component } = registeredComponent;
    return <Component element={element} />;
  }
  
  // Fall back to existing components
  switch (element.type) {
    case '__body':
      return <Container element={element} />
    case 'button':
      return <ButtonComponent element={element} />
    case 'heading':
      return <HeadingComponent element={element} />
    case 'heroSection':
      return <HeroSectionComponent element={element} />
    case 'header':
      return <HeaderComponent element={element} />
    case 'navigation':
      return <NavigationComponent element={element} />
    case 'navItem':
      return <NavItemComponent element={element} />
    case 'image':
      return <ImageComponent element={element} />
    case 'logo':
      return <LogoComponent element={element} />
    default:
      return null
  }
}

export default Recursive 