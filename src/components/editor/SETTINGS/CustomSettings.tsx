/* eslint-disable @typescript-eslint/no-explicit-any */
// Remove unused vars if any pop up after refactor
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { EditorElement } from '@/providers/editor/editor-provider';
// Assuming necessary input components exist or are created in SettingsInput.tsx
import { ColorInput, SelectInput, TextInput, RangeInput, CheckboxInput, NumberInput } from './SettingsInput';
import { Label } from '@/components/ui/label';
// Import the registry to fetch component configurations
import { componentRegistry } from '@/lib/ComponentSystem/Core/registry';
import { ComponentSettingDefinition, ContentFieldDefinition } from '@/lib/ComponentSystem/Core/types';

interface CustomSettingsProps {
  element: EditorElement;
  // Pass the entire customSettings object from the element
  customSettings: { [key: string]: unknown } | undefined;
  // Callback when a setting value changes
  onCustomSettingChange: (property: string, value: string | number | boolean | any[]) => void;
  // Add prop for handling content changes
  onContentChange: (property: string, value: string | number | boolean | any[]) => void;
  // Removed handleUpdateElement, Settings.tsx will handle dispatching
  // Removed onStyleChange and onContentChange as they are handled separately
}

// REMOVE the entire customSettingsConfig object definition
// export interface CustomSetting { ... }
// export interface CustomSettingsMap { ... }
// export const customSettingsConfig: CustomSettingsMap = { ... }; // DELETE THIS WHOLE OBJECT

export const CustomSettings: React.FC<CustomSettingsProps> = ({
  element,
  customSettings, // Receive current settings values
  onCustomSettingChange,
  onContentChange, // Receive the new handler
}) => {
  // Fetch the component definition from the registry based on the element type
  const componentDef = componentRegistry.getComponent(element.type as string);

  // Get both setting and content field definitions
  const settingDefinitions = componentDef?.config?.customSettingFields || [];
  const contentFieldDefinitions = componentDef?.config?.contentFields || []; // Get content field definitions

  // Determine if the element's content is an object (for leaf components)
  const elementContent = (typeof element.content === 'object' && !Array.isArray(element.content))
    ? (element.content as Record<string, any>)
    : undefined;

  // If no component definition or no custom settings defined, render nothing or a message
  if (!componentDef || (settingDefinitions.length === 0 && contentFieldDefinitions.length === 0)) {
    return <p className="text-muted-foreground text-sm px-1 py-2">No editable fields available.</p>;
  }

  // Get the display title from the config (optional)
  const title = componentDef.config.name ? `${componentDef.config.name} Settings` : 'Element Settings';
  const contentTitle = 'Content'; // Separate title for content fields

  return (
    <div className="flex flex-col gap-6 px-1"> {/* Add gap between sections */}

      {/* Section for Content Fields */}
      {contentFieldDefinitions.length > 0 && (
        <div className="grid gap-4">
          <h3 className="text-sm font-medium">{contentTitle}</h3>
          {contentFieldDefinitions.map((fieldDef: ContentFieldDefinition) => {
            // Get current value from element.content object
            const currentValue = elementContent?.[fieldDef.id] ?? fieldDef.defaultValue;

            // Render appropriate input based on content field type
            // Note: Using TextInput and SelectInput for now, expand as needed
            switch (fieldDef.type) {
              case 'text':
              case 'textarea': // Use TextInput for textarea as well for simplicity, or create TextareaInput
              case 'image': // Image URL is text
              case 'icon': // Icon name/ID might be text
              case 'link': // Link URL is text
                return (
                  <TextInput
                    key={fieldDef.id}
                    id={fieldDef.id}
                    label={fieldDef.label}
                    value={currentValue as string ?? ''}
                    placeholder={fieldDef.defaultValue as string}
                    // Use the dedicated onContentChange handler
                    onChange={onContentChange}
                  />
                );
              // Add cases for other types like 'select' if needed for content
              default:
                console.warn(`Unsupported content field type: ${fieldDef.type} for ${fieldDef.id}`);
                return <div key={fieldDef.id}><Label>{fieldDef.label}</Label><p className="text-xs text-destructive">Unsupported control type: {fieldDef.type}</p></div>;
            }
          })}
        </div>
      )}

      {/* Section for Custom Settings */}
      {settingDefinitions.length > 0 && (
        <div className="grid gap-4">
          <h3 className="text-sm font-medium">{title}</h3>
          {settingDefinitions.map((settingDef: ComponentSettingDefinition) => {
            const currentValue = customSettings?.[settingDef.id] ?? settingDef.defaultValue;

            switch (settingDef.type) {
              case 'text':
                return <TextInput key={settingDef.id} id={settingDef.id} label={settingDef.label} value={currentValue as string ?? ''} placeholder={settingDef.defaultValue as string} onChange={onCustomSettingChange} />;
              case 'select':
                return <SelectInput key={settingDef.id} id={settingDef.id} label={settingDef.label} value={currentValue as string ?? ''} options={settingDef.options || []} onChange={onCustomSettingChange} />;
              case 'color':
                return <ColorInput key={settingDef.id} id={settingDef.id} label={settingDef.label} value={currentValue as string ?? '#000000'} placeholder={settingDef.defaultValue as string} onChange={onCustomSettingChange} />;
              case 'number':
                return <NumberInput key={settingDef.id} id={settingDef.id} label={settingDef.label} value={currentValue as number ?? undefined} min={settingDef.min} max={settingDef.max} step={settingDef.step} placeholder={settingDef.defaultValue as string} onChange={onCustomSettingChange} />;
              case 'range':
                return <RangeInput key={settingDef.id} id={settingDef.id} label={settingDef.label} value={currentValue as number ?? settingDef.defaultValue ?? 0} min={settingDef.min ?? 0} max={settingDef.max ?? 100} step={settingDef.step ?? 1} onChange={onCustomSettingChange} />;
              case 'boolean':
                return <CheckboxInput key={settingDef.id} id={settingDef.id} label={settingDef.label} checked={currentValue as boolean ?? false} onChange={onCustomSettingChange} />;
              default:
                console.warn(`Unsupported custom setting type: ${settingDef.type} for ${settingDef.id}`);
                return <div key={settingDef.id}><Label>{settingDef.label}</Label><p className="text-xs text-destructive">Unsupported control type: {settingDef.type}</p></div>;
            }
          })}
        </div>
      )}
    </div>
  );
};