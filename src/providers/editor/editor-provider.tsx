"use client";

import { EditorBtns } from '@/lib/constants'
import { createContext, useContext, useReducer,  ReactNode } from 'react'

export type DeviceTypes = 'Desktop' | 'Mobile' | 'Tablet'

export type EditorElement = {
  id: string
  styles: React.CSSProperties
  name: string
  type: EditorBtns
  content: EditorElement[] | {src?:string,innerText?:string,href?:string, alt?:string, iconType?:string,width?:string,height?:string,borderRadius?:string,borderTopRadius?:string,borderRightRadius?:string,borderBottomRadius?:string,borderLeftRadius?:string}
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
      type: 'TOGGLE_LIVE_MODE', 
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
  
  return (
    <EditorContext.Provider
      value={{
        state,
        dispatch,
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
  switch (action.type) {
    case 'ADD_ELEMENT': {
      const updatedEditorState = {
        ...state.editor,
        elements: addAnElement(state.editor.elements, action),
      }
      
      // Update the history to include the entire updated EditorState
      const updatedHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorState }, // Save a copy of the updated state
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
      // Perform your logic to update the element in the state
      const updatedElements = updateAnElement(state.editor.elements, action)
      
      const updatedElementIsSelected = 
        state.editor.selectedElement.id === action.payload.elementDetails.id
      
      const updatedEditorStateWithUpdate = {
        ...state.editor,
        elements: updatedElements,
        selectedElement: updatedElementIsSelected
          ? action.payload.elementDetails
          : {
              id: "",
              content: [],
              name: "",
              styles: {},
              type: null,
            },
      }
      
      const updatedHistoryWithUpdate = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateWithUpdate }, // Save a copy of the updated state
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
      const updatedElements = deleteAnElement(state.editor.elements, action)
      
      const updatedEditorState = {
        ...state.editor,
        elements: updatedElements,
      }
      
      // Update history
      const updatedHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorState },
      ]
      
      return {
        ...state,
        editor: updatedEditorState,
        history: {
          ...state.history,
          history: updatedHistory,
          currentIndex: updatedHistory.length - 1,
        },
      }
    }
    
    case 'REDO': {
      // Check if we can redo (not at the end of history)
      if (state.history.currentIndex < state.history.history.length - 1) {
        const nextIndex = state.history.currentIndex + 1
        const nextEditorState = { ...state.history.history[nextIndex] }
        
        const redoState = {
          ...state,
          editor: nextEditorState,
          history: {
            ...state.history,
            currentIndex: nextIndex,
          },
        }
        
        return redoState
      }
      return state
    }
    
    case 'UNDO': {
      // Check if we can undo (not at the beginning of history)
      if (state.history.currentIndex > 0) {
        const prevIndex = state.history.currentIndex - 1
        const prevEditorState = { ...state.history.history[prevIndex] }
        
        const undoState = {
          ...state,
          editor: prevEditorState,
          history: {
            ...state.history,
            currentIndex: prevIndex,
          },
        }
        
        return undoState
      }
      return state
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
      const clickedState = {
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
        },
        history: {
          ...state.history,
          history: [
            ...state.history.history.slice(0, state.history.currentIndex + 1),
            { ...state.editor },// Save a copy of the current editor state
          ],
          currentIndex: state.history.currentIndex + 1,
        },
      }
      
      return clickedState
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
  
  return editorArray.filter((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return false
    } else if (item.content && Array.isArray(item.content)) {
      item.content = deleteAnElement(item.content, action)
    }
    return true
  })
}
