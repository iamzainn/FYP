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
  editorState?: any // Optional parameter, not currently used but kept for potential future use
): React.CSSProperties => {
  // Start with base styles from the element state
  let computedStyles: React.CSSProperties = { ...(element.styles || {}) }; // Ensure element.styles exists
  
  // Apply device-specific responsive styles if available
  if (device !== 'Desktop' && element.responsiveSettings) {
    const deviceKey = device === 'Mobile' ? 'mobile' : 'tablet';
    const deviceStyles = element.responsiveSettings[deviceKey];
        
    if (deviceStyles) {
      // Merge device-specific styles over the base styles
      computedStyles = { ...computedStyles, ...deviceStyles };
      
      // Optional: Debugging in development mode
      if (process.env.NODE_ENV === 'development') {
        console.debug(
          `Applied ${device} styles to ${element.id} (${element.type}): `, 
          deviceStyles
        );
      }
    }
  }
  
  // REMOVED: The logic for applying affectsStyles from custom settings is now handled 
  // directly in the Settings.tsx -> handleChangeCustomValues function when the setting changes.
  // This ensures the base element.styles object is updated directly.
  /*
  if (element.customSettings) {
    const componentDef = componentRegistry.getComponent(element.type as string);
    if (componentDef && componentDef.config.customSettingFields) {
      for (const settingDefinition of componentDef.config.customSettingFields) {
        if (settingDefinition.affectsStyles && settingDefinition.id in element.customSettings) {
          const settingValue = element.customSettings[settingDefinition.id];
          for (const styleEffect of settingDefinition.affectsStyles) {
            const { property, valueMap, transform } = styleEffect;
            let styleValue = settingValue;
            if (valueMap && (typeof settingValue === 'string' || typeof settingValue === 'number') && settingValue in valueMap) {
              styleValue = valueMap[settingValue];
            } else if (transform && typeof transform === 'function') {
              styleValue = transform(settingValue);
            }
            if (property) {
              try {
                const styleUpdate = { [property]: styleValue };
                computedStyles = { ...computedStyles, ...styleUpdate };
              } catch (error) { console.error(...); }
            }
          }
        }
      }
    }
  }
  */
  
  // Return the final computed styles (Base + Responsive)
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