'use client'

import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import React, { useMemo } from 'react'

import { useResponsiveStyles } from '@/hooks/useResponsiveStyles'
import ComponentWrapper from './ComponentWrapper'

interface HeadingComponentProps {
  element: EditorElement
}

const HeadingComponent = ({ element }: HeadingComponentProps) => {
  const { content, customSettings } = element
  const { state } = useEditor()
  
  // Get responsive styles from our custom hook
  const { computedStyles } = useResponsiveStyles(element, state)
  
  const isSelected = state.editor.selectedElement.id === element.id && !state.editor.liveMode
  
  // Extract heading variant from customSettings or default to h2
  const variant = useMemo(() => {
    return customSettings?.variant || 'h2'
  }, [customSettings])
  
  // Render the appropriate heading element based on the variant
  const renderHeading = () => {
    const headingText = typeof content === 'string' 
      ? content 
      : (content as { innerText: string }).innerText || 'Heading'
    
    const headingStyles = {
      ...computedStyles,
      ...(isSelected && !state.editor.liveMode ? {
        outline: '2px solid #3b82f6',
        outlineOffset: '2px',
      } : !state.editor.liveMode ? {
        outline: '1px dashed #cbd5e1',
        outlineOffset: '2px',
      } : {})
    }
    
    // Force re-render when variant changes by using the key
    switch(variant) {
      case 'h1':
        return <h1 key={`h1-${element.id}`} style={headingStyles}>{headingText}</h1>
      case 'h3':
        return <h3 key={`h3-${element.id}`} style={headingStyles}>{headingText}</h3>
      case 'h4':
        return <h4 key={`h4-${element.id}`} style={headingStyles}>{headingText}</h4>
      case 'h5':
        return <h5 key={`h5-${element.id}`} style={headingStyles}>{headingText}</h5>
      case 'h6':
        return <h6 key={`h6-${element.id}`} style={headingStyles}>{headingText}</h6>
      case 'h2':
      default:
        return <h2 key={`h2-${element.id}`} style={headingStyles}>{headingText}</h2>
    }
  }

  return (
    <ComponentWrapper element={element}>
      {renderHeading()}
    </ComponentWrapper>
  )
}

export default HeadingComponent 
