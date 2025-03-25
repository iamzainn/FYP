import { useEffect, useMemo, useState } from 'react'
import {  EditorElement, EditorState } from '@/providers/editor/editor-provider'

// Define breakpoints that match your device types

/**
 * Hook to compute final styles based on current device and responsive settings
 */
export function useResponsiveStyles(element: EditorElement, state: EditorState) {
  const { styles, responsiveSettings } = element
  const { device, liveMode, previewMode } = state.editor
  
  // Track window width for live/preview mode
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  )
  
  // Set up resize listener for live/preview mode
  useEffect(() => {
    if (liveMode || previewMode) {
      const handleResize = () => {
        setWindowWidth(window.innerWidth)
      }
      
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [liveMode, previewMode])
  
  // Determine current device type based on mode
  const currentDevice = useMemo(() => {
    if (liveMode || previewMode) {
      // Use actual window width in live/preview mode
      if (windowWidth <= 420) return 'Mobile'
      if (windowWidth <= 850) return 'Tablet'
      return 'Desktop'
    }
    // Use selected device in editor mode
    return device
  }, [device, liveMode, previewMode, windowWidth])
  
  // Merge base styles with responsive overrides
  const computedStyles = useMemo(() => {
    // Start with base styles
    let mergedStyles = { ...styles }
    
    // Apply device-specific overrides if available
    if (currentDevice === 'Mobile' && responsiveSettings?.mobile) {
      mergedStyles = { ...mergedStyles, ...responsiveSettings.mobile }
    } else if (currentDevice === 'Tablet' && responsiveSettings?.tablet) {
      mergedStyles = { ...mergedStyles, ...responsiveSettings.tablet }
    }
    
    return mergedStyles
  }, [styles, responsiveSettings, currentDevice])
  
  return { computedStyles, currentDevice }
} 