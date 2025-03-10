// src/components/editor/BUILDER/ImageComponent.tsx
'use client'

import { Badge } from '@/components/ui/badge'
import { EditorBtns } from '@/lib/constants'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import { ImageIcon, Trash } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {
  element: EditorElement
}

const ImageComponent = ({ element }: Props) => {
  const { dispatch, state } = useEditor()
  const {  content, styles, } = element
  
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
        {imageSrc && imageSrc !== 'https://placehold.co/600x400?text=Add+Image' ? (
          // Real image with error handling
          <Image
            src={imageSrc}
            

            alt={imageAlt as string}
            className="w-full h-full object-cover"
            onError={(e) => {
              // If image fails to load, show placeholder
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite error loop
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const placeholder = document.createElement('div');
                placeholder.innerHTML = '<div class="flex flex-col items-center justify-center h-full w-full bg-muted/30 min-h-[200px]"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg><p class="text-muted-foreground text-sm mt-2">Image not found</p></div>';
                parent.appendChild(placeholder.firstChild as Node);
              }
            }}
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