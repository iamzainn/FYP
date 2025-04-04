// @typescript-eslint/no-explicit-any
import React from 'react';
import { createContainerComponent } from '../../factories/createContainerComponent';
import { v4 as uuid } from 'uuid';
import { Menu, X, Search, ShoppingCart, User } from 'lucide-react';
import { EditorElement } from '@/providers/editor/editor-provider';

console.log('📦 Navigation.tsx loading (correct spelling)');
console.log('📦 Navigation imported createContainerComponent:', createContainerComponent);

// Create a proper React component for mobile navigation
// @typescript-eslint/no-explicit-any
const MobileNavigation = (props: {
  childrenContainer: React.ReactNode,
  isLiveMode: boolean,
  customSettings?: {
    showSearch?: boolean;
    showCart?: boolean;
    showAccount?: boolean;
    iconColor?: string;
  }
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  // Get icons settings from parent
  const showSearch = props.customSettings?.showSearch ?? true;
  const showCart = props.customSettings?.showCart ?? true;
  const showAccount = props.customSettings?.showAccount ?? true;
  const iconColor = props.customSettings?.iconColor || '#333333';
  const iconSize = 20; // Fixed size for mobile
  
  const toggleMobileMenu = () => {
    if (!props.isLiveMode) return;
    setMobileMenuOpen(prev => !prev);
  };
  
  return (
    <div className="navigation-component-mobile" style={{ position: 'relative' }}>
      {/* Mobile menu button */}
      <button 
        onClick={toggleMobileMenu}
        style={{
          background: 'none',
          border: 'none',
          padding: '0.75rem',
          cursor: props.isLiveMode ? 'pointer' : 'default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {mobileMenuOpen ? 
          <X size={24} color={iconColor} /> : 
          <Menu size={24} color={iconColor} />
        }
      </button>
      
      {/* Mobile menu dropdown - improved styling */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          backgroundColor: 'white',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          borderRadius: '0.5rem',
          width: '260px',
          zIndex: 50,
          overflow: 'hidden'
        }}>
          {/* Navigation items */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0.5rem 0'
          }}>
            {props.childrenContainer}
          </div>
          
          {/* Header actions in mobile menu */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            padding: '1rem',
            borderTop: '1px solid #eaeaea'
          }}>
            {showSearch && (
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  color: iconColor
                }}
              >
                <Search size={iconSize} />
                <span style={{ marginLeft: '0.5rem' }}>Search</span>
              </button>
            )}
            
            {showAccount && (
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  color: iconColor
                }}
              >
                <User size={iconSize} />
                <span style={{ marginLeft: '0.5rem' }}>Account</span>
              </button>
            )}
            
            {showCart && (
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  color: iconColor
                }}
              >
                <ShoppingCart size={iconSize} />
                <span style={{ marginLeft: '0.5rem' }}>Cart</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const NavigationComponent = createContainerComponent({
  type: 'navigation',
  name: 'Navigation',
  category: 'layout',
  
  // Default styles
  defaultStyles: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '1rem',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    flexWrap: 'nowrap',
    padding: '0.5rem 0',
  },
  
  // Custom settings 
  customSettings: [
    {
      id: 'alignment',
      label: 'Navigation Alignment',
      type: 'select',
      options: [
        { value: 'start', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'end', label: 'Right' },
        { value: 'space-between', label: 'Space Between' },
      ],
      defaultValue: 'end',
      affectsStyles: [
        {
          property: 'justifyContent',
          valueMap: {
            'start': 'flex-start',
            'center': 'center',
            'end': 'flex-end',
            'space-between': 'space-between'
          }
        }
      ]
    },
    {
      id: 'itemSpacing',
      label: 'Item Spacing',
      type: 'select',
      options: [
        { value: 'compact', label: 'Compact' },
        { value: 'normal', label: 'Normal' },
        { value: 'spacious', label: 'Spacious' },
      ],
      defaultValue: 'normal',
      affectsStyles: [
        {
          property: 'gap',
          valueMap: {
            'compact': '0.5rem',
            'normal': '1rem',
            'spacious': '2rem'
          }
        }
      ]
    },
    {
      id: 'showMobileMenu',
      label: 'Show Mobile Menu',
      type: 'boolean',
      defaultValue: true
    },
    {
      id: 'mobileBreakpoint',
      label: 'Mobile Breakpoint',
      type: 'select',
      options: [
        { value: 'sm', label: 'Small (640px)' },
        { value: 'md', label: 'Medium (768px)' },
        { value: 'lg', label: 'Large (1024px)' },
      ],
      defaultValue: 'md'
    }
  ],
  
  // Default custom settings
  defaultCustomSettings: {
    alignment: 'end',
    itemSpacing: 'normal',
    showMobileMenu: true,
    mobileBreakpoint: 'md'
  },
  
  // Child component configuration
  children: {
    allowed: ['navigationItem'],
    createDefaultChildren: () => [
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
  
  // Fixed render function
  render: (props) => {
    const { 
      childrenContainer,
      getCustomSetting, 
      styles, 
      device,
      isLiveMode,
      element
    } = props;
    
    // Get settings
    const showMobileMenu = getCustomSetting('showMobileMenu', true);
    
    // Find headerActions to pass its settings to mobile menu
    const headerActions = (element.content as EditorElement[])?.find((child: EditorElement) => 
      child.type === 'headerActions'
    );
    
    const headerActionsSettings = headerActions?.customSettings || {
      showSearch: true,
      showCart: true,
      showAccount: true,
      iconColor: '#333333'
    };
    
    // Standard navigation styles for consistency
    const navigationStyles = {
      ...styles,
      display: 'flex',
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 'auto',
      alignItems: 'center',
      margin: '0',
      padding: '0',
    };
    
    // Mobile navigation with passed settings
    if (device === 'Mobile' && showMobileMenu) {
      return (
        <MobileNavigation 
          childrenContainer={childrenContainer} 
          isLiveMode={isLiveMode}
          customSettings={headerActionsSettings}
        />
      );
    }
    
    // Desktop navigation
    return (
      <nav 
        style={navigationStyles} 
        className={`navigation-component ${!isLiveMode ? 'editor-mode' : ''}`}
        data-editor-role="navigation"
      >
        {childrenContainer}
      </nav>
    );
  }
});

export default NavigationComponent;