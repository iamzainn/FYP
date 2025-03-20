"use client"

import { useParams } from 'next/navigation'
import { EditorProvider } from '@/providers/editor/editor-provider'
import { type StorePage } from '@/providers/editor/editor-provider'
import { EditorNavigation } from '@/components/editor/Navigation'
import { EditorSidebar } from '@/components/editor/EditorSidebar'
import Editor from '@/components/editor/Editor'

export default function EditorPage() {
  const params = useParams()
  const storeId = params.storeId as string
  const userId = params.userId as string
  const storePageId = params.storePageId as string
  
  console.log(`[EDITOR PAGE] Loading editor for page: ${storePageId}`);
  
  // In a real implementation, you would fetch the page details from your database
  const pageDetails: StorePage = {
    id: storePageId,
    title: "Home Page", // This would come from your database
    order: 1, // This would come from your database
    content: "", // This would come from your database
    slug: "home-page", // This would come from your database
    storeId: storeId, // This would come from your database
    published: false, // This would come from your database
    // Add other page details as needed
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden">
      <EditorProvider
        storeId={storeId}
        pageDetails={pageDetails}
      >
        <EditorNavigation 
        
          userId={userId}
          storeId={storeId}
          pageDetails={pageDetails}
        />
        
        <div className="h-full flex justify-center">
          <Editor storeId={storeId}
          
          />
        </div>
        
        <EditorSidebar storeId={storeId}
    
        />
      </EditorProvider>
    </div>
  )
}