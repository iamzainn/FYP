/**
 * Component System Bootstrap
 * Central initialization and factory access point
 */

// Re-export the factory functions
import { LeafComponentConfig, createLeafComponent as originalCreateLeafComponent } from './factories/createLeafComponent';
import { ContainerComponentConfig, createContainerComponent as originalCreateContainerComponent } from './factories/createContainerComponent';
// import { createComponentConfig } from './factories/createComponentConfig';

// Track initialization status
let isInitialized = false;

// Ensure components are only registered once
// const registeredComponents = new Set<string>();

// Re-export with safety checks
export const createLeafComponent = (config: LeafComponentConfig) => {
  console.log('Bootstrap: Creating leaf component', config.type);
  return originalCreateLeafComponent(config);
};

export const createContainerComponent = (config: ContainerComponentConfig) => {
  console.log('Bootstrap: Creating container component', config.type);
  return originalCreateContainerComponent(config);
};



// Initialize the component system
export const initializeComponentSystem = () => {
  if (isInitialized) {
    console.log('Component system already initialized');
    return true;
  }
  
  console.log('🚀 Initializing component system...');
  isInitialized = true;
  return true;
};

// Auto-initialize when imported
initializeComponentSystem(); 