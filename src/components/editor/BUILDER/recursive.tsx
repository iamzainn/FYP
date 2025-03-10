import { EditorElement } from '@/providers/editor/editor-provider'
import React from 'react'
import TextComponent from './TextComponent'
import Container from './Container'
import VideoComponent from './VideoComponent'
import LinkComponent from './LinkComponent'
import ContactFormComponent from '../ContactFormComponent'

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
        return <Container element={element}/>
    case 'container':
        return <Container element={element}/>
    case '2Col':
        return <Container element={element}/>
        case 'link':
          return <LinkComponent key={element.id} element={element} />
          case 'contactForm':
            return <ContactFormComponent key={element.id} element={element} />
    default:
      return null
  }
}

export default Recursive