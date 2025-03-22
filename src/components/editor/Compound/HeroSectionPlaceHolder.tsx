
// Add this component to your tabs
// Import the hero section icon/placeholder
import { LayoutTemplate } from 'lucide-react' // or another appropriate icon

// Inside your component tab items array
export const HeroSectionPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('componentType', type)
  }
  
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'heroSection')}
      className="h-14 w-full border-[1px] border-dashed rounded-lg flex items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-grab"
    >
      <div className="flex flex-col items-center gap-1">
        <LayoutTemplate className="h-6 w-6 text-slate-500" />
        <p className="text-xs">Hero Section</p>
      </div>
    </div>
  )
}