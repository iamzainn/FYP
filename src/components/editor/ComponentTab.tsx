"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { EditorBtns } from "@/lib/constants"
import React, { useEffect } from "react"
import { LayoutTemplate, Menu } from "lucide-react"

import { componentRegistry } from '@/lib/ComponentSystem/Core/registry';
import { registerAllComponents } from '@/lib/ComponentSystem/Core/components';
import { initializeComponentSystem } from '@/lib/ComponentSystem/bootstrap';

import '@/lib/ComponentSystem/Core/components/HeroSection';
// import '@/lib/ComponentSystem/Core/components/HeaderSection';
// import '@/lib/ComponentSystem/Core/components/Navigation';
// import '@/lib/ComponentSystem/Core/components/NavigationItem';
// import '@/lib/ComponentSystem/Core/components/Logo';
// import '@/lib/ComponentSystem/Core/components/HeaderActions';

// Generic handler for component dragging
const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
  e.dataTransfer.setData('componentType', type || '')
  
  // Try to use the registry first
  const componentInfo = componentRegistry.getComponent(type || '');
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
}

// Hero Section placeholder
const HeroSectionPlaceholder = () => {
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

// Header Section placeholder
const HeaderSectionPlaceholder = () => {
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'headerSection')}
      className="h-14 w-full border-[1px] border-dashed rounded-lg flex items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-grab"
    >
      <div className="flex flex-col items-center gap-1">
        <Menu className="h-6 w-6 text-slate-500" />
        <p className="text-xs">Header Section</p>
      </div>
    </div>
  )
}

const ComponentsTab = () => {
  useEffect(() => {
    // Initialize system first
    initializeComponentSystem();
    // Then register all components
    registerAllComponents();
  }, []);

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
      Component: <HeaderSectionPlaceholder />,
      label: 'Header Section',
      id: 'headerSection',
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