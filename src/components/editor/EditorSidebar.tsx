"use client"

import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useEditor } from "@/providers/editor/editor-provider"
import React from "react"
import SettingsTab from "./Settings"
import MediaTab from "./MediaTab"
import { Settings, Image as ImageIcon, Layers, Plus } from "lucide-react"
import clsx from "clsx"

// Additional imports for SheetHeader components
import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import ComponentsTab from "./ComponentTab"

type Props = {
  storeId: string
}

export function EditorSidebar({ storeId }: Props) {
  const { state } = useEditor()
  
  // Don't render when in preview mode
  if (state.editor.previewMode) return null
  
  return (
    <Sheet open={true} modal={false}>
      <Tabs className="w-full" defaultValue="Settings">
        
        
        <SheetContent
          side="right"
          className={clsx(
            'mt-[97px] w-16 z-[80] shadow-none p-0 focus:border-none transition-all overflow-hidden',
            { hidden: state.editor.previewMode }
          )}
        >
          <TabList />
        </SheetContent>
        
        <SheetContent
          
          side="right"
          className={clsx(
            'mt-[97px] w-80 z-[40] shadow-none p-0 mr-16 bg-background h-full transition-all overflow-hidden',
            { hidden: state.editor.previewMode }
          )}
        >
          <div className="grid gap-4 h-full pb-36 overflow-scroll">
            <TabsContent value="Settings">
              <SheetHeader className="text-left p-6">
                <SheetTitle>Styles</SheetTitle>
                <SheetDescription>
                  Show your creativity! You can customize every component as you like.
                </SheetDescription>
              </SheetHeader>
              <SettingsTab />
            </TabsContent>
            <TabsContent value="Components">
  <SheetHeader className="text-left p-6">
    <SheetTitle>Components</SheetTitle>
    <SheetDescription>
      Drag and drop components to build your page.
    </SheetDescription>
  </SheetHeader>
  <ComponentsTab />
</TabsContent>
            <TabsContent value="Layers">
              <SheetHeader className="text-left p-6">
                <SheetTitle>Layers</SheetTitle>
                <SheetDescription>
                  Manage the layers and structure of your page.
                </SheetDescription>
              </SheetHeader>
              {/* Layers Panel Component Here */}
            </TabsContent>
            <TabsContent value="Media">
              <SheetHeader className="text-left p-6">
                <SheetTitle>Media</SheetTitle>
                <SheetDescription>
                  Upload and manage media for your store.
                </SheetDescription>
              </SheetHeader>
              <MediaTab storeId={storeId} />
            </TabsContent>
          </div>
        </SheetContent>
      </Tabs>
    </Sheet>
  )
}

const TabList = () => {
  return (
    <TabsList className="flex items-center flex-col justify-evenly w-full bg-transparent h-fit gap-4">
      <TabsTrigger
        value="Settings"
        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
      >
        <Settings />
      </TabsTrigger>
      <TabsTrigger
        value="Components"
        className="data-[state=active]:bg-muted w-10 h-10 p-0"
      >
        <Plus />
      </TabsTrigger>
      <TabsTrigger
        value="Layers"
        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
      >
        <Layers />
      </TabsTrigger>
      <TabsTrigger
        value="Media"
        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
      >
        <ImageIcon />
      </TabsTrigger>
    </TabsList>
  )
}