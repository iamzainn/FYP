/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import {  useEditor } from "@/providers/editor/editor-provider"
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
import { useState } from "react"
import { componentRegistry } from '@/lib/ComponentSystem/Core/registry'
import { ComponentConfig } from "@/lib/ComponentSystem/Core/types"


const SettingsTab = () => {
  const { state, dispatch } = useEditor()
  const [activeSection, setActiveSection] = useState<string[]>(['typography', 'decorations', 'dimensions', 'custom', 'content'])
  const selectedElement = state.editor.selectedElement
  const currentDevice = state.editor.device
  
  const componentDef = selectedElement?.type
    ? componentRegistry.getComponent(selectedElement.type as string)
    : undefined
  const componentConfig: ComponentConfig | undefined = componentDef?.config

  console.log("selectedElement:", selectedElement)
  console.log("Current device:", currentDevice)

  if (!selectedElement.id) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-muted-foreground text-sm">
          No element selected. Click on an element to edit its properties.
        </p>
      </div>
    )
  }

  // Get the appropriate style handler based on the current device
  const handleStyleChange = (property: string, value: string | number | boolean) => {
    if (currentDevice === 'Desktop') {
      // Update the base styles
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
    } else {
      // Update device-specific styles (Mobile or Tablet)
      const deviceKey = currentDevice === 'Mobile' ? 'mobile' : 'tablet'
      
      dispatch({
        type: 'UPDATE_ELEMENT',
        payload: {
          elementDetails: {
            ...selectedElement,
            responsiveSettings: {
              ...(selectedElement?.responsiveSettings || {}),
              [deviceKey]: {
                ...(selectedElement?.responsiveSettings?.[deviceKey] || {}),
                [property]: value,
              }
            },
          },
        },
      })
    }
  }

  // Update the handleChangeCustomValues function for atomic update
  const handleChangeCustomValues = (property: string, value: string | number | boolean | any[]) => {
    if (!componentConfig || !selectedElement) {
        console.warn("Cannot handle custom value change: Missing component config or selected element.");
        return;
    }

    console.log(`%c[Settings Update - ATOMIC] Starting: ${property} = ${JSON.stringify(value)}`, 'color: blue; font-weight: bold;');

    const settingDefinition = componentConfig.customSettingFields?.find(
      (field) => field.id === property
    );

    if (!settingDefinition) {
        console.warn(`[Settings Update - ATOMIC] Setting definition not found for: ${property}`);
        return;
    }

    // --- 1. Create a deep clone of the selected element ---
    const elementClone = (selectedElement);
    console.log(`%c[Settings Update - ATOMIC] Created deep clone of element ${elementClone.id}`, 'color: teal;');

    // --- 2. Calculate and apply PARENT style overrides to the clone ---
    if (settingDefinition.affectsStyles) {
        console.log(`%c[Settings Update - ATOMIC] Calculating PARENT style overrides for ${property}...`, 'color: green;');
        let parentStyleOverrides: React.CSSProperties = {};
        for (const styleEffect of settingDefinition.affectsStyles) {
            const { property: styleProp, valueMap, transform } = styleEffect;
            let styleValueToApply = value;
            if (valueMap && (typeof value === 'string' || typeof value === 'number') && value in valueMap) {
                styleValueToApply = valueMap[value];
            } else if (transform && typeof transform === 'function') {
                styleValueToApply = transform(value);
            }
            if (styleProp) {
                parentStyleOverrides = { ...parentStyleOverrides, [styleProp]: styleValueToApply as any };
            }
        }
        console.log(`%c[Settings Update - ATOMIC] Applying parent style overrides to clone:`, 'color: green;', parentStyleOverrides);
        elementClone.styles = { ...(elementClone.styles || {}), ...parentStyleOverrides };
    }

    // --- 3. Apply the changed custom setting value to the clone ---
    elementClone.customSettings = {
        ...(elementClone.customSettings || {}),
        [property]: value,
    };
    console.log(`%c[Settings Update - ATOMIC] Applied custom setting '${property}' to clone.`, 'color: teal;');

    // --- 4. Calculate and apply CHILD modifications to the clone ---
    if (settingDefinition.affectsChildren && Array.isArray(elementClone.content)) {
        console.log(`%c[Settings Update - ATOMIC] Calculating CHILD updates for ${property}...`, 'color: orange;');
        
        // Modify the children array *within the clone*
        elementClone.content = elementClone.content.map(child => {
            let childModified = false;
            // IMPORTANT: Clone the child *before* potentially modifying it within this loop iteration
            // This prevents modifications bleeding over if multiple rules affect the same child type
            const currentChildState = (child);

            settingDefinition.affectsChildren?.forEach(childEffect => {
                 if (child.type === childEffect.targetType) {
                    const updateRules = childEffect.valueMap?.[value as string | number];
                    if (updateRules) {
                        console.log(`  - Child Rules Found: For value '${value}', target '${childEffect.targetType}', affecting child ${child.id}`);
                        
                        // Get current styles/settings *from the cloned child for this iteration*
                        const currentChildStyles = currentChildState.styles || {};
                        const currentChildSettings = currentChildState.customSettings || {};
                        
                        // Calculate potential new styles/settings based on the rule
                        const newChildStyles = updateRules.styles
                            ? { ...currentChildStyles, ...updateRules.styles } // Apply overrides
                            : currentChildStyles;
                        const newChildSettings = updateRules.customSettings
                            ? { ...currentChildSettings, ...updateRules.customSettings } // Apply overrides
                            : currentChildSettings;

                        // Check if changes occurred compared to the child's state *before this rule*
                        const stylesChanged = JSON.stringify(newChildStyles) !== JSON.stringify(currentChildStyles);
                        const settingsChanged = JSON.stringify(newChildSettings) !== JSON.stringify(currentChildSettings);

                        if (stylesChanged || settingsChanged) {
                            console.log(`    * Change Detected for Child ${child.id}! Applying to child state for this update.`);
                            if(stylesChanged) { 
                                console.log(`      New Styles:`, newChildStyles);
                                currentChildState.styles = newChildStyles; 
                                childModified = true;
                            }
                            if(settingsChanged) { 
                                console.log(`      New Settings:`, newChildSettings);
                                currentChildState.customSettings = newChildSettings; 
                                childModified = true;
                            }
                        }
                    }
                }
            });

            if (!childModified) {
                 console.log(`  - Child ${child.id} (${child.type}) was not modified by rules for '${property}=${value}'.`);
            }
            // Return the potentially modified state of the child for the new array
            return currentChildState;
        });

        console.log(`%c[Settings Update - ATOMIC] Finished calculating child modifications for parent clone's content.`, 'color: orange;');
    } else if (settingDefinition.affectsChildren) {
        console.log(`%c[Settings Update - ATOMIC] Skipping child updates for ${property}: Element content is not an array.`, 'color: grey;');
    }

    // --- 5. Dispatch a SINGLE update with the modified parent clone ---
    console.log(`%c[Settings Update - ATOMIC] Dispatching SINGLE update for element ${elementClone.id}...`, 'color: purple; font-weight: bold;');
    console.log(`%c[Settings Update - ATOMIC] Final Payload:`, 'color: purple;', elementClone);
    dispatch({
        type: 'UPDATE_ELEMENT',
        payload: { elementDetails: elementClone }, // Dispatch the fully modified clone
    });
    
    console.log(`%c[Settings Update - ATOMIC] Finished: ${property}`, 'color: blue; font-weight: bold;');
  };

  

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: {
        elementDetails: { ...selectedElement },
      },
    })
  }

  // --- Content Change Handler (NEW) ---
  const handleContentChange = (property: string, value: any) => {
      if (!selectedElement) return;

      // Ensure content is an object before updating
      if (typeof selectedElement.content === 'object' && !Array.isArray(selectedElement.content)) {
            dispatch({
                type: 'UPDATE_ELEMENT',
                payload: {
                    elementDetails: {
                        ...selectedElement,
                        content: {
                            ...selectedElement.content,
                            [property]: value,
                        }
                    }
                }
            });
      } else {
           console.warn(`Cannot update content property '${property}' for element ${selectedElement.id} - content is not an object.`);
      }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-2 border-b flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">
            {selectedElement.name || selectedElement.type}
            {currentDevice !== 'Desktop' && 
              <span className="ml-2 text-xs text-blue-500 font-normal">
                {currentDevice} View
              </span>
            }
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
              currentDevice={currentDevice}
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
              currentDevice={currentDevice}
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
              currentDevice={currentDevice}
            />
          </AccordionContent>
        </AccordionItem>

        {(selectedElement.type === 'container' || componentConfig?.styles?.display === 'flex') && (
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

        

        {/* Combined Content & Custom Settings Section */}
        {/* Render if either content fields OR custom setting fields exist */}
        {(componentConfig?.contentFields?.length || 0) > 0 || (componentConfig?.customSettingFields?.length || 0) > 0 ? (
          <AccordionItem value="custom" className="border-b">
            <AccordionTrigger className="py-2 text-sm hover:no-underline">
               Content & Settings {/* Combined Trigger Name */}
            </AccordionTrigger>
            <AccordionContent className="pb-2">
              {/* Pass the new onContentChange prop */}
              <CustomSettings
                element={selectedElement}
                customSettings={selectedElement.customSettings}
                onContentChange={handleContentChange} // Pass the handler
                onCustomSettingChange={handleChangeCustomValues}
              />
            </AccordionContent>
          </AccordionItem>
        ) : null}
      </Accordion>
      </div>
    </div>
  )
}

export default SettingsTab;


