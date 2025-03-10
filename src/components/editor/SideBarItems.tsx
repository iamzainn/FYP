"use client"

import { useEditor } from "@/providers/editor/editor-provider"
import { motion } from "framer-motion"
import { 
  Type, 
  Image as ImageIcon, 
  Layers, 
  LayoutGrid,
  Bold,
  Minus
} from "lucide-react"
import SettingsTab from "./Settings"
import MediaTab from "./MediaTab"



// Define the available sidebar tabs
export type SidebarPanelType = "elements" | "typography" | "design" | "settings" | "layers" | "media" | "templates" | "themes"

// Props for the sidebar panels
interface SidebarItemsProps {
  activePanel: SidebarPanelType
  storeId:string
}

export function SidebarItems({   activePanel, storeId }: SidebarItemsProps) {
  const { state } = useEditor();

  
  // If in preview mode, don't render the sidebar content
  if (state.editor.previewMode) return null
  
  return (
    <motion.div 
      className="h-full w-[300px] overflow-hidden"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      <div className="h-full w-full overflow-y-auto p-4">
        {renderTabContent(activePanel, storeId)}
      </div>
    </motion.div>
  )
}

// Function to render the appropriate content based on the active panel
function renderTabContent(activePanel: SidebarPanelType, storeId: string) {
  switch (activePanel) {
    case "elements":
      return <ElementsPanel />
    case "typography":
    //   return <TypographyPanel />
    case "design":
    //   return <DesignPanel />
    case "media":
        return <MediaTab  storeId={storeId} />   
    case "layers":
    //   return <LayersPanel />
    case "settings":
      return <SettingsTab />
    case "templates":
    //   return <TemplatesPanel />
    case "themes":
    //   return <ThemesPanel />
    default:
      return <div>Select a tab</div>
  }
}




function ElementsPanel() {
  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">Elements</h3>
      <div className="grid grid-cols-2 gap-2">
        {elementButtons.map((element) => (
          <div 
            key={element.label}
            className="flex flex-col items-center justify-center p-4 rounded-md border hover:border-primary hover:bg-accent/50 cursor-pointer transition-colors"
          >
            <element.icon className="mb-2 h-6 w-6" />
            <span className="text-sm">{element.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}












// Sample element buttons for the Elements tab
const elementButtons = [
  { label: "Text", icon: Type },
  { label: "Button", icon: Bold },
  { label: "Image", icon: ImageIcon },
  { label: "Container", icon: LayoutGrid },
  { label: "Section", icon: Layers },
  { label: "Divider", icon: Minus },
  { label: "Form", icon: () => <span className="font-medium">F</span> },
  { label: "Video", icon: () => <span className="font-medium">V</span> },
]