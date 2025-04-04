/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

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
  onCustomSettingChange: (property: string, value: string | number | boolean | any[]) => void;
  handleUpdateElement: (element: EditorElement) => void;
  onStyleChange?: (property: string, value: string | number) => void;
  onContentChange?: (property: string, value: string | number) => void;
}

// Define custom settings for each element type
export interface CustomSetting {
  id: string;
  label: string;
  type: 'text' | 'color' | 'number' | 'select' | 'button' | 'checkbox';
  placeholder?: string;
  options?: { value: string; label: string }[];
  defaultValue?: string | number | boolean;
  min?: number;
  max?: number;
}

export interface CustomSettingsMap {
  [key: string]: {
    title: string;
    settings: CustomSetting[];
    
  };

}

// Custom settings definition
export const customSettingsConfig: CustomSettingsMap = {
 
  
  'heroSection': {
    title: 'Hero Section Settings',
    settings: [
      {
        id: 'heroLayout',
        label: 'Layout Style',
        type: 'select',
        options: [
          { value: 'center', label: 'Content Centered' },
          { value: 'left', label: 'Content Left' },
          { value: 'right', label: 'Content Right' },
        ],
        defaultValue: 'center'
      },
      {
        id: 'overlayColor',
        label: 'Overlay Color',
        type: 'color',
        placeholder: 'rgba(0,0,0,0.5)'
      },
      {
        id: 'overlayOpacity',
        label: 'Overlay Opacity',
        type: 'number',
        defaultValue: 50,
        min: 0,
        max: 100
      },
      {
        id: 'contentSpacing',
        label: 'Content Spacing',
        type: 'select',
        options: [
          { value: 'normal', label: 'Normal' },
          { value: 'compact', label: 'Compact' },
          { value: 'spacious', label: 'Spacious' },
        ],
        defaultValue: 'normal'
      },
      {
        id: 'backgroundPosition',
        label: 'Background Position',
        type: 'select',
        options: [
          { value: 'center', label: 'Center' },
          { value: 'top', label: 'Top' },
          { value: 'bottom', label: 'Bottom' },
        ],
        defaultValue: 'center'
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
        ],
        defaultValue: 'h2'
      },
      {
        id: 'animation',
        label: 'Animation',
        type: 'select',
        options: [
          { value: 'none', label: 'None' },
          { value: 'fade-in', label: 'Fade In' },
          { value: 'slide-up', label: 'Slide Up' },
        ],
        defaultValue: 'none'
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
      },
      {
        id: 'size',
        label: 'Size',
        type: 'select',
        options: [
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' }
        ]
      },
      {
        id: 'fullWidth',
        label: 'Full Width',
        type: 'checkbox'
      }
    ]
  },
  
  'headerSection': {
    title: 'Header Section Settings',
    settings: [
      {
        id: 'headerLayout',
        label: 'Header Layout',
        type: 'select',
        options: [
          { value: 'standard', label: 'Standard (Logo Left)' },
          { value: 'centered', label: 'Centered Logo' },
          { value: 'logo-right', label: 'Logo Right' },
        ],
        defaultValue: 'standard'
      },
      {
        id: 'stickyHeader',
        label: 'Sticky Header',
        type: 'checkbox',
        defaultValue: false
      },
      {
        id: 'containerWidth',
        label: 'Container Width',
        type: 'select',
        options: [
          { value: 'full', label: 'Full Width' },
          { value: 'contained', label: 'Contained' },
        ],
        defaultValue: 'full'
      },
      {
        id: 'borderStyle',
        label: 'Border Style',
        type: 'select',
        options: [
          { value: 'none', label: 'None' },
          { value: 'shadow', label: 'Shadow' },
          { value: 'line', label: 'Border Line' },
        ],
        defaultValue: 'shadow'
      },
      {
        id: 'verticalPadding',
        label: 'Vertical Padding',
        type: 'select',
        options: [
          { value: 'none', label: 'None' },
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium' },
          { value: 'large', label: 'Large' },
        ],
        defaultValue: 'medium'
      }
    ]
  },
  
  'logo': {
    title: 'Logo Settings',
    settings: [
      {
        id: 'logoType',
        label: 'Logo Type',
        type: 'select',
        options: [
          { value: 'text', label: 'Text Only' },
          { value: 'image', label: 'Image Only' },
          { value: 'both', label: 'Image and Text' }
        ],
        defaultValue: 'text'
      },
      {
        id: 'logoText',
        label: 'Logo Text',
        type: 'text',
        defaultValue: 'Brand Name'
      },
      {
        id: 'logoImageUrl',
        label: 'Logo Image URL',
        type: 'text',
        placeholder: 'https://example.com/logo.png'
      },
      {
        id: 'imageHeight',
        label: 'Image Height (px)',
        type: 'number',
        defaultValue: 40
      },
      {
        id: 'textPosition',
        label: 'Text Position',
        type: 'select',
        options: [
          { value: 'left', label: 'Left of Image' },
          { value: 'right', label: 'Right of Image' },
          { value: 'below', label: 'Below Image' }
        ],
        defaultValue: 'right'
      },
      {
        id: 'href',
        label: 'Logo Link URL',
        type: 'text',
        defaultValue: '/'
      }
    ]
  },
  
  'navigation': {
    title: 'Navigation Settings',
    settings: [
      {
        id: 'alignment',
        label: 'Navigation Alignment',
        type: 'select',
        options: [
          { value: 'start', label: 'Left' },
          { value: 'center', label: 'Center' },
          { value: 'end', label: 'Right' },
          { value: 'space-between', label: 'Space Between' },
        ],
        defaultValue: 'end'
      },
      {
        id: 'itemSpacing',
        label: 'Item Spacing',
        type: 'select',
        options: [
          { value: 'compact', label: 'Compact' },
          { value: 'normal', label: 'Normal' },
          { value: 'spacious', label: 'Spacious' },
        ],
        defaultValue: 'normal'
      },
      {
        id: 'showMobileMenu',
        label: 'Show Mobile Menu',
        type: 'checkbox',
        defaultValue: true
      },
      {
        id: 'mobileBreakpoint',
        label: 'Mobile Breakpoint',
        type: 'select',
        options: [
          { value: 'sm', label: 'Small (640px)' },
          { value: 'md', label: 'Medium (768px)' },
          { value: 'lg', label: 'Large (1024px)' },
        ],
        defaultValue: 'md'
      }
    ]
  },
  
  'navigationItem': {
    title: 'Navigation Item Settings',
    settings: [
      {
        id: 'text',
        label: 'Item Text',
        type: 'text',
        defaultValue: 'Menu Item'
      },
      {
        id: 'href',
        label: 'Link URL',
        type: 'text',
        defaultValue: '#'
      },
      {
        id: 'target',
        label: 'Open In',
        type: 'select',
        options: [
          { value: '_self', label: 'Same Window' },
          { value: '_blank', label: 'New Window' }
        ],
        defaultValue: '_self'
      },
      {
        id: 'active',
        label: 'Active State',
        type: 'checkbox',
        defaultValue: false
      },
      {
        id: 'highlight',
        label: 'Highlight Style',
        type: 'select',
        options: [
          { value: 'none', label: 'None' },
          { value: 'underline', label: 'Underline' },
          { value: 'dot', label: 'Dot Indicator' },
          { value: 'background', label: 'Background' }
        ],
        defaultValue: 'none'
      },
      {
        id: 'hasSubmenu',
        label: 'Has Submenu',
        type: 'checkbox',
        defaultValue: false
      }
    ]
  },
  
  'headerActions': {
    title: 'Header Actions Settings',
    settings: [
      {
        id: 'showSearch',
        label: 'Show Search',
        type: 'checkbox',
        defaultValue: true
      },
      {
        id: 'showCart',
        label: 'Show Cart',
        type: 'checkbox',
        defaultValue: true
      },
      {
        id: 'showAccount',
        label: 'Show Account',
        type: 'checkbox',
        defaultValue: true
      },
      {
        id: 'iconSize',
        label: 'Icon Size',
        type: 'select',
        options: [
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium' },
          { value: 'large', label: 'Large' }
        ],
        defaultValue: 'medium'
      },
      {
        id: 'iconColor',
        label: 'Icon Color',
        type: 'color',
        defaultValue: '#333333'
      }
    ]
  },
}

