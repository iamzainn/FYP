import React from 'react';
import { createLeafComponent, LeafComponentConfig } from '../../../factories/createLeafComponent';
import { ContentFieldDefinition, ComponentSettingDefinition, StyleEffect, BaseComponentProps, EditorComponentHelpers } from '../../../Core/types';

const productFeatureListConfig: LeafComponentConfig = {
  type: 'productFeatureList',
  name: 'Product Features',
  category: 'elements',
  
  styles: {
    fontFamily: 'inherit',
    fontSize: '0.9375rem',
    lineHeight: '1.5',
    color: '#4B5563',
    margin: '1rem 0',
    paddingLeft: '1.5rem',
  },
  
  content: {
    features: 'Premium quality\nHandcrafted design\nLong-lasting materials\n30-day guarantee',
  },
  
  customSettings: {
    bulletStyle: 'check',
    columns: 1,
    spacing: 'medium',
  },
  
  responsiveSettings: {
    mobile: {
      fontSize: '0.875rem',
      columns: 1,
      paddingLeft: '1.25rem',
    },
    tablet: {
      columns: 1,
    }
  },
  
  contentFields: [
    {
      id: 'features',
      label: 'Features (one per line)',
      type: 'textarea',
      defaultValue: 'Premium quality\nHandcrafted design\nLong-lasting materials\n30-day guarantee'
    }
  ] as ContentFieldDefinition[],
  
  customSettingFields: [
    {
      id: 'bulletStyle',
      label: 'Bullet Style',
      type: 'select',
      options: [
        { value: 'disc', label: 'Disc' },
        { value: 'circle', label: 'Circle' },
        { value: 'square', label: 'Square' },
        { value: 'check', label: 'Checkmark' },
        { value: 'none', label: 'None' }
      ],
      defaultValue: 'check',
    },
    {
      id: 'columns',
      label: 'Columns',
      type: 'select',
      options: [
        { value: 1, label: '1 Column' },
        { value: 2, label: '2 Columns' }
      ],
      defaultValue: 1,
      affectsStyles: [
        {
          property: 'columnCount',
          transform: (value) => value
        }
      ] as StyleEffect[]
    },
    {
      id: 'spacing',
      label: 'Item Spacing',
      type: 'select',
      options: [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' }
      ],
      defaultValue: 'medium',
      affectsStyles: [
        {
          property: 'gap',
          valueMap: {
            small: '0.5rem',
            medium: '0.75rem',
            large: '1rem'
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
    
    const featuresText = getContentValue('features', 'Premium quality\nHandcrafted design\nLong-lasting materials\n30-day guarantee');
    const bulletStyle = getCustomSetting('bulletStyle', 'check') as 'disc' | 'circle' | 'square' | 'check' | 'none';
    const spacing = getCustomSetting('spacing', 'medium') as 'small' | 'medium' | 'large';
    
    // Convert newline-separated text to array
    const features = featuresText.split('\n').filter(Boolean);
    
    // Create styles for list items based on settings
    const itemStyle: React.CSSProperties = {
      marginBottom: spacing === 'small' ? '0.5rem' : spacing === 'medium' ? '0.75rem' : '1rem',
    };
    
    // Generate custom bullet style
    let listStyleType = 'disc';
    let customBullet = null;
    
    switch (bulletStyle) {
      case 'disc':
        listStyleType = 'disc';
        break;
      case 'circle':
        listStyleType = 'circle';
        break;
      case 'square':
        listStyleType = 'square';
        break;
      case 'check':
        listStyleType = 'none';
        customBullet = (
          <span style={{ 
            marginRight: '0.5rem', 
            color: '#10B981', 
            fontWeight: 'bold' 
          }}>
            ✓
          </span>
        );
        break;
      case 'none':
        listStyleType = 'none';
        break;
    }
    
    return (
      <ul style={{ ...computedStyles, listStyleType }}>
        {features.map((feature, index) => (
          <li key={index} style={itemStyle}>
            {customBullet}
            {feature}
          </li>
        ))}
      </ul>
    );
  }
};

export const ProductFeatureListComponent = createLeafComponent(productFeatureListConfig);
export default ProductFeatureListComponent;
