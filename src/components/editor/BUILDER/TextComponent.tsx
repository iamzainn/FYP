import { useEditor } from '@/providers/editor/editor-provider'
import { EditorElement } from '@/providers/editor/editor-provider'
import React from 'react'
import clsx from 'clsx'
import { Badge } from '@/components/ui/badge'
import { Trash } from 'lucide-react'

type Props = {
  element: EditorElement
}



const TextComponent = (props: Props) => {
  const { dispatch, state } = useEditor()
  const styles = props.element.styles;

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: props.element },
    })
  }

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === '__body') 
    console.log("text component being dragged")  
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

  //WE ARE NOT ADDING DRAG DROP
  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, 'text')}
      className={clsx(
        'p-[2px] w-full m-[5px] relative text-[16px] transition-all',
        {
          'border-blue-500': 
            state.editor.selectedElement.id === props.element.id,
          'border-solid': state.editor.selectedElement.id === props.element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
      onClick={handleOnClickBody}
    >
      {(state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
        ))}
      
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
      
      <span
        contentEditable={!state.editor.liveMode}
        suppressContentEditableWarning={true}
        onBlur={(e) => {
          const spanElement = e.target as HTMLSpanElement
          dispatch({
            type: 'UPDATE_ELEMENT',
            payload: {
              elementDetails: {
                ...props.element,
                content: {
                  innerText: spanElement.innerText,
                },
              },
            },
          })
        }}
      >
        {!Array.isArray(props.element.content) && props.element.content.innerText}
      </span>
    </div>
  )
}

export default TextComponent