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


  // Helper functions for unit management
const getUnitFromValue = (value: any): string => {
  if (!value || typeof value !== 'string') return 'px';
  return value.replace(/[\d.-]/g, '') || 'px';
};

// Function to get common unit across a property group
const getGroupUnit = (properties: string[]): string => {
  const units = properties
    .map(prop => getUnitFromValue(state.editor.selectedElement.styles?.[prop]))
    .filter(Boolean);
  
  if (units.length === 0) return 'px';
  if (units.every(unit => unit === units[0])) return units[0];
  return units[0];
};

// Get margin unit from all margin properties
const getMarginUnit = (): string => {
  return getGroupUnit(['marginTop', 'marginRight', 'marginBottom', 'marginLeft']);
};

// Get padding unit from all padding properties
const getPaddingUnit = (): string => {
  return getGroupUnit(['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft']);
};

// Change unit for all margin properties
const handleMarginUnitChange = (newUnit: string) => {
  const marginProps = ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'];
  const updatedStyles: Record<string, string> = {};
  
  marginProps.forEach(prop => {
    
    const currentValue = state.editor.selectedElement.styles?.[prop] ;
    if (currentValue) {
      const numValue = parseFloat(currentValue as string) || 0;
      updatedStyles[prop] = `${numValue}${newUnit}`;
    }
  });
  
  // Use handleOnChanges for bulk update
  handleBulkStyleUpdate(updatedStyles);
};

// Change unit for all padding properties
const handlePaddingUnitChange = (newUnit: string) => {
  const paddingProps = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'];
  const updatedStyles: Record<string, string> = {};
  
  paddingProps.forEach(prop => {
    const currentValue = state.editor.selectedElement.styles?.[prop];
    if (currentValue) {
      const numValue = parseFloat(currentValue as string) || 0;
      updatedStyles[prop] = `${numValue}${newUnit}`;
    }
  });
  
  // Use handleOnChanges for bulk update
  handleBulkStyleUpdate(updatedStyles);
};

// Helper function to apply units automatically and then call the main handleOnChanges
const handleStyleChange = (id: string, value: string | number) => {
  // Convert value to string if it's a number
  let stringValue = value.toString();
  
  // If the value is just a number without a unit, apply the appropriate unit
  if (/^[0-9.]+$/.test(stringValue)) {
    if (id.startsWith('margin')) {
      stringValue = `${stringValue}${getMarginUnit()}`;
    } else if (id.startsWith('padding')) {
      stringValue = `${stringValue}${getPaddingUnit()}`;
    } else if (id === 'fontSize') {
      stringValue = `${stringValue}px`;
    } else if (id === 'letterSpacing') {
      stringValue = `${stringValue}px`;
    } else if (id === 'width' || id === 'height') {
      stringValue = `${stringValue}px`;
    }
  }
  
  // Call the main handleOnChanges function with the updated value
  handleOnChanges({
    target: {
      id,
      value: stringValue
    }
  });
};

// Helper for incrementing/decrementing values with TypeScript fixes
const handleIncrement = (id: string, increment: boolean) => {
  // Use proper type assertion to fix TypeScript error
  const styles = state.editor.selectedElement.styles as Record<string, string | undefined>;
  
  let currentValue: string;
  let currentUnit: string;
  
  // Get the current value and unit based on the property type
  if (id.startsWith('margin')) {
    currentValue = styles[id] || '0px';
    currentUnit = getMarginUnit();
  } else if (id.startsWith('padding')) {
    currentValue = styles[id] || '0px';
    currentUnit = getPaddingUnit();
  } else if (id === 'fontSize') {
    currentValue = styles[id] || '16px';
    currentUnit = getUnitFromValue(currentValue);
  } else if (id === 'letterSpacing') {
    currentValue = styles[id] || '0px';
    currentUnit = getUnitFromValue(currentValue);
  } else if (id === 'width' || id === 'height') {
    currentValue = styles[id] || '0px';
    currentUnit = getUnitFromValue(currentValue);
  } else {
    currentValue = styles[id] || '0px';
    currentUnit = getUnitFromValue(currentValue);
  }
  
  const numValue = parseFloat(currentValue) || 0;
  const step = currentUnit === 'px' ? 1 : 0.1;
  const newValue = increment ? numValue + step : Math.max(0, numValue - step);
  
  // Use our helper function
  handleStyleChange(id, `${newValue}${currentUnit}`);
};

