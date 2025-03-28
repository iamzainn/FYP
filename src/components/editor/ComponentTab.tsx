"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { EditorBtns } from "@/lib/constants"
import React from "react"
import { LayoutTemplate, MenuIcon } from "lucide-react"
import { ComponentConfigs } from '@/lib/ComponentConfiguration'
import { componentRegistry } from '@/lib/ComponentSystem/Core/registry';

// Import the HeroSection component to ensure it's registered
import '@/lib/ComponentSystem/Core/components/HeroSection';



const HeaderPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('componentType', type)
    
    // Try to use the registry first
    const componentInfo = componentRegistry.getComponent(type);
    if (componentInfo) {
      try {
        const newElement = componentRegistry.createInstance(type);
        console.log(`Creating new ${type} from registry:`, newElement);
        e.dataTransfer.setData('componentData', JSON.stringify(newElement));
        return;
      } catch (error) {
        console.error(`Error creating ${type} from registry:`, error);
        // Fall back to old system if registry fails
      }
    }
    
    // Fall back to old configuration system
    if (type in ComponentConfigs) {
      try {
        const newElement = ComponentConfigs[type].create()
        console.log(`Creating new ${type} from config:`, newElement)
        e.dataTransfer.setData('componentData', JSON.stringify(newElement))
      } catch (error) {
        console.error(`Error creating ${type} from config:`, error)
      }
    } else {
      console.warn(`No configuration found for component type: ${type}`)
    }
  }
  
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'header')}
      className="h-14 w-full border-[1px] border-dashed rounded-lg flex items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-grab"
    >
      <div className="flex flex-col items-center gap-1">
        <MenuIcon className="h-6 w-6 text-slate-500" />
        <p className="text-xs">Header</p>
      </div>
    </div>
  )
}

const HeroSectionPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('componentType', type)
    
    // Try to use the registry first
    const componentInfo = componentRegistry.getComponent(type);
    if (componentInfo) {
      try {
        const newElement = componentRegistry.createInstance(type);
        console.log(`Creating new ${type} from registry:`, newElement);
        e.dataTransfer.setData('componentData', JSON.stringify(newElement));
        return;
      } catch (error) {
        console.error(`Error creating ${type} from registry:`, error);
        // Fall back to old system if registry fails
      }
    }
    
    // Fall back to old configuration system
    if (type in ComponentConfigs) {
      try {
        const newElement = ComponentConfigs[type].create()
        console.log(`Creating new ${type} from config:`, newElement)
        e.dataTransfer.setData('componentData', JSON.stringify(newElement))
      } catch (error) {
        console.error(`Error creating ${type} from config:`, error)
      }
    } else {
      console.warn(`No configuration found for component type: ${type}`)
    }
  }
  
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'heroSection')}
      className="h-14 w-full border-[1px] border-dashed rounded-lg flex items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-grab"
    >
      <div className="flex flex-col items-center gap-1">
        <LayoutTemplate className="h-6 w-6 text-slate-500" />
        <p className="text-xs">Hero Section</p>
      </div>
    </div>
  )
}

const ComponentsTab = () => {
  const elements: {
    Component: React.ReactNode
    label: string
    id: EditorBtns
    group: 'layout' | 'elements'| 'compound'
  }[] = [
    {
      Component: <HeroSectionPlaceholder />,
      label: 'Hero Section',
      id: 'heroSection',
      group: 'layout',
    },
    {
      Component: <HeaderPlaceholder />,
      label: 'Header',
      id: 'header',
      group: 'layout',
    },
  ]

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={['Layout', 'Elements' , 'Compound']}
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
      <AccordionItem value="Compound" className="px-6 py-0 border-y-[1px]">
        <AccordionTrigger className="!no-underline">Compound</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2">
          {elements
            .filter((element) => element.group === 'compound')
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