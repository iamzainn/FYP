'use client'

import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import React from 'react'
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles'
import ComponentWrapper from '../../ComponentWrapper'


interface ImageComponentProps {
  element: EditorElement
}

const ImageComponent = ({ element }: ImageComponentProps) => {
  console.log("image component rendered", element)
  const { content } = element
  const { state } = useEditor()
  
  // Get responsive styles from our custom hook
  const { computedStyles } = useResponsiveStyles(element, state)
  
  // Extract image properties
  const { src = 'https://via.placeholder.com/400x200?text=Image', alt = 'Image' } = 
    typeof content === 'object' && content !== null && !Array.isArray(content) 
      ? content as { src?: string, alt?: string }
      : { src: undefined, alt: undefined }
  
  // Apply styles directly - objectFit moved from customSettings to style
  const imageStyles = {
    ...computedStyles,
  }
  
  return (
    <ComponentWrapper element={element}>
      <img 
        src={src} 
        alt={alt} 
        
        style={imageStyles as React.CSSProperties}
        className="max-w-full" 
      />
    </ComponentWrapper>
  )
}

export default ImageComponent