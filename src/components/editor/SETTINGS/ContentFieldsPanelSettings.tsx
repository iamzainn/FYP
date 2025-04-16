/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { EditorElement } from '@/providers/editor/editor-provider';
import { ComponentConfig, ContentFieldDefinition } from '@/lib/ComponentSystem/Core/types';
import { TextInput, SelectInput /* Add other needed inputs */ } from './SettingsInput';
import { Label } from '@/components/ui/label';

interface ContentFieldsPanelProps {
  element: EditorElement;
  config: ComponentConfig | undefined;
  onContentChange: (property: string, value: any) => void;
}

export const ContentFieldsPanel: React.FC<ContentFieldsPanelProps> = ({
  element,
  config,
  onContentChange,
}) => {
  const contentFieldDefinitions = config?.contentFields || [];

  if (contentFieldDefinitions.length === 0) {
    return <p className="text-xs text-muted-foreground px-1 py-2">No content fields available.</p>;
  }

  // Determine if the element's content is an object (for leaf components)
  const elementContent = (typeof element.content === 'object' && !Array.isArray(element.content) && element.content !== null)
    ? (element.content as Record<string, any>)
    : undefined; // Content is not an object or is null/undefined

   console.log(`[ContentFieldsPanel] Rendering ${contentFieldDefinitions.length} content fields for ${element.type}`);

  return (
    <div className="grid gap-4 px-1 py-2"> {/* Adjust styling */}
      {/* --- Add Panel Heading --- */}
      <h3 className="text-sm font-medium col-span-full">Content</h3>
      {/* ----------------------- */}
      {contentFieldDefinitions.map((fieldDef: ContentFieldDefinition) => {
        // Get current value from element.content object if it exists, else use default
        const currentValue = elementContent?.[fieldDef.id] ?? fieldDef.defaultValue;

        console.log(`[ContentFieldsPanel] Rendering field: ${fieldDef.label} (ID: ${fieldDef.id}), Type: ${fieldDef.type}, CurrentValue:`, currentValue);

        switch (fieldDef.type) {
          case 'text':
          case 'textarea':
          case 'image': // Assuming URL is text
          case 'icon':  // Assuming name/ID is text
          case 'link':  // Assuming URL is text
            return (
              <TextInput
                key={fieldDef.id}
                id={fieldDef.id}
                label={fieldDef.label}
                value={currentValue as string ?? ''} // Ensure value is string
                placeholder={fieldDef.defaultValue as string ?? ''}
                onChange={onContentChange} // Use the specific handler
              />
            );
           case 'select': // Example if content field needs a select
             return (
               <SelectInput
                 key={fieldDef.id}
                 id={fieldDef.id}
                 label={fieldDef.label}
                 value={currentValue as string | number | boolean ?? ''} // Handle different value types
                 options={fieldDef.options || []}
                 onChange={onContentChange}
               />
             );
          // Add cases for other content field types (boolean, number, etc.) if needed
          default:
            console.warn(`[ContentFieldsPanel] Unsupported content field type: ${fieldDef.type} for ${fieldDef.id}`);
            return <div key={fieldDef.id}><Label>{fieldDef.label}</Label><p className="text-xs text-destructive">Unsupported field type: {fieldDef.type}</p></div>;
        }
      })}
    </div>
  );
};
