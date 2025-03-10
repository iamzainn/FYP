/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEditor } from "@/providers/editor/editor-provider"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlignHorizontalJustifyCenter,
  AlignHorizontalJustifyEnd,
  AlignHorizontalSpaceAround,
  AlignHorizontalSpaceBetween,
  AlignHorizontalJustifyStart,
} from "lucide-react"

const SettingsTab = () => {
  // Get editor state and dispatch from context
  const { state, dispatch } = useEditor()
  console.log("element " ,state.editor.selectedElement )
  
  // Only show settings when an element is selected
  const selectedElement = state.editor.selectedElement

  // Handle changes to custom element properties
  const handleChangeCustomValues = (e:any) => {
    try {
      const settingProperty = e.target.id
      const value = e.target.value
      
      console.log(`Setting custom property ${settingProperty} to:`, value)
      
      // Create style object with the updated property
      const styleObject = {
        [settingProperty]: value,
      }
      
      // Dispatch update action to modify the element
      dispatch({
        type: 'UPDATE_ELEMENT',
        payload: {
          elementDetails: {
            ...state.editor.selectedElement,
            content: {
              ...state.editor.selectedElement?.content,
              ...styleObject,
            },
          }
        }
      })

      console.log('Updated custom property successfully')
    } catch (error) {
      console.error('Error updating custom property:', error)
      // toast.error('Failed to update element property')
    }
  }

  // Handle changes to style properties with debugging and error handling
  const handleOnChanges = (e: any) => {
    try {
      const target = e.target
      const id = target.id
      const value = target.value

      // Comprehensive debugging for all style properties
      console.log(`[Style Update] ${id}: ${value}`, {
        property: id,
        value: value,
        elementType: state.editor.selectedElement?.type,
        elementId: state.editor.selectedElement?.id
      })

      // Safety check for selected element
      if (!state.editor.selectedElement) {
        console.error('No element selected for style update')
        // toast.error('No element selected to update')
        return
      }

      // Dispatch the update
      dispatch({
        type: 'UPDATE_ELEMENT',
        payload: {
          elementDetails: {
            ...state.editor.selectedElement,
            styles: {
              ...state.editor.selectedElement.styles,
              [id]: value,
            },
          },
        },
      })
      
      // Success confirmation
      console.log(`✅ Style applied successfully: ${id}=${value}`)
      
    } catch (error) {
      console.error('Error updating element style:', error)
      // toast.error(`Failed to update ${e?.target?.id || 'style property'}`)
    }
  }
  
  // Handle slider value changes (for numeric properties like opacity)
  const handleSliderChange = (e: number[]) => {
    try {
      console.log('Setting opacity to:', `${e[0]}%`)
      
      handleOnChanges({
        target: {
          id: 'opacity',
          value: `${e[0]}%`,
        }
      })
    } catch (error) {
      console.error('Error updating opacity:', error)
      // toast.error('Failed to update opacity')
    }
  }
  
  // Helper to get current opacity value as a number
  const getOpacityValue = () => {
    try {
      // If opacity exists, parse it, otherwise return default
      if (typeof state.editor.selectedElement?.styles?.opacity === 'number') {
        return state.editor.selectedElement?.styles?.opacity
      }
      
      const opacityStr = state.editor.selectedElement?.styles?.opacity
      
      if (opacityStr) {
        const parsedValue = parseFloat(opacityStr.replace('%', ''))
        console.log('Parsed opacity value:', parsedValue)
        return parsedValue || 0
      }
      
      return 100 // Default opacity
    } catch (error) {
      console.error('Error getting opacity value:', error)
      return 100 // Return default if there's an error
    }
  }

  // If no element is selected, show message
  if (!selectedElement) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Select an element to edit its properties
      </div>
    )
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">Settings</h3>
      
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={['Typography', 'Dimensions', 'Decorations', 'Flexbox']}
      >
        {/* Link section - only shown for link elements */}
        {selectedElement.type === 'link' && 
         !Array.isArray(state.editor.selectedElement.content) && (
          <AccordionItem value="Link">
            <AccordionTrigger className="no-underline">
              Link Path
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground">Link Path</p>
                <input
                  id="href"
                  placeholder="https://domain.example.com/pathname"
                  onChange={handleChangeCustomValues}
                  value={state.editor.selectedElement.content?.href}
                  className="border p-2 rounded-md"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
        
        {/* Typography accordion section */}
        <AccordionItem value="Typography">
          <AccordionTrigger className="no-underline">
            Typography
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {/* Color input with color picker */}
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">Color</p>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="color"
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles?.color || '#000000'}
                  className="w-10 h-10 p-1 cursor-pointer border rounded"
                />
                <input
                  id="color"
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles?.color || ''}
                  className="border p-2 rounded-md flex-1"
                  placeholder="#000000 or rgb(0,0,0)"
                />
              </div>
            </div>
            
            {/* Size input */}
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">Size</p>
              <input
                id="fontSize"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles?.fontSize || ''}
                className="border p-2 rounded-md"
              />
            </div>
            
            {/* Other typography options can be added here */}
          </AccordionContent>
        </AccordionItem>
        
        {/* Dimensions accordion section */}
        <AccordionItem value="Dimensions">
          <AccordionTrigger className="no-underline">
            Dimensions
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {/* Width, height, margins, etc. */}
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">Width</p>
              <input
                id="width"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles?.width || ''}
                className="border p-2 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">Height</p>
              <input
                id="height"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles?.height || ''}
                className="border p-2 rounded-md"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Decorations accordion section */}
        <AccordionItem value="Decorations">
          <AccordionTrigger className="no-underline">
            Decorations
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {/* Background Color */}
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">Background Color</p>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="backgroundColor"
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles?.backgroundColor || '#ffffff'}
                  className="w-10 h-10 p-1 cursor-pointer border rounded"
                />
                <input
                  id="backgroundColor"
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles?.backgroundColor || ''}
                  className="border p-2 rounded-md flex-1"
                  placeholder="#ffffff or rgb(255,255,255)"
                />
              </div>
            </div>
            
            {/* Opacity slider */}
            <div>
              <label className="text-muted-foreground">Opacity</label>
              <div className="flex items-center justify-end">
                <small className="p-2">
                  {typeof state.editor.selectedElement.styles?.opacity === 'number'
                    ? state.editor.selectedElement.styles?.opacity
                    : state.editor.selectedElement.styles?.opacity
                    ? parseFloat(
                        state.editor.selectedElement.styles?.opacity.replace('%', '')
                      )
                    : 100}
                  %
                </small>
              </div>
              <Slider
                onValueChange={(e) => {
                  handleSliderChange(e)
                }}
                defaultValue={[getOpacityValue()]}
                max={100}
                step={1}
              />
            </div>
            
            {/* Background Image */}
            <div className="mt-4">
              <label className="text-muted-foreground">Background Image</label>
              <div className="flex border-[1px] rounded-md overflow-clip">
                <div 
                  className="w-12" 
                  style={{
                    backgroundImage: state.editor.selectedElement.styles?.backgroundImage,
                  }}
                ></div>
                <input
                  placeholder="url()"
                  className="border-0 rounded-none border-l-0 w-full"
                  id="backgroundImage"
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles?.backgroundImage || ''}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Flexbox accordion section */}
        <AccordionItem value="Flexbox">
          <AccordionTrigger className="no-underline">
            Flexbox
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {/* Flexbox options */}
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">Display</p>
              <select
                id="display"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles?.display || ''}
                className="border p-2 rounded-md"
              >
                <option value="flex">Flex</option>
                <option value="block">Block</option>
                <option value="inline-block">Inline Block</option>
                <option value="grid">Grid</option>
              </select>
            </div>
            
            {/* Justify Content Tabs */}
            <div className="flex flex-col gap-2 mt-2">
              <p className="text-muted-foreground">Justify Content</p>
              <Tabs
                onValueChange={(e) => {
                  handleOnChanges({
                    target: {
                      id: 'justifyContent',
                      value: e,
                    },
                  })
                }}
                value={state.editor.selectedElement.styles?.justifyContent}
              >
                <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                  <TabsTrigger
                    value="space-between"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                  >
                    <AlignHorizontalSpaceBetween size={18} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="space-evenly"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                  >
                    <AlignHorizontalSpaceAround size={18} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="center"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                  >
                    <AlignHorizontalJustifyCenter size={18} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="start"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                  >
                    <AlignHorizontalJustifyStart size={18} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="end"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                  >
                    <AlignHorizontalJustifyEnd size={18} />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Add more flex options as needed */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}


export default SettingsTab;