/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useEditor } from "@/providers/editor/editor-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DeviceTypes } from "@/providers/editor/editor-provider"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import Link from "next/link"
import clsx from "clsx"
import { debugState as providerDebugState } from '@/providers/editor/editor-provider'

// Icons
import { 
  Undo2, 
  Redo2, 
  Smartphone, 
  Tablet, 
  Save, 
  Eye, 
  EyeOff,
  ArrowLeftCircle,
  Laptop 
} from "lucide-react"

// Dummy server action to update a store page
async function updateStorePage(
  storeId: string, 
  pageData: {
    id: string;
    title?: string;
    content: string;
    path?: string;
  }, 
  pageId?: string
) {
  // This would be implemented with your actual API endpoint
  console.log("Updating store page", { storeId, pageData, pageId })
  // Example implementation with fetch:
  // const response = await fetch(`/api/stores/${storeId}/pages/${pageId}`, {
  //   method: 'PATCH',
  //   body: JSON.stringify({ 
  //     title: pageData.title,
  //     content: pageData.content,
  //     path: pageData.path
  //   }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
  // 
  // if (!response.ok) {
  //   throw new Error('Failed to update page content')
  // }
  //
  // return await response.json()
  
  // For now, just simulate success
  return { success: true, name: pageData.title }
}

type EditorNavigationProps = {
  storeId: string
  userId : string
  pageDetails: {
    id: string
    title?: string
    path?: string
    slug?: string
    order?: number
  } | null
}

export function EditorNavigation({ 
  storeId, 
  pageDetails,
  userId 
}: EditorNavigationProps) {
  // const router = useRouter()
  const { state, dispatch } = useEditor()

  console.log("Navigation Component")
  
  // Add debugging for Navigation component
  const debugNavigation = (message: string) => {

    console.log(`[NAVIGATION] ${message}`);
    console.log(`[NAVIGATION] State:`, state.history.currentIndex)
    console.log(`[NAVIGATION] Current Device:`, state.editor.device);
    console.log(`[NAVIGATION] Preview Mode:`, state.editor.previewMode);
    console.log(`[NAVIGATION] Live Mode:`, state.editor.liveMode);
  }
  
  const [title, setTitle] = useState(pageDetails?.title || "Untitled Page")
  const [isSaving, setIsSaving] = useState(false)
  
  // Handle title updates
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  
  const handleTitleBlur = async () => {
    if (!pageDetails || title === pageDetails.title) return
    
    try {
      setIsSaving(true)
      // In a full implementation, you would make an API call here
      toast.success("Page title updated")
    } catch (error) {
      toast.error("Failed to update page title")
      // Reset to original title
      setTitle(pageDetails.title || "Untitled Page")
    } finally {
      setIsSaving(false)
    }
  }

  const handleOnSave = async () => {
    try {
      const content = JSON.stringify(state.editor.elements)
      console.log(content)
      
      // Using the store page details
      const response = await updateStorePage(
        storeId,
        {
          id: pageDetails?.id || "",
          title: pageDetails?.title,
          content,
          path: pageDetails?.path
        },
        pageDetails?.id 
      )
     
      toast("Saved Contents", {
        description: "Your content has been saved successfully",
      })
    } catch (error) {
      toast("Could not save Page Contents", {
        description: "There was an error saving your content",
      })
    }
  }
  
  // Handle device change
  const handleDeviceChange = (device: DeviceTypes) => {
    debugNavigation(`Device changed to ${device}`);
    dispatch({
      type: 'CHANGE_DEVICE',
      payload: { device, dispatch },
    });
    
    // Call provider debug function for comprehensive info
    if (typeof providerDebugState === 'function') {
      providerDebugState('DEVICE_CHANGED', state);
    }
  }
  
  // Handle preview mode toggle
  const togglePreviewMode = () => {
    // debugNavigation("Preview mode toggled");
    dispatch({
      type: 'TOGGLE_PREVIEW_MODE',
    });
    dispatch({
      type: 'TOGGLE_LIVE_MODE'
    });
    
    // Call provider debug function for comprehensive info
    if (typeof providerDebugState === 'function') {
      providerDebugState('PREVIEW_TOGGLED', state);
    }
  }
  
  // Handle undo/redo
  const handleUndo = () => {
    debugNavigation("Undo requested");
    dispatch({ type: 'UNDO' });
    
    // Call provider debug function for comprehensive info
    if (typeof providerDebugState === 'function') {
      providerDebugState('UNDO', state);
    }
  }
  
  const handleRedo = () => {
    debugNavigation("Redo requested");
    dispatch({ type: 'REDO' });
    
    // Call provider debug function for comprehensive info
    if (typeof providerDebugState === 'function') {
      providerDebugState('REDO', state);
    }
  }
  
  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault()
        if (e.shiftKey) {
          handleRedo()
        } else {
          handleUndo()
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
  
  const canUndo = state.history.currentIndex > 0
  const canRedo = state.history.currentIndex < state.history.history.length - 1
  
  return (
    <TooltipProvider>
      <nav 
        className={clsx(
          'border-b-[1px] flex items-center justify-between p-6 gap-2 transition-all',
          { '!h-0 !p-0 !overflow-hidden': state.editor.previewMode }
        )}
      >
        <aside className="flex items-center gap-4 max-w-[260px] w-[300px]">
          <Link href={`/site/${userId}/stores/${storeId}/${pageDetails?.id}`}>
            <ArrowLeftCircle />
          </Link>
          <div className="flex flex-col w-full">
            <Input
              value={title}
              onChange={handleTitleChange}
              className="border-none h-5 m-0 p-0 text-lg"
              onBlur={handleTitleBlur}
            />
            <span className="text-sm text-muted-foreground">
              Path: /{pageDetails?.path || pageDetails?.slug}
            </span>
          </div>
        </aside>
        
        {/* Device Selection Tabs */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={state.editor.device === 'Desktop' ? 'default' : 'ghost'} 
                size="icon"
                onClick={() => handleDeviceChange('Desktop')}
              >
                <Laptop className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Desktop</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={state.editor.device === 'Tablet' ? 'default' : 'ghost'} 
                size="icon"
                onClick={() => handleDeviceChange('Tablet')}
              >
                <Tablet className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Tablet</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={state.editor.device === 'Mobile' ? 'default' : 'ghost'} 
                size="icon"
                onClick={() => handleDeviceChange('Mobile')}
              >
                <Smartphone className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Mobile</TooltipContent>
          </Tooltip>
        </div>
        
        {/* Right side actions */}
        <aside className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            disabled={!canUndo}
            onClick={handleUndo}
            className="hover:bg-slate-800"
          >
            <Undo2 className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            disabled={!canRedo}
            onClick={handleRedo}
            className="hover:bg-slate-800"
          >
            <Redo2 className="h-5 w-5" />
          </Button>
          
          <div className="flex flex-col item-center mr-4">
            <div className="flex flex-row items-center gap-4">
              Draft
              <Switch
                defaultChecked={true}
              />
              Publish
            </div>
            <span className="text-muted-foreground text-sm">
              {/* Last updated {new Date().toLocaleDateString()} */}
            </span>
          </div>
          
          <Button
            className="flex flex-row items-center gap-4 bg-blue-600 hover:bg-blue-700"
            onClick={handleOnSave}
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
          
          <Button 
            variant={state.editor.previewMode ? "default" : "outline"}
            onClick={togglePreviewMode}
          >
            {state.editor.previewMode ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" /> Edit
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" /> Preview
              </>
            )}
          </Button>
        </aside>
      </nav>
    </TooltipProvider>
  )
}