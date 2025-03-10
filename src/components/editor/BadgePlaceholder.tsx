// src/components/editor/BadgePlaceholder.tsx
"use client"

import { EditorBtns } from '@/lib/constants'
import { Tag } from 'lucide-react'
import React from 'react'


const BadgePlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'badge')}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center cursor-grab"
    >
      <Tag
        size={40}
        className="text-muted-foreground"
      />
    </div>
  )
}

export default BadgePlaceholder