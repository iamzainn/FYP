/**
 * Factory for creating component configurations
 * Provides a standardized way to define component configurations
 */
import { ComponentConfig } from '../Core/types';

/**
 * Creates a base component configuration with defaults
 */
export function createComponentConfig(config: Partial<ComponentConfig>): ComponentConfig {
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