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
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Minus,
  Plus,
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  AlignStartVertical,
  AlignCenterVertical,
  AlignEndVertical,
  StretchHorizontal,
  
} from "lucide-react"
import { useState } from "react"



// Add this TypeScript interface for units
interface StyleUnit {
  value: 'px' | 'rem' | 'em' | '%';
  label: string;
}

// Available units array
const availableUnits: StyleUnit[] = [
  { value: 'px', label: 'Pixels' },
  { value: 'rem', label: 'REM' },
  { value: 'em', label: 'EM' },
  { value: '%', label: 'Percent' }
];

// Add this section right after the existing StyleUnit interface
interface CustomSettingsMap {
  link: {
    title: string;
    settings: {
      id: string;
      label: string;
      type: 'text' | 'color' | 'number' | 'select';
      placeholder?: string;
      options?: { value: string; label: string }[];
    }[];
  };
  // Add other element types here in future
}

// Define custom settings for each element type
const customSettings: CustomSettingsMap = {
  link: {
    title: 'Link Settings',
    settings: [
      {
        id: 'href',
        label: 'URL',
        type: 'text',
        placeholder: 'https://example.com'
      },
      {
        id: 'target',
        label: 'Open in',
        type: 'select',
        options: [
          { value: '_self', label: 'Same window' },
          { value: '_blank', label: 'New window' }
        ]
      },
      {
        id: 'rel',
        label: 'Link Relation',
        type: 'select',
        options: [
          { value: '', label: 'None' },
          { value: 'nofollow', label: 'No Follow' },
          { value: 'noopener', label: 'No Opener' },
          { value: 'noreferrer', label: 'No Referrer' }
        ]
      }
    ]
  }
};

