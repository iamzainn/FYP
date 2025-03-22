'use client'

import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import React from 'react'
import clsx from 'clsx'
import { Badge } from '@/components/ui/badge'
import { Trash } from 'lucide-react'

interface HeadingComponentProps {
  element: EditorElement
}

const HeadingComponent = ({ element }: HeadingComponentProps) => {
  const { id, content, styles } = element
  const { dispatch, state } = useEditor()

  // Extract heading variant from content or default to h2
  const { variant = 'h2' } = element.content as { variant: string } || {}
  
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

  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('componentType', type)
  }

  // Render the appropriate heading element based on the variant
  const renderHeading = () => {
    const headingText = typeof content === 'string' ? content : 'Heading'
    
    switch(variant) {
      case 'h1':
        return <h1 style={styles}>{headingText}</h1>
      case 'h3':
        return <h3 style={styles}>{headingText}</h3>
      case 'h4':
        return <h4 style={styles}>{headingText}</h4>
      case 'h5':
        return <h5 style={styles}>{headingText}</h5>
      case 'h6':
        return <h6 style={styles}>{headingText}</h6>
      case 'h2':
      default:
        return <h2 style={styles}>{headingText}</h2>
    }
  }

  return (
    <div
      className={clsx('relative', {
        'border-blue-500 border-[1px]': 
          state.editor.selectedElement.id === id && 
          !state.editor.liveMode,
        'border-solid': 
          state.editor.selectedElement.id === id && 
          !state.editor.liveMode,
        'border-dashed border-[1px] border-slate-300': !state.editor.liveMode && 
          state.editor.selectedElement.id === id,
      })}
      id={id}
      onClick={handleOnClickBody}
      draggable
      onDragStart={(e) => handleDragStart(e, 'heading')}
    >
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg z-10">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      {renderHeading()}

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

export default HeadingComponent 