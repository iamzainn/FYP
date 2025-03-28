'use client'

import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import React from 'react'
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles'
import ComponentWrapper from '../../ComponentWrapper'
import Recursive from '../../recursive'

interface LogoComponentProps {
  element: EditorElement
}

const LogoComponent = ({ element }: LogoComponentProps) => {
  const { content } = element
  const { state } = useEditor()
  
  // Get responsive styles from our custom hook
  const { computedStyles } = useResponsiveStyles(element, state)
  
  // Check if we're in mobile view for potential mobile-specific styling
 
  
  return (
    <ComponentWrapper element={element}>
      <div style={computedStyles} className="logo-container">
        {Array.isArray(content) && content.map(item => (
          <Recursive key={item.id} element={item} />
        ))}
      </div>
    </ComponentWrapper>
  )
}

export default LogoComponent