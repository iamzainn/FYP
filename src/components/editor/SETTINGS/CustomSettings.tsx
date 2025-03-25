
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'
import { EditorElement } from '@/providers/editor/editor-provider'
import { ButtonInput, ColorInput, SelectInput, TextInput } from './SettingsInput'
import {  Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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
  },
  'image': {
    title: 'Image Settings',
    settings: [
      {
        id: 'src',
        label: 'Image URL',
        type: 'text',
        placeholder: 'https://example.com/image.jpg'
      },
      {
        id: 'alt',
        label: 'Alt Text',
        type: 'text',
        placeholder: 'Descriptive text'
      },
      {
        id: 'objectFit',
        label: 'Object Fit',
        type: 'select',
        options: [
          { value: 'cover', label: 'Cover' },
          { value: 'contain', label: 'Contain' },
          { value: 'fill', label: 'Fill' },
          { value: 'none', label: 'None' }
        ]
      }
    ]
  },
  'button': {
    title: 'Button Settings',
    settings: [
      {
        id: 'buttonText',
        label: 'Button Text',
        type: 'text',
        placeholder: 'Click Me'
      },
      {
        id: 'href',
        label: 'Link URL',
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
        id: 'buttonVariant',
        label: 'Style Variant',
        type: 'select',
        options: [
          { value: 'primary', label: 'Primary' },
          { value: 'secondary', label: 'Secondary' },
          { value: 'outline', label: 'Outline' },
          { value: 'ghost', label: 'Ghost' }
        ]
      }
    ]
  }
}



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

  // Add these to your CustomSettings.tsx file to support the new component types

  // Image settings
  
  if (element.type === 'image' && typeof element.content === 'object') {
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium">Image Settings</h3>
        
        <div className="grid gap-2">
          <Label htmlFor="src">Image URL</Label>
          <Input
            id="src"
            placeholder="https://example.com/image.jpg"
            value={(element.content as { src?: string }).src || ''}
            onChange={(e) => {
              onCustomSettingChange('src', e.target.value);
            }}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="alt">Alt Text</Label>
          <Input
            id="alt"
            placeholder="Descriptive text"
            value={(element.content as { alt?: string }).alt || ''}
            onChange={(e) => {
              onCustomSettingChange('alt', e.target.value);
            }}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="objectFit">Object Fit</Label>
          <Select
            value={(element.customSettings?.objectFit as string) || 'cover'}
            onValueChange={(value) => {
              onCustomSettingChange('objectFit', value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select object fit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cover">Cover</SelectItem>
              <SelectItem value="contain">Contain</SelectItem>
              <SelectItem value="fill">Fill</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }

  // Button settings
  if (element.type === 'button' ) {
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium">Button Settings</h3>
        
        <div className="grid gap-2">
          <Label htmlFor="buttonText">Button Text</Label>
          <Input
            id="buttonText"
            placeholder="Click Me"
            value={(element.content as { innerText?: string }).innerText || ''}
            onChange={(e) => {
              onCustomSettingChange('innerText', e.target.value);
            }}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="href">Link URL</Label>
          <Input
            id="href"
            placeholder="https://example.com"
            value={(element.content as { href?: string }).href || '#'}
            onChange={(e) => {
              onCustomSettingChange('href', e.target.value);
            }}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="target">Open in</Label>
          <Select
            value={(element.content as { target?: string }).target || '_self'}
            onValueChange={(value) => {
              onCustomSettingChange('target', value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select target" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_self">Same window</SelectItem>
              <SelectItem value="_blank">New window</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="buttonVariant">Style Variant</Label>
          <Select
            value={(element.customSettings?.buttonVariant as string) || 'primary'}
            onValueChange={(value) => {
              onCustomSettingChange('buttonVariant', value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select variant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primary">Primary</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
              <SelectItem value="outline">Outline</SelectItem>
              <SelectItem value="ghost">Ghost</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }

  // Hero Section settings
  if (element.type === 'heroSection') {
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium">Hero Section Settings</h3>
        
        <div className="grid gap-2">
          <Label htmlFor="heroLayout">Layout Style</Label>
          <Select
            value={(element.customSettings?.heroLayout as string) || 'center'}
            onValueChange={(value) => {
              onCustomSettingChange('heroLayout', value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="center">Content Centered</SelectItem>
              <SelectItem value="left">Content Left</SelectItem>
              <SelectItem value="right">Content Right</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="heroHeight">Section Height</Label>
          <Select
            value={(element.customSettings?.heroHeight as string) || '500px'}
            onValueChange={(value) => {
              onCustomSettingChange('heroHeight', value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select height" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="500px">Medium (500px)</SelectItem>
              <SelectItem value="100vh">Full Screen</SelectItem>
              <SelectItem value="400px">Small (400px)</SelectItem>
              <SelectItem value="600px">Large (600px)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="overlayColor">Overlay Color</Label>
          <Input
            id="overlayColor"
            type="color"
            value={(element.customSettings?.overlayColor as string) || 'rgba(0,0,0,0.5)'}
            onChange={(e) => {
              onCustomSettingChange('overlayColor', e.target.value);
            }}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="overlayOpacity">Overlay Opacity (%)</Label>
          <Input
            id="overlayOpacity"
            type="number"
            min="0"
            max="100"
            value={(element.customSettings?.overlayOpacity as string) || '50'}
            onChange={(e) => {
              onCustomSettingChange('overlayOpacity', e.target.value);
            }}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="contentSpacing">Content Spacing</Label>
          <Select
            value={(element.customSettings?.contentSpacing as string) || 'normal'}
            onValueChange={(value) => {
              onCustomSettingChange('contentSpacing', value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select spacing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="compact">Compact</SelectItem>
              <SelectItem value="spacious">Spacious</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }

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