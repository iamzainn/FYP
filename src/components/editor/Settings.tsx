/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import { EditorElement, useEditor } from "@/providers/editor/editor-provider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { v4 as uuidv4 } from 'uuid';
import { cn } from "@/lib/utils"
import { TypographySettings } from './SETTINGS/TypoGrapghySettings'
import { DimensionsSettings } from './SETTINGS/DimenstionSettings'
import { DecorationsSettings } from './SETTINGS/DecorationSettings'
import { ContentFieldsPanel } from './SETTINGS/ContentFieldsPanelSettings';
import { CustomSettingsPanel } from './SETTINGS/CustomPanelSettings';
import { EditorActionsPanel } from './SETTINGS/EditorActionsPanel';
import { Trash } from "lucide-react"
import { useState } from "react"
import { componentRegistry } from '@/lib/ComponentSystem/Core/registry'
import { ComponentConfig, EditorActionDefinition } from "@/lib/ComponentSystem/Core/types"



/**
 * Helper function to create a default element structure.
 * It fetches the default config from the registry.
 */
const createDefaultElement = (type: string, parentId: string): EditorElement | null => {
    const componentDef = componentRegistry.getComponent(type);
    if (!componentDef) {
        console.error(`[createDefaultElement] Component type "${type}" not found in registry.`);
        return null;
    }
    const config = componentDef.config;

    // Generate default children if specified
    let defaultContent: EditorElement[] | Record<string, any> =
        config.content || (config.childrenConfig ? [] : {}); // Default based on container/leaf

    if (config.childrenConfig && config.childrenConfig.defaultChildren && Array.isArray(defaultContent)) {
        defaultContent = config.childrenConfig.defaultChildren
            .map(childType => createDefaultElement(childType as string, uuidv4())) // Generate ID for child here? Or let reducer handle? Assume generate here for now.
            .filter(Boolean) as EditorElement[]; // Filter out nulls if child type not found
    }

    return ({
        id: uuidv4(),
        parentId: parentId,
        type: type as any,
        name: config.name,
        styles: config.styles || {},
        content: defaultContent,
        customSettings: config.customSettings || {},
        responsiveSettings: config.responsiveSettings || {},
    });
}

