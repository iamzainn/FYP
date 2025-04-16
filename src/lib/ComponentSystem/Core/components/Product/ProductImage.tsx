import React from 'react';
import { createLeafComponent, LeafComponentConfig } from '../../../factories/createLeafComponent';
import { ContentFieldDefinition, ComponentSettingDefinition, StyleEffect, BaseComponentProps, EditorComponentHelpers } from '../../../Core/types';

const productImageConfig: LeafComponentConfig = {
  type: 'productImage',
  name: 'Product Image',
  category: 'elements',
  
  styles: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    display: 'block',
    maxWidth: '100%',
    borderRadius: '8px',
    padding: '0',
    margin: '0',
    transition: 'transform 0.3s ease',
    boxSizing: 'border-box',
    zIndex: '1',
  },
  
  content: {
    src: 'https://placehold.co/600x400/f4f4f5/555555?text=Product+Image',
    alt: 'Product Image',
  },
  
  customSettings: {
    imageStyle: 'standard',
    showShadow: true,
    hoverEffect: 'none',
  },
  
  responsiveSettings: {
    mobile: {
      maxHeight: '300px',
    },
    tablet: {
      maxHeight: '400px',
    }
  },
  
  contentFields: [
    {
      id: 'src',
      label: 'Image Source',
      type: 'image',
      defaultValue: 'https://placehold.co/600x400/f4f4f5/555555?text=Product+Image'
    },
    {
      id: 'alt',
      label: 'Alt Text',
      type: 'text',
      defaultValue: 'Product Image'
    }
  ] as ContentFieldDefinition[],
  
  customSettingFields: [
    {
      id: 'imageStyle',
      label: 'Image Style',
      type: 'select',
      options: [
        { value: 'standard', label: 'Standard' },
        { value: 'floating', label: 'Floating' },
        { value: 'framed', label: 'Framed' },
        { value: 'circle', label: 'Circle' }
      ],
      defaultValue: 'standard',
      affectsStyles: [
        {
          property: 'boxShadow',
          valueMap: {
            standard: 'none',
            floating: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            framed: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)',
            circle: 'none'
          }
        },
        {
          property: 'borderRadius',
          valueMap: {
            standard: '8px',
            floating: '12px',
            framed: '4px',
            circle: '50%'
          }
        }
      ] as StyleEffect[]
    },
    {
      id: 'showShadow',
      label: 'Show Shadow',
      type: 'boolean',
      defaultValue: true,
      affectsStyles: [
        {
          property: 'boxShadow',
          transform: (value: boolean) => value ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none'
        }
      ] as StyleEffect[]
    },
    {
      id: 'hoverEffect',
      label: 'Hover Effect',
      type: 'select',
      options: [
        { value: 'none', label: 'None' },
        { value: 'zoom', label: 'Zoom' },
        { value: 'rotate', label: 'Rotate' },
        { value: 'fade', label: 'Fade' }
      ],
      defaultValue: 'none'
    }
  ] as ComponentSettingDefinition[],
  
  render: (props: BaseComponentProps & EditorComponentHelpers) => {
    const {
      
      styles: computedStyles,
      getContentValue,
      getCustomSetting,
      isLiveMode
    } = props;
    
    const src = getContentValue('src', 'https://placehold.co/600x400/f4f4f5/555555?text=Product+Image');
    const alt = getContentValue('alt', 'Product Image');
    const hoverEffect = getCustomSetting('hoverEffect', 'none') as 'none' | 'zoom' | 'rotate' | 'fade';
    
    // Additional styles for hover effects in live mode
    const liveStyles: React.CSSProperties = {};
    if (isLiveMode) {
      // Only add hover styles in live mode
      // These would be applied via CSS in a real implementation
      switch (hoverEffect) {
        case 'zoom':
          liveStyles.transform = 'scale(1.05)';
          break;
        case 'rotate':
          liveStyles.transform = 'rotate(2deg)';
          break;
        case 'fade':
          liveStyles.opacity = '0.8';
          break;
      }
    }
    
    return (
      <img
        src={src}
        alt={alt}
        style={computedStyles}
        className={isLiveMode ? 'product-image-with-hover' : ''}
        data-hover-effect={hoverEffect}
      />
    );
  }
};

export const ProductImageComponent = createLeafComponent(productImageConfig);
export default ProductImageComponent;
