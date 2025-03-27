import { EditorElement } from '@/providers/editor/editor-provider'
import React from 'react'
import Container from './BUILDER/Components/Container'
import ButtonComponent from './BUILDER/Components/ButtonComponent'
import HeroSectionComponent from './BUILDER/Components/HeroSectionComponent'
import HeadingComponent from './BUILDER/Components/HeadingComponent'
import HeaderComponent from './BUILDER/Components/HeaderComponent'
import NavigationComponent from './BUILDER/Components/NavigationComponent'
import NavItemComponent from './BUILDER/Components/NavItemComponent'
import ImageComponent from './BUILDER/Components/ImageComponent'
import LogoComponent from './BUILDER/Components/LogoComponent'



type Props = {
  element: EditorElement & { isChildOfContainer?: boolean }
}

const Recursive = ({ element }: Props) => {
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