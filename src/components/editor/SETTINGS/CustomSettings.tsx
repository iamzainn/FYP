import React from 'react'
import { EditorElement } from '@/providers/editor/editor-provider'
import { ButtonInput, ColorInput, SelectInput, TextInput } from './SettingsInput'

interface CustomSettingsProps {
  element: EditorElement;
  customSettings: {
    [key: string]: unknown;
} | undefined
  onCustomSettingChange: (property: string, value: string | number) => void;
}

// Define custom settings for each element type
export interface CustomSetting {
  id: string;
  label: string;
  type: 'text' | 'color' | 'number' | 'select' | 'button';
  placeholder?: string;
  options?: { value: string; label: string }[];
}

export interface CustomSettingsMap {
  [key: string]: {
    title: string;
    settings: CustomSetting[];
  };
}

// Custom settings definition
export const customSettingsConfig: CustomSettingsMap = {
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
  },
  '2Col': {
    title: 'Column Settings',
    settings: [
      {
        id: 'addColumn',
        label: 'Add Column',
        type: 'button'
      }
    ]
  },
  'grid': {
    title: 'Grid Layout Settings',
    settings: [
      {
        id: 'columnCount',
        label: 'Columns',
        type: 'select',
        options: [
          { value: '2', label: '2 Columns' },
          { value: '3', label: '3 Columns' },
          { value: '4', label: '4 Columns' },
          { value: '6', label: '6 Columns' }
        ]
      },
      {
        id: 'addGridCell',
        label: 'Add Grid Cell',
        type: 'button'
      }
    ]
  },
  'heroSection': {
    title: 'Hero Section Settings',
    settings: [
      {
        id: 'heroHeight',
        label: 'Section Height',
        type: 'select',
        options: [
          { value: '500px', label: 'Medium (500px)' },
          { value: '100vh', label: 'Full Screen' },
          { value: '400px', label: 'Small (400px)' },
          { value: '600px', label: 'Large (600px)' },
        ]
      },
      {
        id: 'overlayColor',
        label: 'Overlay Color',
        type: 'color',
        placeholder: 'rgba(0,0,0,0.5)'
      },
      {
        id: 'contentPosition',
        label: 'Content Position',
        type: 'select',
        options: [
          { value: 'center', label: 'Center' },
          { value: 'left', label: 'Left' },
          { value: 'right', label: 'Right' },
        ]
      }
    ]
  },
  'heading': {
    title: 'Heading Settings',
    settings: [
      {
        id: 'variant',
        label: 'Heading Level',
        type: 'select',
        options: [
          { value: 'h1', label: 'H1 - Main Heading' },
          { value: 'h2', label: 'H2 - Section Heading' },
          { value: 'h3', label: 'H3 - Subsection Heading' },
          { value: 'h4', label: 'H4 - Minor Heading' },
          { value: 'h5', label: 'H5 - Small Heading' },
          { value: 'h6', label: 'H6 - Tiny Heading' },
        ]
      }
    ]
  }
};

export const CustomSettings: React.FC<CustomSettingsProps> = ({
  element,
  
  onCustomSettingChange
}) => {
  if (!element?.type || !(element.type in customSettingsConfig)) {
    return null;
  }

  const settings = customSettingsConfig[element.type].settings;
  const title = customSettingsConfig[element.type].title;

  const getSettingValue = (settingId: string): string => {
    // First look in customSettings
    if (element.customSettings && settingId in element.customSettings) {
      return element.customSettings[settingId] as string;
    }
    
    // Then check content object (for backward compatibility)
    if (typeof element.content === 'object' && 
        element.content !== null && 
        !Array.isArray(element.content) &&
        settingId in element.content) {
      return (element.content as Record<string, string | number>)[settingId] as string;
    }
    
    return '';
  };

  // Handle button clicks (now dispatched through custom events)
  const handleButtonClick = (settingId: string) => {
    if (settingId === 'addColumn' || settingId === 'addGridCell') {
      // Dispatch a custom event that can be caught at a higher level if needed
      const eventName = settingId === 'addColumn' 
        ? 'builder:add-column' 
        : 'builder:add-grid-cell';
      
      const customEvent = new CustomEvent(eventName, {
        detail: { elementId: element.id }
      });
      
      document.dispatchEvent(customEvent);
    }
  };

  return (
    <div className="grid gap-4 px-1">
      <h3 className="text-sm font-medium">{title}</h3>
      
      {settings.map(setting => {
        const currentValue = getSettingValue(setting.id);
        
        switch(setting.type) {
          case 'text':
            return (
              <TextInput
                key={setting.id}
                id={setting.id}
                label={setting.label}
                value={currentValue}
                placeholder={setting.placeholder}
                onChange={onCustomSettingChange}
              />
            );
            
          case 'select':
            return (
              <SelectInput
                key={setting.id}
                id={setting.id}
                label={setting.label}
                value={currentValue}
                options={setting.options || []}
                onChange={onCustomSettingChange}
              />
            );
            
          case 'color':
            return (
              <ColorInput
                key={setting.id}
                id={setting.id}
                label={setting.label}
                value={currentValue}
                placeholder={setting.placeholder}
                onChange={onCustomSettingChange}
              />
            );
            
          case 'button':
            return (
              <ButtonInput
                key={setting.id}
                id={setting.id}
                label={setting.label}
                onClick={() => handleButtonClick(setting.id)}
              />
            );
            
          default:
            return null;
        }
      })}
    </div>
  );
};