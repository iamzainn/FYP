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
import ProductCardComponent from '../Compound/Components/ProductCardComponent'
import TwoColComponent from './TwoColComponent'
import GridComponent from '../Compound/Components/GridComponent'
import HeroSectionComponent from './HeroSectionComponent'
import HeadingComponent from './HeadingComponent'

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
      return <TwoColComponent element={element} />
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
      return <SpacerComponent element={element}
      />
    case 'productCard':
      return <ProductCardComponent element={element} />
    case 'badge':
      return <BadgeComponent element={element} />
    case 'grid':
      return <GridComponent element={element} />
    case 'heading':
      return <HeadingComponent element={element} />
    case 'heroSection':
      return <HeroSectionComponent element={element} />
    default:
      return null
  }
}

export default Recursive