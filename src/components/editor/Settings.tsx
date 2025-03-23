/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import { useEditor } from "@/providers/editor/editor-provider"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { cn } from "@/lib/utils"
import { TypographySettings } from './SETTINGS/TypoGrapghySettings'
import { DimensionsSettings } from './SETTINGS/DimenstionSettings'
import { DecorationsSettings } from './SETTINGS/DecorationSettings'
import { CustomSettings } from './SETTINGS/CustomSettings'
import { Trash } from "lucide-react"
import {  useState } from "react"

const SettingsTab = () => {
  const { state, dispatch,  } = useEditor()
  const [activeSection, setActiveSection] = useState<string[]>(['typography', 'decorations', 'dimensions', 'custom'])
  const selectedElement = state.editor.selectedElement
  console.log("selectedElement : ",selectedElement)
  

  if (!selectedElement.id) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-muted-foreground text-sm">
          No element selected. Click on an element to edit its properties.
        </p>
      </div>
    )
  }

  const handleStyleChange = (property: string, value: string | number) => {
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...selectedElement,
          styles: {
            ...selectedElement.styles,
            [property]: value,
          },
        },
      },
    })
  }

  const handleChangeCustomValues = (property: string, value: string | number) => {
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...selectedElement,
          customSettings: {
            ...(selectedElement.customSettings || {}),
            [property]: value,
          },
        },
      },
    })
  }

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: {
        elementDetails: { ...selectedElement },
      },
    })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-2 border-b flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">
            {selectedElement.name || selectedElement.type}
          </p>
          <p className="text-xs text-muted-foreground">{selectedElement.id}</p>
        </div>
        <button
          onClick={handleDeleteElement}
          className={cn(
            'p-2 text-destructive hover:bg-destructive/10 rounded transition-colors',
            'flex items-center gap-1'
          )}
        >
          <Trash size={16} />
          <span className="text-xs">Delete</span>
        </button>
      </div>

      <div className="flex-1 overflow-auto px-2 py-2">
        <Accordion
          type="multiple"
          defaultValue={activeSection}
          onValueChange={setActiveSection}
          className="w-full"
        >
          <AccordionItem value="typography" className="border-b">
            <AccordionTrigger className="py-2 text-sm hover:no-underline">
              Typography
            </AccordionTrigger>
            <AccordionContent className="pb-2">
              <TypographySettings 
                element={selectedElement} 
                onStyleChange={handleStyleChange}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="dimensions" className="border-b">
            <AccordionTrigger className="py-2 text-sm hover:no-underline">
              Dimensions
            </AccordionTrigger>
            <AccordionContent className="pb-2">
              <DimensionsSettings 
                element={selectedElement} 
                onStyleChange={handleStyleChange}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="decorations" className="border-b">
            <AccordionTrigger className="py-2 text-sm hover:no-underline">
              Decorations
            </AccordionTrigger>
            <AccordionContent className="pb-2">
              <DecorationsSettings 
                element={selectedElement} 
                onStyleChange={handleStyleChange}
              />
            </AccordionContent>
          </AccordionItem>

          {(selectedElement.type === 'container' || selectedElement.type === '2Col') && (
            <AccordionItem value="flexbox" className="border-b">
              <AccordionTrigger className="py-2 text-sm hover:no-underline">
                Flexbox
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                <div className="grid gap-4 px-1">
                  <div className="flex flex-col gap-2">
                    <label className="text-muted-foreground text-sm">Direction</label>
                    <select
                      className="border p-2 rounded-md"
                      value={selectedElement.styles.flexDirection as string || 'row'}
                      onChange={(e) => handleStyleChange('flexDirection', e.target.value)}
                    >
                      <option value="row">Row</option>
                      <option value="column">Column</option>
                      <option value="row-reverse">Row Reverse</option>
                      <option value="column-reverse">Column Reverse</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-2">
                      <label className="text-muted-foreground text-sm">Justify Content</label>
                      <select
                        className="border p-2 rounded-md"
                        value={selectedElement.styles.justifyContent as string || 'flex-start'}
                        onChange={(e) => handleStyleChange('justifyContent', e.target.value)}
                      >
                        <option value="flex-start">Start</option>
                        <option value="flex-end">End</option>
                        <option value="center">Center</option>
                        <option value="space-between">Space Between</option>
                        <option value="space-around">Space Around</option>
                        <option value="space-evenly">Space Evenly</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-muted-foreground text-sm">Align Items</label>
                      <select
                        className="border p-2 rounded-md"
                        value={selectedElement.styles.alignItems as string || 'stretch'}
                        onChange={(e) => handleStyleChange('alignItems', e.target.value)}
                      >
                        <option value="flex-start">Start</option>
                        <option value="flex-end">End</option>
                        <option value="center">Center</option>
                        <option value="stretch">Stretch</option>
                        <option value="baseline">Baseline</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-muted-foreground text-sm">Gap</label>
                    <input
                      type="text"
                      className="border p-2 rounded-md"
                      value={selectedElement.styles.gap as string || ''}
                      onChange={(e) => handleStyleChange('gap', e.target.value)}
                      placeholder="0px"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-muted-foreground text-sm">Flex Wrap</label>
                    <select
                      className="border p-2 rounded-md"
                      value={selectedElement.styles.flexWrap as string || 'nowrap'}
                      onChange={(e) => handleStyleChange('flexWrap', e.target.value)}
                    >
                      <option value="nowrap">No Wrap</option>
                      <option value="wrap">Wrap</option>
                      <option value="wrap-reverse">Wrap Reverse</option>
                    </select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {selectedElement.type === 'grid' && (
            <AccordionItem value="grid" className="border-b">
              <AccordionTrigger className="py-2 text-sm hover:no-underline">
                Grid Layout
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                <div className="grid gap-4 px-1">
                  <div className="flex flex-col gap-2">
                    <label className="text-muted-foreground text-sm">Grid Template Columns</label>
                    <input
                      type="text"
                      className="border p-2 rounded-md"
                      value={selectedElement.styles.gridTemplateColumns as string || ''}
                      onChange={(e) => handleStyleChange('gridTemplateColumns', e.target.value)}
                      placeholder="repeat(3, 1fr)"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-muted-foreground text-sm">Grid Template Rows</label>
                    <input
                      type="text"
                      className="border p-2 rounded-md"
                      value={selectedElement.styles.gridTemplateRows as string || ''}
                      onChange={(e) => handleStyleChange('gridTemplateRows', e.target.value)}
                      placeholder="auto"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-muted-foreground text-sm">Grid Gap</label>
                    <input
                      type="text"
                      className="border p-2 rounded-md"
                      value={selectedElement.styles.gap as string || ''}
                      onChange={(e) => handleStyleChange('gap', e.target.value)}
                      placeholder="0px"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-muted-foreground text-sm">Justify Items</label>
                    <select
                      className="border p-2 rounded-md"
                      value={selectedElement.styles.justifyItems as string || 'stretch'}
                      onChange={(e) => handleStyleChange('justifyItems', e.target.value)}
                    >
                      <option value="start">Start</option>
                      <option value="end">End</option>
                      <option value="center">Center</option>
                      <option value="stretch">Stretch</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-muted-foreground text-sm">Align Items</label>
                    <select
                      className="border p-2 rounded-md"
                      value={selectedElement.styles.alignItems as string || 'stretch'}
                      onChange={(e) => handleStyleChange('alignItems', e.target.value)}
                    >
                      <option value="start">Start</option>
                      <option value="end">End</option>
                      <option value="center">Center</option>
                      <option value="stretch">Stretch</option>
                    </select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {selectedElement.type && (
            <AccordionItem value="custom" className="border-b">
              <AccordionTrigger className="py-2 text-sm hover:no-underline">
                Element Settings
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                <CustomSettings
                  element={selectedElement}
                  customSettings={selectedElement.customSettings || {}}
                  onCustomSettingChange={handleChangeCustomValues}
                />
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    </div>
  )
}

export default SettingsTab;


