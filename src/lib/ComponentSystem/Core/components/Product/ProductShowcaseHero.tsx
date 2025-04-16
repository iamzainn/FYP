import React from 'react';
import { createContainerComponent, ContainerComponentConfig } from '../../../factories/createContainerComponent';
import { ComponentSettingDefinition, StyleEffect, ChildEffect, BaseComponentProps, EditorComponentHelpers } from '../../../Core/types';
import { EditorElement } from '@/providers/editor/editor-provider';
import { componentRegistry } from '../../registry';

// Define the component configuration using the ContainerComponentConfig type
const productShowcaseHeroConfig: ContainerComponentConfig = {
  type: 'productShowcaseHero',
  name: 'Product Showcase Hero',
  category: 'compound',

  // Default values applied when creating an instance
  styles: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    minHeight: '400px',
    paddingTop: '40px',
    paddingBottom: '40px',
    paddingLeft: '40px',
    paddingRight: '40px',
    marginTop: '0px',
    marginBottom: '0px',
    marginLeft: '0px',
    marginRight: '0px',
    backgroundColor: '#ffffff',
    color: '#333333',
    boxSizing: 'border-box',
    gap: '40px',
    position: 'relative',
    overflow: 'hidden',
  },
  
  customSettings: {
    layoutVariant: 'productLeft',
    contentAlignment: 'start',
    contentSpacing: 24,
    contentWidth: 50,
    colorScheme: 'light',
    accentColor: '#3b82f6',
  },
  
  responsiveSettings: {
    mobile: {
      flexDirection: 'column',
      minHeight: '300px',
      paddingTop: '30px',
      paddingBottom: '30px',
      paddingLeft: '20px',
      paddingRight: '20px',
      gap: '20px',
    },
    tablet: {
      minHeight: '350px',
      paddingTop: '35px',
      paddingBottom: '35px',
      paddingLeft: '30px',
      paddingRight: '30px',
      gap: '30px',
    }
  },

  // Custom settings definitions
  customSettingFields: [
    {
      id: 'layoutVariant',
      label: 'Layout Style',
      type: 'select',
      options: [
        { value: 'productLeft', label: 'Product on Left' },
        { value: 'productRight', label: 'Product on Right' },
        { value: 'productCenter', label: 'Product Centered' }
      ],
      defaultValue: 'productLeft',
      affectsStyles: [
        {
          property: 'flexDirection',
          valueMap: { 
            'productLeft': 'row',
            'productRight': 'row-reverse',
            'productCenter': 'column'
          }
        }
      ] as StyleEffect[],
      affectsChildren: [
        {
          targetType: 'heading',
          valueMap: {
            'productLeft': { styles: { textAlign: 'left' } },
            'productRight': { styles: { textAlign: 'left' } },
            'productCenter': { styles: { textAlign: 'center' } }
          }
        },
        {
          targetType: 'productDescription',
          valueMap: {
            'productLeft': { styles: { textAlign: 'left' } },
            'productRight': { styles: { textAlign: 'left' } },
            'productCenter': { styles: { textAlign: 'center' } }
          }
        },
        {
          targetType: 'button',
          valueMap: {
            'productCenter': { styles: { margin: '0 auto' } }
          }
        }
      ] as ChildEffect[]
    },
    {
      id: 'contentAlignment',
      label: 'Content Alignment',
      type: 'select',
      options: [
        { value: 'start', label: 'Top' },
        { value: 'center', label: 'Center' },
        { value: 'end', label: 'Bottom' }
      ],
      defaultValue: 'start',
      affectsStyles: [
        {
          property: 'alignItems',
          transform: (value) => value
        }
      ] as StyleEffect[]
    },
    {
      id: 'contentSpacing',
      label: 'Content Spacing',
      type: 'range',
      defaultValue: 24,
      min: 8,
      max: 48,
      step: 4,
      affectsStyles: [
        {
          property: 'gap',
          transform: (value) => `${value}px`
        }
      ] as StyleEffect[]
    },
    {
      id: 'contentWidth',
      label: 'Content Width (%)',
      type: 'range',
      defaultValue: 50,
      min: 30,
      max: 70,
      step: 5
    },
    {
      id: 'colorScheme',
      label: 'Color Scheme',
      type: 'select',
      options: [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
        { value: 'brand', label: 'Brand' },
        { value: 'custom', label: 'Custom' }
      ],
      defaultValue: 'light',
      affectsStyles: [
        {
          property: 'backgroundColor',
          valueMap: {
            'light': '#ffffff',
            'dark': '#1f2937',
            'brand': '#f0f7ff',
            'custom': '#ffffff'
          }
        },
        {
          property: 'color',
          valueMap: {
            'light': '#333333',
            'dark': '#f9fafb',
            'brand': '#333333',
            'custom': '#333333'
          }
        }
      ] as StyleEffect[],
      affectsChildren: [
        {
          targetType: 'heading',
          valueMap: {
            'light': { styles: { color: '#111827' } },
            'dark': { styles: { color: '#f9fafb' } },
            'brand': { styles: { color: '#111827' } }
          }
        },
        {
          targetType: 'productDescription',
          valueMap: {
            'light': { styles: { color: '#4B5563' } },
            'dark': { styles: { color: '#D1D5DB' } },
            'brand': { styles: { color: '#4B5563' } }
          }
        }
      ] as ChildEffect[]
    },
    {
      id: 'accentColor',
      label: 'Accent Color',
      type: 'color',
      defaultValue: '#3b82f6',
      affectsChildren: [
        {
          targetType: 'button',
          valueMap: {
            // This will be dynamically processed using the transform function
          }
        }
      ] as ChildEffect[]
    }
  ] as ComponentSettingDefinition[],

  // Child component configuration
  childrenConfig: {
    allowed: ['productImage', 'heading', 'productPrice', 'productDescription', 'productFeatureList', 'button', 'productBadge'],
    createDefaultChildren: () => {
      // Create default children using registry
      const productImageInstance = componentRegistry.createInstance('productImage');
      
      const headingInstance = componentRegistry.createInstance('heading');
      if (headingInstance.content && typeof headingInstance.content === 'object' && !Array.isArray(headingInstance.content)) {
        headingInstance.content.innerText = 'Premium Product Name';
      }
      
      const productDescriptionInstance = componentRegistry.createInstance('productDescription');
      
      const primaryButtonInstance = componentRegistry.createInstance('button');
      if (primaryButtonInstance.content && typeof primaryButtonInstance.content === 'object' && !Array.isArray(primaryButtonInstance.content)) {
        primaryButtonInstance.content.innerText = 'Shop Now';
      }
      primaryButtonInstance.styles = {
        ...primaryButtonInstance.styles,
        marginTop: '24px'
      };
      
      const secondaryButtonInstance = componentRegistry.createInstance('button');
      if (secondaryButtonInstance.content && typeof secondaryButtonInstance.content === 'object' && !Array.isArray(secondaryButtonInstance.content)) {
        secondaryButtonInstance.content.innerText = 'Learn More';
      }
      secondaryButtonInstance.customSettings = {
        ...secondaryButtonInstance.customSettings,
        buttonVariant: 'outline'
      };
      secondaryButtonInstance.styles = {
        ...secondaryButtonInstance.styles,
        marginTop: '24px',
        marginLeft: '12px'
      };
      
      const productBadgeInstance = componentRegistry.createInstance('productBadge');
      
      return [
        productImageInstance,
        headingInstance,
        productDescriptionInstance,
        primaryButtonInstance,
        secondaryButtonInstance,
        productBadgeInstance
      ] as Partial<EditorElement>[];
    }
  },

  // The actual React component rendering function
  render: (props: BaseComponentProps & EditorComponentHelpers & { childrenContainer: React.ReactNode }) => {
    const {
      childrenContainer,
      styles: computedStyles,
      element,
      getCustomSetting
    } = props;

    const layoutVariant = getCustomSetting('layoutVariant', 'productLeft') as 'productLeft' | 'productRight' | 'productCenter';
    const contentWidth = getCustomSetting('contentWidth', 50);
    
    // Create flexible container layout based on settings
    const containerStyle: React.CSSProperties = {
      ...computedStyles
    };
    
    // Create content sections with appropriate widths
    const productSectionStyle: React.CSSProperties = {
      flex: `0 0 ${layoutVariant === 'productCenter' ? '100%' : `${100 - contentWidth}%`}`,
      position: 'relative', // For badges positioning
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };
    
    const contentSectionStyle: React.CSSProperties = {
      flex: `0 0 ${layoutVariant === 'productCenter' ? '100%' : `${contentWidth}%`}`,
      display: 'flex',
      flexDirection: 'column'
    };
    
    // Find our direct child elements by type
    const findChildByType = (type: string): EditorElement | undefined => {
      if (!Array.isArray(element.content)) return undefined;
      return element.content.find(child => child.type === type);
    };
    
    const productImageElement = findChildByType('productImage');
    const productBadgeElement = findChildByType('productBadge');
    
    // Add class names for styling hooks
    const containerClassName = `product-showcase-hero product-layout-${layoutVariant}`;
    
    return (
      <section style={containerStyle} className={containerClassName}>
        {layoutVariant === 'productCenter' ? (
          <div className="product-showcase-layout-center">
            <div className="product-image-container" style={productSectionStyle}>
              {productImageElement && productBadgeElement && (
                <div className="product-image-wrapper" style={{ position: 'relative' }}>
                  {childrenContainer}
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="product-image-container" style={productSectionStyle}>
              {productImageElement && (
                <div className="product-image-wrapper" style={{ position: 'relative' }}>
                  {productImageElement && React.cloneElement(
                    productImageElement as unknown as React.ReactElement
                  )}
                  {productBadgeElement && React.cloneElement(
                    productBadgeElement as unknown as React.ReactElement
                  )}
                </div>
              )}
            </div>
            <div className="product-content-container" style={contentSectionStyle}>
              {childrenContainer}
            </div>
          </>
        )}
      </section>
    );
  }
};

// Create and register the component using the factory
export const ProductShowcaseHeroComponent = createContainerComponent(productShowcaseHeroConfig);
export default ProductShowcaseHeroComponent;
