// src/components/editor/BUILDER/IconComponent.tsx
'use client'

import { Badge } from '@/components/ui/badge'
import { EditorBtns } from '@/lib/constants'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import { 
  CircleUser, 
  ShoppingCart, 
  Heart, 
  Star, 
  Store, 
  Package, 
  Truck, 
  Phone, 
  Mail, 
  Trash 
} from 'lucide-react'
import React from 'react'

type Props = {
  element: EditorElement
}

// Map of available icons
const iconMap: Record<string, React.ReactNode> = {
  'user': <CircleUser />,
  'cart': <ShoppingCart />,
  'heart': <Heart />,
  'star': <Star />,
  'store': <Store />,
  'package': <Package />,
  'truck': <Truck />,
  'phone': <Phone />,
  'mail': <Mail />,
}

const IconComponent = ({ element }: Props) => {
  const { dispatch, state } = useEditor()
  const {  content, styles } = element
  
  // Extract icon type or use default
  const iconType = typeof content === 'object' && 'iconType' in content 
    ? content.iconType as string
    : 'user'
    
  // Extract size or use default
  const iconSize = styles?.fontSize 
    ? parseInt(styles.fontSize as string) || 24
    : 24

  // Handle element selection
  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: element,
      },
    })
  }

  // Handle element deletion
  const handleDeleteElement = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: element },
    })
  }

  // Handle drag start for reordering
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }

  // Render the selected icon or fallback to user icon
  const renderIcon = () => {
    const IconComponent = iconMap[iconType] || iconMap['user']
    
    return React.cloneElement(IconComponent as React.ReactElement, {
      size: iconSize,
      className: clsx('h-full w-full object-contain', styles?.color ? { color: styles.color } : 'text-primary'),
    })
  }

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, 'icon')}
      onClick={handleOnClickBody}
      className={clsx(
        'relative inline-flex items-center justify-center m-[5px] transition-all',
        {
          '!border-blue-500': 
            state.editor.selectedElement.id === element.id,
          'border-solid': state.editor.selectedElement.id === element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
    >
      {/* Selection indicator badge */}
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
            {element.name}
          </Badge>
        )}
      
      {/* Render the icon */}
      {renderIcon()}
      
      {/* Delete button */}
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  )
}

export default IconComponent