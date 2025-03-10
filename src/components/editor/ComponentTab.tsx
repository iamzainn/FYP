"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { EditorBtns } from "@/lib/constants"
import React from "react"
import { TypeIcon, Youtube } from "lucide-react"
import { LinkPlaceholder } from "./LinkPlaceholder"
import TwoColumnsPlaceholder from "./BUILDER/TwoColPlaceHolder"
import ContactFormComponentPlaceholder from "./ContactFormComponentPlaceholder"


const TextPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }

  return (
    <div
      draggable
      onDragStart={(e) => {
        handleDragStart(e, 'text')
      }}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <TypeIcon
        size={40}
        className="text-muted-foreground"
      />
    </div>
  )
}

const ContainerPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'container')}
      className="h-14 w-14 bg-muted/70 rounded-lg p-2 flex flex-row gap-[4px]"
    >
      <div className="border-dashed border-[1px] h-full rounded-sm bg-muted border-muted-foreground/50 w-full"></div>
    </div>
  )
}

const VideoPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'video')}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <Youtube
        size={40}
        className="text-muted-foreground"
      />
    </div>
  )
}

const ComponentsTab = () => {
  const elements: {
    Component: React.ReactNode
    label: string
    id: EditorBtns
    group: 'layout' | 'elements'
  }[] = [
    {
      Component: <TextPlaceholder />,
      label: 'Text',
      id: 'text',
      group: 'elements',
    },
    {
      Component: <ContainerPlaceholder />,
      label: 'Container',
      id: 'container',
      group: 'layout',
    },
    {
      Component: <TwoColumnsPlaceholder />,
      label: 'Two Columns',
      id: '2Col',
      group: 'layout',
    },
    {
      Component: <VideoPlaceholder />,
      label: 'Video',
      id: 'video',
      group: 'elements',
    },
    {
      Component: <LinkPlaceholder />,
      label: 'Link',
      id: 'link',
      group: 'elements',
    },
    {
      Component: <ContactFormComponentPlaceholder />,
      label: 'Contact',
      id: 'contactForm',
      group: 'elements',
    },
    
  ]

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={['Layout', 'Elements']}
    >
      <AccordionItem value="Layout" className="px-6 py-0 border-y-[1px]">
        <AccordionTrigger className="!no-underline">Layout</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2">
          {elements
            .filter((element) => element.group === 'layout')
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center flex"
              >
                {element.Component}
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="Elements" className="px-6 py-0 ">
        <AccordionTrigger className="!no-underline">Elements</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2">
          {elements
            .filter((element) => element.group === 'elements')
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center flex"
              >
                {element.Component}
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default ComponentsTab