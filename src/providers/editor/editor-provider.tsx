"use client";

import { EditorBtns } from '@/lib/constants'
import { createContext, useContext, useReducer, ReactNode, useEffect,   } from 'react'


export type DeviceTypes = 'Desktop' | 'Mobile' | 'Tablet'




export type EditorElement = {
  id: string
  styles: React.CSSProperties 
  name: string
  type: EditorBtns
  content: EditorElement[] | {
    src?: string,
    innerText?: string,
    href?: string,
    alt?: string,
    iconType?: string,
    width?: string,
    height?: string,
    borderRadius?: string,
    borderTopRadius?: string,
    borderRightRadius?: string,
    borderBottomRadius?: string,
    borderLeftRadius?: string,
    columnCount?: number,
    columnGap?: string,
    target?: string,
    justifyContent?: string,  
    length?: number,
    alignItems?: string,
    alignContent?: string,
    flexWrap?: string,
    flexDirection?: string,
    flexGrow?: number,
    
  }
  customSettings?: {
    [key: string]: unknown
  }
  responsiveSettings?: {
    mobile?: Partial<React.CSSProperties>
    tablet?: Partial<React.CSSProperties>
  }
}

export type Editor = {
  liveMode: boolean
  elements: EditorElement[]
  selectedElement: EditorElement
  device: DeviceTypes
  previewMode: boolean
  storePageId: string
}

export type HistoryState = {
  history: Editor[]
  currentIndex: number
}

export type EditorState = {
  editor: Editor
  history: HistoryState
}

export type EditorAction = 
  | {
      type: 'ADD_ELEMENT'
      payload: {
        containerId: string
        elementDetails: EditorElement
      }
    }
  | {
      type: 'UPDATE_ELEMENT'
      payload: {
        elementDetails: EditorElement
      }
    }
  | {
      type: 'DELETE_ELEMENT'
      payload: {
        elementDetails: EditorElement
      }
    }
  | {
      type: 'REDO'
    }
  | {
      type: 'UNDO'
    }
  | {
      type: 'LOAD_LOCALSTORAGE'
      payload: {
        storePageId: string
      }
    }
  | {
      type: 'LOAD_DATA'
      payload: {
        elements: EditorElement[]
        withLive: boolean
      }
    }
  | {
      type: 'SET_STOREPAGE_ID'
      payload: {
        storePageId: string
      }
    }
  | {
      type: 'TOGGLE_PREVIEW_MODE'
    }
  | {
      type: 'TOGGLE_LIVE_MODE'
    }
  | {
      type: 'CHANGE_DEVICE'
      payload: {
        device: DeviceTypes
        dispatch: React.Dispatch<EditorAction>
      }
    }
  | {
      type: 'CHANGE_CLICKED_ELEMENT'
      payload: {
        elementDetails: EditorElement 
      }
    }
  | {
      type: 'APPLY_DEVICE_STYLES'
      payload: {
        device: DeviceTypes
        updatedElements: EditorElement[]
      }
    }
  

const initialEditorState: Editor = {
  elements: [
    {
      content: [],
      id: '__body',
      name: 'Body',
      styles: {},
      type: '__body',
    },
  ],
  selectedElement: {
    content: [],
    id: '__body',
    name: 'Body',
    styles: {},
    type: '__body',
  },
  device: 'Desktop',
  previewMode: false,
  liveMode: false,
  storePageId: '',
}

const initialHistoryState: HistoryState = {
  history: [initialEditorState],
  currentIndex: 0,
}

const initialState: EditorState = {
  editor: initialEditorState,
  history: initialHistoryState,
}

export type StorePage = {
  id: string
  title: string
  order: number
  content: string
  slug: string
  storeId: string
  published: boolean
}

export const EditorContext = createContext<{
  state: EditorState
  dispatch: React.Dispatch<EditorAction>
  storeId: string
  pageDetails: StorePage | null
}>({
  state: initialState,
  dispatch: () => undefined,
  storeId: '',
  pageDetails: null,
})

