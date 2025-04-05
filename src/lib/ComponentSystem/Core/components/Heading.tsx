import React from 'react';
import { createLeafComponent, LeafComponentConfig } from '../../factories/createLeafComponent';
import { ContentFieldDefinition, ComponentSettingDefinition, BaseComponentProps, EditorComponentHelpers } from '../types';

// Use LeafComponentConfig and add inlineTextEditField
const headingConfig: LeafComponentConfig = {
  type: 'heading',
  name: 'Heading',
  category: 'elements',
  inlineTextEditField: 'innerText', // Enable inline editing for 'innerText'
  
  // Default values applied when creating an instance
  styles: {
    color: '#ffffff',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    lineHeight: '1.2',
    marginTop: '0',
    marginBottom: '1rem',
    textAlign: 'center',
    width: '100%',
    padding: '0px',
    fontFamily: 'inherit',
    letterSpacing: 'normal',
    boxSizing: 'border-box',
    zIndex: '2',
  },
  
  // Use 'content' for default content values
  content: {
    innerText: 'Build Beautiful Websites Without Code'
  },
  
  // Use 'customSettings' for default setting values
  customSettings: {
    variant: 'h1',
    animation: 'none'
  },
  
  responsiveSettings: {
    mobile: {
      fontSize: '1.75rem',
      marginBottom: '0.75rem',
    },
    tablet: {
      fontSize: '2rem',
      marginBottom: '1rem',
    }
  },
  
  // Definitions for the editor controls
  contentFields: [
    {
      id: 'innerText',
      label: 'Heading Text',
      type: 'text',
      defaultValue: 'Build Beautiful Websites Without Code'
    }
  ] as ContentFieldDefinition[],
  
  customSettingFields: [
    {
      id: 'variant',
      label: 'Heading Type',
      type: 'select',
      options: [
        { value: 'h1', label: 'H1 - Main Heading' },
        { value: 'h2', label: 'H2 - Section Heading' },
        { value: 'h3', label: 'H3 - Subsection Heading' },
        { value: 'h4', label: 'H4 - Minor Heading' },
      ],
      defaultValue: 'h1'
    },
    
    
  ] as ComponentSettingDefinition[],
  
  // Simplified render function (no hooks or inline editing logic here)
  render: (props: BaseComponentProps & EditorComponentHelpers) => {
    const {
      element,
      styles: computedStyles,
      getCustomSetting,
      
    } = props;

    // Get settings
    const variant = getCustomSetting('variant', 'h1');
    
   

    // Safely get text from element.content, falling back to default
    let headingText = 'Default Heading'; // Default fallback
    if (typeof element.content === 'object' && !Array.isArray(element.content) && element.content !== null) {
      // Ensure innerText exists and is a string
      if (typeof element.content.innerText === 'string') {
          headingText = element.content.innerText;
      }
    }

    // Render the tag
    const HeadingTag = variant as keyof JSX.IntrinsicElements;
    return (
      <HeadingTag
        style={computedStyles}     
      >
        {headingText}
      </HeadingTag>
    );
  }
};

// Create and register using the factory
export const HeadingComponent = createLeafComponent(headingConfig);

export default HeadingComponent; 