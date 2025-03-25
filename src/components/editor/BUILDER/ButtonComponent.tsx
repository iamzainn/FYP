// src/components/editor/BUILDER/ButtonComponent.tsx
'use client'

import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import React from 'react'
import clsx from 'clsx'
import ComponentWrapper from './ComponentWrapper'

interface ButtonProps {
  element: EditorElement
}

const ButtonComponent = ({ element }: ButtonProps) => {
  const { content, styles, customSettings } = element
  const { state } = useEditor()
  const isSelected = state.editor.selectedElement.id === element.id && !state.editor.liveMode

  // Apply button variant styling
  const getButtonVariantClass = () => {
    const variant = customSettings?.buttonVariant || 'primary'
    
    switch (variant) {
      case 'secondary':
        return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
      case 'outline':
        return 'bg-transparent border border-current hover:bg-opacity-10';
      case 'ghost':
        return 'bg-transparent hover:bg-opacity-10';
      case 'primary':
      default:
        return '';
    }
  }

  // Extract link details from content
  const { innerText = 'Button', href = '#', target = '_self' } = content as { 
    innerText?: string, 
    href?: string, 
    target?: string 
  };

  const buttonStyles = {
    ...styles,
    ...(isSelected && !state.editor.liveMode ? {
      outline: '2px solid #3b82f6',
      outlineOffset: '2px',
    } : !state.editor.liveMode ? {
      outline: '1px dashed #cbd5e1',
      outlineOffset: '2px',
    } : {})
  }

  // Button component handles differently based on mode
  const ButtonElement = () => {
    // In live mode, render as a real link
    if (state.editor.liveMode || state.editor.previewMode) {
      return (
        <a 
          href={href}
          target={target}
          style={buttonStyles}
          className={clsx('transition-all duration-300', getButtonVariantClass())}
        >
          {innerText}
        </a>
      );
    }
    
    // In edit mode, render as a div (no link functionality)
    return (
      <div 
        style={buttonStyles}
        className={clsx(getButtonVariantClass(), 'cursor-pointer')}
      >
        {innerText}
      </div>
    );
  }

  return (
    <ComponentWrapper element={element}>
      <ButtonElement />
    </ComponentWrapper>
  )
}

export default ButtonComponent