export const CustomSettings: React.FC<CustomSettingsProps> = ({
  element,
  handleUpdateElement,
  onCustomSettingChange,
  onStyleChange,
  onContentChange
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

  // Helper to update content object properties
  const handleContentChange = (property: string, value: string | number) => {
    if (onContentChange) {
      onContentChange(property, value);
    } else {
      // Fallback if no specific handler provided
      const updatedContent = typeof element.content === 'object' && !Array.isArray(element.content) 
        ? { ...element.content as Record<string, any>, [property]: value }
        : { [property]: value };
      
      handleUpdateElement({
        ...element,
        content: updatedContent
      });
    }
  };

  // Helper to update style properties
  const handleStyleChange = (property: string, value: string | number) => {
    if (onStyleChange) {
      onStyleChange(property, value);
    } else {
      // Fallback if no specific handler provided
      handleUpdateElement({
        ...element,
        styles: { ...element.styles, [property]: value }
      });
    }
  };

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
            onChange={(e) => handleContentChange('src', e.target.value)}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="alt">Alt Text</Label>
          <Input
            id="alt"
            placeholder="Descriptive text"
            value={(element.content as { alt?: string }).alt || ''}
            onChange={(e) => handleContentChange('alt', e.target.value)}
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
  if (element.type === 'button') {
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium">Button Settings</h3>
        
        <div className="grid gap-2">
          <Label htmlFor="buttonText">Button Text</Label>
          <Input
            id="buttonText"
            placeholder="Click Me"
            value={(element.content as { innerText?: string }).innerText || ''}
            onChange={(e) => handleContentChange('innerText', e.target.value)}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="href">Link URL</Label>
          <Input
            id="href"
            placeholder="https://example.com"
            value={(element.content as { href?: string }).href || '#'}
            onChange={(e) => handleContentChange('href', e.target.value)}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="target">Open in</Label>
          <Select
            value={(element.content as { target?: string }).target || '_self'}
            onValueChange={(value) => {
              handleContentChange('target', value);
            }}
          >
            <SelectTrigger id="target">
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
            <SelectTrigger id="buttonVariant">
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
        
        <div className="grid gap-2">
          <Label htmlFor="size">Size</Label>
          <Select
            value={(element.customSettings?.size as string) || 'md'}
            onValueChange={(value) => {
              onCustomSettingChange('size', value);
            }}
          >
            <SelectTrigger id="size">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="md">Medium</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            id="fullWidth"
            checked={!!element.customSettings?.fullWidth}
            onChange={(e) => onCustomSettingChange('fullWidth', e.target.checked)}
            className="mr-2"
          />
          <Label htmlFor="fullWidth" className="cursor-pointer">Full Width</Label>
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
          <Label htmlFor="backgroundPosition">Background Position</Label>
          <Select
            value={(element.customSettings?.backgroundPosition as string) || 'center'}
            onValueChange={(value) => {
              onCustomSettingChange('backgroundPosition', value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="top">Top</SelectItem>
              <SelectItem value="bottom">Bottom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="overlayColor">Overlay Color</Label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              id="overlayColor"
              value={element.customSettings?.overlayColor as string || '#000000'}
              onChange={(e) => onCustomSettingChange('overlayColor', e.target.value)}
              className="w-10 h-10 p-1 cursor-pointer border rounded"
            />
            <Input
              value={element.customSettings?.overlayColor as string || 'rgba(0,0,0,0.5)'}
              onChange={(e) => onCustomSettingChange('overlayColor', e.target.value)}
              placeholder="rgba(0,0,0,0.5)"
            />
          </div>
        </div>
        
        <div className="grid gap-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="overlayOpacity">Overlay Opacity</Label>
            <span className="text-sm">{element.customSettings?.overlayOpacity as number || 50}%</span>
          </div>
          <input
            type="range"
            id="overlayOpacity"
            min="0"
            max="100"
            step="1"
            value={element.customSettings?.overlayOpacity as number || 50}
            onChange={(e) => onCustomSettingChange('overlayOpacity', parseInt(e.target.value))}
            className="w-full"
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

  // Header Section settings
  if (element.type === 'headerSection') {
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium">Header Section Settings</h3>
        
        <div className="grid gap-2">
          <Label htmlFor="headerLayout">Header Layout</Label>
          <Select
            value={(element.customSettings?.headerLayout as string) || 'standard'}
            onValueChange={(value) => {
              onCustomSettingChange('headerLayout', value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard (Logo Left)</SelectItem>
              <SelectItem value="centered">Centered Logo</SelectItem>
              <SelectItem value="logo-right">Logo Right</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="containerWidth">Container Width</Label>
          <Select
            value={(element.customSettings?.containerWidth as string) || 'full'}
            onValueChange={(value) => {
              onCustomSettingChange('containerWidth', value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select width" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full">Full Width</SelectItem>
              <SelectItem value="contained">Contained</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="borderStyle">Border Style</Label>
          <Select
            value={(element.customSettings?.borderStyle as string) || 'shadow'}
            onValueChange={(value) => {
              onCustomSettingChange('borderStyle', value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="shadow">Shadow</SelectItem>
              <SelectItem value="line">Border Line</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="verticalPadding">Vertical Padding</Label>
          <Select
            value={(element.customSettings?.verticalPadding as string) || 'medium'}
            onValueChange={(value) => {
              onCustomSettingChange('verticalPadding', value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select padding" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            id="stickyHeader"
            checked={!!element.customSettings?.stickyHeader}
            onChange={(e) => onCustomSettingChange('stickyHeader', e.target.checked)}
            className="mr-2"
          />
          <Label htmlFor="stickyHeader" className="cursor-pointer">Sticky Header</Label>
        </div>
      </div>
    );
  }
  
  // Logo settings
  if (element.type === 'logo') {
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium">Logo Settings</h3>
        
        <div className="grid gap-2">
          <Label htmlFor="logoType">Logo Type</Label>
          <Select
            value={(element.customSettings?.logoType as string) || 'text'}
            onValueChange={(value) => {
              onCustomSettingChange('logoType', value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text Only</SelectItem>
              <SelectItem value="image">Image Only</SelectItem>
              <SelectItem value="both">Image and Text</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {(element.customSettings?.logoType === 'text' || element.customSettings?.logoType === 'both') && (
          <div className="grid gap-2">
            <Label htmlFor="logoText">Logo Text</Label>
            <Input
              id="logoText"
              value={(element.content as any)?.logoText || 'Brand Name'}
              onChange={(e) => handleContentChange('logoText', e.target.value)}
              placeholder="Your brand name"
            />
          </div>
        )}
        
        {(element.customSettings?.logoType === 'image' || element.customSettings?.logoType === 'both') && (
          <div className="grid gap-2">
            <Label htmlFor="logoImageUrl">Logo Image URL</Label>
            <Input
              id="logoImageUrl"
              value={(element.content as any)?.logoImageUrl || ''}
              onChange={(e) => handleContentChange('logoImageUrl', e.target.value)}
              placeholder="https://example.com/logo.png"
            />
          </div>
        )}
        
        {(element.customSettings?.logoType === 'image' || element.customSettings?.logoType === 'both') && (
          <div className="grid gap-2">
            <Label htmlFor="imageHeight">Image Height (px)</Label>
            <Input
              type="number"
              id="imageHeight"
              value={(element.customSettings?.imageHeight as number) || 40}
              onChange={(e) => onCustomSettingChange('imageHeight', parseInt(e.target.value))}
              placeholder="40"
            />
          </div>
        )}
        
        {element.customSettings?.logoType === 'both' && (
          <div className="grid gap-2">
            <Label htmlFor="textPosition">Text Position</Label>
            <Select
              value={(element.customSettings?.textPosition as string) || 'right'}
              onValueChange={(value) => {
                onCustomSettingChange('textPosition', value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left of Image</SelectItem>
                <SelectItem value="right">Right of Image</SelectItem>
                <SelectItem value="below">Below Image</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div className="grid gap-2">
          <Label htmlFor="href">Logo Link URL</Label>
          <Input
            id="href"
            value={(element.content as any)?.href || '/'}
            onChange={(e) => handleContentChange('href', e.target.value)}
            placeholder="/"
          />
        </div>
      </div>
    );
  }
  
  // Header Actions settings
  if (element.type === 'headerActions') {
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium">Header Actions Settings</h3>
        
        <div className="grid gap-2 border-b pb-4">
          <Label>Actions to Display</Label>
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showSearch"
                checked={!!element.customSettings?.showSearch}
                onChange={(e) => onCustomSettingChange('showSearch', e.target.checked)}
                className="mr-2"
              />
              <Label htmlFor="showSearch" className="cursor-pointer">Show Search</Label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showAccount"
                checked={!!element.customSettings?.showAccount}
                onChange={(e) => onCustomSettingChange('showAccount', e.target.checked)}
                className="mr-2"
              />
              <Label htmlFor="showAccount" className="cursor-pointer">Show Account</Label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showCart"
                checked={!!element.customSettings?.showCart}
                onChange={(e) => onCustomSettingChange('showCart', e.target.checked)}
                className="mr-2"
              />
              <Label htmlFor="showCart" className="cursor-pointer">Show Cart</Label>
            </div>
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="iconSize">Icon Size</Label>
          <Select
            value={(element.customSettings?.iconSize as string) || 'medium'}
            onValueChange={(value) => {
              onCustomSettingChange('iconSize', value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="iconColor">Icon Color</Label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              id="iconColor"
              value={element.customSettings?.iconColor as string || '#333333'}
              onChange={(e) => onCustomSettingChange('iconColor', e.target.value)}
              className="w-10 h-10 p-1 cursor-pointer border rounded"
            />
            <Input
              value={element.customSettings?.iconColor as string || '#333333'}
              onChange={(e) => onCustomSettingChange('iconColor', e.target.value)}
              placeholder="#333333"
            />
          </div>
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