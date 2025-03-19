'use client'

import { Badge } from '@/components/ui/badge'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React from 'react'
import Recursive from '../../BUILDER/recursive'

interface ProductCardProps {
  element: EditorElement
}

/**
 * ProductCardComponent - A compound component for displaying product information
 * 
 * Features:
 * - Responsive layout that stacks vertically on mobile
 * - Selection indicators for editor mode
 * - Delete functionality
 * - Recursive rendering of child elements
 */
const ProductCardComponent = ({ element }: ProductCardProps) => {
  // Extract required properties from element
  const { content, styles, id, name } = element
  const { dispatch, state } = useEditor()

  /**
   * Event Handlers
   */
  
  // Handle element selection in editor
  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent event bubbling
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: element,
      },
    })
  }

  // Handle element deletion from editor
  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: element },
    })
  }

  // Check if element is currently selected
  const isSelected = state.editor.selectedElement.id === id
  const isLiveMode = state.editor.liveMode

  return (
    <div
      style={{
        ...styles,
        position: 'relative', // Required for absolute positioning of badges
      }}
      className={clsx(
        'w-full transition-all rounded-md',
        {
          // Selection styling classes
          '!border-blue-500': isSelected,
          'border-solid': isSelected,
          'border-dashed border-[1px] border-slate-300': !isLiveMode,
        }
      )}
      onClick={handleOnClickBody}
    >
      {/* Component Label Badge - Shows when selected in editor mode */}
      {isSelected && !isLiveMode && (
        <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
          {name}
        </Badge>
      )}

      {/* Delete Button - Shows when selected in editor mode */}
      {isSelected && !isLiveMode && (
        <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[23px] -right-[1px] rounded-none rounded-t-lg text-white">
          <Trash 
            className="cursor-pointer" 
            size={16} 
            onClick={handleDeleteElement} 
          />
        </div>
      )}

      {/* Render Child Elements */}
      {Array.isArray(content) && content.map((childElement) => (
        <Recursive 
          key={childElement.id} 
          element={childElement} 
        />
      ))}
    </div>
  )
}

export default ProductCardComponent 