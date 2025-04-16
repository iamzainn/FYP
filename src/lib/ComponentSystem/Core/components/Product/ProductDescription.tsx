import React from 'react';
import { createLeafComponent, LeafComponentConfig } from '../../../factories/createLeafComponent';
import { ContentFieldDefinition, ComponentSettingDefinition, StyleEffect, BaseComponentProps, EditorComponentHelpers } from '../../../Core/types';

const productDescriptionConfig: LeafComponentConfig = {
  type: 'productDescription',
  name: 'Product Description',
  category: 'elements',
  inlineTextEditField: 'text',
  
  styles: {
    fontFamily: 'inherit',
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#4B5563',
    margin: '1rem 0',
    maxWidth: '100%',
  },
  
  content: {
    text: 'This premium product offers exceptional quality and features that make it stand out from the competition.',
  },
  
  customSettings: {
    maxLines: 3,
    showReadMore: false,
  },
  
  responsiveSettings: {
    mobile: {
      fontSize: '0.875rem',
      lineHeight: '1.4',
      margin: '0.75rem 0',
    },
    tablet: {
      fontSize: '0.9375rem',
    }
  },
  
  contentFields: [
    {
      id: 'text',
      label: 'Description Text',
      type: 'textarea',
      defaultValue: 'This premium product offers exceptional quality and features that make it stand out from the competition.'
    }
  ] as ContentFieldDefinition[],
  
  customSettingFields: [
    {
      id: 'maxLines',
      label: 'Maximum Lines',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 10,
      affectsStyles: [
        {
          property: 'webkitLineClamp',
          transform: (value) => value
        },
        {
          property: 'display',
          transform: (value) => value > 0 ? '-webkit-box' : 'block'
        },
        {
          property: 'webkitBoxOrient',
          transform: (value) => value > 0 ? 'vertical' : 'horizontal'
        },
        {
          property: 'overflow',
          transform: (value) => value > 0 ? 'hidden' : 'visible'
        }
      ] as StyleEffect[]
    },
    {
      id: 'showReadMore',
      label: 'Show Read More Link',
      type: 'boolean',
      defaultValue: false,
    }
  ] as ComponentSettingDefinition[],
  
  render: (props: BaseComponentProps & EditorComponentHelpers) => {
    const {
      styles: computedStyles,
      getContentValue,
      getCustomSetting,
      isLiveMode
    } = props;
    
    const description = getContentValue('text', 'This premium product offers exceptional quality and features that make it stand out from the competition.');
    const showReadMore = getCustomSetting('showReadMore', false);
    
    return (
      <div style={computedStyles}>
        <p style={{ margin: 0 }}>{description}</p>
        
        {showReadMore && isLiveMode && (
          <button 
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              color: '#3B82F6',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '0.875em',
              marginTop: '0.5rem',
            }}
          >
            Read more
          </button>
        )}
      </div>
    );
  }
};

export const ProductDescriptionComponent = createLeafComponent(productDescriptionConfig);
export default ProductDescriptionComponent;
