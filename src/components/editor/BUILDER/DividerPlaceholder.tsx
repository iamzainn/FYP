// src/components/editor/DividerPlaceholder.tsx
"use client"

import { EditorBtns } from '@/lib/constants'
import { SeparatorHorizontal } from 'lucide-react'
import React from 'react'



const DividerPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'divider')}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center cursor-grab"
    >
      <SeparatorHorizontal
        size={40}
        className="text-muted-foreground"
      />
    </div>
  )
}

export default DividerPlaceholder