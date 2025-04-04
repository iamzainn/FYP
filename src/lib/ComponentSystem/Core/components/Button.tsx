import { createLeafComponent } from '../../factories/createLeafComponent';
import React from 'react';

export const ButtonComponent = createLeafComponent({
  type: 'button',
  name: 'Button',
  category: 'elements',
  
  // Default styles
  defaultStyles: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.375rem',
    fontWeight: '500',
    fontSize: '1rem',
    cursor: 'pointer',
    display: 'inline-block',
    textAlign: 'center',
    border: 'none',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    transition: 'all 150ms ease',
    marginTop: '1rem',
    marginBottom: '0px',
    marginLeft: '0px',
    marginRight: '0px',
    textDecoration: 'none',
    boxSizing: 'border-box',
    lineHeight: '1.5',
  },
  
  // Content fields
  contentFields: [
    {
      id: 'innerText',
      label: 'Button Text',
      type: 'text',
      defaultValue: 'Get Started'
    },
    {
      id: 'href',
      label: 'Link URL',
      type: 'text',
      defaultValue: '#'
    },
    {
      id: 'target',
      label: 'Open in',
      type: 'select',
      options: [
        { value: '_self', label: 'Same Tab' },
        { value: '_blank', label: 'New Tab' }
      ],
      defaultValue: '_self'
    }
  ],
  
  // Default content
  defaultContent: {
    innerText: 'Get Started',
    href: '#',
    target: '_self'
  },
  
  // Custom settings
  customSettings: [
    {
      id: 'buttonVariant',
      label: 'Button Style',
      type: 'select',
      options: [
        { value: 'primary', label: 'Primary' },
        { value: 'secondary', label: 'Secondary' },
        { value: 'outline', label: 'Outline' },
        { value: 'ghost', label: 'Ghost' }
      ],
      defaultValue: 'primary',
      affectsStyles: [
        {
          property: 'backgroundColor',
          valueMap: {
            'primary': '#3b82f6',
            'secondary': '#4b5563',
            'outline': 'transparent',
            'ghost': 'transparent'
          }
        },
        {
          property: 'color',
          valueMap: {
            'primary': 'white',
            'secondary': 'white',
            'outline': '#3b82f6',
            'ghost': '#3b82f6'
          }
        },
        {
          property: 'border',
          valueMap: {
            'primary': 'none',
            'secondary': 'none',
            'outline': '1px solid #3b82f6',
            'ghost': 'none'
          }
        }
      ]
    },
    {
      id: 'size',
      label: 'Size',
      type: 'select',
      options: [
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' }
      ],
      defaultValue: 'md',
      affectsStyles: [
        {
          property: 'padding',
          valueMap: {
            'sm': '0.5rem 1rem',
            'md': '0.75rem 1.5rem',
            'lg': '1rem 2rem'
          }
        },
        {
          property: 'fontSize',
          valueMap: {
            'sm': '0.875rem',
            'md': '1rem',
            'lg': '1.125rem'
          }
        }
      ]
    },
    {
      id: 'fullWidth',
      label: 'Full Width',
      type: 'boolean',
      defaultValue: false,
      affectsStyles: [
        {
          property: 'width',
          transform: (value) => value ? '100%' : 'auto'
        },
        {
          property: 'display',
          transform: (value) => value ? 'block' : 'inline-block'
        }
      ]
    }
  ],
  
  // Default custom settings
  defaultCustomSettings: {
    buttonVariant: 'primary',
    size: 'md',
    fullWidth: false
  },
  
  // The rendering function
  render: (props) => {
    const { 
      styles, 
      getContentValue, 
      getCustomSetting, 
      device,
    } = props;
    
    // Get content and settings
    const buttonText = getContentValue('innerText', 'Get Started');
    const href = getContentValue('href', '#');
    const target = getContentValue('target', '_self');
    const buttonVariant = getCustomSetting('buttonVariant', 'primary');
    const fullWidth = getCustomSetting('fullWidth', false);
    
    // Apply responsive adjustments
    const responsiveStyles = {
      ...styles,
      // Make buttons full width on mobile by default if not already set
      ...(device === 'Mobile' && !fullWidth ? { 
        width: '100%', 
        display: 'block' 
      } : {})
    };
    
    // Debug logs
    if (process.env.NODE_ENV === 'development') {
      console.debug(`Button rendering: ${buttonVariant} style with text "${buttonText}"`);
    }
    
    return (
      <a 
        href={href}
        target={target}
        style={responsiveStyles} 
        className={`button-component ${fullWidth ? 'full-width' : ''}`}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {buttonText}
      </a>
    );
  }
});

export default ButtonComponent; 