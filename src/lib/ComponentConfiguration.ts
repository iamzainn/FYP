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
    responsiveSettings: {
      tablet: {
        fontSize: '1.75rem',
        textAlign: 'center',
        marginTop: '15px',
        marginBottom: '0px',
      },
      mobile: {
        fontSize: '1.25rem',
        textAlign: 'center',
        marginTop: '10px',
        marginBottom: '0px',
        lineHeight: '1.3',
      }
    }
  })
}

// Image Component configuration
export const ImageConfig: ComponentConfig = {
  create: () => ({
    id: uuid(),
    name: 'Image',
    type: 'image',
    content: {
      src: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1632&auto=format&fit=crop',
      alt: 'Featured image'
    },
    styles: {
      width: '100%',
      maxWidth: '500px',
      height: 'auto',
      objectFit: 'cover',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      marginTop: '20px',
      marginBottom: '20px',
      marginLeft: '0px',
      marginRight: '0px',
      zIndex: '5'
    },
    customSettings: {
      objectFit: 'cover'
    },
    responsiveSettings: {
      tablet: {
        maxWidth: '400px',
        marginTop: '15px',
        marginBottom: '15px',
      },
      mobile: {
        maxWidth: '300px',
        marginTop: '10px',
        marginBottom: '10px',
      }
    }
  })
}

// Button Component configuration
export const ButtonConfig: ComponentConfig = {
  create: () => ({
    id: uuid(),
    name: 'Button',
    type: 'button',
    content: {
      innerText: 'Get Started',
      href: '#',
      target: '_self'
    },
    styles: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.375rem',
      fontWeight: 'medium',
      fontSize: '1rem',
      cursor: 'pointer',
      display: 'inline-block',
      textAlign: 'center',
      border: 'none',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      transition: 'all 150ms ease',
      marginTop: '20px',
      marginBottom: '0px',
      zIndex: '5'
    },
    customSettings: {
      buttonVariant: 'primary'
    },
    responsiveSettings: {
      tablet: {
        padding: '0.6rem 1.2rem',
        fontSize: '0.95rem',
        marginTop: '15px',
      },
      mobile: {
        padding: '0.5rem 1rem',
        fontSize: '0.9rem',
        width: '100%', // Full-width button on mobile
        marginTop: '10px',
      }
    }
  })
}

// Hero Section component configuration
export const HeroSectionConfig: ComponentConfig = {
  create: () => {
    // Create heading for the hero section with updated styling
    const headingElement: Partial<EditorElement> = {
      ...HeadingConfig.create(),
      content: {
        innerText: 'Build Beautiful Websites Without Code',
      },
      styles: {
        color: '#ffffff',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '0px',
        marginBottom: '20px',
        zIndex: '5',
      },
      customSettings: {
        variant: 'h1'
      },
      responsiveSettings: {
        tablet: {
          fontSize: '2rem',
          marginBottom: '15px',
        },
        mobile: {
          fontSize: '1.5rem',
          marginBottom: '10px',
        }
      }
    }
    
    // Create a button element
    const buttonElement: Partial<EditorElement> = {
      ...ButtonConfig.create(),
      content: {
        innerText: 'Start Building Now',
        href: '#features',
        target: '_self'
      },
      styles: {
        ...ButtonConfig.create().styles,
        marginTop: '10px',
        zIndex: '5',
      }
    }
    
    // Important: Make sure all required properties are explicitly set
    return {
      id: uuid(),
      name: 'Hero Section',
      type: 'heroSection',
      content: [
        headingElement as EditorElement, 
        buttonElement as EditorElement
      ],
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
        padding: '40px 20px',
      },
      customSettings: {
        overlayColor: 'rgba(0,0,0,0.5)',
        overlayOpacity: '50',
        heroLayout: 'center',
        heroHeight: '500px',
        contentSpacing: 'normal'
      },
      responsiveSettings: {
        tablet: {
          minHeight: '400px',
          padding: '30px 15px',
        },
        mobile: {
          minHeight: '350px',
          padding: '20px 10px',
          backgroundPosition: 'center center',
        }
      }
    }
  }
}

// Export a map of all component configurations
export const ComponentConfigs: Record<string, ComponentConfig> = {
  'heading': HeadingConfig,
  'heroSection': HeroSectionConfig,
  'image': ImageConfig,
  'button': ButtonConfig,
  // Add other component configs as you develop them
} as Record<string, ComponentConfig> 