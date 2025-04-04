import React from 'react';
import { createLeafComponent } from '../../factories/createLeafComponent';

export const NavigationItemComponent = createLeafComponent({
  type: 'navigationItem',
  name: 'Navigation Item',
  category: 'elements',
  
  // Default styles
  defaultStyles: {
    display: 'block',
    padding: '0.5rem 1rem',
    color: '#333',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '1rem',
    position: 'relative',
    transition: 'color 0.2s ease-in-out',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
  },
  
  // Content fields
  contentFields: [
    {
      id: 'text',
      label: 'Navigation Text',
      type: 'text',
      defaultValue: 'Menu Item'
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
        { value: '_self', label: 'Same window' },
        { value: '_blank', label: 'New window' }
      ],
      defaultValue: '_self'
    }
  ],
  
  // Default content
  defaultContent: {
    text: 'Menu Item',
    href: '#',
    target: '_self'
  },
  
  // Custom settings
  customSettings: [
    {
      id: 'active',
      label: 'Active State',
      type: 'boolean',
      defaultValue: false,
      affectsStyles: [
        {
          property: 'fontWeight',
          transform: (value) => value ? '700' : '500'
        },
        {
          property: 'color',
          transform: (value) => value ? '#0066CC' : '#333'
        }
      ]
    },
    {
      id: 'highlight',
      label: 'Highlight Style',
      type: 'select',
      options: [
        { value: 'none', label: 'None' },
        { value: 'underline', label: 'Underline' },
        { value: 'dot', label: 'Dot Indicator' },
        { value: 'background', label: 'Background' }
      ],
      defaultValue: 'none'
    },
    {
      id: 'hasSubmenu',
      label: 'Has Submenu',
      type: 'boolean',
      defaultValue: false
    }
  ],
  
  // Default custom settings
  defaultCustomSettings: {
    active: false,
    highlight: 'none',
    hasSubmenu: false
  },
  
  // The rendering function
  render: (props) => {
    const { 
      styles, 
      getContentValue, 
      getCustomSetting,
      isLiveMode
    } = props;
    
    // Get content and settings
    const text = getContentValue('text', 'Menu Item');
    const href = getContentValue('href', '#');
    const target = getContentValue('target', '_self');
    const active = getCustomSetting('active', false);
    const highlight = getCustomSetting('highlight', 'none');
    const hasSubmenu = getCustomSetting('hasSubmenu', false);
    
    // Only apply interactive styles in live mode
    const highlightStyles: React.CSSProperties = {};
    
    if (isLiveMode) {
      if (highlight === 'underline' && active) {
        highlightStyles.borderBottom = '2px solid currentColor';
      } else if (highlight === 'background' && active) {
        highlightStyles.backgroundColor = 'rgba(0, 102, 204, 0.1)';
        highlightStyles.borderRadius = '4px';
      }
    }
    
    // Standardized styles for consistency
    const standardizedStyles: React.CSSProperties = {
      ...styles,
      ...highlightStyles,
      display: 'block',
      padding: '0.5rem 0.8rem',
      margin: '0 0.2rem',
      whiteSpace: 'nowrap',
      position: 'relative',
    };
    
    const shouldRenderDot = isLiveMode && highlight === 'dot' && active;
    
    return (
      <a 
        href={href}
        target={target}
        style={standardizedStyles}
        className={`navigation-item ${active && isLiveMode ? 'active' : ''}`}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        data-editor-element="nav-item"
      >
        {text}
        
        {hasSubmenu && (
          <span style={{ 
            marginLeft: '4px', 
            display: 'inline-block',
            width: '8px', // Smaller triangle
            height: '8px',
            position: 'relative',
            top: '0px',
            fontSize: '0.7em'
          }}>
            ▼
          </span>
        )}
        
        {shouldRenderDot && (
          <span style={{
            position: 'absolute',
            bottom: '-2px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '4px',
            height: '4px',
            backgroundColor: 'currentColor',
            borderRadius: '50%'
          }} />
        )}
      </a>
    );
  }
});

export default NavigationItemComponent;