import React from 'react';
import { createLeafComponent } from '../../factories/createLeafComponent';
import { Search, ShoppingCart, User } from 'lucide-react';

export const HeaderActionsComponent = createLeafComponent({
  type: 'headerActions',
  name: 'Header Actions',
  category: 'elements',
  
  // Default styles
  defaultStyles: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginLeft: 'auto',
    flexShrink: 0
  },
  
  // Custom settings
  customSettings: [
    {
      id: 'showSearch',
      label: 'Show Search',
      type: 'boolean',
      defaultValue: true
    },
    {
      id: 'showCart',
      label: 'Show Cart',
      type: 'boolean',
      defaultValue: true
    },
    {
      id: 'showAccount',
      label: 'Show Account',
      type: 'boolean',
      defaultValue: true
    },
    {
      id: 'iconSize',
      label: 'Icon Size',
      type: 'select',
      options: [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' }
      ],
      defaultValue: 'medium'
    },
    {
      id: 'iconColor',
      label: 'Icon Color',
      type: 'color',
      defaultValue: '#333333'
    }
  ],
  
  // Default custom settings
  defaultCustomSettings: {
    showSearch: true,
    showCart: true,
    showAccount: true,
    iconSize: 'medium',
    iconColor: '#333333'
  },
  
  // The rendering function
  render: (props) => {
    const { 
      styles, 
      getCustomSetting,
      device,
      isLiveMode
    } = props;
    
    // Get settings
    const showSearch = getCustomSetting('showSearch', true);
    const showCart = getCustomSetting('showCart', true);
    const showAccount = getCustomSetting('showAccount', true);
    const iconSize = getCustomSetting('iconSize', 'medium');
    const iconColor = getCustomSetting('iconColor', '#333333');
    
    // Get icon size based on setting
    const getIconDimension = () => {
      switch (iconSize) {
        case 'small': return 16;
        case 'large': return 22;
        case 'medium':
        default: return 18;
      }
    };
    
    // Improved icon size
    const iconDimension = getIconDimension();
    
    // Don't render in mobile view - handled by Navigation component
    if (device === 'Mobile') {
      return null;
    }
    
    // Better container styles for proper alignment
    const containerStyles = {
      ...styles,
      display: 'flex',
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '0.75rem',
      marginLeft: 'auto',
      padding: '0.25rem',
    };
    
    // Icon button style
    const iconButtonStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.5rem',
      color: iconColor,
      background: 'transparent',
      border: 'none',
      borderRadius: '0.25rem',
      cursor: isLiveMode ? 'pointer' : 'default',
      transition: 'background-color 0.2s',
      ':hover': {
        backgroundColor: 'rgba(0,0,0,0.05)'
      }
    };
    
    return (
      <div 
        style={containerStyles} 
        className="header-actions"
        data-editor-role="header-actions"
      >
        {showSearch && (
          <button 
            type="button"
            aria-label="Search" 
            style={iconButtonStyle}
            disabled={!isLiveMode}
          >
            <Search size={iconDimension} />
          </button>
        )}
        
        {showAccount && (
          <button 
            type="button"
            aria-label="Account" 
            style={iconButtonStyle}
            disabled={!isLiveMode}
          >
            <User size={iconDimension} />
          </button>
        )}
        
        {showCart && (
          <button 
            type="button"
            aria-label="Shopping Cart" 
            style={iconButtonStyle}
            disabled={!isLiveMode}
          >
            <ShoppingCart size={iconDimension} />
          </button>
        )}
      </div>
    );
  }
});

export default HeaderActionsComponent;