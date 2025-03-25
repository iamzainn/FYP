import { EditorBtns } from '@/lib/constants'
import { ComponentConfigs } from './ComponentConfiguration'
import { EditorAction, EditorElement } from '@/providers/editor/editor-provider'

// This is a proper custom hook that can be used in components
export const useDropHandler = () => {
  return (componentType: EditorBtns, containerId: string, existingData?: EditorElement) => {
    // If existingData is provided, use it (with a new ID)
    if (existingData) {
      return {
        type: 'ADD_ELEMENT',
        payload: {
          containerId,
          elementDetails: {
            ...existingData,
            id: crypto.randomUUID(), // Generate a new ID to avoid duplicates
          },
        },
      }
    }
    
    // If no existingData, create a new element using ComponentConfigs
    if (componentType && componentType in ComponentConfigs) {
      const configCreator = ComponentConfigs[componentType];
      const newElement = configCreator.create(containerId);
      
      return {
        type: 'ADD_ELEMENT',
        payload: {
          containerId,
          elementDetails: newElement,
        },
      }
    }
    
    // Fallback for unknown component types
    return {
      type: 'ADD_ELEMENT',
      payload: {
        containerId,
        elementDetails: {
          content: [],
          id: crypto.randomUUID(),
          name: componentType,
          styles: {},
          type: componentType,
        },
      },
    }
  }
}

// This is a regular function, not a hook
export const createElementForType = (componentType: EditorBtns, containerId: string) => {
  // If the component type exists in our configuration
  if (componentType && componentType in ComponentConfigs) {
    const configCreator = ComponentConfigs[componentType];
    return configCreator.create(containerId);
  }
  
  // Fallback for unknown component types
  return {
    content: [],
    id: crypto.randomUUID(),
    name: componentType,
    styles: {},
    type: componentType,
  };
}

// The regular function that doesn't use hooks
export const handleDropEvent = (
  e: React.DragEvent,
  activeId: string,
  dispatch: React.Dispatch<EditorAction>,
) => {
  e.stopPropagation()
  const componentType = e.dataTransfer.getData('componentType') as EditorBtns
  const componentData = e.dataTransfer.getData('componentData')
  
  if (componentType) {
    if (componentData) {
      try {
        // If we have component data, use that with a new ID
        const parsedData = JSON.parse(componentData)
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: activeId,
            elementDetails: {
              ...parsedData,
              id: crypto.randomUUID() // Ensure new ID
            },
          },
        })
      } catch (error) {
        console.error("Error parsing component data:", error)
        // Use regular function instead of hook
        const elementDetails = createElementForType(componentType, activeId)
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: activeId,
            elementDetails: elementDetails as EditorElement,
          },
        })
      }
    } else {
      // Use regular function instead of hook
      const elementDetails = createElementForType(componentType, activeId)
      dispatch({
        type: 'ADD_ELEMENT',
        payload: {
          containerId: activeId,
          elementDetails: elementDetails as EditorElement,
        },
      })
    }
  }
}

