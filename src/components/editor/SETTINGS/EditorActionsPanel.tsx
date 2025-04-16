import React from 'react';
import { EditorElement } from '@/providers/editor/editor-provider';
import { ComponentConfig, EditorActionDefinition } from '@/lib/ComponentSystem/Core/types';
import { ButtonInput } from './SettingsInput'; // Or use standard Button
import { Plus } from 'lucide-react'; // Example icon

interface EditorActionsPanelProps {
  element: EditorElement;
  config: ComponentConfig | undefined; // Pass the whole config
  onAction: (action: EditorActionDefinition) => void; // Callback when an action is clicked
}

export const EditorActionsPanel: React.FC<EditorActionsPanelProps> = ({
  element,
  config,
  onAction,
}) => {
  const actionDefinitions = config?.editorActions || [];

  if (actionDefinitions.length === 0) {
    // Don't render anything if no actions are defined
    // Or optionally render a placeholder:
    // return <p className="text-xs text-muted-foreground px-1 py-2">No actions available.</p>;
    return null;
  }

  console.log(`[EditorActionsPanel] Rendering ${actionDefinitions.length} actions for ${element.type}`);
  const title = 'Actions'; // Define title

  return (
    <div className="grid gap-3 px-1 py-2"> {/* Adjust styling as needed */}
      {/* --- Add Panel Heading --- */}
      <h3 className="text-sm font-medium col-span-full">{title}</h3>
      {/* ----------------------- */}
      {actionDefinitions.map((actionDef: EditorActionDefinition) => {
        console.log(`[EditorActionsPanel] Rendering button for: ${actionDef.label}`);
        // Example: Render a button with a Plus icon for 'addChild'
        if (actionDef.actionType === 'addChild') {
          return (
            <button
              key={actionDef.id}
              onClick={() => onAction(actionDef)}
              className="flex items-center justify-center gap-2 w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus size={16} />
              {actionDef.label}
            </button>
          );
        }
        // Add rendering for other action types later if needed
        return (
           <ButtonInput
              key={actionDef.id}
              id={actionDef.id}
              label={actionDef.label}
              onClick={() => onAction(actionDef)}
           />
        )
      })}
    </div>
  );
};
