import React from 'react';
import { createLeafComponent, LeafComponentConfig } from '../../../factories/createLeafComponent';
import { ContentFieldDefinition, ComponentSettingDefinition, StyleEffect, BaseComponentProps, EditorComponentHelpers } from '../../../Core/types';

const productBadgeConfig: LeafComponentConfig = {
  type: 'productBadge',
  name: 'Product Badge',
  category: 'elements',
  
  styles: {
    fontFamily: 'inherit',
    fontSize: '0.75rem',
    fontWeight: '600',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    backgroundColor: '#EF4444', // Default red for "sale"
    color: '#FFFFFF',
    position: 'absolute',
    top: '0.75rem',
    left: '0.75rem',
    zIndex: '5',
    textTransform: 'uppercase',
    letterSpacing: '0.025em',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  },
  
  content: {
    text: 'Sale',
  },
  
  customSettings: {
    badgeType: 'sale',
    position: 'topLeft',
  },
  
  responsiveSettings: {
    mobile: {
      fontSize: '0.6875rem',
      padding: '0.1875rem 0.4375rem',
    },
    tablet: {
      fontSize: '0.75rem',
    }
  },
  
  contentFields: [
    {
      id: 'text',
      label: 'Badge Text',
      type: 'text',
      defaultValue: 'Sale'
    }
  ] as ContentFieldDefinition[],
  
  customSettingFields: [
    {
      id: 'badgeType',
      label: 'Badge Type',
      type: 'select',
      options: [
        { value: 'sale', label: 'Sale' },
        { value: 'new', label: 'New' },
        { value: 'bestSeller', label: 'Best Seller' },
        { value: 'limited', label: 'Limited Edition' },
        { value: 'custom', label: 'Custom' }
      ],
      defaultValue: 'sale',
      affectsStyles: [
        {
          property: 'backgroundColor',
          valueMap: {
            sale: '#EF4444', // Red
            new: '#3B82F6', // Blue
            bestSeller: '#F59E0B', // Amber
            limited: '#8B5CF6', // Purple
            custom: '#6B7280' // Gray
          }
        }
      ] as StyleEffect[]
    },
    {
      id: 'position',
      label: 'Position',
      type: 'select',
      options: [
        { value: 'topLeft', label: 'Top Left' },
        { value: 'topRight', label: 'Top Right' },
        { value: 'bottomLeft', label: 'Bottom Left' },
        { value: 'bottomRight', label: 'Bottom Right' }
      ],
      defaultValue: 'topLeft',
      affectsStyles: [
        {
          property: 'top',
          valueMap: {
            topLeft: '0.75rem',
            topRight: '0.75rem',
            bottomLeft: 'auto',
            bottomRight: 'auto'
          }
        },
        {
          property: 'bottom',
          valueMap: {
            topLeft: 'auto',
            topRight: 'auto',
            bottomLeft: '0.75rem',
            bottomRight: '0.75rem'
          }
        },
        {
          property: 'left',
          valueMap: {
            topLeft: '0.75rem',
            topRight: 'auto',
            bottomLeft: '0.75rem',
            bottomRight: 'auto'
          }
        },
        {
          property: 'right',
          valueMap: {
            topLeft: 'auto',
            topRight: '0.75rem',
            bottomLeft: 'auto',
            bottomRight: '0.75rem'
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
    
    const badgeText = getContentValue('text', 'Sale');
    const badgeType = getCustomSetting('badgeType', 'sale') as 'sale' | 'new' | 'bestSeller' | 'limited' | 'custom';
    
    // Generate default text based on badge type if not customized
    let displayText = badgeText;
    if (badgeType !== 'custom' && badgeText === 'Sale') {
      switch (badgeType) {
        case 'new':
          displayText = 'New';
          break;
        case 'bestSeller':
          displayText = 'Best Seller';
          break;
        case 'limited':
          displayText = 'Limited';
          break;
      }
    }
    
    return (
      <div style={computedStyles}>
        {displayText}
      </div>
    );
  }
};

export const ProductBadgeComponent = createLeafComponent(productBadgeConfig);
export default ProductBadgeComponent;
