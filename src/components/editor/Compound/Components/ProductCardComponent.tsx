'use client'

import { Badge } from '@/components/ui/badge'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
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
  const [mounted, setMounted] = useState(false)

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
  const handleDeleteElement = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent click from bubbling to parent
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: element },
    })
  }

  // Handle updating the nested 2Col component for responsiveness
  const updateNestedTwoColLayout = () => {
    if (!Array.isArray(content)) return;
    
    // Find the 2Col component within content
    const twoColElement = content.find(item => item.type === '2Col');
    if (!twoColElement) return;
    
    // Create updated version of the 2Col with modified flexDirection
    const updatedTwoCol = {
      ...twoColElement,
      styles: {
        ...twoColElement.styles,
        flexDirection: state.editor.device === 'Mobile' ? 'column' : 'row'
      }
    };
    
    // Find all child elements except the 2Col
    const otherElements = content.filter(item => item.id !== twoColElement.id);
    
    // Create updated content array with the modified 2Col
    const updatedContent = [...otherElements, updatedTwoCol];
    
    // Update the entire product card with the new content
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...element,
          content: updatedContent as EditorElement[]
        }
      }
    });
  }
  
  // Add effect for responsive behavior
  useEffect(() => {
    setMounted(true)
    if (mounted) {
      console.log("ProductCardComponent responding to device change")
      updateNestedTwoColLayout()
    }
  }, [state.editor.device, mounted])

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