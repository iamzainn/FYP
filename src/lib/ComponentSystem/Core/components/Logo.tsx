import React from 'react';
import { createLeafComponent } from '../../factories/createLeafComponent';

export const LogoComponent = createLeafComponent({
  type: 'logo',
  name: 'Logo',
  category: 'elements',
  
  // Default styles
  defaultStyles: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333333',
    textDecoration: 'none',
    maxWidth: '200px',
    boxSizing: 'border-box',
    padding: '0.5rem 0',
  },
  
  // Content fields
  contentFields: [
    {
      id: 'logoText',
      label: 'Logo Text',
      type: 'text',
      defaultValue: 'Brand Name'
    },
    {
      id: 'logoImageUrl',
      label: 'Logo Image URL',
      type: 'text',
      defaultValue: ''
    },
    {
      id: 'href',
      label: 'Link URL',
      type: 'text',
      defaultValue: '/'
    },
    {
      id: 'altText',
      label: 'Image Alt Text',
      type: 'text',
      defaultValue: 'Company Logo'
    }
  ],
  
  // Default content
  defaultContent: {
    logoText: 'Brand Name',
    logoImageUrl: '',
    href: '/',
    altText: 'Company Logo'
  },
  
  // Custom settings
  customSettings: [
    {
      id: 'logoType',
      label: 'Logo Type',
      type: 'select',
      options: [
        { value: 'text', label: 'Text Only' },
        { value: 'image', label: 'Image Only' },
        { value: 'both', label: 'Image and Text' }
      ],
      defaultValue: 'text'
    },
    {
      id: 'imageHeight',
      label: 'Image Height',
      type: 'number',
      defaultValue: 40
    },
    {
      id: 'textPosition',
      label: 'Text Position',
      type: 'select',
      options: [
        { value: 'left', label: 'Left of Image' },
        { value: 'right', label: 'Right of Image' },
        { value: 'below', label: 'Below Image' }
      ],
      defaultValue: 'right',
      affectsStyles: [
        {
          property: 'flexDirection',
          valueMap: {
            'left': 'row-reverse',
            'right': 'row',
            'below': 'column'
          }
        }
      ]
    },
    {
      id: 'spacing',
      label: 'Spacing Between Elements',
      type: 'number',
      defaultValue: 8,
      affectsStyles: [
        {
          property: 'gap',
          transform: (value) => `${value}px`
        }
      ]
    }
    
  ],
  
  // Default custom settings
  defaultCustomSettings: {
    logoType: 'text',
    imageHeight: 40,
    textPosition: 'right',
    spacing: 8
  },
  
  // The rendering function
  render: (props) => {
    const { 
      styles, 
      getContentValue,
      getCustomSetting,
      device
    } = props;
    
    // Get content and settings
    const logoText = getContentValue('logoText', 'Brand Name');
    const logoImageUrl = getContentValue('logoImageUrl', '');
    const href = getContentValue('href', '/');
    const altText = getContentValue('altText', 'Company Logo');
    const logoType = getCustomSetting('logoType', 'text');
    const imageHeight = getCustomSetting('imageHeight', 40);
    
    // Responsive adjustments
    const responsiveImageHeight = device === 'Mobile' ? Math.max(30, imageHeight * 0.8) : imageHeight;
    
    return (
      <a href={href} style={styles} className="logo-component">
        {(logoType === 'image' || logoType === 'both') && logoImageUrl && (
          <img 
            src={logoImageUrl} 
            alt={altText}
            style={{ 
              height: `${responsiveImageHeight}px`, 
              width: 'auto',
              maxWidth: '100%',
              objectFit: 'contain'
            }}
          />
        )}
        
        {(logoType === 'text' || logoType === 'both') && (
          <span style={{ 
            display: 'inline-block',
            fontSize: device === 'Mobile' ? '1.25rem' : '1.5rem',
          }}>
            {logoText}
          </span>
        )}
      </a>
    );
  }
});

export default LogoComponent;