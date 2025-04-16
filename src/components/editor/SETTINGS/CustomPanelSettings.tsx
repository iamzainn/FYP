/* eslint-disable @typescript-eslint/no-explicit-any */
// Remove unused vars if any pop up after refactor
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { EditorElement } from '@/providers/editor/editor-provider';
// Assuming necessary input components exist or are created in SettingsInput.tsx
import { ColorInput, SelectInput, TextInput, RangeInput, CheckboxInput, NumberInput } from './SettingsInput';
import { Label } from '@/components/ui/label';
// Import the registry to fetch component configurations
import { componentRegistry } from '@/lib/ComponentSystem/Core/registry';
import { ComponentConfig, ComponentSettingDefinition } from '@/lib/ComponentSystem/Core/types';

interface CustomSettingsPanelProps {
  element: EditorElement;
  config: ComponentConfig | undefined;
  customSettingsValues: { [key: string]: unknown } | undefined;
  onCustomSettingChange: (property: string, value: string | number | boolean | any[]) => void;
}

export const CustomSettingsPanel: React.FC<CustomSettingsPanelProps> = ({
  element,
  config,
  customSettingsValues,
  onCustomSettingChange,
}) => {
  const componentDef = config ? { config } : componentRegistry.getComponent(element.type as string);
  const settingDefinitions = componentDef?.config?.customSettingFields || [];

  if (settingDefinitions.length === 0) {
    return <p className="text-xs text-muted-foreground px-1 py-2">No custom settings available.</p>;
  }

  const title = 'Custom Settings';

  console.log(`[CustomSettingsPanel] Rendering ${settingDefinitions.length} custom settings for ${element.type}`);

  return (
    <div className="grid gap-4 px-1 py-2">
       <h3 className="text-sm font-medium col-span-full">{title}</h3>
        {settingDefinitions.map((settingDef: ComponentSettingDefinition) => {
            const currentValue = customSettingsValues?.[settingDef.id] ?? settingDef.defaultValue;
            console.log(`[CustomSettingsPanel] Rendering setting: ${settingDef.label} (ID: ${settingDef.id}), Type: ${settingDef.type}, CurrentValue:`, currentValue);
            switch (settingDef.type) {
              case 'text': return <TextInput key={settingDef.id} id={settingDef.id} label={settingDef.label} value={currentValue as string ?? ''} placeholder={settingDef.defaultValue as string ?? ''} onChange={onCustomSettingChange} />;
              case 'select': return <SelectInput key={settingDef.id} id={settingDef.id} label={settingDef.label} value={currentValue as string | number | boolean ?? ''} options={settingDef.options || []} onChange={onCustomSettingChange} />;
              case 'color': return <ColorInput key={settingDef.id} id={settingDef.id} label={settingDef.label} value={currentValue as string ?? '#000000'} placeholder={settingDef.defaultValue as string ?? ''} onChange={onCustomSettingChange} />;
              case 'number': return <NumberInput key={settingDef.id} id={settingDef.id} label={settingDef.label} value={currentValue as number ?? undefined} min={settingDef.min} max={settingDef.max} step={settingDef.step} placeholder={settingDef.defaultValue as string ?? ''} onChange={onCustomSettingChange} />;
              case 'range': return <RangeInput key={settingDef.id} id={settingDef.id} label={settingDef.label} value={currentValue as number ?? settingDef.defaultValue ?? 0} min={settingDef.min ?? 0} max={settingDef.max ?? 100} step={settingDef.step ?? 1} onChange={onCustomSettingChange} />;
              case 'boolean': return <CheckboxInput key={settingDef.id} id={settingDef.id} label={settingDef.label} checked={currentValue as boolean ?? false} onChange={onCustomSettingChange} />;
              default:
                 console.warn(`[CustomSettingsPanel] Unsupported custom setting type: ${settingDef.type} for ${settingDef.id}`);
                return <div key={settingDef.id}><Label>{settingDef.label}</Label><p className="text-xs text-destructive">Unsupported setting type: {settingDef.type}</p></div>;
            }
        })}
    </div>
  );
};