// src/components/editor/BUILDER/ImageComponent.tsx
'use client'

import { Badge } from '@/components/ui/badge'
import { EditorBtns } from '@/lib/constants'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import { ImageIcon, Trash } from 'lucide-react'

import React, { useState } from 'react'

type Props = {
  element: EditorElement
}

const ImageComponent = ({ element }: Props) => {
  const { dispatch, state } = useEditor()
  const { content, styles } = element
  const [imageError, setImageError] = useState(false)
  
  // Extract image source or use placeholder
  const imageSrc = typeof content === 'object' && 'src' in content 
    ? content.src 
    : 'https://placehold.co/600x400?text=Add+Image'
    
  // Extract alt text if it exists
  const imageAlt = typeof content === 'object' && 'alt' in content 
    ? content.alt 
    : 'Product image'

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

  // Handle drag start for reordering
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }

  // Create placeholder display for when image source is invalid
  const ImagePlaceholder = () => (
    <div className="flex flex-col items-center justify-center h-full w-full bg-muted/30 min-h-[200px]">
      <ImageIcon size={50} className="text-muted-foreground" />
      <p className="text-muted-foreground text-sm mt-2">
        {state.editor.liveMode 
          ? 'Image not found' 
          : 'Set image URL in settings'}
      </p>
    </div>
  )

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, 'image')}
      onClick={handleOnClickBody}
      className={clsx(
        'relative m-[5px] transition-all min-h-[100px] min-w-[100px]',
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
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
            {element.name}
          </Badge>
        )}
      
      {/* Image component */}
      <div className="w-full h-full relative">
        {imageSrc && !imageError ? (
          // Use a regular img element instead of Next.js Image to avoid SVG warnings
          <img
            src={imageSrc as string}
            alt={imageAlt as string}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          // Placeholder for empty image
          <ImagePlaceholder />
        )}
      </div>
      
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

export default ImageComponent