import { v4 as uuid } from 'uuid'

import { EditorElement } from '@/providers/editor/editor-provider'

// Interface for component configurations
export interface ComponentConfig {
  create: (containerId?: string) => Partial<EditorElement>
}

// Heading component configuration
export const HeadingConfig: ComponentConfig = {
  create: () => ({
    id: uuid(),
    name: 'Heading',
    type: 'heading',
    content: {
        innerText: 'Your Compelling Headline',
    },
    styles: {
      color: '#000000',
      fontSize: '2rem',
      fontWeight: 'bold',
      textAlign: 'left',
      marginTop: '20px',
      marginBottom: '0px',
      marginLeft: '0px',
      marginRight: '0px',
      lineHeight: '1.2',
      letterSpacing: '0',
      fontStyle: 'normal',
      textTransform: 'none',
      textDecoration: 'none',
      paddingTop: '0',
      paddingBottom: '0',
      paddingLeft: '0',
      paddingRight: '0',
      borderRadius: '0',
      width: 'auto',
      height: 'auto',  
    },
    customSettings: {
      variant: 'h2'
    },
    // Add responsive settings
    responsiveSettings: {
      tablet: {
        fontSize: '1.75rem',
        marginTop: '15px',
      },
      mobile: {
        fontSize: '1.5rem',
        marginTop: '10px',
        textAlign: 'center', // Center text on mobile for better readability
      }
    }
  })
}

// Hero Section component configuration
export const HeroSectionConfig: ComponentConfig = {
  create: () => {
    // Create heading for the hero section with hero-specific styling
    const headingElement: Partial<EditorElement> = {
      ...HeadingConfig.create(),
      styles: {
        color: '#ffffff',
        fontSize: '3rem',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '0 0 0 0',
        zIndex: 10,
      }
    }
    
    // Create a button element
    const buttonElement: Partial<EditorElement> = {
      id: uuid(),
      name: 'Button',
      type: 'button',
      content: {
        innerText: 'Get Started',
      },
      styles: {
        backgroundColor: '#3b82f6',
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.375rem',
        fontWeight: 'medium',
        cursor: 'pointer',
        display: 'inline-block',
        textAlign: 'center',
        zIndex: 10,
      }
    }
    
    return {
      id: uuid(),
      name: 'Hero Section',
      type: 'heroSection',
      content: [headingElement as EditorElement, buttonElement as EditorElement],
      styles: {
        backgroundImage: 'url("https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?q=80&w=2069")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        color: 'white',
        textAlign: 'center',
      },
      customSettings: {
        overlayColor: 'rgba(0,0,0,0.5)'
      }
    }
  }
}

// Export a map of all component configurations
export const ComponentConfigs: Record<string, ComponentConfig> = {
  'heading': HeadingConfig,
  'heroSection': HeroSectionConfig,
  // Add other component configs as you develop them
} as Record<string, ComponentConfig> 