const SettingsTab = () => {
  const { state, dispatch } = useEditor()
  const [activeSection, setActiveSection] = useState<string[]>([
      'content', 'customSettings', 'actions', 'typography', 'dimensions', 'decorations'
  ])
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

  // Update the handleChangeCustomSetting function for atomic update
  const handleChangeCustomSetting = (property: string, value: string | number | boolean | any[]) => {
    if (!componentConfig || !selectedElement) {
        console.warn("[Custom Setting Update] Missing component config or selected element.");
        return;
    }
    console.log(`%c[Custom Setting Update - ATOMIC] Starting: ${property} = ${JSON.stringify(value)}`, 'color: blue; font-weight: bold;');
    const settingDefinition = componentConfig.customSettingFields?.find(f => f.id === property);
    if (!settingDefinition) {
        console.warn(`[Custom Setting Update - ATOMIC] Setting definition not found for: ${property}`);
        return;
    }

    let elementClone = (selectedElement);
    console.log(`%c[Custom Setting Update - ATOMIC] Created deep clone...`, 'color: teal;');

    // Apply parent style overrides if affectsStyles exists
    if (settingDefinition.affectsStyles) {
        console.log(`%c[Custom Setting Update - ATOMIC] Calculating PARENT styles...`, 'color: green;');
        let parentStyleOverrides: React.CSSProperties = {};
        for (const styleEffect of settingDefinition.affectsStyles) {
             const { property: styleProp, valueMap, transform } = styleEffect;
             let styleValueToApply = value;
             if (valueMap && (typeof value === 'string' || typeof value === 'number') && value in valueMap) styleValueToApply = valueMap[value];
             else if (transform && typeof transform === 'function') styleValueToApply = transform(value);
             if (styleProp) parentStyleOverrides = { ...parentStyleOverrides, [styleProp]: styleValueToApply as any };
        }
        elementClone.styles = { ...(elementClone.styles || {}), ...parentStyleOverrides };
         console.log(`%c[Custom Setting Update - ATOMIC] Applied parent styles to clone.`, 'color: green;');
    }

    // Apply the changed custom setting value itself
    elementClone.customSettings = { ...(elementClone.customSettings || {}), [property]: value };
    console.log(`%c[Custom Setting Update - ATOMIC] Applied setting ${property} to clone.`, 'color: teal;');

    // Apply child modifications if affectsChildren exists
    if (settingDefinition.affectsChildren && Array.isArray(elementClone.content)) {
        console.log(`%c[Custom Setting Update - ATOMIC] Calculating CHILD updates...`, 'color: orange;');
        elementClone.content = elementClone.content.map(child => {
            let currentChildState = (child);
            settingDefinition.affectsChildren?.forEach(childEffect => {
                 if (child.type === childEffect.targetType) {
                    const updateRules = childEffect.valueMap?.[value as string | number];
                    if (updateRules) {
                         const currentChildStyles = currentChildState.styles || {};
                         const currentChildSettings = currentChildState.customSettings || {};
                         const newChildStyles = updateRules.styles ? { ...currentChildStyles, ...updateRules.styles } : currentChildStyles;
                         const newChildSettings = updateRules.customSettings ? { ...currentChildSettings, ...updateRules.customSettings } : currentChildSettings;
                         const stylesChanged = JSON.stringify(newChildStyles) !== JSON.stringify(currentChildStyles);
                         const settingsChanged = JSON.stringify(newChildSettings) !== JSON.stringify(currentChildSettings);
                         if (stylesChanged || settingsChanged) {
                              console.log(`    * Change Detected for Child ${child.id}! Applying to child clone.`);
                             if(stylesChanged) currentChildState.styles = newChildStyles;
                             if(settingsChanged) currentChildState.customSettings = newChildSettings;
                         } else {
                              console.log(`    - No effective change for child ${child.id}.`);
                         }
                    }
                }
            });
            return currentChildState;
        });
         console.log(`%c[Custom Setting Update - ATOMIC] Applied child modifications.`, 'color: orange;');
    }

    // Dispatch the single atomic update
    console.log(`%c[Custom Setting Update - ATOMIC] Dispatching SINGLE update...`, 'color: purple; font-weight: bold;');
    dispatch({ type: 'UPDATE_ELEMENT', payload: { elementDetails: elementClone } });
    console.log(`%c[Custom Setting Update - ATOMIC] Finished: ${property}`, 'color: blue; font-weight: bold;');
  };

  // --- Handler for Editor Actions ---
  const handleEditorAction = (action: EditorActionDefinition) => {
      console.log(`%c[Editor Action] Triggered: ${action.id} (${action.actionType})`, 'color: magenta; font-weight: bold;');
      if (!selectedElement) return;
      switch (action.actionType) {
          case 'addChild': {
              const elementTypeToAdd = action.payload?.elementTypeToAdd;
              if (!elementTypeToAdd) return;
              const newElement = createDefaultElement(elementTypeToAdd, selectedElement.id);
              if (newElement) {
                  console.log(`%c[Editor Action] Dispatching ADD_ELEMENT...`, 'color: magenta;');
                  dispatch({ type: 'ADD_ELEMENT', payload: { containerId: selectedElement.id, elementDetails: newElement } });
              }
              break;
          }
          default: console.warn(`[Editor Action] Unhandled action type: ${action.actionType}`);
      }
  };

  const handleContentChange = (property: string, value: any) => {
    console.log(`%c[Content Update] Property: ${property}, Value: ${JSON.stringify(value)}`, 'color: brown;');
    if (!selectedElement) {
        console.warn("[Content Update] No element selected.");
        return;
    }
    // Ensure content is an object (relevant for leaf components) before updating
    if (typeof selectedElement.content === 'object' && !Array.isArray(selectedElement.content) && selectedElement.content !== null) {
          // Clone the current content object
          const updatedContent = {
              ...selectedElement.content,
              [property]: value, // Update the specific property
          };
          // Dispatch update for the element with the new content object
          dispatch({
              type: 'UPDATE_ELEMENT',
              payload: {
                  elementDetails: {
                      ...selectedElement, // Keep other element props
                      content: updatedContent // Set the updated content object
                  }
              }
          });
           console.log(`%c[Content Update] Dispatched update for ${property}.`, 'color: brown;');
    } else {
         console.warn(`[Content Update] Cannot update content property '${property}' for element ${selectedElement.id} - content is not an object or is null.`);
    }
  };

  // Conditional rendering checks
  const showContentFields = (componentConfig?.contentFields?.length || 0) > 0;
  const showCustomSettings = (componentConfig?.customSettingFields?.length || 0) > 0;
  const showEditorActions = (componentConfig?.editorActions?.length || 0) > 0;
  const showStyles = !!componentConfig?.styles; // Basic check if styles object exists
  const showFlexbox = selectedElement.type === 'container' || componentConfig?.styles?.display === 'flex';

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
          onClick={() => dispatch({
            type: 'DELETE_ELEMENT',
            payload: {
              elementDetails: { ...selectedElement },
            },
          })}
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
        <Accordion type="multiple" defaultValue={activeSection} onValueChange={setActiveSection} className="w-full">

             {/* Content Section */}
            {showContentFields && (
               <AccordionItem value="content" className="border-b">
                 <AccordionTrigger className="py-2 text-sm hover:no-underline">Content Fields</AccordionTrigger>
                 <AccordionContent className="pb-0"> {/* No bottom padding for panel */}
                    <ContentFieldsPanel
                        element={selectedElement}
                        config={componentConfig}
                        onContentChange={handleContentChange}
                    />
                 </AccordionContent>
               </AccordionItem>
             )}

             {/* Custom Settings Section */}
             {showCustomSettings && (
               <AccordionItem value="customSettings" className="border-b">
                 <AccordionTrigger className="py-2 text-sm hover:no-underline">Custom Settings</AccordionTrigger>
                 <AccordionContent className="pb-0">
                   <CustomSettingsPanel // Use renamed component
                     element={selectedElement}
                     config={componentConfig}
                     customSettingsValues={selectedElement.customSettings} // Pass current values
                     onCustomSettingChange={handleChangeCustomSetting} // Use renamed handler
                   />
                 </AccordionContent>
               </AccordionItem>
             )}

             {/* Actions Section */}
             {showEditorActions && (
                <AccordionItem value="actions" className="border-b">
                    <AccordionTrigger className="py-2 text-sm hover:no-underline">Editor Actions</AccordionTrigger>
                    <AccordionContent className="pb-0">
                        <EditorActionsPanel
                            element={selectedElement}
                            config={componentConfig}
                            onAction={handleEditorAction}
                        />
                    </AccordionContent>
                </AccordionItem>
            )}

            {/* --- Style Sections (Conditional) --- */}
            {showStyles && ( <AccordionItem value="typography" className="border-b"><AccordionTrigger className="py-2 text-sm hover:no-underline">Typography</AccordionTrigger><AccordionContent className="pb-2"><TypographySettings element={selectedElement} onStyleChange={handleStyleChange} currentDevice={currentDevice}/></AccordionContent></AccordionItem> )}
            {showStyles && ( <AccordionItem value="dimensions" className="border-b"><AccordionTrigger className="py-2 text-sm hover:no-underline">Dimensions</AccordionTrigger><AccordionContent className="pb-2"><DimensionsSettings element={selectedElement} onStyleChange={handleStyleChange} currentDevice={currentDevice}/></AccordionContent></AccordionItem> )}
            {showStyles && ( <AccordionItem value="decorations" className="border-b"><AccordionTrigger className="py-2 text-sm hover:no-underline">Decorations</AccordionTrigger><AccordionContent className="pb-2"><DecorationsSettings element={selectedElement} onStyleChange={handleStyleChange} currentDevice={currentDevice}/></AccordionContent></AccordionItem> )}
            {showFlexbox && ( <AccordionItem value="flexbox" className="border-b"><AccordionTrigger className="py-2 text-sm hover:no-underline">Flexbox</AccordionTrigger><AccordionContent className="pb-2"><div className="grid gap-4 px-1">{/* ... flex controls ... */}<div className="flex flex-col gap-2"><label className="text-muted-foreground text-sm">Direction</label><select className="border p-2 rounded-md" value={selectedElement.styles.flexDirection as string || 'row'} onChange={(e) => handleStyleChange('flexDirection', e.target.value)}><option value="row">Row</option><option value="column">Column</option><option value="row-reverse">Row Reverse</option><option value="column-reverse">Column Reverse</option></select></div><div className="grid grid-cols-2 gap-2"><div className="flex flex-col gap-2"><label className="text-muted-foreground text-sm">Justify Content</label><select className="border p-2 rounded-md" value={selectedElement.styles.justifyContent as string || 'flex-start'} onChange={(e) => handleStyleChange('justifyContent', e.target.value)}><option value="flex-start">Start</option><option value="flex-end">End</option><option value="center">Center</option><option value="space-between">Space Between</option><option value="space-around">Space Around</option><option value="space-evenly">Space Evenly</option></select></div><div className="flex flex-col gap-2"><label className="text-muted-foreground text-sm">Align Items</label><select className="border p-2 rounded-md" value={selectedElement.styles.alignItems as string || 'stretch'} onChange={(e) => handleStyleChange('alignItems', e.target.value)}><option value="flex-start">Start</option><option value="flex-end">End</option><option value="center">Center</option><option value="stretch">Stretch</option><option value="baseline">Baseline</option></select></div></div><div className="flex flex-col gap-2"><label className="text-muted-foreground text-sm">Gap</label><input type="text" className="border p-2 rounded-md" value={selectedElement.styles.gap as string || ''} onChange={(e) => handleStyleChange('gap', e.target.value)} placeholder="0px"/></div><div className="flex flex-col gap-2"><label className="text-muted-foreground text-sm">Flex Wrap</label><select className="border p-2 rounded-md" value={selectedElement.styles.flexWrap as string || 'nowrap'} onChange={(e) => handleStyleChange('flexWrap', e.target.value)}><option value="nowrap">No Wrap</option><option value="wrap">Wrap</option><option value="wrap-reverse">Wrap Reverse</option></select></div></div></AccordionContent></AccordionItem> )} 

        </Accordion>
      </div>
    </div>
  )
}

export default SettingsTab;


