'use client'

import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import React from 'react'
import clsx from 'clsx'
import Recursive from './recursive'
import { Badge } from '@/components/ui/badge'
import { Trash } from 'lucide-react'
import { EditorBtns } from '@/lib/constants'

interface HeroSectionProps {
  element: EditorElement
}

const HeroSectionComponent = ({ element }: HeroSectionProps) => {
  const { id, content, styles, type } = element
  const { dispatch, state } = useEditor()

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
      dispatch({
        type: 'ADD_ELEMENT',
        payload: {
          containerId: id,
          elementDetails: {
            content: [],
            id: crypto.randomUUID(),
            name: componentType,
            styles: {},
            type: componentType,
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

  // Combine passed styles with hero-specific defaults
  const heroStyles: React.CSSProperties = {
    minHeight: state.editor.device === 'Mobile' ? '400px' : '500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: state.editor.device === 'Mobile' ? 'center' : (styles.alignItems || 'center'),
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    ...styles,
  }

  // For the overlay effect without using ::before
  const overlayStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  }

  return (
    <div
      style={heroStyles}
      className={clsx('relative w-full', {
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
      onDragStart={(e) => handleDragStart(e, type || 'heroSection')}
    >
      
        <div style={overlayStyles} />

      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg z-10">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      {/* Hero content container */}
      <div className="relative z-10 w-full max-w-screen-xl mx-auto flex flex-col items-center px-4">
        {Array.isArray(content) &&
          content.map((childElement) => (
            <Recursive key={childElement.id} element={childElement} />
          ))}
      </div>

      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg text-white z-10">
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

export default HeroSectionComponent 