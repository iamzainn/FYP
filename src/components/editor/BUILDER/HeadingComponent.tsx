'use client'

import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import React, { useMemo } from 'react'
import clsx from 'clsx'
import { Badge } from '@/components/ui/badge'
import { Trash } from 'lucide-react'
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles'

interface HeadingComponentProps {
  element: EditorElement
}

const HeadingComponent = ({ element }: HeadingComponentProps) => {
  const { id, content, customSettings } = element
  const { dispatch, state } = useEditor()
  
  // Determine if we're in live or preview mode
  const isLiveOrPreview = state.editor.liveMode || state.editor.previewMode
  
  // Get responsive styles based on current device
  const { computedStyles } = useResponsiveStyles(
    element, 
    state.editor.device,
    isLiveOrPreview
  )
  
  // Extract heading variant from customSettings or default to h2
  const variant = useMemo(() => {
    return customSettings?.variant || 'h2'
  }, [customSettings])
  
  const isSelected = state.editor.selectedElement.id === id && !state.editor.liveMode
  
  // Render the appropriate heading element based on the variant
  const renderHeading = () => {
    const headingText = typeof content === 'string' 
      ? content 
      : (content as { innerText: string }).innerText || 'Heading'
    
    // Force re-render when variant changes by using the key
    switch(variant) {
      case 'h1':
        return <h1 key={`h1-${id}`} style={computedStyles}>{headingText}</h1>
      case 'h3':
        return <h3 key={`h3-${id}`} style={computedStyles}>{headingText}</h3>
      case 'h4':
        return <h4 key={`h4-${id}`} style={computedStyles}>{headingText}</h4>
      case 'h5':
        return <h5 key={`h5-${id}`} style={computedStyles}>{headingText}</h5>
      case 'h6':
        return <h6 key={`h6-${id}`} style={computedStyles}>{headingText}</h6>
      case 'h2':
      default:
        return <h2 key={`h2-${id}`} style={computedStyles}>{headingText}</h2>
    }
  }
  
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

  return (
    <div
      className={clsx(
        'relative',
        isSelected && [
          'outline outline-2 outline-blue-500',
          'outline-offset-2',
          'shadow-[0_0_0_2px_rgba(59,130,246,0.5)]',
        ],
        !state.editor.liveMode && !isSelected && 
          'outline outline-1 outline-dashed outline-slate-300 outline-offset-2 hover:outline-slate-400'
      )}
      id={id}
      onClick={handleOnClickBody}
      draggable
      onDragStart={(e) => handleDragStart(e, 'heading')}
    >
      {/* Display device type badge in edit mode for debugging */}
      {isSelected && !isLiveOrPreview && (
        <Badge className="absolute -top-[40px] -left-[1px] rounded-none rounded-t-lg bg-blue-200 text-blue-800">
          Device: {state.editor.device}
        </Badge>
      )}
      
      {/* Selected element badge */}
      {isSelected && (
        <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg z-20">
          {state.editor.selectedElement.name} {`(${variant})`}
        </Badge>
      )}

      {/* Render the heading content */}
      {renderHeading()}

      {/* Delete button */}
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

export default HeadingComponent 