'use client'

import { EditorAction, EditorElement, useEditor } from '@/providers/editor/editor-provider'
import React from 'react'

import clsx from 'clsx'
import Recursive from '../../recursive'
import { Badge } from '@/components/ui/badge'
import { Trash } from 'lucide-react'
import { EditorBtns } from '@/lib/constants'
import { useDropHandler } from '@/lib/fn'

interface ContainerProps {
    element: EditorElement
}

export const defaultStyles: React.CSSProperties = {
  backgroundPosition: 'center',
  objectFit: 'cover',
  backgroundRepeat: 'no-repeat',
  textAlign: 'left',
  opacity: '100%',
}

const Container = ({ element }: ContainerProps) => {
  const { id, content, styles, type } = element
  const { dispatch, state } = useEditor()

  // Get the drop handler function
  const dropHandler = useDropHandler()

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element
      }
    })
  }

  const handleOnDrop = (e: React.DragEvent, id: string) => {
    e.stopPropagation()
    console.log("Element drop in container")
    
    // Get both componentType and componentData
    const componentType = e.dataTransfer.getData('componentType')
    const componentData = e.dataTransfer.getData('componentData')
    
    console.log("Available data types:", e.dataTransfer.types)
    console.log("Component type:", componentType)
    console.log("Component data available:", Boolean(componentData))
    
    console.log("Component type for drop:", componentType);
    if (componentData) {
      try {
        const parsedData = JSON.parse(componentData);
        console.log("Dropping component with name:", parsedData.name, "and type:", parsedData.type);
      } catch (e) {
        console.error("Error parsing component data:", e);
      }
    }
    
    if (componentType) {
      // Call dropHandler with the component data if available
      const action = dropHandler(componentType as EditorBtns, id, componentData ? JSON.parse(componentData) : undefined)
      console.log("Dispatching action:", action)
      dispatch(action as EditorAction)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === '__body') return
    
    // Also set component data for containers
    const elementCopy = JSON.parse(JSON.stringify(element))
    e.dataTransfer.setData('componentType', type)
    e.dataTransfer.setData('componentData', JSON.stringify(elementCopy))
  }

  const handleDeleteElement = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: element },
    })
  }

  return (
    <div
      style={styles}
      className={clsx('relative transition-all group', {
        'max-w-full w-full': type === 'container',
        'h-fit': type === 'container',
        'h-full': type === '__body',
        'overflow-scroll': type === '__body',
        
        '!border-blue-500': 
          state.editor.selectedElement.id === id && 
          !state.editor.liveMode && 
          state.editor.selectedElement.type !== '__body',
        '!border-yellow-400 !border-4': 
          state.editor.selectedElement.id === id && 
          !state.editor.liveMode && 
          state.editor.selectedElement.type === '__body',
        '!border-solid': 
          state.editor.selectedElement.id === id && !state.editor.liveMode,
        'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
      })}
      onDrop={(e) => handleOnDrop(e, id)}
      onDragOver={handleDragOver}
      onClick={handleOnClickBody}
      draggable={type !== '__body'}
      onDragStart={(e) => handleDragStart(e, type || 'container')}
    >
      {Array.isArray(content) &&
        content.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}

      {/* Badge displaying element name */}
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg ">
            {state.editor.selectedElement.name}
          </Badge>
        )}
        
      {/* Delete button */}
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && 
        type !== '__body' && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg text-white">
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

export default Container