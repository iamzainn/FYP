// src/components/editor/BUILDER/GridComponent.tsx
'use client'

import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import React from 'react'
import clsx from 'clsx'
import Recursive from '../../BUILDER/recursive'
import { Badge } from '@/components/ui/badge'
import { Trash } from 'lucide-react'
import { EditorBtns } from '@/lib/constants'

interface GridComponentProps {
  element: EditorElement
}

const GridComponent = ({ element }: GridComponentProps) => {
  const { id, content, styles, type } = element
  const { dispatch, state } = useEditor()

  // Get the actual column count from the content length
  const columnCount = Array.isArray(content) ? content.length : 2

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element
      }
    })
  }

  const handleOnDrop = (e: React.DragEvent, id: string) => {
    e.stopPropagation()
    const componentType = e.dataTransfer.getData('componentType') as EditorBtns
    if (componentType) {
      const type = componentType
      dispatch({
        type: 'ADD_ELEMENT',
        payload: {
          containerId: id,
          elementDetails: {
            content: [],
            id: crypto.randomUUID(),
            name: type,
            styles: {},
            type: type,
          },
        },
      })
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === '__body') return
    e.dataTransfer.setData('componentType', type)
  }

  const handleDeleteElement = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: element },
    })
  }

  // Apply device-specific styles for grid
  const gridStyles = {
    ...styles,
    display: 'grid',
    gap: styles.gap || '16px',
    gridTemplateColumns: state.editor.device === 'Mobile' 
      ? '1fr' // Single column on mobile
      : styles.gridTemplateColumns || `repeat(${columnCount}, 1fr)`, // Use existing or default
  }

  return (
    <div
      style={gridStyles}
      className={clsx('relative p-4 transition-all', {
        'max-w-full w-full': true,
        'border-blue-500 border-[1px]': 
          state.editor.selectedElement.id === id && 
          !state.editor.liveMode,
        'border-solid': 
          state.editor.selectedElement.id === id && 
          !state.editor.liveMode,
        'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
      })}
      id={id}
      onDrop={(e) => handleOnDrop(e, id)}
      onDragOver={handleDragOver}
      draggable={type !== '__body'}
      onClick={handleOnClickBody}
      onDragStart={(e) => handleDragStart(e, type || '')}
    >
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
            {state.editor.selectedElement.name} ({columnCount} Columns)
          </Badge>
        )}

      {Array.isArray(content) &&
        content.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}

      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
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

export default GridComponent