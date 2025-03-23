import React from 'react'
import { EditorElement } from '@/providers/editor/editor-provider'
import { SelectInput, TextInput } from './SettingsInput'

interface TypographySettingsProps {
  element: EditorElement;
  onStyleChange: (property: string, value: string | number) => void;
}

// Font family options
const fontFamilyOptions = [
  { value: "var(--font-inter)", label: "Inter" },
  { value: "var(--font-roboto)", label: "Roboto" },
  { value: "var(--font-poppins)", label: "Poppins" },
  { value: "var(--font-playfair)", label: "Playfair Display" },
  { value: "var(--font-montserrat)", label: "Montserrat" },
  { value: "var(--font-opensans)", label: "Open Sans" },
  { value: "var(--font-sourcecode)", label: "Source Code Pro" },
];

// Font weight options
const fontWeightOptions = [
  { value: "normal", label: "Normal" },
  { value: "bold", label: "Bold" },
  { value: "100", label: "Thin (100)" },
  { value: "200", label: "Extra Light (200)" },
  { value: "300", label: "Light (300)" },
  { value: "400", label: "Regular (400)" },
  { value: "500", label: "Medium (500)" },
  { value: "600", label: "Semi Bold (600)" },
  { value: "700", label: "Bold (700)" },
  { value: "800", label: "Extra Bold (800)" },
  { value: "900", label: "Black (900)" },
];

// Text align options
const textAlignOptions = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
  { value: "justify", label: "Justify" },
];

// Font size unit options
const fontSizeUnitOptions = [
  { value: "px", label: "px" },
  { value: "rem", label: "rem" },
  { value: "em", label: "em" },
  { value: "%", label: "%" },
];

export const TypographySettings: React.FC<TypographySettingsProps> = ({
  element,
  onStyleChange
}) => {
  // Extract current values from styles
  const fontFamily = element.styles.fontFamily as string || "";
  const fontWeight = element.styles.fontWeight as string || "";
  const fontSize = element.styles.fontSize as string || "";
  const textAlign = element.styles.textAlign as string || "";
  const color = element.styles.color as string || "";
  const lineHeight = element.styles.lineHeight as string || "";
  const letterSpacing = element.styles.letterSpacing as string || "";
  
  // Parse font size to create proper input
  const parseFontSize = () => {
    if (!fontSize) return { value: "", unit: "px" };
    
    const match = fontSize.match(/^([\d.]+)([a-z%]*)$/);
    if (match) {
      const [, value, unit] = match;
      return { value, unit: unit || "px" };
    }
    
    return { value: "", unit: "px" };
  };
  
  const { value: fontSizeValue, unit: fontSizeUnit } = parseFontSize();
  
  // Handler for font size changes with units
  const handleFontSizeChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    onStyleChange("fontSize", `${numValue}${fontSizeUnit}`);
  };
  
  const handleFontSizeUnitChange = (unit: string) => {
    const numValue = parseFloat(fontSizeValue) || 0;
    onStyleChange("fontSize", `${numValue}${unit}`);
  };

  return (
    <div className="grid gap-4 px-1">
      {/* Font Family */}
      <SelectInput
        id="fontFamily"
        label="Font Family"
        value={fontFamily}
        options={fontFamilyOptions}
        onChange={onStyleChange}
      />
      
      {/* Font Size with Unit */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-muted-foreground">Font Size</label>
          <select
            className="border p-1 rounded-md text-sm"
            value={fontSizeUnit}
            onChange={(e) => handleFontSizeUnitChange(e.target.value)}
          >
            {fontSizeUnitOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          value={fontSizeValue}
          onChange={(e) => handleFontSizeChange(e.target.value)}
          className="border p-2 rounded-md"
          placeholder="14"
        />
      </div>
      
      {/* Font Weight */}
      <SelectInput
        id="fontWeight"
        label="Font Weight"
        value={fontWeight}
        options={fontWeightOptions}
        onChange={onStyleChange}
      />
      
      {/* Text Align */}
      <SelectInput
        id="textAlign"
        label="Text Align"
        value={textAlign}
        options={textAlignOptions}
        onChange={onStyleChange}
      />
      
      {/* Text Color */}
      <div className="flex flex-col gap-2">
        <label className="text-muted-foreground">Text Color</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={color || "#000000"}
            onChange={(e) => onStyleChange("color", e.target.value)}
            className="w-10 h-10 p-1 cursor-pointer border rounded"
          />
          <input
            type="text"
            value={color || ""}
            onChange={(e) => onStyleChange("color", e.target.value)}
            className="border p-2 rounded-md flex-1"
            placeholder="#000000"
          />
        </div>
      </div>
      
      {/* Line Height */}
      <TextInput
        id="lineHeight"
        label="Line Height"
        value={lineHeight}
        placeholder="1.5"
        onChange={onStyleChange}
      />
      
      {/* Letter Spacing */}
      <TextInput
        id="letterSpacing"
        label="Letter Spacing"
        value={letterSpacing}
        placeholder="normal"
        onChange={onStyleChange}
      />
    </div>
  );
};