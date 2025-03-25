import React, { useState } from 'react'
import { EditorElement } from '@/providers/editor/editor-provider'
import { UnitInput, StyleUnit } from './SettingsInput'
import { getResponsiveValue } from './styleUtils'

interface DimensionsSettingsProps {
  element: EditorElement;
  onStyleChange: (property: string, value: string | number) => void;
  currentDevice: 'Desktop' | 'Tablet' | 'Mobile';
}

export const DimensionsSettings: React.FC<DimensionsSettingsProps> = ({
  element,
  onStyleChange,
  currentDevice
}) => {
  // State for current units
  const [marginUnit, setMarginUnit] = useState<StyleUnit['value']>('px');
  const [paddingUnit, setPaddingUnit] = useState<StyleUnit['value']>('px');
  const [sizeUnit, setSizeUnit] = useState<StyleUnit['value']>('px');
  
  // Extract current dimensions from styles with device-specific overrides
  const width = getResponsiveValue(element, "width", currentDevice) as string || '';
  const height = getResponsiveValue(element, "height", currentDevice) as string || '';
  const marginTop = getResponsiveValue(element, "marginTop", currentDevice) as string || '';
  const marginRight = getResponsiveValue(element, "marginRight", currentDevice) as string || '';
  const marginBottom = getResponsiveValue(element, "marginBottom", currentDevice) as string || '';
  const marginLeft = getResponsiveValue(element, "marginLeft", currentDevice) as string || '';
  const paddingTop = getResponsiveValue(element, "paddingTop", currentDevice) as string || '';
  const paddingRight = getResponsiveValue(element, "paddingRight", currentDevice) as string || '';
  const paddingBottom = getResponsiveValue(element, "paddingBottom", currentDevice) as string || '';
  const paddingLeft = getResponsiveValue(element, "paddingLeft", currentDevice) as string || '';

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