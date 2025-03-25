import { EditorElement } from '@/providers/editor/editor-provider'
import React from 'react'

import Container from './Container'

import ButtonComponent from './ButtonComponent'

import HeroSectionComponent from './HeroSectionComponent'
import HeadingComponent from './HeadingComponent'

type Props = {
  element: EditorElement
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
    default:
      return null
  }
}

export default Recursive