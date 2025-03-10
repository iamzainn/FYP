'use client'


import { Badge } from '@/components/ui/badge'
// import { toast } from '@/components/ui/use-toast'


import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import { Trash } from 'lucide-react'


import React from 'react'
import { z } from 'zod'
import ContactForm, { ContactUserFormSchema } from './Contact-form'
import { EditorBtns } from '@/lib/constants'

type Props = {
  element: EditorElement
}

const ContactFormComponent = (props: Props) => {
  const { dispatch, state } = useEditor()
//   const router = useRouter()

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

  const styles = props.element.styles

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, 'contactForm')}
      onClick={handleOnClickBody}
      className={clsx(
        'p-[2px] w-full m-[5px] relative text-[16px] transition-all flex items-center justify-center',
        {
          '!border-blue-500': 
            state.editor.selectedElement.id === props.element.id,
          'border-solid': state.editor.selectedElement.id === props.element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      <ContactForm
        title="Contact Us"
        subtitle="Please fill the form below to contact us"
        apiCall={async (values: z.infer<typeof ContactUserFormSchema>) => {
          // Placeholder for future implementation
          console.log(values);
          return { success: true };
        }}
      />

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

export default ContactFormComponent