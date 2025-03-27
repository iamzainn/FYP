'use client'

import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import React from 'react'
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles'
import ComponentWrapper from '../../ComponentWrapper'

interface NavItemComponentProps {
  element: EditorElement
}

const NavItemComponent = ({ element }: NavItemComponentProps) => {
  const { content } = element
  const { state } = useEditor()
  
  // Get responsive styles from our custom hook
  const { computedStyles, currentDevice } = useResponsiveStyles(element, state)
  
  // Extract content properties
  const { innerText = 'Nav Item', href = '#' } = content as {
    innerText?: string
    href?: string
  }
  
  // For mobile view, we may want to adjust styles
  const isMobileView = currentDevice === 'Mobile'
  const itemStyles = {
    ...computedStyles,
    width: isMobileView ? '100%' : 'auto',
    textAlign: isMobileView ? 'center' : undefined,
    padding: isMobileView ? '0.75rem 1rem' : computedStyles.padding,
  }
  
  // Different rendering based on mode (live vs edit)
  if (state.editor.liveMode || state.editor.previewMode) {
    return (
      <a 
        href={href} 
        style={itemStyles as React.CSSProperties} 
        className="transition-colors hover:opacity-80"
      >
        {innerText}
      </a>
    )
  }
  
  return (
    <ComponentWrapper element={element}>
      <div style={itemStyles as React.CSSProperties} className="cursor-pointer">
        {innerText}
      </div>
    </ComponentWrapper>
  )
}

export default NavItemComponent 