'use client'

import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import React from 'react'

import clsx from 'clsx'
import Recursive from './recursive'
import { Badge } from '@/components/ui/badge'
import { Trash } from 'lucide-react'
import { v4 } from 'uuid'
import { defaultStyles } from './Container'

interface TwoColComponentProps {
  element: EditorElement
}

const TwoColComponent = ({ element }: TwoColComponentProps) => {
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
    const componentType = e.dataTransfer.getData('componentType')
    
    switch(componentType) {
        case 'text':
          dispatch({
            type: 'ADD_ELEMENT',
            payload: {
              containerId: id,
              elementDetails: {
                content: {
                  innerText: 'Text Element',
                },
                id: v4(),
                name: 'Text',
                styles: { ...defaultStyles },
                type: 'text',
              },
            },
          })
          break
        case 'video':
          dispatch({
            type: 'ADD_ELEMENT',
            payload: {
              containerId: id,
              elementDetails: {
                content: {
                  src: 'https://www.youtube.com/embed/6omuUOZcWL0?si=I-4R3MiJiej3cZqx',
                },
                id: v4(),
                name: 'Video',
                styles: { ...defaultStyles },
                type: 'video',
              },
            },
          })
          break
        case 'container':
          dispatch({
            type: 'ADD_ELEMENT',
            payload: {
              containerId: id,
              elementDetails: {
                content: [],
                id: v4(),
                name: 'Container',
                styles: { ...defaultStyles },
                type: 'container',
              },
            },
          })
          break
          // Inside handleDrop function
  case 'link':
    dispatch({
      type: 'ADD_ELEMENT',
      payload: {
        containerId: id,
        elementDetails: {
          content: {
            innerText: 'Link Element',
            href: '#',
          },
          id: v4(),
          name: 'Link',
          styles: {
            color: 'black',
            ...defaultStyles,
          },
          type: 'link',
        },
      },
    })
    break;
    case '2Col':
    dispatch({
      type: 'ADD_ELEMENT',
      payload: {
        containerId: id,
        elementDetails: {
          content: [
            {
              content: [],
              id: v4(),
              name: 'Container',
              styles: { ...defaultStyles, width: '100%' },
              type: 'container',
            },
            {
              content: [],
              id: v4(), 
              name: 'Container',
              styles: { ...defaultStyles, width: '100%' },
              type: 'container',
            },
          ],
          id: v4(),
          name: 'Two Columns',
          styles: { ...defaultStyles, display: 'flex' },
          type: '2Col',
        },
      },
    })
    break;
    case 'contactForm':
  dispatch({
    type: 'ADD_ELEMENT',
    payload: {
      containerId: id,
      elementDetails: {
        content: [],
        id: v4(),
        name: 'Contact Form',
        styles: {},
        type: 'contactForm',
      },
    },
  })
  break;
        default:
          break
      }
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