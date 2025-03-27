'use client'

import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import React, { useState } from 'react'
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles'
import ComponentWrapper from '../../ComponentWrapper'
import Recursive from '../../recursive'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'

interface HeaderComponentProps {
  element: EditorElement
}

const HeaderComponent = ({ element }: HeaderComponentProps) => {
  const { content, customSettings } = element
  const { state } = useEditor()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Get responsive styles from our custom hook
  const { computedStyles, currentDevice } = useResponsiveStyles(element, state)
  
  // Determine if we're in mobile view
  const isMobileView = currentDevice === 'Mobile'
  const isTabletView = currentDevice === 'Tablet'
  const isMobileOrTablet = isMobileView || isTabletView
  
  // Find our content elements
  const logoElement = Array.isArray(content) && content.find(item => item.name === 'Logo')
  const navElement = Array.isArray(content) && content.find(item => item.name === 'Navigation')
  
  // Get layout setting
  const headerLayout = customSettings?.headerLayout || 'logo-left'
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    if (state.editor.liveMode || state.editor.previewMode) {
      setMobileMenuOpen(!mobileMenuOpen)
    }
  }
  
  // Apply header styles
  const getHeaderStyles = () => {
    const baseStyles = {...computedStyles}
    
    // Apply sticky header setting if enabled
    if (customSettings?.stickyHeader) {
      baseStyles.position = 'sticky'
      baseStyles.top = '0'
    }
    
    return baseStyles
  }
  
  // Determine if we should display mobile menu toggle
  const shouldShowMobileMenu = customSettings?.showMobileMenu !== false && isMobileOrTablet
  
  return (
    <ComponentWrapper element={element}>
      <header style={getHeaderStyles()} className="w-full relative">
        {/* Apply flex-row-reverse when logo should be on the right */}
        <div className={clsx(
          "flex items-center w-full justify-between",
          headerLayout === 'logo-right' ? 'flex-row-reverse' : 'flex-row'
        )}>
          {/* Logo section */}
          {logoElement && (
            <div className="flex-shrink-0">
              <Recursive element={logoElement} />
            </div>
          )}
          
          {/* Desktop Navigation or Mobile Toggle */}
          {shouldShowMobileMenu ? (
            <button 
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          ) : (
            navElement && (
              <div className="flex-grow">
                <Recursive element={navElement} />
              </div>
            )
          )}
        </div>
        
        {/* Mobile Navigation Menu (conditionally rendered) */}
        {shouldShowMobileMenu && mobileMenuOpen && navElement && (
          <div className="mobile-menu absolute top-full left-0 w-full bg-white shadow-md z-50 py-2">
            <Recursive element={navElement} />
          </div>
        )}
      </header>
    </ComponentWrapper>
  )
}

export default HeaderComponent 