// Helper for bulk style updates
const handleBulkStyleUpdate = (updatedStyles: Record<string, string>) => {
  const newStyles = {
    ...state.editor.selectedElement.styles,
    ...updatedStyles
  };
  
  dispatch({
    type: 'UPDATE_ELEMENT',
    payload: {
      elementDetails: {
        ...state.editor.selectedElement,
        styles: newStyles,
      },
    },
  });
};


  

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
    <div className="p-4 overflow-auto max-w-md mx-auto">
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
            {/* Size input with unit selection */}
<div className="flex flex-col gap-2">
  <p className="text-muted-foreground">Font Size</p>
  <div className="flex items-center gap-2">
    <div className="flex-1 flex items-center border rounded-md overflow-hidden">
      <input
        id="fontSize"
        onChange={handleOnChanges}
        value={state.editor.selectedElement.styles?.fontSize || ''}
        className="flex-1 p-2 border-0 focus:ring-0"
        placeholder="16px"
      />
      <div className="flex items-center border-l h-full">
        <button
          type="button"
          className="px-2 py-2 hover:bg-gray-100"
          onClick={() => {
            const currentValue = state.editor.selectedElement.styles?.fontSize || '16px';
            const numValue = parseFloat(currentValue as string) || 16;
            const unit = (currentValue as string).replace(/[\d.-]/g, '') || 'px';
            const step = unit === 'px' ? 1 : 0.1;
            handleOnChanges({
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
            const currentValue = state.editor.selectedElement.styles?.fontSize || '16px';
            const numValue = parseFloat(currentValue as string) || 16;
            const unit = (currentValue as string).replace(/[\d.-]/g, '') || 'px';
            const step = unit === 'px' ? 1 : 0.1;
            handleOnChanges({
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
      value={((state.editor.selectedElement.styles?.fontSize || '16px') as string).replace(/[\d.-]/g, '') || 'px'}
      onChange={(e) => {
        const currentValue = state.editor.selectedElement.styles?.fontSize || '16px';
        const numValue = parseFloat(currentValue as string) || 16;
        handleOnChanges({
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
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles?.fontWeight || ''}
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
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles?.letterSpacing || ''}
                    className="flex-1 p-2 border-0 focus:ring-0"
                    placeholder="0px"
                  />
                  <div className="flex items-center border-l h-full">
                    <button
                      type="button"
                      className="px-2 py-2 hover:bg-gray-100"
                      onClick={() => {
                        const currentValue = state.editor.selectedElement.styles?.letterSpacing || '0px';
                        const numValue = parseFloat(currentValue as string) || 0;
                        const unit = (currentValue as string).replace(/[\d.-]/g, '') || 'px';
                        const step = unit === 'px' ? 1 : 0.1;
                        handleOnChanges({
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
                        const currentValue = state.editor.selectedElement.styles?.letterSpacing || '0px';
                        const numValue = parseFloat(currentValue as string) || 0;
                        const unit = (currentValue as string).replace(/[\d.-]/g, '') || 'px';
                        const step = unit === 'px' ? 1 : 0.1;
                        handleOnChanges({
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
                  value={((state.editor.selectedElement.styles?.letterSpacing || '0px' )as string).replace(/[\d.-]/g, '') || 'px'}
                  onChange={(e) => {
                    const currentValue = state.editor.selectedElement.styles?.letterSpacing || '0px';
                    const numValue = parseFloat(currentValue as string) || 0;
                    handleOnChanges({
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
                  handleOnChanges({
                    target: {
                      id: 'textAlign',
                      value: e,
                    },
                  })
                }}
                value={state.editor.selectedElement.styles?.textAlign || 'left'}
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
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles?.width || ''}
                    className="flex-1 p-2 border-0 focus:ring-0"
                    placeholder="auto"
                  />
                  <div className="flex items-center border-l h-full">
                    <button
                      type="button"
                      className="px-2 py-2 hover:bg-gray-100"
                      onClick={() => {
                        const currentValue = state.editor.selectedElement.styles?.width || '0px';
                        const numValue = parseFloat(currentValue as string) || 0;
                        const unit = (currentValue as string).replace(/[\d.-]/g, '') || 'px';
                        const step = unit === 'px' ? 1 : 0.1;
                        handleOnChanges({
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
                        const currentValue = state.editor.selectedElement.styles?.width || '0px';
                        const numValue = parseFloat(currentValue as string) || 0;
                        const unit = (currentValue as string).replace(/[\d.-]/g, '') || 'px';
                        const step = unit === 'px' ? 1 : 0.1;
                        handleOnChanges({
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
                  value={((state.editor.selectedElement.styles?.width || '0px') as string).replace(/[\d.-]/g, '') || 'px'}
                  onChange={(e) => {
                    const currentValue = state.editor.selectedElement.styles?.width || '0px';
                    const numValue = parseFloat(currentValue as string) || 0;
                    handleOnChanges({
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
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles?.height || ''}
                    className="flex-1 p-2 border-0 focus:ring-0"
                    placeholder="auto"
                  />
                  <div className="flex items-center border-l h-full">
                    <button
                      type="button"
                      className="px-2 py-2 hover:bg-gray-100"
                      onClick={() => {
                        const currentValue = state.editor.selectedElement.styles?.height || '0px';
                        const numValue = parseFloat(currentValue as string) || 0;
                        const unit = (currentValue as string).replace(/[\d.-]/g, '') || 'px';
                        const step = unit === 'px' ? 1 : 0.1;
                        handleOnChanges({
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
                        const currentValue = state.editor.selectedElement.styles?.height || '0px';
                        const numValue = parseFloat(currentValue as string) || 0;
                        const unit = (currentValue as string).replace(/[\d.-]/g, '') || 'px';
                        const step = unit === 'px' ? 1 : 0.1;
                        handleOnChanges({
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
                  value={((state.editor.selectedElement.styles?.height || '0px') as string).replace(/[\d.-]/g, '') || 'px'}
                  onChange={(e) => {
                    const currentValue = state.editor.selectedElement.styles?.height || '0px';
                    const numValue = parseFloat(currentValue as string) || 0;
                    handleOnChanges({
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
            {/* Margin Controls */}
{/* Margin Controls */}
  {/* Margin Controls */}
{/* Margin Controls */}
<div className="flex flex-col gap-2 mt-4">
  <div className="flex justify-between items-center">
    <p className="text-muted-foreground">Margin</p>
    <select
      className="border p-2 rounded-md w-20 text-xs"
      value={getMarginUnit()}
      onChange={(e) => handleMarginUnitChange(e.target.value)}
    >
      <option value="px">px</option>
      <option value="%">%</option>
      <option value="em">em</option>
      <option value="rem">rem</option>
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
          value={state.editor.selectedElement.styles?.marginTop || ''}
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
          value={state.editor.selectedElement.styles?.marginRight || ''}
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
          value={state.editor.selectedElement.styles?.marginBottom || ''}
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
          value={state.editor.selectedElement.styles?.marginLeft || ''}
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

{/* Padding Controls */}
<div className="flex flex-col gap-2 mt-4">
  <div className="flex justify-between items-center">
    <p className="text-muted-foreground">Padding</p>
    <select
      className="border p-2 rounded-md w-20 text-xs"
      value={getPaddingUnit()}
      onChange={(e) => handlePaddingUnitChange(e.target.value)}
    >
      <option value="px">px</option>
      <option value="%">%</option>
      <option value="em">em</option>
      <option value="rem">rem</option>
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
          value={state.editor.selectedElement.styles?.paddingTop || ''}
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
          value={state.editor.selectedElement.styles?.paddingRight || ''}
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
          value={state.editor.selectedElement.styles?.paddingBottom || ''}
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
          value={state.editor.selectedElement.styles?.paddingLeft || ''}
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

{/* Padding Controls */}
  
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