const SettingsTab = () => {
  // Get editor state and dispatch from context
  const { state, dispatch } = useEditor()
  
  // Debug function for Settings component
  // const debugSettings = (message: string) => {
  //   console.log(`[SETTINGS] ${message}`);
  //   console.log(`[SETTINGS] Selected Element:`, state.editor.selectedElement);
  //   console.log(`[SETTINGS] History Index:`, state.history.currentIndex);
    
  //   // Check sync with editor state
  //   const historyElement = state.history.history[state.history.currentIndex]?.selectedElement;
  //   if (historyElement?.id !== state.editor.selectedElement?.id) {
  //     console.warn("[SETTINGS] WARNING: History and editor selectedElement not in sync!");
  //   }
  // }

  // Add state for current units
  const [marginUnit, setMarginUnit] = useState<StyleUnit['value']>('px');
  const [paddingUnit, setPaddingUnit] = useState<StyleUnit['value']>('px');
  
  // Only show settings when an element is selected
  const selectedElement = state.editor.selectedElement

  // Debug when selected element changes
  // useEffect(() => {
  //   debugSettings("Selected element changed");
  //   // Also call the provider debug function for comprehensive info
  //   if (typeof providerDebugState === 'function') {
  //     providerDebugState('SETTINGS_ELEMENT_CHANGED', state);
  //   }
  // }, [selectedElement, state]);

  // Helper to get current opacity value as a number
  const getOpacityValue = (): number => {
    try {
      // If opacity exists, parse it, otherwise return default
      if (typeof state.editor.selectedElement?.styles?.opacity === 'number') {
        return state.editor.selectedElement?.styles?.opacity as number;
      }
      
      const opacityStr = state.editor.selectedElement?.styles?.opacity as string;
      
      if (opacityStr) {
        const parsedValue = parseFloat(opacityStr.replace('%', ''));
        return !isNaN(parsedValue) ? parsedValue : 100;
      }
      
      return 100; // Default opacity
    } catch (error) {
      console.error('Error getting opacity value:', error);
      return 100; // Return default if there's an error
    }
  };

  // Update handleChangeCustomValues to handle content properties
  const handleChangeCustomValues = (e: any) => {
    try {
      const settingProperty = e.target.id
      const value = e.target.value
      
      console.log(`Setting custom property ${settingProperty} to:`, value)
      
      // Check if this is a custom content property or a style property
      const isCustomProperty = selectedElement.type === 'link' && 
        ['href', 'target', 'rel'].includes(settingProperty)
      
      if (isCustomProperty) {
        // Update content object
  dispatch({
    type: 'UPDATE_ELEMENT',
    payload: {
      elementDetails: {
        ...state.editor.selectedElement,
              content: {
                ...state.editor.selectedElement.content,
                [settingProperty]: value,
              },
            }
          }
        })
      } else {
        // Update styles object
      dispatch({
        type: 'UPDATE_ELEMENT',
        payload: {
          elementDetails: {
            ...state.editor.selectedElement,
            styles: {
              ...state.editor.selectedElement.styles,
                [settingProperty]: value,
              },
            }
          }
        })
      }

      console.log('Updated property successfully')
    } catch (error) {
      console.error('Error updating property:', error)
    }
  }

  // This is a simplified direct style update handler
  const handleStyleChange = (property: string, value: string | number) => {
    // If value is a number, add the appropriate unit
    if (typeof value === 'number' || /^[0-9.]+$/.test(value.toString())) {
      const unit = property.startsWith('margin') ? marginUnit : 
                  property.startsWith('padding') ? paddingUnit : 'px';
      value = `${value}${unit}`;
    }
    
    // Dispatch the update to the editor
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            [property]: value,
          },
        },
      },
    });
  };
  
  // Handle increment/decrement for numeric values
  const handleIncrement = (property: string, increment: boolean) => {
    // Get current value
     //@ts-expect-error - this is a valid property
    const currentValue = state.editor.selectedElement.styles?.[property]
     || '0px';
    const numValue = parseFloat(currentValue as string) || 0;
    const step = 1; // Consistent step size
    
    // Calculate new value
    const newValue = increment ? numValue + step : Math.max(0, numValue - step);
    
    // Update with the appropriate unit
    handleStyleChange(property, newValue);
  };

  // Improve the condition for showing empty state
  if (!selectedElement || 
      selectedElement.type === null || 
      selectedElement.id === "" || 
      typeof selectedElement.id === 'undefined') {
    // console.log("Empty state condition triggered!");
    return (
      <div className="p-4 flex flex-col items-center justify-center h-full text-center text-muted-foreground">
        <div className="mb-4">
          <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium">No Element Selected</h3>
        <p className="mt-1 text-sm">
        Select an element to edit its properties
        </p>
      </div>
    )
  }

  return (
    <div className="p-4 overflow-auto max-w-md mx-auto">
      <h3 className="text-lg font-medium mb-4">Settings</h3>
      
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={['CustomSettings', 'Typography', 'Dimensions', 'Decorations', 'Flexbox']}
      >
        {/* Custom Settings Section - Only show for supported elements */}
        {selectedElement?.type && selectedElement.type in customSettings && (
          <AccordionItem value="CustomSettings">
            <AccordionTrigger className="no-underline">
              {customSettings[selectedElement.type as keyof CustomSettingsMap].title}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              {customSettings[selectedElement.type as keyof CustomSettingsMap].settings.map((setting) => (
                <div key={setting.id} className="flex flex-col gap-2">
                  <p className="text-muted-foreground">{setting.label}</p>
                  {setting.type === 'text' && (
                <input
                      id={setting.id}
                      placeholder={setting.placeholder}
                  onChange={handleChangeCustomValues}
                      value={
                        (selectedElement.content as Record<string, string>)?.[setting.id] || ''
                      }
                  className="border p-2 rounded-md"
                />
                  )}
                  {setting.type === 'select' && setting.options && (
                    <select
                      id={setting.id}
                      onChange={handleChangeCustomValues}
                      value={
                        (selectedElement.content as Record<string, string>)?.[setting.id] || ''
                      }
                      className="border p-2 rounded-md"
                    >
                      {setting.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
              </div>
              ))}
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
                  onChange={handleChangeCustomValues}
                  value={state.editor.selectedElement.styles?.color as string || '#000000'}
                  className="w-10 h-10 p-1 cursor-pointer border rounded"
                />
                <input
                  id="color"
                  onChange={handleChangeCustomValues}
                  value={state.editor.selectedElement.styles?.color as string || ''}
                  className="border p-2 rounded-md flex-1"
                  placeholder="#000000 or rgb(0,0,0)"
                />
              </div>
            </div>
            
            {/* Size input */}
            {/* Size input with unit selection */}
<div className="flex flex-col gap-2">
  <p className="text-muted-foreground">Font Size</p>
  <div className="flex items-center gap-2">
    <div className="flex-1 flex items-center border rounded-md overflow-hidden">
      <input
        id="fontSize"
                    onChange={handleChangeCustomValues}
                    value={state.editor.selectedElement.styles?.fontSize as string || ''}
        className="flex-1 p-2 border-0 focus:ring-0"
        placeholder="16px"
      />
      <div className="flex items-center border-l h-full">
        <button
          type="button"
          className="px-2 py-2 hover:bg-gray-100"
          onClick={() => {
                        const currentValue = state.editor.selectedElement.styles?.fontSize as string || '16px';
                        const numValue = parseFloat(currentValue) || 16;
                        const unit = currentValue.replace(/[\d.-]/g, '') || 'px';
            const step = unit === 'px' ? 1 : 0.1;
                        handleChangeCustomValues({
              target: {
                id: 'fontSize',
                value: `${Math.max(0, numValue - step)}${unit}`,
              },
            });
          }}
        >
          <Minus size={14} />
        </button>
        <button
          type="button"
          className="px-2 py-2 hover:bg-gray-100"
          onClick={() => {
                        const currentValue = state.editor.selectedElement.styles?.fontSize as string || '16px';
                        const numValue = parseFloat(currentValue) || 16;
                        const unit = currentValue.replace(/[\d.-]/g, '') || 'px';
            const step = unit === 'px' ? 1 : 0.1;
                        handleChangeCustomValues({
              target: {
                id: 'fontSize',
                value: `${numValue + step}${unit}`,
              },
            });
          }}
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
    <select
      className="border p-2 rounded-md w-20"
                  value={(state.editor.selectedElement.styles?.fontSize as string || '16px').replace(/[\d.-]/g, '') || 'px'}
      onChange={(e) => {
                    const currentValue = state.editor.selectedElement.styles?.fontSize as string || '16px';
                    const numValue = parseFloat(currentValue) || 16;
                    handleChangeCustomValues({
          target: {
            id: 'fontSize',
            value: `${numValue}${e.target.value}`,
          },
        });
      }}
    >
      <option value="px">px</option>
      <option value="%">%</option>
      <option value="em">em</option>
      <option value="rem">rem</option>
    </select>
  </div>
</div>
            
            {/* Font Weight */}
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">Font Weight</p>
              <select
                id="fontWeight"
                onChange={handleChangeCustomValues}
                value={state.editor.selectedElement.styles?.fontWeight as string || ''}
                className="border p-2 rounded-md"
              >
                <option value="">Default</option>
                <option value="normal">Normal (400)</option>
                <option value="bold">Bold (700)</option>
                <option value="100">Thin (100)</option>
                <option value="200">Extra Light (200)</option>
                <option value="300">Light (300)</option>
                <option value="400">Regular (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semi Bold (600)</option>
                <option value="700">Bold (700)</option>
                <option value="800">Extra Bold (800)</option>
                <option value="900">Black (900)</option>
              </select>
            </div>

            {/* Letter Spacing */}
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">Letter Spacing</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center border rounded-md overflow-hidden">
                  <input
                    id="letterSpacing"
                    onChange={handleChangeCustomValues}
                    value={state.editor.selectedElement.styles?.letterSpacing as string || ''}
                    className="flex-1 p-2 border-0 focus:ring-0"
                    placeholder="0px"
                  />
                  <div className="flex items-center border-l h-full">
                    <button
                      type="button"
                      className="px-2 py-2 hover:bg-gray-100"
                      onClick={() => {
                        const currentValue = state.editor.selectedElement.styles?.letterSpacing as string || '0px';
                        const numValue = parseFloat(currentValue) || 0;
                        const unit = currentValue.replace(/[\d.-]/g, '') || 'px';
                        const step = unit === 'px' ? 1 : 0.1;
                        handleChangeCustomValues({
                          target: {
                            id: 'letterSpacing',
                            value: `${Math.max(0, numValue - step)}${unit}`,
                          },
                        });
                      }}
                    >
                      <Minus size={14} />
                    </button>
                    <button
                      type="button"
                      className="px-2 py-2 hover:bg-gray-100"
                      onClick={() => {
                        const currentValue = state.editor.selectedElement.styles?.letterSpacing as string || '0px';
                        const numValue = parseFloat(currentValue) || 0;
                        const unit = currentValue.replace(/[\d.-]/g, '') || 'px';
                        const step = unit === 'px' ? 1 : 0.1;
                        handleChangeCustomValues({
                          target: {
                            id: 'letterSpacing',
                            value: `${numValue + step}${unit}`,
                          },
                        });
                      }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <select
                  className="border p-2 rounded-md w-20"
                  value={(state.editor.selectedElement.styles?.letterSpacing as string || '0px').replace(/[\d.-]/g, '') || 'px'}
                  onChange={(e) => {
                    const currentValue = state.editor.selectedElement.styles?.letterSpacing as string || '0px';
                    const numValue = parseFloat(currentValue) || 0;
                    handleChangeCustomValues({
                      target: {
                        id: 'letterSpacing',
                        value: `${numValue}${e.target.value}`,
                      },
                    });
                  }}
                >
                  <option value="px">px</option>
                  <option value="em">em</option>
                  <option value="rem">rem</option>
                </select>
              </div>
            </div>
            
            {/* Text Alignment */}
            <div className="flex flex-col gap-2 mt-2">
              <p className="text-muted-foreground">Text Alignment</p>
              <Tabs
                onValueChange={(e) => {
                  handleChangeCustomValues({
                    target: {
                      id: 'textAlign',
                      value: e,
                    },
                  })
                }}
                value={state.editor.selectedElement.styles?.textAlign as string || 'left'}
                defaultValue="left"
              >
                <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                  <TabsTrigger
                    value="left"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                  >
                    <AlignLeft size={18} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="center"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                  >
                    <AlignCenter size={18} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="right"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                  >
                    <AlignRight size={18} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="justify"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                  >
                    <AlignJustify size={18} />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
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
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center border rounded-md overflow-hidden">
                  <input
                    id="width"
                    onChange={handleChangeCustomValues}
                    value={state.editor.selectedElement.styles?.width as string || ''}
                    className="flex-1 p-2 border-0 focus:ring-0"
                    placeholder="auto"
                  />
                  <div className="flex items-center border-l h-full">
                    <button
                      type="button"
                      className="px-2 py-2 hover:bg-gray-100"
                      onClick={() => {
                        const currentValue = state.editor.selectedElement.styles?.width as string || '0px';
                        const numValue = parseFloat(currentValue) || 0;
                        const unit = currentValue.replace(/[\d.-]/g, '') || 'px';
                        const step = unit === 'px' ? 1 : 0.1;
                        handleChangeCustomValues({
                          target: {
                            id: 'width',
                            value: `${Math.max(0, numValue - step)}${unit}`,
                          },
                        });
                      }}
                    >
                      <Minus size={14} />
                    </button>
                    <button
                      type="button"
                      className="px-2 py-2 hover:bg-gray-100"
                      onClick={() => {
                        const currentValue = state.editor.selectedElement.styles?.width as string || '0px';
                        const numValue = parseFloat(currentValue) || 0;
                        const unit = currentValue.replace(/[\d.-]/g, '') || 'px';
                        const step = unit === 'px' ? 1 : 0.1;
                        handleChangeCustomValues({
                          target: {
                            id: 'width',
                            value: `${numValue + step}${unit}`,
                          },
                        });
                      }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <select
                  className="border p-2 rounded-md w-20"
                  value={(state.editor.selectedElement.styles?.width as string || '0px').replace(/[\d.-]/g, '') || 'px'}
                  onChange={(e) => {
                    const currentValue = state.editor.selectedElement.styles?.width as string || '0px';
                    const numValue = parseFloat(currentValue) || 0;
                    handleChangeCustomValues({
                      target: {
                        id: 'width',
                        value: `${numValue}${e.target.value}`,
                      },
                    });
                  }}
                >
                  <option value="px">px</option>
                  <option value="%">%</option>
                  <option value="em">em</option>
                  <option value="rem">rem</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">Height</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center border rounded-md overflow-hidden">
                  <input
                    id="height"
                    onChange={handleChangeCustomValues}
                    value={state.editor.selectedElement.styles?.height as string || ''}
                    className="flex-1 p-2 border-0 focus:ring-0"
                    placeholder="auto"
                  />
                  <div className="flex items-center border-l h-full">
                    <button
                      type="button"
                      className="px-2 py-2 hover:bg-gray-100"
                      onClick={() => {
                        const currentValue = state.editor.selectedElement.styles?.height as string || '0px';
                        const numValue = parseFloat(currentValue) || 0;
                        const unit = currentValue.replace(/[\d.-]/g, '') || 'px';
                        const step = unit === 'px' ? 1 : 0.1;
                        handleChangeCustomValues({
                          target: {
                            id: 'height',
                            value: `${Math.max(0, numValue - step)}${unit}`,
                          },
                        });
                      }}
                    >
                      <Minus size={14} />
                    </button>
                    <button
                      type="button"
                      className="px-2 py-2 hover:bg-gray-100"
                      onClick={() => {
                        const currentValue = state.editor.selectedElement.styles?.height as string || '0px';
                        const numValue = parseFloat(currentValue) || 0;
                        const unit = currentValue.replace(/[\d.-]/g, '') || 'px';
                        const step = unit === 'px' ? 1 : 0.1;
                        handleChangeCustomValues({
                          target: {
                            id: 'height',
                            value: `${numValue + step}${unit}`,
                          },
                        });
                      }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <select
                  className="border p-2 rounded-md w-20"
                  value={(state.editor.selectedElement.styles?.height as string || '0px').replace(/[\d.-]/g, '') || 'px'}
                  onChange={(e) => {
                    const currentValue = state.editor.selectedElement.styles?.height as string || '0px';
                    const numValue = parseFloat(currentValue) || 0;
                    handleChangeCustomValues({
                      target: {
                        id: 'height',
                        value: `${numValue}${e.target.value}`,
                      },
                    });
                  }}
                >
                  <option value="px">px</option>
                  <option value="%">%</option>
                  <option value="em">em</option>
                  <option value="rem">rem</option>
                </select>
              </div>
            </div>
            {/* Simplified Margin Controls */}
<div className="flex flex-col gap-2 mt-4">
  <div className="flex justify-between items-center">
    <p className="text-muted-foreground">Margin</p>
    <select
      className="border p-2 rounded-md w-20 text-xs"
                  value={marginUnit}
                  onChange={(e) => setMarginUnit(e.target.value as StyleUnit['value'])}
                >
                  {availableUnits.map(unit => (
                    <option key={unit.value} value={unit.value}>{unit.value}</option>
                  ))}
    </select>
  </div>
  <div className="grid grid-cols-2 gap-2">
    {/* Top Margin */}
    <div className="flex items-center gap-1">
      <p className="text-xs text-muted-foreground w-8">Top</p>
      <div className="flex-1 flex items-center border rounded-md overflow-hidden">
        <input
          id="marginTop"
          onChange={(e) => handleStyleChange('marginTop', e.target.value)}
                      value={String(state.editor.selectedElement.styles?.marginTop || '')
                        .replace(/[a-z%]/g, '')}
          className="flex-1 p-2 border-0 focus:ring-0 text-sm"
          placeholder="0"
        />
        <div className="flex items-center border-l h-full">
          <button
            type="button"
            className="px-2 py-2 hover:bg-gray-100 border-r"
            onClick={() => handleIncrement('marginTop', false)}
          >
            <Minus size={14} className="text-gray-700" />
          </button>
          <button
            type="button"
            className="px-2 py-2 hover:bg-gray-100"
            onClick={() => handleIncrement('marginTop', true)}
          >
            <Plus size={14} className="text-gray-700" />
          </button>
        </div>
      </div>
    </div>
                
    {/* Right Margin */}
    <div className="flex items-center gap-1">
      <p className="text-xs text-muted-foreground w-8">Right</p>
      <div className="flex-1 flex items-center border rounded-md overflow-hidden">
        <input
          id="marginRight"
          onChange={(e) => handleStyleChange('marginRight', e.target.value)}
                      value={String(state.editor.selectedElement.styles?.marginRight || '')
                        .replace(/[a-z%]/g, '')}
          className="flex-1 p-2 border-0 focus:ring-0 text-sm"
          placeholder="0"
        />
        <div className="flex items-center border-l h-full">
          <button
            type="button"
            className="px-2 py-2 hover:bg-gray-100 border-r"
            onClick={() => handleIncrement('marginRight', false)}
          >
            <Minus size={14} className="text-gray-700" />
          </button>
          <button
            type="button"
            className="px-2 py-2 hover:bg-gray-100"
            onClick={() => handleIncrement('marginRight', true)}
          >
            <Plus size={14} className="text-gray-700" />
          </button>
        </div>
      </div>
    </div>
                
    {/* Bottom Margin */}
    <div className="flex items-center gap-1">
      <p className="text-xs text-muted-foreground w-8">Bottom</p>
      <div className="flex-1 flex items-center border rounded-md overflow-hidden">
        <input
          id="marginBottom"
          onChange={(e) => handleStyleChange('marginBottom', e.target.value)}
                      value={String(state.editor.selectedElement.styles?.marginBottom || '')
                        .replace(/[a-z%]/g, '')}
          className="flex-1 p-2 border-0 focus:ring-0 text-sm"
          placeholder="0"
        />
        <div className="flex items-center border-l h-full">
          <button
            type="button"
            className="px-2 py-2 hover:bg-gray-100 border-r"
            onClick={() => handleIncrement('marginBottom', false)}
          >
            <Minus size={14} className="text-gray-700" />
          </button>
          <button
            type="button"
            className="px-2 py-2 hover:bg-gray-100"
            onClick={() => handleIncrement('marginBottom', true)}
          >
            <Plus size={14} className="text-gray-700" />
          </button>
        </div>
      </div>
    </div>
                
    {/* Left Margin */}
    <div className="flex items-center gap-1">
      <p className="text-xs text-muted-foreground w-8">Left</p>
      <div className="flex-1 flex items-center border rounded-md overflow-hidden">
        <input
          id="marginLeft"
          onChange={(e) => handleStyleChange('marginLeft', e.target.value)}
                      value={String(state.editor.selectedElement.styles?.marginLeft || '')
                        .replace(/[a-z%]/g, '')}
          className="flex-1 p-2 border-0 focus:ring-0 text-sm"
          placeholder="0"
        />
        <div className="flex items-center border-l h-full">
          <button
            type="button"
            className="px-2 py-2 hover:bg-gray-100 border-r"
            onClick={() => handleIncrement('marginLeft', false)}
          >
            <Minus size={14} className="text-gray-700" />
          </button>
          <button
            type="button"
            className="px-2 py-2 hover:bg-gray-100"
            onClick={() => handleIncrement('marginLeft', true)}
          >
            <Plus size={14} className="text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

            {/* Simplified Padding Controls */}
<div className="flex flex-col gap-2 mt-4">
  <div className="flex justify-between items-center">
    <p className="text-muted-foreground">Padding</p>
    <select
      className="border p-2 rounded-md w-20 text-xs"
                  value={paddingUnit}
                  onChange={(e) => setPaddingUnit(e.target.value as StyleUnit['value'])}
                >
                  {availableUnits.map(unit => (
                    <option key={unit.value} value={unit.value}>{unit.value}</option>
                  ))}
    </select>
  </div>
  <div className="grid grid-cols-2 gap-2">
    {/* Top Padding */}
    <div className="flex items-center gap-1">
      <p className="text-xs text-muted-foreground w-8">Top</p>
      <div className="flex-1 flex items-center border rounded-md overflow-hidden">
        <input
          id="paddingTop"
          onChange={(e) => handleStyleChange('paddingTop', e.target.value)}
                      value={String(state.editor.selectedElement.styles?.paddingTop || '')
                        .replace(/[a-z%]/g, '')}
          className="flex-1 p-2 border-0 focus:ring-0 text-sm"
          placeholder="0"
        />
        <div className="flex items-center border-l h-full">
          <button
            type="button"
            className="px-2 py-2 hover:bg-gray-100 border-r"
            onClick={() => handleIncrement('paddingTop', false)}
          >
            <Minus size={14} className="text-gray-700" />
          </button>
          <button
            type="button"
            className="px-2 py-2 hover:bg-gray-100"
            onClick={() => handleIncrement('paddingTop', true)}
          >
            <Plus size={14} className="text-gray-700" />
          </button>
        </div>
      </div>
    </div>
                
    {/* Right Padding */}
    <div className="flex items-center gap-1">
      <p className="text-xs text-muted-foreground w-8">Right</p>
      <div className="flex-1 flex items-center border rounded-md overflow-hidden">
        <input
          id="paddingRight"
          onChange={(e) => handleStyleChange('paddingRight', e.target.value)}
                      value={String(state.editor.selectedElement.styles?.paddingRight || '')
                        .replace(/[a-z%]/g, '')}
          className="flex-1 p-2 border-0 focus:ring-0 text-sm"
          placeholder="0"
        />
        <div className="flex items-center border-l h-full">
          <button
            type="button"
            className="px-2 py-2 hover:bg-gray-100 border-r"
            onClick={() => handleIncrement('paddingRight', false)}
          >
            <Minus size={14} className="text-gray-700" />
          </button>
          <button
            type="button"
            className="px-2 py-2 hover:bg-gray-100"
            onClick={() => handleIncrement('paddingRight', true)}
          >
            <Plus size={14} className="text-gray-700" />
          </button>
        </div>
      </div>
    </div>
                
    {/* Bottom Padding */}
    <div className="flex items-center gap-1">
      <p className="text-xs text-muted-foreground w-8">Bottom</p>
      <div className="flex-1 flex items-center border rounded-md overflow-hidden">
        <input
          id="paddingBottom"
          onChange={(e) => handleStyleChange('paddingBottom', e.target.value)}
                      value={String(state.editor.selectedElement.styles?.paddingBottom || '')
                        .replace(/[a-z%]/g, '')}
          className="flex-1 p-2 border-0 focus:ring-0 text-sm"
          placeholder="0"
        />
        <div className="flex items-center border-l h-full">
          <button
            type="button"
            className="px-2 py-2 hover:bg-gray-100 border-r"
            onClick={() => handleIncrement('paddingBottom', false)}
          >
            <Minus size={14} className="text-gray-700" />
          </button>
          <button
            type="button"
            className="px-2 py-2 hover:bg-gray-100"
            onClick={() => handleIncrement('paddingBottom', true)}
          >
            <Plus size={14} className="text-gray-700" />
          </button>
        </div>
      </div>
    </div>
                
    {/* Left Padding */}
    <div className="flex items-center gap-1">
      <p className="text-xs text-muted-foreground w-8">Left</p>
      <div className="flex-1 flex items-center border rounded-md overflow-hidden">
        <input
          id="paddingLeft"
          onChange={(e) => handleStyleChange('paddingLeft', e.target.value)}
                      value={String(state.editor.selectedElement.styles?.paddingLeft || '')
                        .replace(/[a-z%]/g, '')}
          className="flex-1 p-2 border-0 focus:ring-0 text-sm"
          placeholder="0"
        />
        <div className="flex items-center border-l h-full">
          <button
            type="button"
            className="px-2 py-2 hover:bg-gray-100 border-r"
            onClick={() => handleIncrement('paddingLeft', false)}
          >
            <Minus size={14} className="text-gray-700" />
          </button>
          <button
            type="button"
            className="px-2 py-2 hover:bg-gray-100"
            onClick={() => handleIncrement('paddingLeft', true)}
          >
            <Plus size={14} className="text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  </div>
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
                  onChange={handleChangeCustomValues}
                  value={state.editor.selectedElement.styles?.backgroundColor as string || '#ffffff'}
                  className="w-10 h-10 p-1 cursor-pointer border rounded"
                />
                <input
                  id="backgroundColor"
                  onChange={handleChangeCustomValues}
                  value={state.editor.selectedElement.styles?.backgroundColor as string || ''}
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
                  handleChangeCustomValues({
                    target: {
                      id: 'opacity',
                      value: `${e[0]}%`,
                    }
                  })
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
                  onChange={handleChangeCustomValues}
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
          <AccordionContent className="flex flex-col gap-4">
            {/* Display property */}
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">Display</p>
              <select
                id="display"
                onChange={handleChangeCustomValues}
                value={state.editor.selectedElement.styles?.display || ''}
                className="border p-2 rounded-md"
              >
                <option value="flex">Flex</option>
                <option value="block">Block</option>
                <option value="inline-block">Inline Block</option>
                <option value="grid">Grid</option>
              </select>
            </div>
            
            {/* Flex Direction Tabs */}
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">Flex Direction</p>
              <Tabs
                onValueChange={(e) => {
                  handleChangeCustomValues({
                    target: {
                      id: 'flexDirection',
                      value: e,
                    },
                  })
                }}
                value={state.editor.selectedElement.styles?.flexDirection as string || 'row'}
                defaultValue="row"
              >
                <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                  <TabsTrigger
                    value="row"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                    title="Row (left to right)"
                  >
                    <ArrowRight size={18} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="column"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                    title="Column (top to bottom)"
                  >
                    <ArrowDown size={18} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="row-reverse"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                    title="Row Reverse (right to left)"
                  >
                    <ArrowLeft size={18} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="column-reverse"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                    title="Column Reverse (bottom to top)"
                  >
                    <ArrowUp size={18} />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Justify Content Tabs */}
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">Justify Content</p>
              <Tabs
                onValueChange={(e) => {
                  handleChangeCustomValues({
                    target: {
                      id: 'justifyContent',
                      value: e,
                    },
                  })
                }}
                value={state.editor.selectedElement.styles?.justifyContent as string || 'flex-start'}
              >
                <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                  <TabsTrigger
                    value="flex-start"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                    title="Start"
                  >
                    <AlignHorizontalJustifyStart size={18} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="center"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                    title="Center"
                  >
                    <AlignHorizontalJustifyCenter size={18} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="flex-end"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                    title="End"
                  >
                    <AlignHorizontalJustifyEnd size={18} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="space-between"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                    title="Space Between"
                  >
                    <AlignHorizontalSpaceBetween size={18} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="space-around"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                    title="Space Around"
                  >
                    <AlignHorizontalSpaceAround size={18} />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Align Items Tabs */}
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">Align Items</p>
              <Tabs
                onValueChange={(e) => {
                  handleChangeCustomValues({
                    target: {
                      id: 'alignItems',
                      value: e,
                    },
                  })
                }}
                value={state.editor.selectedElement.styles?.alignItems as string || 'stretch'}
              >
                <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                  <TabsTrigger
                    value="flex-start"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                    title="Start"
                  >
                    <AlignStartVertical size={18} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="center"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                    title="Center"
                  >
                    <AlignCenterVertical size={18} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="flex-end"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                    title="End"
                  >
                    <AlignEndVertical size={18} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="stretch"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                    title="Stretch"
                  >
                    <StretchHorizontal size={18} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="baseline"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                    title="Baseline"
                  >
                    <StretchHorizontal size={18} /> {/* Using this as a baseline substitute */}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Gap Control */}
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">Gap</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center border rounded-md overflow-hidden">
                  <input
                    id="gap"
                    onChange={handleChangeCustomValues}
                    value={state.editor.selectedElement.styles?.gap as string || ''}
                    className="flex-1 p-2 border-0 focus:ring-0"
                    placeholder="0px"
                  />
                  <div className="flex items-center border-l h-full">
                    <button
                      type="button"
                      className="px-2 py-2 hover:bg-gray-100"
                      onClick={() => {
                        const currentValue = state.editor.selectedElement.styles?.gap as string || '0px';
                        const numValue = parseFloat(currentValue) || 0;
                        const unit = currentValue.replace(/[\d.-]/g, '') || 'px';
                        const step = unit === 'px' ? 1 : 0.1;
                        handleChangeCustomValues({
                          target: {
                            id: 'gap',
                            value: `${Math.max(0, numValue - step)}${unit}`,
                          },
                        });
                      }}
                    >
                      <Minus size={14} />
                    </button>
                    <button
                      type="button"
                      className="px-2 py-2 hover:bg-gray-100"
                      onClick={() => {
                        const currentValue = state.editor.selectedElement.styles?.gap as string || '0px';
                        const numValue = parseFloat(currentValue) || 0;
                        const unit = currentValue.replace(/[\d.-]/g, '') || 'px';
                        const step = unit === 'px' ? 1 : 0.1;
                        handleChangeCustomValues({
                          target: {
                            id: 'gap',
                            value: `${numValue + step}${unit}`,
                          },
                        });
                      }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <select
                  className="border p-2 rounded-md w-20"
                  value={(state.editor.selectedElement.styles?.gap as string || '0px').replace(/[\d.-]/g, '') || 'px'}
                  onChange={(e) => {
                    const currentValue = state.editor.selectedElement.styles?.gap as string || '0px';
                    const numValue = parseFloat(currentValue) || 0;
                    handleChangeCustomValues({
                      target: {
                        id: 'gap',
                        value: `${numValue}${e.target.value}`,
                      },
                    });
                  }}
                >
                  <option value="px">px</option>
                  <option value="rem">rem</option>
                  <option value="em">em</option>
                  <option value="%">%</option>
                </select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default SettingsTab;


