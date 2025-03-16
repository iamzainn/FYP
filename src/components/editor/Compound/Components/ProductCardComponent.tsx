'use client'

import { Badge } from '@/components/ui/badge'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React from 'react'
import Recursive from '../../BUILDER/recursive'

type Props = {
  element: EditorElement
}

const ProductCardComponent = ({ element }: Props) => {
  const { content, styles } = element
  const { dispatch, state } = useEditor()

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
  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: element },
    })
  }

  return (
    <div
      style={{
        ...styles,
        position: 'relative',
      }}
      className={clsx(
        'w-full transition-all rounded-md',
        {
          '!border-blue-500': state.editor.selectedElement.id === element.id,
          'border-solid': state.editor.selectedElement.id === element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
      onClick={handleOnClickBody}
    >
      {/* Selection indicator badge */}
      {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
        <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
          {element.name}
        </Badge>
      )}

      {/* Delete button */}
      {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
        <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[23px] -right-[1px] rounded-none rounded-t-lg text-white">
          <Trash className="cursor-pointer" size={16} onClick={handleDeleteElement} />
        </div>
      )}

      {/* Render all child elements using Recursive component */}
      {Array.isArray(content) && content.map((childElement) => (
        <Recursive key={childElement.id} element={childElement} />
      ))}
    </div>
  )
}

export default ProductCardComponent 