export const EditorProvider = ({ 
  children,
  storeId,
  pageDetails 
}: { 
  children: ReactNode
  storeId: string
  pageDetails: StorePage | null
}) => {
  const [state, dispatch] = useReducer(editorReducer, initialState)
  

  useEffect(() => {
    console.log("EditorProvider rendered")
    console.log("EditorProvider state:", state)
  }, [state])
  
  
  // const wrappedDispatch = (action: EditorAction) => {
  //   if (action.type === 'CHANGE_CLICKED_ELEMENT') {
  //     const newElementId = action.payload.elementDetails?.id || "";
      
  //     // Only dispatch if the element ID is actually changing
  //     if (newElementId !== lastSelectedElementIdRef.current) {
  //       console.log(`Selection changed from ${lastSelectedElementIdRef.current} to ${newElementId}`);
  //       lastSelectedElementIdRef.current = newElementId;
  //       dispatch(action);
  //     } else {
  //       console.log(`Prevented duplicate selection of ${newElementId}`);
  //     }
  //   } else {
  //     // For all other actions, dispatch normally
  //     dispatch(action);
  //   }
  // }
  
  // useEffect(() => {
  //   if (!state.editor.storePageId && pageDetails) {
  //     // Load from localStorage if available, otherwise use initial state
  //     try {
  //       const savedState = localStorage.getItem(
  //         `storePageBuilder-${pageDetails.id}`
  //       )
        
  //       if (savedState) {
  //         const parsedState = JSON.parse(savedState)
  //         dispatch({
  //           type: 'LOAD_DATA',
  //           payload: {
  //             elements: parsedState.editor.elements,
  //             withLive: parsedState.editor.liveMode,
  //           },
  //         })
  //       }
        
  //       dispatch({
  //         type: 'SET_STOREPAGE_ID',
  //         payload: {
  //           storePageId: pageDetails.id,
  //         },
  //       })
  //     } catch (error) {
  //       console.error('Error loading editor state:', error)
  //     }
  //   }
  // }, [pageDetails, state.editor.storePageId])
  
  // useEffect(() => {
  //   if (state.editor.storePageId) {
  //     // Save to localStorage whenever state changes
  //     localStorage.setItem(
  //       `storePageBuilder-${state.editor.storePageId}`,
  //       JSON.stringify(state)
  //     )
  //   }
  // }, [state])
  

  // Add this effect to clear selection when deleting an element
  // useEffect(() => {
  //   // If the selected element doesn't exist in the elements array,
  //   // don't re-dispatch a CHANGE_CLICKED_ELEMENT action
  // }, [state.editor.elements]);
  
  // Handle synchronization between selected element and elements array
  // useEffect(() => {
  //   const selectedId = state.editor.selectedElement?.id;
    
  //   // Skip for empty or body selections
  //   if (!selectedId || selectedId === "" || selectedId === "__body") {
  //     return;
  //   }
    
  //   // Check if the selected element exists in the elements array
  //   const elementExists = elementExistsInArray(state.editor.elements, selectedId);
    
  //   // If the element doesn't exist anymore but is still selected, clear the selection
  //   if (!elementExists) {
  //     console.log(`Selected element ${selectedId} no longer exists, clearing selection`);
  //     wrappedDispatch({
  //       type: 'CHANGE_CLICKED_ELEMENT',
  //       payload: {
  //         elementDetails: {
  //           id: "",
  //           content: [],
  //           name: "",
  //           styles: {},
  //           type: null,
  //         }
  //       }
  //     });
  //   }
  // }, [state.editor.elements, state.editor.selectedElement?.id]);
  
  return (
    <EditorContext.Provider
      value={{
        state,
        dispatch, // Use the wrapped dispatch instead
        storeId,
        pageDetails,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}



export const useEditor = () => {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider')
  }
  return context
}


// const ResponsivnessHandle = (device: DeviceTypes, state: EditorState): EditorState => {
 
//   console.log(`ResponsivnessHandle: Device changed to ${device}`);
  
//   // Clone the state to avoid direct mutation
//   const newState = JSON.parse(JSON.stringify(state))
  
//   // Process the elements for device-specific adjustments
//   const processElements = (elements: EditorElement[]) => {
//     if (!elements) return
    
//     elements.forEach(element => {
//       // Handle specific component types
//       if (element.type === 'heroSection') {
//         // Adjust hero section for mobile
//         if (device === 'Mobile') {
//           element.styles = {
//             ...element.styles,
//             minHeight: '400px',
//             alignItems: 'center',
//             textAlign: 'center',
//           }
//         } else {
//           // Reset to default or preserve original styles for larger screens
//           // Only modify if there are explicit mobile overrides
//           const { alignItems, textAlign } = element.styles
//           if (alignItems === 'center' && textAlign === 'center') {
//             // These were likely mobile overrides, so restore original if available
//             const originalAlignItems = element._originalStyles?.alignItems
//             const originalTextAlign = element._originalStyles?.textAlign
            
//             if (originalAlignItems || originalTextAlign) {
//               element.styles = {
//                 ...element.styles,
//                 alignItems: originalAlignItems || element.styles.alignItems,
//                 textAlign: originalTextAlign || element.styles.textAlign,
//               }
//             }
//           }
//         }
//       }
      
//       // Handle heading responsiveness
//       if (element.type === 'heading') {
//         if (device === 'Mobile') {
//           // Store original font size if not already stored
//           if (!element._originalStyles) {
//             element._originalStyles = { fontSize: element.styles.fontSize }
//           }
          
//           // Adjust font size for mobile
//           const currentSize = element.styles.fontSize as string || '2rem'
//           // Extract numeric value and unit
//           const match = currentSize.match(/^([\d.]+)([a-z%]*)$/)
          
//           if (match) {
//             const [_, value, unit] = match
//             const numericValue = parseFloat(value)
//             // Reduce size for mobile
//             element.styles.fontSize = `${numericValue * 0.8}${unit}`
//           }
          
//           // Center text on mobile for better readability
//           element.styles.textAlign = 'center'
//         } else if (element._originalStyles) {
//           // Restore original font size for larger screens
//           element.styles.fontSize = element._originalStyles.fontSize
          
//           // Only reset text alignment if explicitly set for mobile
//           if (element.styles.textAlign === 'center' && element._originalStyles.textAlign) {
//             element.styles.textAlign = element._originalStyles.textAlign
//           }
//         }
//       }
      
//       // Process children recursively
//       if (Array.isArray(element.content)) {
//         processElements(element.content as EditorElement[])
//       }
//     })
//   }
  
//   // Process the elements from the root
//   if (Array.isArray(newState.editor.elements)) {
//     processElements(newState.editor.elements)
//   }
  
//   return newState
// }

const editorReducer = (state: EditorState = initialState, action: EditorAction) => {

  
  switch (action.type) {
    case 'ADD_ELEMENT': {
      const updatedEditorState = {
        ...state.editor,
        elements: addAnElement(state.editor.elements, action),
        selectedElement: action.payload.elementDetails
      }
      
      // Create a deep copy of the state for history to avoid reference issues
      const updatedHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        JSON.parse(JSON.stringify(updatedEditorState)), // DEEP CLONE here for history integrity
      ]

      console.log('Element added, new history index:', updatedHistory.length - 1);
      
      const newEditorState = {
        ...state,
        editor: updatedEditorState,
        history: {
          ...state.history,
          history: updatedHistory,
          currentIndex: updatedHistory.length - 1,
        },
      }
      
      return newEditorState;
    }
    
    case 'UPDATE_ELEMENT': {
      const updatedElements = updateAnElement(state.editor.elements, action)
      
      const updatedEditorStateWithUpdate = {
        ...state.editor,
        elements: updatedElements,
        selectedElement: action.payload.elementDetails
      }
      
      // Use deep cloning here as well for consistency
      const updatedHistoryWithUpdate = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        JSON.parse(JSON.stringify(updatedEditorStateWithUpdate)), // DEEP CLONE here
      ]
      
      console.log('Element updated, new history index:', updatedHistoryWithUpdate.length - 1);
      
      return {
        ...state,
        editor: updatedEditorStateWithUpdate,
        history: {
          ...state.history,
          history: updatedHistoryWithUpdate,
          currentIndex: updatedHistoryWithUpdate.length - 1,
        },
      }
    }
    
    case 'DELETE_ELEMENT': {
      const updatedElements = deleteAnElement(state.editor.elements, action);
      
      // Create a null selected element reference
      const nullSelectedElement = {
        id: "",
        content: [],
        name: "",
        styles: {},
        type: null,
      };
      
      // Create the updated editor state with the element removed
      const updatedEditorState = {
        ...state.editor,
        elements: updatedElements,
        selectedElement: nullSelectedElement // This already clears selection
      };
      
      // Add this state to history to enable undo
      const updatedHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        // Store a deep copy in history to ensure we can restore it properly
        JSON.parse(JSON.stringify(updatedEditorState)),
      ];
      
      console.log('Element deleted, selection cleared in DELETE_ELEMENT action');
      
      // Return the new state with updated history
      return {
        ...state,
        editor: updatedEditorState,
        history: {
          ...state.history,
          history: updatedHistory,
          currentIndex: updatedHistory.length - 1,
        }
      };
    }
    
    case 'REDO': {
      // Check if we can redo (not at the end of history)
      if (state.history.currentIndex < state.history.history.length - 1) {
        const nextIndex = state.history.currentIndex + 1;
        
        // Create a deep copy of the next state to ensure all elements are properly restored
        // Using JSON stringify/parse for a true deep clone that breaks all references
        const nextEditorState = JSON.parse(JSON.stringify(state.history.history[nextIndex]));
        
        // Log the redo operation for debugging
        console.log('Redoing to history index:', nextIndex);
        console.log('Restoring state:', nextEditorState);
        
        // Return the new state with:
        // 1. Deep-cloned editor state from history
        // 2. Updated currentIndex pointing to the restored history item
        return {
          ...state,
          editor: nextEditorState, // Use the deep-cloned state
          history: {
            ...state.history,
            currentIndex: nextIndex,
          },
        };
      }
      return state; // Return unchanged state if we can't redo
    }
    
    case 'UNDO': {
      // Only allow undo if we're not at the beginning of history (index 0)
      if (state.history.currentIndex > 0) {
        const prevIndex = state.history.currentIndex - 1;
        
        // Create a deep copy of the previous state to ensure all elements are properly restored
        // Deep copying is crucial for:
        // 1. Breaking all references to avoid accidental mutations
        // 2. Ensuring nested elements are fully restored
        // 3. Preserving exact state as it was at that point in history
        const prevEditorState = JSON.parse(JSON.stringify(state.history.history[prevIndex]));
        
        // Log the undo operation for debugging
        console.log('Undoing to history index:', prevIndex);
        console.log('Restoring state:', prevEditorState);
        
        // Return the new state with:
        // 1. Deep-cloned editor state from history
        // 2. Updated currentIndex pointing to the restored history item
        // This ensures all elements, styles and selections are restored exactly as they were
        return {
          ...state,
          editor: prevEditorState, // Use the deep-cloned state
          history: {
            ...state.history,
            currentIndex: prevIndex,
          },
        };
      }
      return state; // Return unchanged state if we can't undo
    }
    
    case 'LOAD_LOCALSTORAGE': {
      // Load from localStorage if available
      const dataFromLocalStorage = localStorage.getItem(
        `storePageEditor-${action.payload.storePageId}`
      )
      
      if (!dataFromLocalStorage) return state
      
      // Parse the data and set it as the new state
      const parsedData = JSON.parse(dataFromLocalStorage)
      
      return {
        ...state,
        editor: {
          ...state.editor,
          elements: parsedData.elements || state.editor.elements,
          storePageId: action.payload.storePageId,
        },
      }
    }
    
    case 'LOAD_DATA': {
      return {
        ...initialState,
        editor: {
          ...initialState.editor,
          elements: action.payload.elements || initialEditorState.elements,
          liveMode: !!action.payload.withLive,
        },
      }
    }
    
    case 'SET_STOREPAGE_ID': {
      const { storePageId } = action.payload
      const updatedEditorStateWithStorePageId = {
        ...state.editor,
        storePageId,
      }
      
      const updatedHistoryWithStorePageId = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateWithStorePageId }, // Save a copy of the updated state
      ]
      
      const storePageIdState = {
        ...state,
        editor: updatedEditorStateWithStorePageId,
        history: {
          ...state.history,
          history: updatedHistoryWithStorePageId,
          currentIndex: updatedHistoryWithStorePageId.length - 1,
        },
      }
      
      return storePageIdState
    }
    
    case 'TOGGLE_PREVIEW_MODE': {
      const toggleState = {
        ...state,
        editor: {
          ...state.editor,
          previewMode: !state.editor.previewMode,
          device: 'Desktop',

        },
      }
      
      return toggleState
    }
    
    case 'TOGGLE_LIVE_MODE': {
      return {
        ...state,
        editor: {
          ...state.editor,
          liveMode: !state.editor.liveMode,
          device: 'Desktop',
        },
      }
    }
    
    case 'CHANGE_DEVICE': {
      const newDevice = action.payload.device;
      
      // Create updated state first
      const changedDeviceState = {
        ...state,
        editor: {
          ...state.editor,
          device: newDevice,
        },
      };
      
      // Add this state to history to ensure Settings gets new state
      const updatedHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        // Store a deep copy in history
        JSON.parse(JSON.stringify(changedDeviceState.editor)),
      ];
      
      // Return new state with updated history
      return {
        ...changedDeviceState,
        history: {
          ...state.history,
          history: updatedHistory,
          currentIndex: updatedHistory.length - 1,
        }
      };
    }
    
    case 'CHANGE_CLICKED_ELEMENT': {
      console.log("CHANGE_CLICKED_ELEMENT action dispatched")
      // Only update if the selected element is actually changing
      const currentId = state.editor.selectedElement?.id || "";
      const newId = action.payload.elementDetails?.id || "";
      
      if (currentId === newId) {
        // If it's the same element, don't update state at all
        return state;
      }
      
      // Check if element exists if it's not null
      if (newId !== "") {
        const elementExists = elementExistsInArray(state.editor.elements, newId);
        if (!elementExists) {
          console.warn(`Element with ID ${newId} does not exist in elements array`);
          return state;
        }
      }
      
      // Create the updated editor state with the new selected element
      const updatedEditorState = {
        ...state.editor,
        selectedElement: action.payload.elementDetails || {
          id: '',
          content: [],
          name: '',
          styles: {},
          type: null,
        }
      };
      
      // Add this state to history to enable undo/redo for selections
      const updatedHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        // Store a deep copy in history to ensure we can restore it properly
        JSON.parse(JSON.stringify(updatedEditorState)),
      ];
      
      console.log('Element selected, new history index:', updatedHistory.length - 1);
      
      // Return the new state with updated history
      return {
        ...state,
        editor: updatedEditorState,
        history: {
          ...state.history,
          history: updatedHistory,
          currentIndex: updatedHistory.length - 1,
        }
      };
    }
    
    case 'APPLY_DEVICE_STYLES': {
      const {  updatedElements } = action.payload;
      
      // Create a copy of the elements array
      let newElements = [...state.editor.elements];
      
      // Apply updates to all elements that need changes
      updatedElements.forEach(elementToUpdate => {
        // Update the element in the tree
        newElements = updateElementById(newElements, elementToUpdate);
      });
      
      // Create the updated editor state with all style changes
      const updatedEditorState = {
        ...state.editor,
        elements: newElements
      };
      
      // Add this state to history (just one entry for all updates)
      const updatedHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        JSON.parse(JSON.stringify(updatedEditorState)), // Deep clone for history
      ];
      
      console.log(`Device styles applied, creating single history entry at index: ${updatedHistory.length - 1}`);
      
      // Return the new state with a single updated history entry
      return {
        ...state,
        editor: updatedEditorState,
        history: {
          ...state.history,
          history: updatedHistory,
          currentIndex: updatedHistory.length - 1,
        }
      };
    }
    
    default:
      return state
  }
}

