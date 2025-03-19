/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import clsx from 'clsx'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { EyeOff } from 'lucide-react'
import Recursive from './BUILDER/recursive'
import { debugState as providerDebugState } from '@/providers/editor/editor-provider'

interface EditorProps {
  storeId: string
  liveMode?: boolean 
}

const Editor = ({ storeId, liveMode }: EditorProps) => {
  const { dispatch, state } = useEditor()
  
  const { liveMode: liveModeState, elements } = state.editor

  // Add debugging for Editor component
  const debugEditor = (message: string) => {
    console.log(`[EDITOR] ${message}`);
    console.log(`[EDITOR] Selected Element:`, state.editor.selectedElement);
    console.log(`[EDITOR] Elements Count:`, state.editor.elements.length);
  }
  
  // Debug when editor state changes
  useEffect(() => {
    debugEditor("Editor state changed");
  }, [state.editor.selectedElement, state.editor.elements.length]);

  useEffect(() => {
    if (liveMode) {
      dispatch({
        type: 'TOGGLE_LIVE_MODE',
      });
      debugEditor("Live mode toggled");
    }
  }, [liveMode, dispatch]);

  useEffect(() => {
    // const fetchData = async () => {
    //   const response = await getPageDetails(storeId)
    //   if (!response) return
      
    //   console.log(response)
      
    //   dispatch({
    //     type: 'LOAD_DATA',
    //     payload: {
    //       elements: response.content ? JSON.parse(response.content) : '',
    //       withLive: !liveMode,
    //     },
    //   })
    // }
    
    // fetchData()

     

  }, [storeId,dispatch])

  const handleClick = (e: React.MouseEvent) => {
    // Don't process clicks if they come from the settings panel
    if ((e.target as HTMLElement).closest('.settings-panel')) {
      return;
    }
    
    debugEditor("Editor clicked");
    
    // Only dispatch if we need to change the selection
    if (!state.editor.selectedElement?.id || !elementExistsInArray(state.editor.elements, state.editor.selectedElement.id)) {
      dispatch({
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
      debugEditor("Cleared selection");
    }
  }

  // Helper function to check if element exists
  const elementExistsInArray = (elements: EditorElement[], id: string): boolean => {
    return elements.some(el => {
      if (el.id === id) return true;
      if (Array.isArray(el.content)) {
        return elementExistsInArray(el.content, id);
      }
      return false;
    });
  }

  const handleUnpreview = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'TOGGLE_LIVE_MODE',
    })
    dispatch({
      type: 'TOGGLE_PREVIEW_MODE',
    })
  }
  
  return (
    <div
      className={clsx(
        'h-full overflow-scroll mr-[385px] bg-background transition-all rounded-md',
        {
          '!p-0 !mr-0 ': (state.editor.previewMode === true || state.editor.liveMode === true),
          '!p-0': !(state.editor.previewMode === true || state.editor.liveMode === true),
          '!w-[850px]': state.editor.device === 'Tablet',
          '!w-[420px]': state.editor.device === 'Mobile',
          'w-full': state.editor.device === 'Desktop',
        }
      )}
      onClick={handleClick}
    >
      {(state.editor.previewMode || state.editor.liveMode) && (
        <Button
          variant={"ghost"}
          size={"icon"}
          className="w-6 h-6 bg-slate-600 p-[2px] fixed top-0 left-0 z-[100]"
          onClick={handleUnpreview}
        >
          <EyeOff />
        </Button>
      )}
      
      {/* This is where your editor content will go */}
      <div className="h-full w-full">
        {Array.isArray(state.editor.elements) && 
          state.editor.elements.map((childElement) => (
            <Recursive key={childElement.id} element={childElement} />
          ))}
      </div>
      
    </div>
   
  )
}

// Helper function to fetch page details
const getPageDetails = async (storeId: string) => {
  try {
    const response = await fetch(`/api/stores/${storeId}/pages`)
    if (!response.ok) {
      throw new Error('Failed to fetch page details')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching page details:', error)
    return null
  }
}

export default Editor