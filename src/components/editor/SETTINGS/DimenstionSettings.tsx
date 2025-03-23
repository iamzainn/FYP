import React, { useState } from 'react'
import { EditorElement } from '@/providers/editor/editor-provider'
import { UnitInput, StyleUnit, } from './SettingsInput'

interface DimensionsSettingsProps {
  element: EditorElement;
  onStyleChange: (property: string, value: string | number) => void;
}

export const DimensionsSettings: React.FC<DimensionsSettingsProps> = ({
  element,
  onStyleChange
}) => {
  // State for current units
  const [marginUnit, setMarginUnit] = useState<StyleUnit['value']>('px');
  const [paddingUnit, setPaddingUnit] = useState<StyleUnit['value']>('px');
  const [sizeUnit, setSizeUnit] = useState<StyleUnit['value']>('px');
  
  // Extract current dimensions from styles
  const width = element.styles.width as string || '';
  const height = element.styles.height as string || '';
  const marginTop = element.styles.marginTop as string || '';
  const marginRight = element.styles.marginRight as string || '';
  const marginBottom = element.styles.marginBottom as string || '';
  const marginLeft = element.styles.marginLeft as string || '';
  const paddingTop = element.styles.paddingTop as string || '';
  const paddingRight = element.styles.paddingRight as string || '';
  const paddingBottom = element.styles.paddingBottom as string || '';
  const paddingLeft = element.styles.paddingLeft as string || '';

  return (
    <div className="grid gap-4 px-1">
      {/* Size Controls */}
      <div className="grid grid-cols-2 gap-4">
        <UnitInput
          id="width"
          label="Width"
          value={width}
          unit={sizeUnit}
          onChange={onStyleChange}
          onUnitChange={setSizeUnit}
          placeholder="auto"
        />
        
        <UnitInput
          id="height"
          label="Height"
          value={height}
          unit={sizeUnit}
          onChange={onStyleChange}
          onUnitChange={setSizeUnit}
          placeholder="auto"
        />
      </div>
      
      {/* Margin Controls */}
      <div className="mt-2">
        <h4 className="text-sm font-medium mb-2">Margin</h4>
        <div className="grid grid-cols-2 gap-3">
          <UnitInput
            id="marginTop"
            label="Top"
            value={marginTop}
            unit={marginUnit}
            onChange={onStyleChange}
            onUnitChange={setMarginUnit}
          />
          
          <UnitInput
            id="marginRight"
            label="Right"
            value={marginRight}
            unit={marginUnit}
            onChange={onStyleChange}
            onUnitChange={setMarginUnit}
          />
          
          <UnitInput
            id="marginBottom"
            label="Bottom"
            value={marginBottom}
            unit={marginUnit}
            onChange={onStyleChange}
            onUnitChange={setMarginUnit}
          />
          
          <UnitInput
            id="marginLeft"
            label="Left"
            value={marginLeft}
            unit={marginUnit}
            onChange={onStyleChange}
            onUnitChange={setMarginUnit}
          />
        </div>
      </div>
      
      {/* Padding Controls */}
      <div className="mt-2">
        <h4 className="text-sm font-medium mb-2">Padding</h4>
        <div className="grid grid-cols-2 gap-3">
          <UnitInput
            id="paddingTop"
            label="Top"
            value={paddingTop}
            unit={paddingUnit}
            onChange={onStyleChange}
            onUnitChange={setPaddingUnit}
          />
          
          <UnitInput
            id="paddingRight"
            label="Right"
            value={paddingRight}
            unit={paddingUnit}
            onChange={onStyleChange}
            onUnitChange={setPaddingUnit}
          />
          
          <UnitInput
            id="paddingBottom"
            label="Bottom"
            value={paddingBottom}
            unit={paddingUnit}
            onChange={onStyleChange}
            onUnitChange={setPaddingUnit}
          />
          
          <UnitInput
            id="paddingLeft"
            label="Left"
            value={paddingLeft}
            unit={paddingUnit}
            onChange={onStyleChange}
            onUnitChange={setPaddingUnit}
          />
        </div>
      </div>
    </div>
  );
};