'use client'

import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import React from 'react'
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles'
import ComponentWrapper from '../../ComponentWrapper'
import Recursive from '../../recursive'

interface NavigationComponentProps {
  element: EditorElement
}

const NavigationComponent = ({ element }: NavigationComponentProps) => {
  const { content } = element
  const { state } = useEditor()
  
  // Get responsive styles from our custom hook
  const { computedStyles, currentDevice } = useResponsiveStyles(element, state)
  
  // Determine if we're in mobile view and adjust styles accordingly
  const isMobileView = currentDevice === 'Mobile'
  const isTabletView = currentDevice === 'Tablet'
  const isMobileOrTablet = isMobileView || isTabletView
  
  // In the header's parent, we'll handle the appropriate flexDirection
  // Here we just need to ensure full width on mobile and proper alignment
  const navStyles = {
    ...computedStyles,
    flexDirection: isMobileOrTablet ? 'column' : 'row',
    width: isMobileOrTablet ? '100%' : computedStyles.width || 'auto',
    alignItems: isMobileOrTablet ? 'center' : computedStyles.alignItems || 'center',
  }
  
  return (
    <ComponentWrapper element={element}>
      <nav style={navStyles as React.CSSProperties} className="transition-all">
        {Array.isArray(content) && content.map((navItem) => (
          <Recursive key={navItem.id} element={navItem} />
        ))}
      </nav>
    </ComponentWrapper>
  )
}

export default NavigationComponent 