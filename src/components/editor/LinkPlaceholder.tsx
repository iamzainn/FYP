import { LinkIcon } from "lucide-react"

export const LinkPlaceholder = () => {
    return (
      <div
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData('componentType', 'link')
        }}
        className="h-14 w-14 bg-accent flex items-center justify-center rounded-lg cursor-grab"
      >
        <LinkIcon size={40} className="text-muted-foreground" />
      </div>
    )
  }