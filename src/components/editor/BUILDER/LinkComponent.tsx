'use client'

import { Badge } from '@/components/ui/badge'
import { EditorBtns } from '@/lib/constants'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  element: EditorElement
}

interface LinkContent {
  innerText: string;
  href: string;
  target?: '_self' | '_blank';
  rel?: string;
}

const LinkComponent = (props: Props) => {
  const { dispatch, state } = useEditor()
  const styles = props.element.styles

  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: props.element,
      },
    })
  }

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: props.element },
    })
  }

  const content = props.element.content as LinkContent;
  
  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, 'text')}
      onClick={handleOnClickBody}
      className={clsx(
        'p-[2px] w-full m-[5px] relative text-[16px] transition-all',
        {
          'border-blue-500': state.editor.selectedElement.id === props.element.id,
          'border-solid': state.editor.selectedElement.id === props.element.id,
          'border-dashed border-[1px]': !state.editor.liveMode,
          'border-slate-300': !state.editor.liveMode,
        }
      )}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      {!Array.isArray(content) && (
        <>
          {!state.editor.previewMode || state.editor.liveMode ? (
            <Link 
              href={content.href || '#'}
              target={content.target}
              rel={content.rel}
            >
              {content.innerText}
            </Link>
          ) : (
            <span
              contentEditable={!state.editor.liveMode}
              onBlur={(e) => {
                const spanElement = e.target as HTMLSpanElement
                dispatch({
                  type: 'UPDATE_ELEMENT',
                  payload: {
                    elementDetails: {
                      ...props.element,
                      content: {
                        ...content,
                        innerText: spanElement.innerText,
                      },
                    },
                  },
                })
              }}
            >
              {content.innerText}
            </span>
          )}
        </>
      )}

      {state.editor.selectedElement.id === props.element.id &&
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

export default LinkComponent