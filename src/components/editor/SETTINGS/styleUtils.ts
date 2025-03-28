import { EditorElement } from '@/providers/editor/editor-provider'
import { CSSProperties } from 'react';

type DeviceType = 'Desktop' | 'Tablet' | 'Mobile'

/**
 * Gets the style value for a specific property based on the current device,
 * with fallback to base styles if the property isn't defined for the current device
 */
export function getResponsiveValue(
  element: EditorElement,
  property: string,
  currentDevice: DeviceType
): string | number | undefined {
  // For Desktop, just return the base style
  if (currentDevice === 'Desktop') {
    return element.styles[property as keyof CSSProperties];
  }
  
  // For Tablet or Mobile, check device-specific styles first
  const deviceKey = currentDevice === 'Mobile' ? 'mobile' : 'tablet';
  
  if (
    element.responsiveSettings && 
    element.responsiveSettings[deviceKey] && 
    element.responsiveSettings[deviceKey][property as keyof CSSProperties] !== undefined
  ) {
    return element.responsiveSettings[deviceKey][property as keyof CSSProperties];
  }
  
  // Fall back to base style if not found in device-specific styles
  return element.styles[property as keyof CSSProperties];
} 