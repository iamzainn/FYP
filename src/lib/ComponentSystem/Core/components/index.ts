// This file serves as the central registry for all components

// Layout components
export { default as HeroSectionComponent } from './HeroSection';
// export { default as HeaderSectionComponent } from './HeaderSection';

// Element components
export { default as HeadingComponent } from './Heading';
export { default as ButtonComponent } from './Button';


// Register all components to make sure they're available
// This is imported directly by the app
export const registerAllComponents = () => {
  // These imports ensure the components are registered
  import('./HeroSection');

  import('./Heading');
  import('./Button');

  
  console.log('All components registered');
};
