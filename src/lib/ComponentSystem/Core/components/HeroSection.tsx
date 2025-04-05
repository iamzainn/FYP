import React from 'react';
import { createContainerComponent, ContainerComponentConfig } from '@/lib/ComponentSystem/factories/createContainerComponent';

import { ComponentSettingDefinition, StyleEffect, ChildEffect, BaseComponentProps, EditorComponentHelpers } from '../types';


// Define the component configuration using the ContainerComponentConfig type
const heroSectionConfig: ContainerComponentConfig = {
  type: 'heroSection',
  name: 'Hero Section',
  category: 'layout',

  // Default values applied when creating an instance
  styles: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '500px',
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingLeft: '10px',
    paddingRight: '10px',
    marginTop: '0px',
    marginBottom: '0px',
    marginLeft: '0px',
    marginRight: '0px',
    backgroundImage: 'url("https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?q=80&w=2069")',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    position: 'relative',
    color: '#ffffff',
    textAlign: 'center',
    boxSizing: 'border-box',
    gap: '26px',
  },
  customSettings: {
    overlayColor: 'rgba(0,0,0,0.5)',
    overlayOpacity: 50,
    heroLayout: 'center',
    contentSpacing: '16px',
    backgroundPosition: 'center',
  },
  responsiveSettings: {
    mobile: {
      minHeight: '400px',
      paddingTop: '20px',
      paddingBottom: '20px',
      paddingLeft: '10px',
      paddingRight: '10px',
      gap: '12px',
    },
    tablet: {
      minHeight: '450px',
      paddingTop: '20px',
      paddingBottom: '20px',
      paddingLeft: '10px',
      paddingRight: '10px',
      gap: '14px',
    }
  },

  // Definitions for the editor controls
  customSettingFields: [
    {
      id: 'heroLayout',
      label: 'Content Layout',
      type: 'select',
      options: [
        { value: 'center', label: 'Centered' },
        { value: 'left', label: 'Align Left' },
        { value: 'right', label: 'Align Right' },
      ],
      defaultValue: 'center',
      affectsStyles: [
        {
          property: 'alignItems',
          valueMap: { 'center': 'center', 'left': 'flex-start', 'right': 'flex-end' }
        },
        {
          property: 'textAlign',
          valueMap: { 'center': 'center', 'left': 'left', 'right': 'right' }
        }
      ] as StyleEffect[],
      affectsChildren: [
        {
          targetType: 'heading',
          valueMap: {
            'center': { styles: { textAlign: 'center', alignSelf: 'auto' } },
            'left':   { styles: { textAlign: 'left', alignSelf: 'flex-start' } },
            'right':  { styles: { textAlign: 'right', alignSelf: 'flex-end' } }
          }
        },
        {
          targetType: 'button',
          valueMap: {
            'center': { styles: { alignSelf: 'center' ,textAlign: 'center'} },
            'left':   { styles: { alignSelf: 'flex-start' ,textAlign: 'left'} },
            'right':  { styles: { alignSelf: 'flex-end' ,textAlign: 'right'} }
          }
        },
      ] as ChildEffect[]
    },
    {
      id: 'overlayColor',
      label: 'Overlay Color',
      type: 'color',
      defaultValue: 'rgba(0,0,0,0.5)'
    },
    {
      id: 'overlayOpacity',
      label: 'Overlay Opacity (%)',
      type: 'range',
      defaultValue: 50,
      min: 0,
      max: 100,
      step: 1
    },
    {
      id: 'contentSpacing',
      label: 'Content Spacing (Gap)',
      type: 'select',
      options: [
        { value: '8px', label: 'Compact (8px)' },
        { value: '16px', label: 'Normal (16px)' },
        { value: '32px', label: 'Spacious (32px)' },
      ],
      defaultValue: '16px',
      affectsStyles: [
        {
          property: 'gap',
          transform: (value) => value
        }
        
      ] as StyleEffect[],
      affectsChildren: [
        {
          targetType: 'heading',
          valueMap: {
            '8px': { styles: { marginBottom: '8px' } },
            '16px': { styles: { marginBottom: '16px' } },
            '32px': { styles: { marginBottom: '32px' } }
          }
        },
        {
          targetType: 'button',
          valueMap: {
            '8px': { styles: { marginTop: '8px' } },
            '16px': { styles: { marginTop: '16px' } },
            '32px': { styles: { marginTop: '32px' } }
          }
        },
      ] as ChildEffect[]
    },
    {
      id: 'backgroundPosition',
      label: 'Background Position',
      type: 'select',
      options: [
        { value: 'center', label: 'Center' },
        { value: 'top', label: 'Top' },
        { value: 'bottom', label: 'Bottom' },
      ],
      defaultValue: 'center',
      affectsStyles: [
        {
          property: 'backgroundPosition',
          valueMap: {
            'center': 'center center',
            'top': 'center top',
            'bottom': 'center bottom'
          }
        }
      ] as StyleEffect[]
    }
  ] as ComponentSettingDefinition[],

  // Child component configuration
  childrenConfig: {
    allowed: ['heading', 'button', 'paragraph', 'image'],
    defaultChildren: ['heading', 'button'],
  },

  // The actual React component rendering function (Simplified)
  render: (props: BaseComponentProps & EditorComponentHelpers & { childrenContainer: React.ReactNode }) => {
    const {
      childrenContainer,
      getCustomSetting,
      styles: computedStyles,
      
    } = props;

    const overlayColor = getCustomSetting('overlayColor', 'rgba(0,0,0,0.5)');
    const overlayOpacity = getCustomSetting('overlayOpacity', 50);

    const processedOverlayColor = (() => {
      try {
        if (!overlayColor || typeof overlayColor !== 'string') return 'rgba(0,0,0,0.5)';

        const opacity = Math.max(0, Math.min(1, parseFloat(overlayOpacity.toString()) / 100));

        if (overlayColor.startsWith('rgba')) {
          const rgbaMatch = overlayColor.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/);
          if (rgbaMatch) {
            const [, r, g, b] = rgbaMatch;
            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
          }
        } else if (overlayColor.startsWith('#')) {
           let hex = overlayColor.slice(1);
           if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
           if (hex.length === 6) {
               const r = parseInt(hex.slice(0, 2), 16);
               const g = parseInt(hex.slice(2, 4), 16);
               const b = parseInt(hex.slice(4, 6), 16);
               return `rgba(${r}, ${g}, ${b}, ${opacity})`;
           }
        }
        console.warn("Could not apply opacity to overlayColor format:", overlayColor);
        return overlayColor;
      } catch (error) {
        console.error('Error processing overlay color:', error);
        return 'rgba(0,0,0,0.5)';
      }
    })();

   

    return (
      <section style={computedStyles} className="hero-section-wrapper">
       
       {/* Overlay for the hero section */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: processedOverlayColor,
            zIndex: 1
          }}
          className="hero-overlay"
        />
         {/* Container for the children components for handling the layout */}
        <div  style={{zIndex: 2}} className="hero-section-children-container">
          {childrenContainer}
        </div>
      </section>
    );
  }
};

// Create and register the component using the factory
export const HeroSectionComponent = createContainerComponent(heroSectionConfig);

export default HeroSectionComponent; 