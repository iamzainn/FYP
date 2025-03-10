// src/components/editor/BUILDER/BadgeComponent.tsx
'use client'

import { Badge as UIBadge } from '@/components/ui/badge'
import { EditorBtns } from '@/lib/constants'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React from 'react'

type Props = {
  element: EditorElement
}

const BadgeComponent = ({ element }: Props) => {
  const { dispatch, state } = useEditor()
  const {  content, styles, } = element
  
  // Extract text content or use default
  const badgeText = typeof content === 'object' && 'innerText' in content 
    ? content.innerText 
    : 'New'

  // Handle element selection
  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: element,
      },
    })
  }

  // Handle element deletion
  const handleDeleteElement = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: element },
    })
  }

  // Handle content update when in edit mode
  const handleContentChange = (e: React.FormEvent<HTMLSpanElement>) => {
    // Only update if we're not in live mode and this is the selected element
    if (
      state.editor.liveMode ||
      state.editor.selectedElement.id !== element.id
    )
      return

    const innerText = e.currentTarget.innerText

    // Update element with new content
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...element,
          content: {
            ...element.content,
            innerText,
          },
        },
      },
    })
  }

  // Handle drag start for reordering
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, 'badge')}
      onClick={handleOnClickBody}
      className={clsx(
        'relative inline-block m-[5px] transition-all',
        {
          '!border-blue-500': 
            state.editor.selectedElement.id === element.id,
          'border-solid': state.editor.selectedElement.id === element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
    >
      {/* Selection indicator badge */}
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <UIBadge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
            {element.name}
          </UIBadge>
        )}
      
      {/* The actual badge component */}
      <UIBadge
        contentEditable={
          !state.editor.liveMode &&
          state.editor.selectedElement.id === element.id
        }
        onBlur={handleContentChange}
        suppressContentEditableWarning={true}
        className={clsx(
          'px-2 py-1 text-xs font-semibold rounded',
          // Default styling if no custom styles are applied
          {
            'bg-primary text-primary-foreground': !styles.backgroundColor,
            'cursor-text': 
              !state.editor.liveMode && state.editor.selectedElement.id === element.id,
            'pointer-events-none': 
              !state.editor.liveMode && state.editor.selectedElement.id !== element.id,
          }
        )}
      >
        {badgeText}
      </UIBadge>
      
      {/* Delete button */}
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

export default BadgeComponent