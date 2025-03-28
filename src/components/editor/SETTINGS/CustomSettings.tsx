/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'
import { EditorElement } from '@/providers/editor/editor-provider'
import { ButtonInput, ColorInput, SelectInput, TextInput } from './SettingsInput'
import {  Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


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
  defaultValue?: string | number;
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
  'header': {
    title: 'Header Settings',
    settings: [
      {
        id: 'stickyHeader',
        label: 'Sticky Header (Fixed at top)',
        type: 'checkbox'
      },
      {
        id: 'showMobileMenu',
        label: 'Show Mobile Menu',
        type: 'checkbox'
      }
    ]
  },
  'navigation': {
    title: 'Navigation Settings',
    settings: [
      {
        id: 'justifyContent',
        label: 'Layout',
        type: 'select',
        options: [
          { value: 'flex-start', label: 'Left Aligned' },
          { value: 'center', label: 'Center Aligned' },
          { value: 'flex-end', label: 'Right Aligned' },
          { value: 'space-between', label: 'Space Between' },
          { value: 'space-around', label: 'Space Around' }
        ]
      }
    ]
  },
  'navItem': {
    title: 'Navigation Item Settings',
    settings: [
      {
        id: 'innerText',
        label: 'Link Text',
        type: 'text'
      },
      {
        id: 'href',
        label: 'Link URL',
        type: 'text'
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
        id: 'fontWeight',
        label: 'Style',
        type: 'select',
        options: [
          { value: 'normal', label: 'Normal' },
          { value: 'bold', label: 'Bold' },
          { value: 'italic', label: 'Italic' }
        ]
      },
      {
        id: 'textDecoration',
        label: 'Text Decoration',
        type: 'select',
        options: [
          { value: 'none', label: 'None' },
          { value: 'underline', label: 'Underline' }
        ]
      },
      {
        id: 'fontStyle',
        label: 'Font Style',
        type: 'select',
        options: [
          { value: 'normal', label: 'Normal' },
          { value: 'italic', label: 'Italic' }
          
        ]
      }
    ]
  }
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

  // Header Settings
  if (element.type === 'header') {
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium">Header Settings</h3>
        
        {/* Header Layout - Simplified to just left/right options */}
        <div className="grid gap-2">
          <Label>Logo Position</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant={element.customSettings?.headerLayout !== 'logo-right' ? 'default' : 'outline'}
              size="sm"
              className="w-full"
              onClick={() => {
                // Find the navigation element
                if (Array.isArray(element.content)) {
                  const navElement = element.content.find(item => item.name === 'Navigation');
                  
                  if (navElement) {
                    // Update both headerLayout and navigation justifyContent in one operation
                    const updatedContent = element.content.map(item => {
                      if (item.name === 'Navigation') {
                        return {
                          ...item,
                          styles: {
                            ...item.styles,
                            justifyContent: 'flex-end' // Right-aligned for logo-left
                          }
                        };
                      }
                      return item;
                    });
                    
                    // Update the entire element with both changes
                    handleUpdateElement({
                      ...element,
                      customSettings: {
                        ...element.customSettings,
                        headerLayout: 'logo-left'
                      },
                      content: updatedContent
                    });
                  } else {
                    // If no navigation element found, just update the header layout
                    onCustomSettingChange('headerLayout', 'logo-left');
                  }
                } else {
                  onCustomSettingChange('headerLayout', 'logo-left');
                }
              }}
            >
              Logo Left
            </Button>
            
            <Button 
              variant={element.customSettings?.headerLayout === 'logo-right' ? 'default' : 'outline'}
              size="sm"
              className="w-full"
              onClick={() => {
                // Find the navigation element
                if (Array.isArray(element.content)) {
                  const navElement = element.content.find(item => item.name === 'Navigation');
                  
                  if (navElement) {
                    // Update both headerLayout and navigation justifyContent in one operation
                    const updatedContent = element.content.map(item => {
                      if (item.name === 'Navigation') {
                        return {
                          ...item,
                          styles: {
                            ...item.styles,
                            justifyContent: 'flex-start' // Left-aligned for logo-right
                          }
                        };
                      }
                      return item;
                    });
                    
                    // Update the entire element with both changes
                    handleUpdateElement({
                      ...element,
                      customSettings: {
                        ...element.customSettings,
                        headerLayout: 'logo-right'
                      },
                      content: updatedContent
                    });
                  } else {
                    // If no navigation element found, just update the header layout
                    onCustomSettingChange('headerLayout', 'logo-right');
                  }
                } else {
                  onCustomSettingChange('headerLayout', 'logo-right');
                }
              }}
            >
              Logo Right
            </Button>
          </div>
        </div>
        
        {/* Basic header options */}
        <div className="grid gap-2 border-t pt-4">
          <Label>Header Options</Label>
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="stickyHeader"
                checked={!!element.customSettings?.stickyHeader}
                onChange={(e) => onCustomSettingChange('stickyHeader', e.target.checked)}
                className="mr-2"
              />
              <Label htmlFor="stickyHeader" className="cursor-pointer">Sticky Header</Label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showMobileMenu"
                checked={element.customSettings?.showMobileMenu !== false}
                onChange={(e) => onCustomSettingChange('showMobileMenu', e.target.checked)}
                className="mr-2"
              />
              <Label htmlFor="showMobileMenu" className="cursor-pointer">Show Mobile Menu</Label>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Navigation Settings
  if (element.type === 'navigation') {
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium">Navigation Settings</h3>
        
        <div className="border rounded-md p-3 space-y-3">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">Navigation Items</h4>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                // Create new navigation item
                const newNavItem = {
                  id: crypto.randomUUID(),
                  name: 'Nav Item',
                  type: 'navItem',
                  content: { 
                    innerText: 'New Item', 
                    href: '#' 
                  },
                  styles: {
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    color: '#333',
                    fontWeight: 'normal',
                    textDecoration: 'none',
                  }
                };
                
                // Add to existing content
                const updatedContent = [...(element.content as any), newNavItem];
                handleUpdateElement({ ...element, content: updatedContent });
              }}
            >
              Add Item
            </Button>
          </div>
          
          {/* Navigation items management - content changes */}
          {element.content && Array.isArray(element.content) && element.content.length > 0 ? (
            element.content.map((navItem, index) => (
              <div key={navItem.id} className="flex items-center gap-2 p-2 border rounded-md bg-gray-50">
                <div className="flex-1">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">Text:</span>
                      <input
                        type="text"
                        className="border p-1 rounded-md w-full text-sm"
                        value={(navItem.content as any).innerText || ''}
                        onChange={(e) => {
                          // Create updated item with new text
                          const updatedContent = [...element.content as any];
                          updatedContent[index] = {
                            ...navItem,
                            content: {
                              ...navItem.content,
                              innerText: e.target.value
                            }
                          };
                          handleUpdateElement({ ...element, content: updatedContent });
                        }}
                        placeholder="Navigation text"
                      />
                    </div>
                    
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-500 mr-2">URL:</span>
                      <input
                        type="text"
                        className="border p-1 rounded-md w-full text-sm"
                        value={(navItem.content as any).href || '#'}
                        onChange={(e) => {
                          // Create updated item with new link
                          const updatedContent = [...element.content as any];
                          updatedContent[index] = {
                            ...navItem,
                            content: {
                              ...navItem.content,
                              href: e.target.value
                            }
                          };
                          handleUpdateElement({ ...element, content: updatedContent });
                        }}
                        placeholder="Link URL"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-7 w-7"
                    onClick={() => {
                      // Move item up
                      if (index === 0) return;
                      const updatedContent = [...element.content as any];
                      const temp = updatedContent[index];
                      updatedContent[index] = updatedContent[index - 1];
                      updatedContent[index - 1] = temp;
                      handleUpdateElement({ ...element, content: updatedContent });
                    }}
                    disabled={index === 0}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-7 w-7"
                    onClick={() => {
                      // Move item down
                      if (index === (element.content?.length || 0) - 1) return;
                      const updatedContent = [...element.content as any];
                      const temp = updatedContent[index];
                      updatedContent[index] = updatedContent[index + 1];
                      updatedContent[index + 1] = temp;
                      handleUpdateElement({ ...element, content: updatedContent });
                    }}
                    disabled={index === (element.content?.length || 0) - 1}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8"
                  onClick={() => {
                    // Remove the item
                    const updatedContent = [...element.content as any];
                    updatedContent.splice(index, 1);
                    handleUpdateElement({ ...element, content: updatedContent });
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                </Button>
              </div>
            ))
          ) : (
            <div className="text-center py-3 text-gray-500 italic">
              No navigation items. Add some items to get started.
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // NavItem Settings
  if (element.type === 'navItem') {
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium">Navigation Item Settings</h3>
        
        <div className="grid gap-2">
          <Label htmlFor="navText">Link Text</Label>
          <Input
            id="navText"
            value={(element.content as any).innerText || ''}
            onChange={(e) => handleContentChange('innerText', e.target.value)}
            placeholder="Navigation Text"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="navHref">Link URL</Label>
          <Input
            id="navHref"
            value={(element.content as any).href || '#'}
            onChange={(e) => handleContentChange('href', e.target.value)}
            placeholder="https://example.com"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="target">Open in</Label>
          <Select
            value={(element.content as any).target || '_self'}
            onValueChange={(value) => {
              handleContentChange('target', value);
            }}
          >
            <SelectTrigger id="target">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_self">Same window</SelectItem>
              <SelectItem value="_blank">New window</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="fontWeight">Style</Label>
          <div className="grid grid-cols-3 gap-2">
            <Button 
              variant="outline"
              size="sm"
              className={element.styles?.fontWeight === 'bold' ? 'border-blue-500' : ''}
              onClick={() => {
                handleStyleChange('fontWeight', element.styles?.fontWeight === 'bold' ? 'normal' : 'bold');
              }}
            >
              Bold
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className={element.styles?.textDecoration === 'underline' ? 'border-blue-500' : ''}
              onClick={() => {
                handleStyleChange('textDecoration', element.styles?.textDecoration === 'underline' ? 'none' : 'underline');
              }}
            >
              Underline
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className={element.styles?.fontStyle === 'italic' ? 'border-blue-500' : ''}
              onClick={() => {
                handleStyleChange('fontStyle', element.styles?.fontStyle === 'italic' ? 'normal' : 'italic');
              }}
            >
              Italic
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Heading settings
  if (element.type === 'heading') {
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium">Heading Settings</h3>
        
        <div className="grid gap-2">
          <Label htmlFor="headingText">Heading Text</Label>
          <Input
            id="headingText"
            value={(element.content as { innerText?: string }).innerText || ''}
            onChange={(e) => handleContentChange('innerText', e.target.value)}
            placeholder="Your heading text"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="headingLevel">Heading Level</Label>
          <Select
            value={(element.customSettings?.variant as string) || 'h2'}
            onValueChange={(value) => {
              onCustomSettingChange('variant', value);
            }}
          >
            <SelectTrigger id="headingLevel">
              <SelectValue placeholder="Select heading level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="h1">H1 - Main Heading</SelectItem>
              <SelectItem value="h2">H2 - Section Heading</SelectItem>
              <SelectItem value="h3">H3 - Subsection Heading</SelectItem>
              <SelectItem value="h4">H4 - Minor Heading</SelectItem>
              <SelectItem value="h5">H5 - Small Heading</SelectItem>
              <SelectItem value="h6">H6 - Tiny Heading</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="animation">Animation</Label>
          <Select
            value={(element.customSettings?.animation as string) || 'none'}
            onValueChange={(value) => {
              onCustomSettingChange('animation', value);
            }}
          >
            <SelectTrigger id="animation">
              <SelectValue placeholder="Select animation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="fade-in">Fade In</SelectItem>
              <SelectItem value="slide-up">Slide Up</SelectItem>
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