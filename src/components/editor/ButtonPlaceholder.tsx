// src/components/editor/ButtonPlaceholder.tsx
"use client"

import { EditorBtns } from '@/lib/constants'
import { Wallet } from 'lucide-react' // Using Wallet icon as it looks like a button
import React from 'react'



const ButtonPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'button')}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center cursor-grab"
    >
      <Wallet
        size={40}
        className="text-muted-foreground"
      />
    </div>
  )
}

export default ButtonPlaceholder