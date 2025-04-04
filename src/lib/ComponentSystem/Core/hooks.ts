/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Custom hooks for the component system
 * Provides reusable React hooks for components
 * 
 */
import { useEditor, EditorElement, DeviceTypes } from '@/providers/editor/editor-provider';
import { useCallback, useMemo, useEffect, useState } from 'react';
import { computeStyles } from './StyleProcessor';
import { getContentValue, getCustomSetting, getResponsiveValue } from '../Utils/componentHelper';

/**
 * Hook for getting computed styles based on current device
 */
export const useComputedStyles = (element: EditorElement) => {
  const { state } = useEditor();
  const currentDevice = state.editor.device;
  
  const computedStyles = useMemo(() => {
    return computeStyles(element, currentDevice, state);
  }, [element, currentDevice, state]);
  
  return {
    computedStyles,
    currentDevice
  };
};

/**
 * Hook providing editor component helper functions
 */
export const useEditorComponentHelpers = (element: EditorElement) => {
  const { state, dispatch } = useEditor();
  const { selectedElement, liveMode, previewMode } = state.editor;
  
  // Track window width for live/preview mode
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  
  // Device-specific breakpoints - can be customized
  const MOBILE_BREAKPOINT = 420;
  const TABLET_BREAKPOINT = 850;
  
  // Set up resize listener for live/preview mode
  useEffect(() => {
    if (liveMode || previewMode) {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      
      // Initial size check
      handleResize();
      
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [liveMode, previewMode]);
  
  // Determine actual device based on window width in live/preview mode
  // or use editor-selected device in edit mode
  const currentDevice = useMemo((): DeviceTypes => {
    if (liveMode || previewMode) {
      // In live/preview mode, determine device based on actual window width
      if (windowWidth <= MOBILE_BREAKPOINT) return 'Mobile';
      if (windowWidth <= TABLET_BREAKPOINT) return 'Tablet';
      return 'Desktop';
    }
    // In editor mode, use the selected device
    return state.editor.device;
  }, [liveMode, previewMode, windowWidth, state.editor.device]);
  
  // Debug info about responsive behavior
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
     
    }
  }, [element.id, element.name, liveMode, previewMode, currentDevice, windowWidth]);
  
  // Compute final styles based on device
  const styles = useMemo(() => {
    return computeStyles(element, currentDevice, state);
  }, [element, currentDevice, state]);
  
  // Selection state
  const isSelected = selectedElement.id === element.id && !liveMode;
  const isHovered = false; // You might want to implement hover detection
  const isEditing = false; // You might want to implement edit mode detection
  
  // Helper to get content values
  const getContentValueHelper = useCallback(
    (fieldId: string, defaultValue?: any) => {
      return getContentValue(element, fieldId, defaultValue);
    },
    [element]
  );
  
  // Helper to get custom setting values
  const getCustomSettingHelper = useCallback(
    (settingId: string, defaultValue?: any) => {
      return getCustomSetting(element, settingId, defaultValue);
    },
    [element]
  );
  
  // Helper to get responsive style values
  const getResponsiveValueHelper = useCallback(
    (property: string, defaultValue?: any) => {
      return getResponsiveValue(element, property, currentDevice, defaultValue);
    },
    [element, currentDevice]
  );
  
  // Helper to update style properties
  const updateStyle = useCallback(
    (property: string, value: any) => {
      // Create updated element with new style
      const updatedElement = {
        ...element,
        styles: {
          ...element.styles,
          [property]: value,
        },
      };
      
      // Dispatch update action
      dispatch({
        type: 'UPDATE_ELEMENT',
        payload: {
          elementDetails: updatedElement,
        },
      });
    },
    [element, dispatch]
  );
  
  // Helper to set content values
  const setContent = useCallback(
    (fieldId: string, value: any) => {
      if (!element.content || Array.isArray(element.content)) return;
      
      // Create updated element with new content
      const updatedElement = {
        ...element,
        content: {
          ...element.content,
          [fieldId]: value,
        },
      };
      
      // Dispatch update action
      dispatch({
        type: 'UPDATE_ELEMENT',
        payload: {
          elementDetails: updatedElement,
        },
      });
    },
    [element, dispatch]
  );
  
  // Helper to set custom setting values
  const setCustomSetting = useCallback(
    (settingId: string, value: any) => {
      // Create updated element with new custom setting
      const updatedElement = {
        ...element,
        customSettings: {
          ...element.customSettings,
          [settingId]: value,
        },
      };
      
      // Dispatch update action
      dispatch({
        type: 'UPDATE_ELEMENT',
        payload: {
          elementDetails: updatedElement,
        },
      });
    },
    [element, dispatch]
  );
  
  return {
    isSelected,
    isHovered,
    isEditing,
    isLiveMode: liveMode,
    styles,
    getContentValue: getContentValueHelper,
    getCustomSetting: getCustomSettingHelper,
    getResponsiveValue: getResponsiveValueHelper,
    updateStyle,
    setContent,
    setCustomSetting,
    device: currentDevice,
    windowWidth // Added for debugging/custom use
  };
};
