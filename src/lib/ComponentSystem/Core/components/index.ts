// This file serves as the central registry for all components

// Layout components
export { default as HeroSectionComponent } from './HeroSection';
export { default as HeaderSectionComponent } from './HeaderSection';

// Element components
export { default as HeadingComponent } from './Heading';
export { default as ButtonComponent } from './Button';
export { default as LogoComponent } from './Logo';
export { default as NavigationComponent } from './Navigation';
export { default as NavigationItemComponent } from './NavigationItem';
export { default as HeaderActionsComponent } from './HeaderActions';

// Register all components to make sure they're available
// This is imported directly by the app
export const registerAllComponents = () => {
  // These imports ensure the components are registered
  import('./HeroSection');
  import('./HeaderSection');
  import('./Heading');
  import('./Button');
  import('./Logo');
  import('./Navigation');
  import('./NavigationItem');
  import('./HeaderActions');
  
  console.log('All components registered');
};
