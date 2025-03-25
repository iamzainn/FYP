'use client'

import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Trash } from 'lucide-react'

interface WrapperProps {
  element: EditorElement;
  children: React.ReactNode;
  customDragHandler?: (e: React.DragEvent, element: EditorElement) => void;
}

const ComponentWrapper = ({ element, children, customDragHandler }: WrapperProps) => {
  const { dispatch, state } = useEditor()
  const isSelected = state.editor.selectedElement.id === element.id && !state.editor.liveMode

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element
      }
    })
  }

  const handleDeleteElement = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: element },
    })
  }

  const handleDragStart = (e: React.DragEvent) => {
    if (state.editor.liveMode || element.type === '__body') return
    
    // Stop propagation to prevent parent components from also setting drag data
    e.stopPropagation();
    
    // Create a deep copy of the element
    const elementCopy = JSON.parse(JSON.stringify(element));
    console.log(`Dragging ${element.type} component - element copy:`, elementCopy);
    
    // Set data for transfer
    e.dataTransfer.setData('componentType', element.type as string);
    e.dataTransfer.setData('componentData', JSON.stringify(elementCopy));
    
    // If a custom drag handler is provided, call it
    if (customDragHandler) {
      customDragHandler(e, element);
    }
  }

  return (
    <div
      className="relative"
      id={element.id}
      draggable={!state.editor.liveMode}
      onClick={handleOnClickBody}
      onDragStart={handleDragStart}
    >
      {/* Selection Badge */}
      {isSelected && (
        <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg z-20">
          {element.name}
        </Badge>
      )}

      {children}

      {/* Delete Button */}
      {isSelected && (
        <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg text-white z-20">
          <Trash
            className="cursor-pointer"
            size={16}
            onClick={handleDeleteElement}
          />
        </div>
      )}
    </div>
  )
}

export default ComponentWrapper 