import { useEffect, useMemo, useState } from 'react'
import { DeviceTypes, EditorElement } from '@/providers/editor/editor-provider'

// Define breakpoints that match your device types
const BREAKPOINTS = {
  mobile: 420,
  tablet: 820,
}

/**
 * Hook to compute final styles based on current device and responsive settings
 */
export function useResponsiveStyles(
  element: EditorElement, 
  currentDevice: DeviceTypes,
  isLiveOrPreview: boolean
) {
  // Track window width for live/preview mode
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : Infinity
  )

  // Handle window resize in live/preview mode
  useEffect(() => {
    if (!isLiveOrPreview) return

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isLiveOrPreview])

  // Determine actual device based on either selected device or window width
  const actualDevice = useMemo<DeviceTypes>(() => {
    if (isLiveOrPreview) {
      // In live/preview mode, determine device from actual window width
      if (windowWidth <= BREAKPOINTS.mobile) return 'Mobile'
      if (windowWidth <= BREAKPOINTS.tablet) return 'Tablet'
      return 'Desktop'
    }
    // In editor mode, use the selected device
    return currentDevice
  }, [currentDevice, isLiveOrPreview, windowWidth])

  // Merge base styles with responsive overrides for the current device
  const computedStyles = useMemo(() => {
    const { styles, responsiveSettings } = element
    
    // Start with base styles
    let mergedStyles = { ...styles }
    
    // Apply device-specific overrides if they exist
    if (responsiveSettings) {
      if (actualDevice === 'Mobile' && responsiveSettings.mobile) {
        mergedStyles = { ...mergedStyles, ...responsiveSettings.mobile }
      } else if (actualDevice === 'Tablet' && responsiveSettings.tablet) {
        mergedStyles = { ...mergedStyles, ...responsiveSettings.tablet }
      }
    }
    
    return mergedStyles
  }, [element.styles, element.responsiveSettings, actualDevice])

  return {
    computedStyles,
    currentDevice: actualDevice
  }
} 