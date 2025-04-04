/**
 * Factory for creating component configurations
 * Provides a standardized way to define component configurations
 */
import { ComponentConfig } from '../Core/types';

console.log('📦 createComponentConfig.ts loading');

// Add this debug statement
console.log('createComponentConfig module initializing');

/**
 * Creates a base component configuration with defaults
 */
console.log('📦 createComponentConfig function is ready:', typeof createComponentConfig);

export function createComponentConfig(config: Partial<ComponentConfig>): ComponentConfig {
  console.log('🔧 createComponentConfig called with:', config?.type);
  // Ensure required properties are provided
  if (!config.type) throw new Error('Component type is required');
  if (!config.name) throw new Error('Component name is required');
  
  // Return with defaults
  return {
    category: 'elements',
    defaultStyles: {},
    responsiveStyles: true,
    ...config,
    // Ensure type and name are set
    type: config.type,
    name: config.name
  };
}