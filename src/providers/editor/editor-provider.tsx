"use client";

import { EditorBtns } from '@/lib/constants'
import { createContext, useContext, useReducer, ReactNode, useRef, useEffect } from 'react'

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
    borderLeftRadius?: string
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
      }
    }
  | {
      type: 'CHANGE_CLICKED_ELEMENT'
      payload: {
        elementDetails: EditorElement 
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
    id: "",
    content: [],
    name: "",
    styles: {},
    type: null,
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
  const lastSelectedElementIdRef = useRef<string>("");
  
  // Create a wrapped dispatch function to intercept CHANGE_CLICKED_ELEMENT actions
  const wrappedDispatch = (action: EditorAction) => {
    if (action.type === 'CHANGE_CLICKED_ELEMENT') {
      const newElementId = action.payload.elementDetails?.id || "";
      
      // Only dispatch if the element ID is actually changing
      if (newElementId !== lastSelectedElementIdRef.current) {
        console.log(`Selection changed from ${lastSelectedElementIdRef.current} to ${newElementId}`);
        lastSelectedElementIdRef.current = newElementId;
        dispatch(action);
      } else {
        console.log(`Prevented duplicate selection of ${newElementId}`);
      }
    } else {
      // For all other actions, dispatch normally
      dispatch(action);
    }
  }
  
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
  
  console.log("RENDER - History index:", state.history.currentIndex);
  console.log("RENDER - History at current index:", state.history.history[state.history.currentIndex]);
  
  // Add this effect to clear selection when deleting an element
  useEffect(() => {
    // If the selected element doesn't exist in the elements array,
    // don't re-dispatch a CHANGE_CLICKED_ELEMENT action
  }, [state.editor.elements]);
  
  // Handle synchronization between selected element and elements array
  useEffect(() => {
    const selectedId = state.editor.selectedElement?.id;
    
    // Skip for empty or body selections
    if (!selectedId || selectedId === "" || selectedId === "__body") {
      return;
    }
    
    // Check if the selected element exists in the elements array
    const elementExists = elementExistsInArray(state.editor.elements, selectedId);
    
    // If the element doesn't exist anymore but is still selected, clear the selection
    if (!elementExists) {
      console.log(`Selected element ${selectedId} no longer exists, clearing selection`);
      wrappedDispatch({
        type: 'CHANGE_CLICKED_ELEMENT',
        payload: {
          elementDetails: {
            id: "",
            content: [],
            name: "",
            styles: {},
            type: null,
          }
        }
      });
    }
  }, [state.editor.elements, state.editor.selectedElement?.id]);
  
  return (
    <EditorContext.Provider
      value={{
        state,
        dispatch: wrappedDispatch, // Use the wrapped dispatch instead
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

const editorReducer = (state: EditorState = initialState, action: EditorAction) => {
  console.log(`[REDUCER] Action type: ${action.type}`);
  if (action.type === 'CHANGE_CLICKED_ELEMENT') {
    console.trace('[REDUCER] CHANGE_CLICKED_ELEMENT was dispatched from:');
  }
  
  switch (action.type) {
    case 'ADD_ELEMENT': {
      const updatedEditorState = {
        ...state.editor,
        elements: addAnElement(state.editor.elements, action),
        selectedElement: action.payload.elementDetails
      }
      
      const updatedHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorState },
      ]

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
      
      const updatedHistoryWithUpdate = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateWithUpdate },
      ]
      
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
        selectedElement: nullSelectedElement
      };
      
      // Add this state to history to enable undo
      const updatedHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        // Store a deep copy in history to ensure we can restore it properly
        JSON.parse(JSON.stringify(updatedEditorState)),
      ];
      
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
        const nextEditorState = JSON.parse(JSON.stringify(state.history.history[nextIndex]));
        
        const redoState = {
          ...state,
          editor: nextEditorState,
          history: {
            ...state.history,
            currentIndex: nextIndex,
          },
        };
        
        console.log('Redoing to history index:', nextIndex);
        return redoState;
      }
      return state;
    }
    
    case 'UNDO': {
      // Check if we can undo (not at the beginning of history)
      if (state.history.currentIndex > 0) {
        const prevIndex = state.history.currentIndex - 1;
        
        // Create a deep copy of the previous state to ensure all elements are properly restored
        // This is crucial for undoing deletions
        const prevEditorState = JSON.parse(JSON.stringify(state.history.history[prevIndex]));
        
        // Update the editor state with the previous history state
        const undoState = {
          ...state,
          editor: prevEditorState,
          history: {
            ...state.history,
            currentIndex: prevIndex,
          },
        };
        
        console.log('Undoing to history index:', prevIndex);
        return undoState;
      }
      return state;
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
        },
      }
    }
    
    case 'CHANGE_DEVICE': {
      const changedDeviceState = {
        ...state,
        editor: {
          ...state.editor,
          device: action.payload.device,
        },
      }
      
      return changedDeviceState
    }
    
    case 'CHANGE_CLICKED_ELEMENT': {
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
      
      return {
        ...state,
        editor: {
          ...state.editor,
          selectedElement: action.payload.elementDetails || {
            id: '',
            content: [],
            name: '',
            styles: {},
            type: null,
          },
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
export const debugState = (action: string, state: EditorState) => {
  console.log(`[DEBUG] Action: ${action}`);
  console.log(`[DEBUG] Selected Element:`, state.editor.selectedElement);
  console.log(`[DEBUG] History Index:`, state.history.currentIndex);
  console.log(`[DEBUG] History Length:`, state.history.history.length);
  
  // Check if history and editor state are in sync
  const historyElement = state.history.history[state.history.currentIndex]?.selectedElement;
  const editorElement = state.editor.selectedElement;
  
  if (historyElement?.id !== editorElement?.id || historyElement?.type !== editorElement?.type) {
    console.warn("[DEBUG] WARNING: History and editor selectedElement not in sync!");
    console.log("History selectedElement:", historyElement);
    console.log("Editor selectedElement:", editorElement);
  }
}

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
