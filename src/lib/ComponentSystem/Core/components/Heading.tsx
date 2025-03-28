import React from 'react';
import { createLeafComponent } from '../../factories/createLeafComponent';

export const HeadingComponent = createLeafComponent({
  type: 'heading',
  name: 'Heading',
  category: 'elements',
  
  // Default styles
  defaultStyles: {
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
  },
  
  // Content fields
  contentFields: [
    {
      id: 'innerText',
      label: 'Heading Text',
      type: 'text',
      defaultValue: 'Build Beautiful Websites Without Code'
    }
  ],
  
  // Default content
  defaultContent: {
    innerText: 'Build Beautiful Websites Without Code'
  },
  
  // Custom settings
  customSettings: [
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
    {
      id: 'animation',
      label: 'Animation',
      type: 'select',
      options: [
        { value: 'none', label: 'None' },
        { value: 'fade-in', label: 'Fade In' },
        { value: 'slide-up', label: 'Slide Up' },
      ],
      defaultValue: 'none'
    }
  ],
  
  // Default custom settings
  defaultCustomSettings: {
    variant: 'h1',
    animation: 'none'
  },
  
  // The rendering function
  render: (props) => {
    const { 
      styles, 
      getContentValue, 
      getCustomSetting, 
      device,
      isLiveMode 
    } = props;
    
    // Get content and settings
    const headingText = getContentValue('innerText', 'Default Heading');
    const variant = getCustomSetting('variant', 'h1');
    const animation = getCustomSetting('animation', 'none');
    
    // Animation class based on setting
    const getAnimationClass = () => {
      if (!isLiveMode || animation === 'none') return '';
      
      switch (animation) {
        case 'fade-in': return 'animate-fade-in';
        case 'slide-up': return 'animate-slide-up';
        default: return '';
      }
    };
    
    // Responsive font size adjustments based on device
    const responsiveStyles = {
      ...styles,
      fontSize: device === 'Mobile' 
        ? '1.75rem' 
        : device === 'Tablet' 
          ? '2rem' 
          : styles.fontSize
    };
    
    // Debug logs
    if (process.env.NODE_ENV === 'development') {
      console.debug(`Heading rendering: ${variant} with text "${headingText}"`);
    }
    
    // Render the appropriate heading element based on variant
    const HeadingTag = variant as keyof JSX.IntrinsicElements;
    
    return (
      <HeadingTag 
        style={responsiveStyles} 
        className={`heading-component ${getAnimationClass()}`}
      >
        {headingText}
      </HeadingTag>
    );
  }
});

export default HeadingComponent; 