'use client'

import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import React, { useMemo } from 'react'
import clsx from 'clsx'
import Recursive from '../../recursive'
import ComponentWrapper from '../../ComponentWrapper'

interface HeroSectionProps {
  element: EditorElement
}

const HeroSectionComponent = ({ element }: HeroSectionProps) => {
  const { content, styles, customSettings } = element
  const { state } = useEditor()
  const isSelected = state.editor.selectedElement.id === element.id && !state.editor.liveMode

  // Get custom settings with defaults
  const {
    overlayColor = 'rgba(0,0,0,0.5)',
    overlayOpacity = '50',
    heroLayout = 'center',
    
    contentSpacing = 'normal'
  } = customSettings || {}

  // Determine layout class based on heroLayout
  const layoutClass = useMemo(() => {
    switch (heroLayout) {
      case 'left':
        return 'items-start text-left';
      case 'right':
        return 'items-end text-right';
      case 'center':
      default:
        return 'items-center text-center';
    }
  }, [heroLayout]);

  // Apply content spacing
  const spacingClass = useMemo(() => {
    switch (contentSpacing) {
      case 'compact':
        return 'gap-2';
      case 'spacious':
        return 'gap-8';
      case 'normal':
      default:
        return 'gap-4';
    }
  }, [contentSpacing]);

  // Process overlay color with opacity
  const processedOverlayColor = useMemo(() => {
    try {
      if (!overlayColor) return 'rgba(0,0,0,0.5)';
      
      // Handle rgba format
      if (overlayColor.toString().startsWith('rgba')) {
        const rgbaMatch = overlayColor.toString().match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/);
        if (rgbaMatch) {
          const [, r, g, b] = rgbaMatch;
          const opacity = parseFloat(overlayOpacity as string) / 100;
          return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
      }
      
      // Handle hex format
      if (overlayColor.toString().startsWith('#')) {
        const r = parseInt(overlayColor.toString().slice(1, 3), 16);
        const g = parseInt(overlayColor.toString().slice(3, 5), 16);
        const b = parseInt(overlayColor.toString().slice(5, 7), 16);
        const opacity = parseFloat(overlayOpacity as string) / 100;
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      }
      
      return overlayColor;
    } catch (error) {
      return 'rgba(0,0,0,0.5)';
    }
  }, [overlayColor, overlayOpacity]);

  // For the overlay effect
  const overlayStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: processedOverlayColor as string,
    zIndex: 1,
  }

  const containerStyles = {
    ...styles,
    ...(isSelected && !state.editor.liveMode ? {
      outline: '2px solid #3b82f6',
      outlineOffset: '2px',
    } : !state.editor.liveMode ? {
      outline: '1px dashed #cbd5e1',
      outlineOffset: '2px',
    } : {})
  }

  return (
    <ComponentWrapper element={element}>
      <div style={containerStyles} className="relative w-full">
        <div style={overlayStyles} />
        <div className={clsx(
          'relative z-10 w-full max-w-screen-xl mx-auto flex flex-col', 
          layoutClass, 
          spacingClass
        )}>
          {Array.isArray(content) &&
            content.map((childElement) => (
              <Recursive 
                key={childElement.id} 
                element={{
                  ...childElement,
                  isChildOfContainer: true
                } as EditorElement} 
              />
            ))}
        </div>
      </div>
    </ComponentWrapper>
  )
}

export default HeroSectionComponent 