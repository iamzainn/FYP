import React from 'react';
import { createLeafComponent, LeafComponentConfig } from '../../../factories/createLeafComponent';
import { ContentFieldDefinition, ComponentSettingDefinition, StyleEffect, BaseComponentProps, EditorComponentHelpers } from '../../types';

const productPriceConfig: LeafComponentConfig = {
  type: 'productPrice',
  name: 'Product Price',
  category: 'elements',
  
  styles: {
    fontFamily: 'inherit',
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#111827',
    margin: '0.5rem 0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    lineHeight: '1.2',
  },
  
  content: {
    price: '$99.99',
    originalPrice: '$129.99',
  },
  
  customSettings: {
    showOriginalPrice: true,
    priceSize: 'medium',
  },
  
  responsiveSettings: {
    mobile: {
      fontSize: '1.25rem',
    },
    tablet: {
      fontSize: '1.375rem',
    }
  },
  
  contentFields: [
    {
      id: 'price',
      label: 'Current Price',
      type: 'text',
      defaultValue: '$99.99'
    },
    {
      id: 'originalPrice',
      label: 'Original Price (if on sale)',
      type: 'text',
      defaultValue: '$129.99'
    }
  ] as ContentFieldDefinition[],
  
  customSettingFields: [
    {
      id: 'showOriginalPrice',
      label: 'Show Original Price',
      type: 'boolean',
      defaultValue: true,
    },
    {
      id: 'priceSize',
      label: 'Price Size',
      type: 'select',
      options: [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' }
      ],
      defaultValue: 'medium',
      affectsStyles: [
        {
          property: 'fontSize',
          valueMap: {
            small: '1.125rem',
            medium: '1.5rem',
            large: '2rem'
          }
        }
      ] as StyleEffect[]
    }
  ] as ComponentSettingDefinition[],
  
  render: (props: BaseComponentProps & EditorComponentHelpers) => {
    const {
      styles: computedStyles,
      getContentValue,
      getCustomSetting,
    } = props;
    
    const price = getContentValue('price', '$99.99');
    const originalPrice = getContentValue('originalPrice', '$129.99');
    const showOriginalPrice = getCustomSetting('showOriginalPrice', true);
    
    return (
      <div style={computedStyles}>
        <span style={{ fontWeight: 'bold' }}>{price}</span>
        
        {showOriginalPrice && (
          <span style={{
            textDecoration: 'line-through',
            color: '#6B7280',
            fontSize: '0.875em',
            fontWeight: 'normal'
          }}>
            {originalPrice}
          </span>
        )}
      </div>
    );
  }
};

export const ProductPriceComponent = createLeafComponent(productPriceConfig);
export default ProductPriceComponent;
