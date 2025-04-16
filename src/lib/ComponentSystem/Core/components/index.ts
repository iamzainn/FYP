// This file serves as the central registry for all components

// Layout components
export { default as HeroSectionComponent } from './HeroSection';
// export { default as HeaderSectionComponent } from './HeaderSection';

// Element components
export { default as HeadingComponent } from './Heading';
export { default as ButtonComponent } from './Button';
export { default as ProductImageComponent } from './Product/ProductImage';
export { default as ProductDescriptionComponent } from './Product/ProductDescription';
export { default as ProductBadgeComponent } from './Product/ProductBadge';
export { default as ProductFeatureListComponent } from './Product/ProductFeatureListComponent';
export { default as ProductPriceComponent } from './Product/ProductPrice';
export { default as ProductShowcaseHeroComponent } from './Product/ProductShowcaseHero';


// Register all components to make sure they're available
// This is imported directly by the app
export const registerAllComponents = () => {
  // These imports ensure the components are registered
  import('./HeroSection');
  import('./Heading');
  import('./Button');
  import('./Product/ProductImage');
  import('./Product/ProductDescription');
  import('./Product/ProductFeatureListComponent');
  import('./Product/ProductBadge');
  import('./Product/ProductPrice');
  import('./Product/ProductShowcaseHero');
  

  console.log('All components registered');
};
