/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Utility functions for components
 */
import { EditorElement, DeviceTypes } from '@/providers/editor/editor-provider';

/**
 * Recursively finds an element by ID in the elements tree
 */
export const findElementById = (
  elements: EditorElement[],
  id: string
): EditorElement | undefined => {
  for (const element of elements) {
    if (element.id === id) return element;
    
    if (Array.isArray(element.content)) {
      const found = findElementById(element.content, id);
      if (found) return found;
    }
  }
  
  return undefined;
};

/**
 * Gets a content value from an element
 */
export const getContentValue = <T>(
  element: EditorElement,
  fieldId: string,
  defaultValue: T
): T => {
  try {
    if (
      typeof element.content === 'object' &&
      element.content !== null &&
      !Array.isArray(element.content) &&
      fieldId in (element.content as Record<string, any>)
    ) {
      return (element.content as Record<string, any>)[fieldId] as T;
    }
  } catch (error) {
    console.error(`Error getting content value for ${fieldId}:`, error);
  }
  
  return defaultValue;
};

/**
 * Gets a custom setting value from an element
 */
export const getCustomSetting = <T>(
  element: EditorElement,
  settingId: string,
  defaultValue: T
): T => {
  try {
    if (element.customSettings && settingId in element.customSettings) {
      return element.customSettings[settingId] as T;
    }
  } catch (error) {
    console.error(`Error getting custom setting for ${settingId}:`, error);
  }
  
  return defaultValue;
};

/**
 * Gets a responsive style value based on the current device
 */
export const getResponsiveValue = <T>(
  element: EditorElement,
  property: string,
  device: DeviceTypes,
  defaultValue: T
): T => {
  try {
    // Convert device name to lowercase for responsiveSettings keys
    const deviceKey = device === 'Desktop' ? 'desktop' : 
                     device === 'Mobile' ? 'mobile' : 'tablet';
    
    // First check device-specific override
    if (
      element.responsiveSettings && 
      deviceKey !== 'desktop' &&
      element.responsiveSettings[deviceKey as 'mobile' | 'tablet']
    ) {
      const deviceStyles = element.responsiveSettings[deviceKey as 'mobile' | 'tablet'];
      if (deviceStyles && property in deviceStyles) {
        return deviceStyles[property as keyof typeof deviceStyles] as unknown as T;
      }
    }
    
    // Fallback to base styles
    if (element.styles && property in element.styles) {
      return element.styles[property as keyof typeof element.styles] as unknown as T;
    }
  } catch (error) {
    console.error(`Error getting responsive value for ${property} (${device}):`, error);
  }
  
  // Use default if nothing found
  return defaultValue;
};

/**
 * Combines all responsive styles for the current device
 */
export const getResponsiveStyles = (
  element: EditorElement,
  device: DeviceTypes
): React.CSSProperties => {
  try {
    const baseStyles = element.styles || {};
    
    // Convert device name to lowercase for responsiveSettings keys
    const deviceKey = device === 'Desktop' ? 'desktop' : 
                     device === 'Mobile' ? 'mobile' : 'tablet';
    
    // If we're on desktop, just return base styles
    if (deviceKey === 'desktop') return baseStyles;
    
    // For tablet/mobile, merge with responsive overrides
    if (element.responsiveSettings && 
        element.responsiveSettings[deviceKey as 'mobile' | 'tablet']) {
      // Get device-specific styles
      const deviceStyles = element.responsiveSettings[deviceKey as 'mobile' | 'tablet'];
      
      // Return merged styles
      return {
        ...baseStyles,
        ...deviceStyles
      };
    }
    
    return baseStyles;
  } catch (error) {
    console.error(`Error computing responsive styles for ${device}:`, error);
    return element.styles || {};
  }
};

/**
 * Creates class names conditionally
 */
export const cn = (...classes: (string | boolean | undefined)[]): string => {
  return classes.filter(Boolean).join(' ');
};