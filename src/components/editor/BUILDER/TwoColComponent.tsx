'use client'

import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import React, { useEffect, useState } from 'react'
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
  console.log("Two Col Component rendered")
  const { id, content, styles, type } = element
  const [mounted, setMounted] = useState(false)
  const { dispatch, state } = useEditor()
  const dropHandler = useDropHandler()

  // useEffect(() => {
  //   setMounted(true)
  // }, [])

  const handleStyleChange = (property: string, value: string ) => {
    // If value is a number, add the appropriate unit
   
    // Dispatch the update to the editor
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            [property]: value,
          },
        },
      },
    });
  };

  // useEffect(() => {
    
  //   if(mounted){
  //     // changes flexDirection based on device :
  //     console.log("TwoColComponent already mounted")
     
      
  //     if(state.editor.device === 'Mobile'){
  //       console.log("TwoColComponent style changes")
  //       handleStyleChange('flexDirection', 'column')
  //     }

  //   }
  // }, [state.editor.device])

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

  const handleDeleteElement = (e:React.MouseEvent) => {
    
      e.stopPropagation();
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


