import React from 'react'; // Remove hook imports
import { createLeafComponent, LeafComponentConfig } from '../../factories/createLeafComponent'; // Import LeafComponentConfig
import { ContentFieldDefinition, ComponentSettingDefinition, StyleEffect, BaseComponentProps, EditorComponentHelpers } from '../types'; // Remove unused ComponentConfig

// Use LeafComponentConfig and add inlineTextEditField
const buttonConfig: LeafComponentConfig = {
  type: 'button',
  name: 'Button',
  category: 'elements',
  inlineTextEditField: 'innerText', // Enable inline editing for 'innerText'

  // Default values applied when creating an instance
  styles: { // Use 'styles' for default styles
    backgroundColor: '#3b82f6', // primary default
    color: 'white',
    padding: '0.75rem 1.5rem', // md default
    borderRadius: '0.375rem',
    fontWeight: '500',
    fontSize: '1rem', // md default
    cursor: 'pointer',
    display: 'inline-block',
    textAlign: 'center',
    border: 'none', // primary default
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    transition: 'all 150ms ease',
    marginTop: '1rem',
    marginBottom: '0px',
    marginLeft: '0px',
    marginRight: '0px',
    textDecoration: 'none',
    boxSizing: 'border-box',
    lineHeight: '1.5',
    width: 'auto', // Default from fullWidth: false
    zIndex: '2', // Ensure buttons are above overlays potentially
  },
  content: { // Use 'content' for default content values
    innerText: 'Get Started',
    href: '#',
    target: '_self'
  },
  customSettings: { // Use 'customSettings' for default setting values
    buttonVariant: 'primary',
    size: 'md',
    fullWidth: false
  },
   responsiveSettings: { // Optional: Define default responsive overrides
      mobile: {
         // Make button full width on mobile by default
        width: '100%',
        display: 'block',
        padding: '0.75rem 1rem', // Adjusted padding for smaller screens
      },
      tablet: {
         padding: '0.75rem 1.25rem',
      }
  },

  // Definitions for the editor controls
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
  ] as ContentFieldDefinition[],

  customSettingFields: [ // Use 'customSettingFields' for setting definitions
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
      affectsStyles: [ // Keep affectsStyles definitions here
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
      ] as StyleEffect[] // Assertion needed
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
      ] as StyleEffect[] // Assertion needed
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
      ] as StyleEffect[] // Assertion needed
    }
  ] as ComponentSettingDefinition[],

  // styleFields: [], // Optionally define controllable styles here

  // Simplified render function
  render: (props: BaseComponentProps & EditorComponentHelpers) => {
    const {
      element,
      styles: computedStyles,
      getContentValue, // Keep for href, target defaults
      
      isLiveMode,
      // Remove setContent, isSelected - not used here
    } = props;

    // Get content and settings needed
    const href = getContentValue('href', '#');
    const target = getContentValue('target', '_self');
    

    // Safely get text from element.content, falling back to default
    let buttonText = 'Get Started'; // Default fallback
    if (typeof element.content === 'object' && !Array.isArray(element.content) && element.content !== null) {
      if (typeof element.content.innerText === 'string') {
          buttonText = element.content.innerText;
      }
    }

    // Render the anchor tag
    return (
      <a
        href={isLiveMode ? href : undefined}
        target={target}
        style={computedStyles}
        
        rel={target === '_self' ? undefined: 'noopener noreferrer'}
        
        onClick={(e) => { if (!isLiveMode) e.preventDefault(); }}
        
        
      >
        {buttonText}
      </a>
    );
  }
};

// Create and register the component using the factory
export const ButtonComponent = createLeafComponent(buttonConfig);

export default ButtonComponent; 