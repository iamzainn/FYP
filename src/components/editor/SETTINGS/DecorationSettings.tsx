import React from 'react'
import { EditorElement } from '@/providers/editor/editor-provider'
import { ColorInput } from './SettingsInput'
import { Slider } from '@/components/ui/slider'
import { getResponsiveValue } from './styleUtils'

interface DecorationsSettingsProps {
  element: EditorElement;
  onStyleChange: (property: string, value: string | number) => void;
  currentDevice: 'Desktop' | 'Tablet' | 'Mobile';
}

export const DecorationsSettings: React.FC<DecorationsSettingsProps> = ({
  element,
  onStyleChange,
  currentDevice
}) => {
  // Extract current values from styles with device-specific overrides
  const backgroundColor = getResponsiveValue(element, "backgroundColor", currentDevice) as string || '';
  const backgroundImage = getResponsiveValue(element, "backgroundImage", currentDevice) as string || '';
  const borderRadius = getResponsiveValue(element, "borderRadius", currentDevice) as string || '';
  const opacity = getResponsiveValue(element, "opacity", currentDevice) as string || '100%';
  
  // Parse opacity value for the slider
  const getOpacityValue = (): number => {
    if (typeof opacity === 'number') {
      return opacity;
    }
    
    if (typeof opacity === 'string') {
      const parsedValue = parseFloat(opacity.replace('%', ''));
      return !isNaN(parsedValue) ? parsedValue : 100;
    }
    
    return 100; // Default opacity
  };

  return (
    <div className="grid gap-4 px-1">
      {/* Background Color */}
      <ColorInput
        id="backgroundColor"
        label="Background Color"
        value={backgroundColor}
        onChange={onStyleChange}
        placeholder="#ffffff"
      />
      
      {/* Opacity Slider */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-muted-foreground">Opacity</label>
          <span className="text-sm">{getOpacityValue()}%</span>
        </div>
        <Slider
          value={[getOpacityValue()]}
          min={0}
          max={100}
          step={1}
          onValueChange={(values) => {
            onStyleChange('opacity', `${values[0]}%`);
          }}
        />
      </div>
      
      {/* Background Image */}
      <div className="flex flex-col gap-2">
        <label className="text-muted-foreground">Background Image</label>
        <div className="flex border rounded-md overflow-clip">
          <div 
            className="w-12 bg-center bg-cover" 
            style={{
              backgroundImage: backgroundImage,
            }}
          ></div>
          <input
            placeholder="url(...)"
            className="border-0 rounded-none border-l-0 w-full p-2"
            value={backgroundImage}
            onChange={(e) => onStyleChange('backgroundImage', e.target.value)}
          />
        </div>
      </div>
      
      {/* Border Radius */}
      <div className="flex flex-col gap-2">
        <label className="text-muted-foreground">Border Radius</label>
        <input
          type="text"
          value={borderRadius}
          onChange={(e) => onStyleChange('borderRadius', e.target.value)}
          className="border p-2 rounded-md"
          placeholder="0px"
        />
      </div>
    </div>
  );
};