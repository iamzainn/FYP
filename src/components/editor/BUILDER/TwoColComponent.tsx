'use client'

import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import React, { CSSProperties, useEffect } from 'react'
import clsx from 'clsx'
import Recursive from './recursive'
import { Badge } from '@/components/ui/badge'
import { Trash } from 'lucide-react'
import { useDropHandler } from '@/lib/fn'
import { EditorBtns } from '@/lib/constants'

interface TwoColComponentProps {
  element: EditorElement
}

const TwoColComponent = ({ element }: TwoColComponentProps) => {
  console.log("TwoColComponent rendered")
  const { id, content, styles, type } = element
  const { dispatch, state } = useEditor()
  const dropHandler = useDropHandler()

  useEffect(() => {
    // Only run this effect when device changes
    if (element.type === '2Col') {
      // If the flex direction has been manually set to something other than row/column
      // (like row-reverse or column-reverse), preserve that user choice
      const isNonStandardFlexDirection = 
        styles?.flexDirection === 'row-reverse' || 
        styles?.flexDirection === 'column-reverse';
        
      // Only auto-update if it's not a custom value set by user
      if (!isNonStandardFlexDirection) {
        const updatedStyles = {
          ...styles,
          flexDirection: state.editor.device === 'Mobile' ? 'column' : 'row',
        }

        if (styles.flexDirection !== updatedStyles.flexDirection) {
          dispatch({
            type: 'UPDATE_ELEMENT',
            payload: {
              elementDetails: {
                ...element,
                styles: updatedStyles as CSSProperties,
              },
            },
          })
          
          if (Array.isArray(content) && content.length === 2) {
            const leftContainer = content[0]
            const rightContainer = content[1]
            
            const childWidth = state.editor.device === 'Mobile' ? '100%' : '100%'
            
            dispatch({
              type: 'UPDATE_ELEMENT',
              payload: {
                elementDetails: {
                  ...leftContainer,
                  styles: {
                    ...leftContainer.styles,
                    width: childWidth,
                    marginBottom: state.editor.device === 'Mobile' ? '1rem' : '0',
                  },
                },
              },
            })
            
            dispatch({
              type: 'UPDATE_ELEMENT',
              payload: {
                elementDetails: {
                  ...rightContainer,
                  styles: {
                    ...rightContainer.styles,
                    width: childWidth,
                  },
                },
              },
            })
          }
        }
      }
    }
  }, [state.editor.device]) // Only depend on device changes

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
    const componentType = e.dataTransfer.getData('componentType')
    dropHandler(componentType as EditorBtns, id)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === '__body') return
    e.dataTransfer.setData('componentType', type)
  }

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: element },
    })
  }

  return (
    <div
      style={styles}
      className={clsx('relative p-4 transition-all', {
        'h-fit': type === 'container',
        'border-blue-500': 
          state.editor.selectedElement.id === id && 
          !state.editor.liveMode,
        'border-solid': 
          state.editor.selectedElement.id === id && 
          !state.editor.liveMode,
        'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
      })}
      id="innerContainer"
      onDrop={(e) => handleOnDrop(e, id)}
      onDragOver={handleDragOver}
      draggable={type !== '__body'}
      onClick={handleOnClickBody}
      onDragStart={(e) => handleDragStart(e, 'container')}
    >
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
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

export default TwoColComponent