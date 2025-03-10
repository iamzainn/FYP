import { EditorElement } from '@/providers/editor/editor-provider'
import React from 'react'
import TextComponent from './TextComponent'
import Container from './Container'
import VideoComponent from './VideoComponent'
import LinkComponent from './LinkComponent'
import ContactFormComponent from '../ContactFormComponent'
import ButtonComponent from './ButtonComponent'
import ImageComponent from './ImageComponent'
import DividerComponent from './DividerComponent'
import SpacerComponent from '../SpacerComponent'

import BadgeComponent from '../BadgeComponent'




type Props = {
  element: EditorElement
}

const Recursive = ({ element }: Props) => {
  switch (element.type) {
    case 'text':
      return <TextComponent element={element} />
    case 'video':
      return <VideoComponent element={element} />
    case '__body':
      return <Container element={element} />
    case 'container':
      return <Container element={element} />
    case '2Col':
      return <Container element={element} />
    case 'link':
      return <LinkComponent key={element.id} element={element} />
    case 'contactForm':
      return <ContactFormComponent key={element.id} element={element} />
      case 'button':
      return <ButtonComponent element={element} />
      case 'image':
        return <ImageComponent element={element} /> 
      case 'divider':
          return <DividerComponent element={element} />
          case 'spacer':
            return <SpacerComponent element={element} />
            

            
            case 'badge':
              return <BadgeComponent element={element} />            
    default:
      return null
  }
}

export default Recursive