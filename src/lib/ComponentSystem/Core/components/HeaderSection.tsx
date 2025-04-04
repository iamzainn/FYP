import React from 'react';
import { createContainerComponent } from '../../factories/createContainerComponent';
import { v4 as uuid } from 'uuid';
import { EditorElement } from '@/providers/editor/editor-provider';



export const HeaderSectionComponent = createContainerComponent({
  type: 'headerSection',
  name: 'Header Section',
  category: 'layout',
  
  // Default styles
  defaultStyles: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    zIndex: 100
  },
  
  // Custom settings 
  customSettings: [
    {
      id: 'headerLayout',
      label: 'Header Layout',
      type: 'select',
      options: [
        { value: 'standard', label: 'Standard' },
        { value: 'centered', label: 'Centered Logo' },
        { value: 'logo-right', label: 'Logo Right' },
      ],
      defaultValue: 'standard'
    },
    {
      id: 'stickyHeader',
      label: 'Sticky Header',
      type: 'boolean',
      defaultValue: false,
      affectsStyles: [
        {
          property: 'position',
          transform: (value) => value ? 'sticky' : 'relative'
        },
        {
          property: 'top',
          transform: (value) => value ? '0' : 'auto'
        }
      ]
    },
    {
      id: 'containerWidth',
      label: 'Container Width',
      type: 'select',
      options: [
        { value: 'full', label: 'Full Width' },
        { value: 'contained', label: 'Contained' },
      ],
      defaultValue: 'full'
    },
    {
      id: 'borderStyle',
      label: 'Border Style',
      type: 'select',
      options: [
        { value: 'none', label: 'None' },
        { value: 'shadow', label: 'Shadow' },
        { value: 'line', label: 'Border Line' },
      ],
      defaultValue: 'shadow',
      affectsStyles: [
        {
          property: 'boxShadow',
          valueMap: {
            'none': 'none',
            'shadow': '0 1px 3px rgba(0, 0, 0, 0.1)',
            'line': 'none'
          }
        },
        {
          property: 'borderBottom',
          valueMap: {
            'none': 'none',
            'shadow': 'none',
            'line': '1px solid #eaeaea'
          }
        }
      ]
    },
    {
      id: 'verticalPadding',
      label: 'Vertical Padding',
      type: 'select',
      options: [
        { value: 'none', label: 'None' },
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
      ],
      defaultValue: 'medium',
      affectsStyles: [
        {
          property: 'paddingTop',
          valueMap: {
            'none': '0',
            'small': '0.5rem',
            'medium': '1rem',
            'large': '1.5rem'
          }
        },
        {
          property: 'paddingBottom',
          valueMap: {
            'none': '0',
            'small': '0.5rem',
            'medium': '1rem',
            'large': '1.5rem'
          }
        }
      ]
    }
  ],
  
  // Default custom settings
  defaultCustomSettings: {
    headerLayout: 'standard',
    stickyHeader: false,
    containerWidth: 'full',
    borderStyle: 'shadow',
    verticalPadding: 'medium'
  },
  
  // Child component configuration
  children: {
    allowed: ['logo', 'navigation', 'headerActions'],
    createDefaultChildren: () => [
      {
        id: uuid(),
        name: 'Logo',
        type: 'logo',
        content: {
          logoText: 'Brand Name',
          logoImageUrl: '',
          href: '/',
          altText: 'Company Logo'
        },
        styles: {
          flexShrink: 0,
          flexOrder: 1,
          marginRight: '1rem',
          order: 1
        },
        customSettings: {
          logoType: 'text',
          imageHeight: 40
        }
      },
      {
        id: uuid(),
        name: 'Navigation',
        type: 'navigation',
        styles: {
          flexGrow: 1,
          flexOrder: 2,
          order:2,
          justifyContent: 'flex-end'
          
        },
        customSettings: {
          alignment: 'end',
          itemSpacing: 'normal'
        },
        content: [
          {
            id: uuid(),
            name: 'Navigation Item',
            type: 'navigationItem',
            content: {
              text: 'Home',
              href: '/',
              target: '_self'
            },
            styles: {},
            customSettings: {
              active: true,
              highlight: 'underline'
            }
          },
          {
            id: uuid(),
            name: 'Navigation Item',
            type: 'navigationItem',
            content: {
              text: 'Products',
              href: '/products',
              target: '_self'
            },
            styles: {}
          },
          {
            id: uuid(),
            name: 'Navigation Item',
            type: 'navigationItem',
            content: {
              text: 'About',
              href: '/about',
              target: '_self'
            },
            styles: {}
          },
          {
            id: uuid(),
            name: 'Navigation Item',
            type: 'navigationItem',
            content: {
              text: 'Contact',
              href: '/contact',
              target: '_self'
            },
            styles: {}
          }
        ]
      },
      {
        id: uuid(),
        name: 'Header Actions',
        type: 'headerActions',
        styles: {
          marginLeft: '1rem',
          flexOrder: 3,
          order: 3
        },
        customSettings: {
          showSearch: true,
          showCart: true,
          showAccount: true
        }
      }
    ]
  },
  
  // The rendering function with responsive handling
  render: (props) => {
    const { 
      childrenContainer, 
      getCustomSetting, 
      styles, 
      element,
      isLiveMode,
      device
    } = props;
    
    // Get settings
    const headerLayout = getCustomSetting('headerLayout', 'standard');
    const containerWidth = getCustomSetting('containerWidth', 'full');
    
    // Debug layout changes
    console.log('HeaderSection render:', { 
      headerLayout, 
      device,
      containerWidth,
      elementChildren: element.content && Array.isArray(element.content) ? 
        element.content.map(child => ({
          type: child.type,
          flexOrder: child.styles?.order,
          justifyContent: child.styles?.justifyContent
        })) : 'No children'
    });
    
    // Container styles with better flex handling
    const getContainerStyles = () => {
      const baseStyles = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        margin: '0 auto',
      };
      
      if (containerWidth === 'contained') {
        return {
          ...baseStyles,
          maxWidth: '1200px',
        };
      }
      return baseStyles;
    };
    if (element.content && Array.isArray(element.content)) {
      // Find child components by type
      const findChildByType = (type: string) => {
        return (element.content as EditorElement[]).find((child: EditorElement) => child.type === type);
      };
      
      // Get position of logo and navigation based on layout
      const getHeaderFlexOrder = () => {
        if (headerLayout === 'logo-right') {
          return {
            logoOrder: 3,
            navOrder: 1,
            actionsOrder: 2
          };
        } else if (headerLayout === 'centered') {
          return {
            logoOrder: 2,
            navOrder: 3,
            actionsOrder: 1
          };
        } else {
          // Standard layout
          return {
            logoOrder: 1,
            navOrder: 2,
            actionsOrder: 3
          };
        }
      };
      
      // Get order of components
      const { logoOrder, navOrder, actionsOrder } = getHeaderFlexOrder();
      
      // Update logo styles based on layout
      const logo = findChildByType('logo');
      if (logo) {
        // Set logo order
        logo.styles = { ...logo.styles, order: logoOrder };
        
        // For centered layout, set specific styles
        if (headerLayout === 'centered') {
          logo.styles = { 
            ...logo.styles, 
            position: 'absolute',
            left: '50%',
            marginRight: '0'
          };
        } else if (headerLayout === 'logo-right') {
          logo.styles = { 
            ...logo.styles, 
            marginRight: '0',
            marginLeft: '1rem'
          };
        } else {
          // Reset for standard layout
          logo.styles = { 
            ...logo.styles, 
            position: 'relative',
            transform: 'none',
            marginRight: '1rem',
            marginLeft: '0'
          };
        }
        
        // Log updated styles
        if (logo) console.log('Logo styles updated:', logo.styles);
      }
      
      // Update navigation styles based on layout
      const nav = findChildByType('navigation');
      if (nav) {
        nav.styles = { ...nav.styles, order: navOrder };
        
        // Adjust navigation alignment based on layout
        if (headerLayout === 'logo-right') {
          nav.styles = { 
            ...nav.styles, 
            justifyContent: 'flex-start'
          };
          
          if (nav.customSettings) {
            nav.customSettings.alignment = 'start';
          }
        } else if (headerLayout === 'centered') {
          nav.styles = { 
            ...nav.styles, 
            justifyContent: 'flex-end'
          };
          
          if (nav.customSettings) {
            nav.customSettings.alignment = 'end';
          }
        }
        
        // Log updated styles
        if (nav) console.log('Navigation styles updated:', nav.styles);
      }
      
      // Update actions styles based on layout
      const actions = findChildByType('headerActions');
      if (actions) {
        actions.styles = { ...actions.styles, order: actionsOrder };
        
        if (headerLayout === 'centered') {
          actions.styles = { 
            ...actions.styles, 
            marginLeft: '0',
            marginRight: 'auto'
          };
        } else if (headerLayout === 'logo-right') {
          actions.styles = { 
            ...actions.styles, 
            marginLeft: '0',
            marginRight: '1rem'
          };
        } else {
          // Reset for standard layout
          actions.styles = { 
            ...actions.styles, 
            marginLeft: '1rem',
            marginRight: '0'
          };
        }
        
        // Log updated styles
        if (actions) console.log('Actions styles updated:', actions.styles);
      }
    }
    
    // Add editor mode indicator
    const editorModeClass = !isLiveMode ? 'header-editor-mode' : '';
    
    return (
      <header 
        style={styles} 
        className={`header-section ${editorModeClass}`}
        data-editor-role="header"
      >
        {!isLiveMode && (
          <style dangerouslySetInnerHTML={{ __html: `
            .header-editor-mode a {
              pointer-events: none !important;
            }
            .header-editor-mode button {
              pointer-events: none !important;
            }
          `}} />
        )}
        <div style={getContainerStyles() as React.CSSProperties} className="header-container">
          {childrenContainer}
        </div>
      </header>
    );
  }
});

export default HeaderSectionComponent;