// Helper functions for element manipulation
const addAnElement = (
  editorArray: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== 'ADD_ELEMENT') {
    throw Error(
      'You sent the wrong action type to the Add Element editor State'
    )
  }
  
  return editorArray.map((item) => {
    if (item.id === action.payload.containerId && Array.isArray(item.content)) {
      return {
        ...item,
        content: [...item.content, action.payload.elementDetails],
      }
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: addAnElement(item.content, action),
      }
    }
    return item
  })
}

const updateAnElement = (
  editorArray: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== 'UPDATE_ELEMENT') {
    throw Error('You sent the wrong action type to the update Element State')
  }
  
  return editorArray.map((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return { ...item, ...action.payload.elementDetails }
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: updateAnElement(item.content, action),
      }
    }
    return item
  })
}

const deleteAnElement = (
  editorArray: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== 'DELETE_ELEMENT') {
    throw Error(
      'You sent the wrong action type to the Delete Element editor State'
    )
  }
  
  console.log('Deleting element:', action.payload.elementDetails.id)
  
  return editorArray.filter((item) => {
    if (item.id === action.payload.elementDetails.id) {
      console.log('Found element to delete:', item.id)
     
      return false
    } else if (item.content && Array.isArray(item.content)) {
      item.content = deleteAnElement(item.content, action)
    }
    return true
  })
  
}

// Export the debug function for use in other components


// Add this helper function to check if element exists
const elementExistsInArray = (elements: EditorElement[], id: string): boolean => {
  return elements.some(el => {
    if (el.id === id) return true;
    if (Array.isArray(el.content)) {
      return elementExistsInArray(el.content, id);
    }
    return false;
  });
};

// Helper function to update an element by ID in the elements tree
const updateElementById = (
  elements: EditorElement[],
  elementToUpdate: EditorElement
): EditorElement[] => {
  return elements.map(element => {
    // If this is the element to update, return the updated version
    if (element.id === elementToUpdate.id) {
      return elementToUpdate;
    }
    
    // If this element has child elements, recursively update them
    if (Array.isArray(element.content)) {
      return {
        ...element,
        content: updateElementById(element.content, elementToUpdate)
      };
    }
    
    // Otherwise return the element unchanged
    return element;
  });
};
