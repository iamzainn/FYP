/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Style processor for components
 * Handles computation of styles based on responsive settings and custom setting effects on styles
 */
import { EditorElement, DeviceTypes } from '@/providers/editor/editor-provider';
import { componentRegistry } from './registry';

/**
 * Process a component's styles based on current device and custom settings
 * 
 * @param element The editor element to process styles for
 * @param device Current device type (Desktop, Tablet, Mobile)
 * @param editorState Current editor state for context (optional)
 * @returns Computed styles for the element
 */
export const computeStyles = (
  element: EditorElement,
  device: DeviceTypes,
  editorState?: any
): React.CSSProperties => {
  // Start with base styles
  let computedStyles: React.CSSProperties = { ...element.styles };
  
  // Apply device-specific styles if available
  if (device !== 'Desktop' && element.responsiveSettings) {
    const deviceKey = device === 'Mobile' ? 'mobile' : 'tablet';
    const deviceStyles = element.responsiveSettings[deviceKey];
        
    if (deviceStyles) {
      // Safely merge device-specific styles
      computedStyles = { ...computedStyles, ...deviceStyles };
      
      // Debug responsiveness in development
      if (process.env.NODE_ENV === 'development') {
        console.debug(
          `Applied ${device} styles to ${element.id} (${element.type}): `, 
          deviceStyles
        );
      }
    }
  }
  
  // Apply effects from custom settings on styles
  if (element.customSettings) {
    // Get component definition
    const componentDef = componentRegistry.getComponent(element.type as string);
    if (componentDef && componentDef.config.customSettings) {
      // For each custom setting that affects styles
      for (const setting of componentDef.config.customSettings) {
        if (setting.affectsStyles && setting.id in element.customSettings) {
          const settingValue = element.customSettings[setting.id];
          
          // Apply each style effect
          for (const styleEffect of setting.affectsStyles) {
            const { property, valueMap, transform } = styleEffect;
            
            // Determine the actual style value
            let styleValue = settingValue;
            
            // Apply value mapping if provided
            if (valueMap && typeof settingValue === 'string' && settingValue in valueMap) {
              styleValue = valueMap[settingValue];
            }
            // Apply transform function if provided
            else if (transform && typeof transform === 'function') {
              styleValue = transform(settingValue);
            }
            
            // Safely set the computed style with proper type handling
            if (property) {
              try {
                // Use an object to safely set the property
                const styleUpdate = { [property]: styleValue };
                // Merge with computed styles
                computedStyles = { ...computedStyles, ...styleUpdate };
              } catch (error) {
                console.error(`Error applying style ${property}:`, error);
              }
            }
          }
        }
      }
    }
  }
  
  return computedStyles;
};

/**
 * Apply selection styling in edit mode
 */
export const applySelectionStyles = (
  styles: React.CSSProperties,
  isSelected: boolean,
  isLive: boolean
): React.CSSProperties => {
  if (isLive) return styles;
  
  return {
    ...styles,
    ...(isSelected ? {
      outline: '2px solid #3b82f6',
      outlineOffset: '2px',
    } : {
      outline: '1px dashed #cbd5e1',
      outlineOffset: '2px',
    })
  };
}; 