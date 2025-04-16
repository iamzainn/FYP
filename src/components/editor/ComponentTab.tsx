"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { EditorBtns } from "@/lib/constants"
import React, { useEffect } from "react"
import { LayoutTemplate, ShoppingBag, DollarSign,  Image, Text, List, Badge } from "lucide-react"

import { componentRegistry } from '@/lib/ComponentSystem/Core/registry';
import { registerAllComponents } from '@/lib/ComponentSystem/Core/components';
import { initializeComponentSystem } from '@/lib/ComponentSystem/bootstrap';

import '@/lib/ComponentSystem/Core/components/HeroSection';


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

// Product Showcase Hero placeholder
const ProductShowcaseHeroPlaceholder = () => {
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'productShowcaseHero')}
      className="h-14 w-full border-[1px] border-dashed rounded-lg flex items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-grab"
    >
      <div className="flex flex-col items-center gap-1">
        <ShoppingBag className="h-6 w-6 text-slate-500" />
        <p className="text-xs">Product Showcase</p>
      </div>
    </div>
  )
}

// Element component placeholders
const createElementPlaceholder = (type: EditorBtns, label: string, icon: React.ReactNode) => {
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, type)}
      className="h-12 w-28 border-[1px] border-dashed rounded-lg flex items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-grab"
    >
      <div className="flex flex-col items-center gap-1">
        {icon}
        <p className="text-xs">{label}</p>
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
    // Layout components
    {
      Component: <HeroSectionPlaceholder />,
      label: 'Hero Section',
      id: 'heroSection',
      group: 'layout',
    },
    
    // Compound components
    {
      Component: <ProductShowcaseHeroPlaceholder />,
      label: 'Product Showcase',
      id: 'productShowcaseHero',
      group: 'compound',
    },
    
    // Element components
    {
      Component: createElementPlaceholder('productImage', 'Product Image', <Image className="h-5 w-5 text-slate-500" />),
      label: 'Product Image',
      id: 'productImage',
      group: 'elements',
    },
    {
      Component: createElementPlaceholder('productPrice', 'Product Price', <DollarSign className="h-5 w-5 text-slate-500" />),
      label: 'Product Price',
      id: 'productPrice',
      group: 'elements',
    },
    {
      Component: createElementPlaceholder('productDescription', 'Description', <Text className="h-5 w-5 text-slate-500" />),
      label: 'Product Description',
      id: 'productDescription',
      group: 'elements',
    },
    {
      Component: createElementPlaceholder('productFeatureList', 'Features List', <List className="h-5 w-5 text-slate-500" />),
      label: 'Product Features',
      id: 'productFeatureList',
      group: 'elements',
    },
    {
      Component: createElementPlaceholder('productBadge', 'Product Badge', <Badge className="h-5 w-5 text-slate-500" />),
      label: 'Product Badge',
      id: 'productBadge',
      group: 'elements',
    },
  ]

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={['Layout', 'Elements', 'Compound']}
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
                <span className="text-muted-foreground text-xs mt-1">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="Elements" className="px-6 py-0 ">
        <AccordionTrigger className="!no-underline">Elements</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-4">
          {elements
            .filter((element) => element.group === 'elements')
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center flex"
              >
                {element.Component}
                <span className="text-muted-foreground text-xs mt-1">{element.label}</span>
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
                <span className="text-muted-foreground text-xs mt-1">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default ComponentsTab