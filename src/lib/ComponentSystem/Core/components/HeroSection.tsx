import React from 'react';
import { createContainerComponent } from '../../factories/createContainerComponent';
import { v4 as uuid } from 'uuid';

export const HeroSectionComponent = createContainerComponent({
  type: 'heroSection',
  name: 'Hero Section',
  category: 'layout',
  
  // Default styles
  defaultStyles: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '500px',
    padding: '40px 20px',
    margin: '0px',
    backgroundImage: 'url("https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?q=80&w=2069")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    color: 'white',
    textAlign: 'center',
    boxSizing: 'border-box',
  },
  
  // Custom settings 
  customSettings: [
    {
      id: 'heroLayout',
      label: 'Layout Style',
      type: 'select',
      options: [
        { value: 'center', label: 'Content Centered' },
        { value: 'left', label: 'Content Left' },
        { value: 'right', label: 'Content Right' },
      ],
      defaultValue: 'center',
      affectsStyles: [
        {
          property: 'alignItems',
          valueMap: {
            'center': 'center',
            'left': 'flex-start',
            'right': 'flex-end'
          }
        },
        {
          property: 'textAlign',
          valueMap: {
            'center': 'center',
            'left': 'left',
            'right': 'right'
          }
        }
      ]
    },
    {
      id: 'overlayColor',
      label: 'Overlay Color',
      type: 'color',
      defaultValue: 'rgba(0,0,0,0.5)'
    },
    {
      id: 'overlayOpacity',
      label: 'Overlay Opacity',
      type: 'range',
      defaultValue: 50,
      min: 0,
      max: 100,
      step: 1
    },
    {
      id: 'contentSpacing',
      label: 'Content Spacing',
      type: 'select',
      options: [
        { value: 'normal', label: 'Normal' },
        { value: 'compact', label: 'Compact' },
        { value: 'spacious', label: 'Spacious' },
      ],
      defaultValue: 'normal'
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
            'center': 'center',
            'top': 'top center',
            'bottom': 'bottom center'
          }
        }
      ]
    }
  ],
  
  // Default custom settings
  defaultCustomSettings: {
    overlayColor: 'rgba(0,0,0,0.5)',
    overlayOpacity: 50,
    heroLayout: 'center',
    contentSpacing: 'normal',
    backgroundPosition: 'center'
  },
  
  // Child component configuration
  children: {
    allowed: ['heading', 'button', 'image', 'paragraph'],
    defaultChildren: ['heading', 'button'],
    // Create default children on initialization
    createDefaultChildren: () => [
      {
        id: uuid(),
        name: 'Heading',
        type: 'heading',
        content: {
          innerText: 'Build Beautiful Websites Without Code',
        },
        styles: {
          color: '#ffffff',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: '0px',
          marginBottom: '1.5rem',
          zIndex: '5',
        },
        customSettings: {
          variant: 'h1',
          animation: 'fade-in'
        },
        responsiveSettings: {
          mobile: {
            fontSize: '1.75rem',
            marginBottom: '1rem',
          },
          tablet: {
            fontSize: '2rem',
            marginBottom: '1.25rem',
          }
        }
      },
      {
        id: uuid(),
        name: 'Button',
        type: 'button',
        content: {
          innerText: 'Start Building Now',
          href: '#features',
          target: '_self'
        },
        styles: {
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.375rem',
          fontWeight: '500',
          fontSize: '1rem',
          cursor: 'pointer',
          marginTop: '0.5rem',
          zIndex: '5',
        },
        customSettings: {
          buttonVariant: 'primary',
          size: 'md',
          fullWidth: false
        },
        responsiveSettings: {
          mobile: {
            width: '100%',
            display: 'block',
            padding: '0.75rem 1rem',
          },
          tablet: {
            padding: '0.75rem 1.25rem',
          }
        }
      }
    ]
  },
  
  // The rendering function with responsive handling
  render: (props) => {
    const { childrenContainer, getCustomSetting, device, styles, isLiveMode, windowWidth } = props;
    
    // Get overlay settings
    const overlayColor = getCustomSetting('overlayColor', 'rgba(0,0,0,0.5)');
    const overlayOpacity = getCustomSetting('overlayOpacity', 50);
    const contentSpacing = getCustomSetting('contentSpacing', 'normal');
    
    // Debug component rendering
    if (process.env.NODE_ENV === 'development') {
      console.debug(
        `HeroSection rendering with: ` +
        `Device: ${device}, Window Width: ${windowWidth}px, ` +
        `Live mode: ${isLiveMode}, Content spacing: ${contentSpacing}`
      );
    }
    
    // Calculate processed overlay color
    const processedOverlayColor = (() => {
      try {
        if (!overlayColor) return 'rgba(0,0,0,0.5)';
        
        // Handle rgba format
        if (overlayColor.toString().startsWith('rgba')) {
          const rgbaMatch = overlayColor.toString().match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/);
          if (rgbaMatch) {
            const [, r, g, b] = rgbaMatch;
            const opacity = parseFloat(overlayOpacity.toString()) / 100;
            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
          }
        }
        
        // Handle hex format
        if (overlayColor.toString().startsWith('#')) {
          const r = parseInt(overlayColor.toString().slice(1, 3), 16);
          const g = parseInt(overlayColor.toString().slice(3, 5), 16);
          const b = parseInt(overlayColor.toString().slice(5, 7), 16);
          const opacity = parseFloat(overlayOpacity.toString()) / 100;
          return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
        
        return overlayColor;
      } catch (error) {
        console.error('Error processing overlay color:', error);
        return 'rgba(0,0,0,0.5)';
      }
    })();
    
    // Determine content spacing class based on the device
    const getSpacingClass = () => {
      const spacingValue = contentSpacing || 'normal';
      
      // Base spacing for each device
      const spacingMap = {
        normal: {
          Desktop: 'gap-4',
          Tablet: 'gap-3',
          Mobile: 'gap-2'
        },
        compact: {
          Desktop: 'gap-2',
          Tablet: 'gap-1.5',
          Mobile: 'gap-1'
        },
        spacious: {
          Desktop: 'gap-8',
          Tablet: 'gap-6',
          Mobile: 'gap-4'
        }
      };
      
      // Use proper device values that match the EditorProvider type
      return spacingMap[spacingValue as keyof typeof spacingMap][device] || 'gap-4';
    };
    
    // Add responsive classes based on the device
    const getResponsiveClasses = () => {
      const baseClasses = "relative z-10 w-full mx-auto flex flex-col";
      
      // Width classes based on device
      const widthClass = device === 'Desktop' ? 'max-w-screen-xl' : 
                          device === 'Tablet' ? 'max-w-screen-md' : 'max-w-screen-sm';
                          
      return `${baseClasses} ${widthClass} ${getSpacingClass()}`;
    };
    
    return (
      <section style={{...styles}} className="relative w-full">
        {/* Optional debug info in development mode */}
        {process.env.NODE_ENV === 'development' && !isLiveMode && (
          <div className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 z-50">
            {device} ({windowWidth}px)
          </div>
        )}
        
        {/* Overlay */}
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
        />
        
        {/* Content Container with responsive classes */}
        <div className={getResponsiveClasses()}>
          {childrenContainer}
        </div>
      </section>
    );
  }
});

export default HeroSectionComponent; 