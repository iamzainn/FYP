// src/components/editor/BUILDER/GridPlaceholder.tsx
import { EditorBtns } from "@/lib/constants"
import React from "react"
import { Grid3x3 } from "lucide-react"

const GridPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'grid')}
      className="h-14 w-14 bg-muted/70 rounded-lg p-2 flex items-center justify-center"
    >
      <Grid3x3 
        size={40}
        className="text-muted-foreground"
      />
    </div>
  )
}

export default GridPlaceholder