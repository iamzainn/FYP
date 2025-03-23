import { Minus, Plus } from 'lucide-react'
import React from 'react'
import { Label } from '@/components/ui/label'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'

// Define types for the style units
export interface StyleUnit {
  value: 'px' | 'rem' | 'em' | '%';
  label: string;
}

// Available units array
export const availableUnits: StyleUnit[] = [
  { value: 'px', label: 'Pixels' },
  { value: 'rem', label: 'REM' },
  { value: 'em', label: 'EM' },
  { value: '%', label: 'Percent' }
];

// Base property input props
interface BaseInputProps {
  id: string;
  label: string;
  value: string | number;
  placeholder?: string;
  onChange: (id: string, value: string | number) => void;
}

// Input with units (for dimensions, margins, etc.)
interface UnitInputProps extends BaseInputProps {
  unit: StyleUnit['value'];
  onUnitChange: (unit: StyleUnit['value']) => void;
  min?: number;
  max?: number;
}

export const UnitInput: React.FC<UnitInputProps> = ({
  id,
  label,
  value,
  unit,
  placeholder = '0',
  onChange,
  onUnitChange,
  min = 0,
  
}) => {
  // Extract numeric value from string (strip units)
  const numericValue = typeof value === 'string' 
    ? value.replace(/[a-z%]/g, '') 
    : String(value);

  // Handle increment/decrement
  const handleIncrement = (increment: boolean) => {
    const currentValue = parseFloat(numericValue) || 0;
    const step = unit === 'px' ? 1 : 0.1;
    const newValue = increment 
      ? currentValue + step 
      : Math.max(min, currentValue - step);
    
    onChange(id, `${newValue}${unit}`);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <Label htmlFor={id} className="text-muted-foreground">{label}</Label>
        <Select value={unit} onValueChange={onUnitChange}>
          <SelectTrigger className="w-20 h-8">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            {availableUnits.map(unitOption => (
              <SelectItem key={unitOption.value} value={unitOption.value}>
                {unitOption.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center border rounded-md overflow-hidden">
          <input
            id={id}
            type="text"
            onChange={(e) => onChange(id, `${e.target.value}${unit}`)}
            value={numericValue}
            className="flex-1 p-2 border-0 focus:ring-0"
            placeholder={placeholder}
          />
          <div className="flex items-center border-l h-full">
            <button
              type="button"
              className="px-2 py-2 hover:bg-gray-100"
              onClick={() => handleIncrement(false)}
            >
              <Minus size={14} />
            </button>
            <button
              type="button"
              className="px-2 py-2 hover:bg-gray-100"
              onClick={() => handleIncrement(true)}
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Color input component
interface ColorInputProps extends BaseInputProps {
  showOpacity?: boolean;
}

export const ColorInput: React.FC<ColorInputProps> = ({
  id,
  label,
  value,
  placeholder = '#ffffff',
  onChange,
  
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          id={`${id}-picker`}
          value={value as string || '#ffffff'}
          onChange={(e) => onChange(id, e.target.value)}
          className="w-10 h-10 p-1 cursor-pointer border rounded"
        />
        <input
          id={id}
          value={value as string || ''}
          onChange={(e) => onChange(id, e.target.value)}
          className="border p-2 rounded-md flex-1"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

// Select input component
interface SelectInputProps extends BaseInputProps {
  options: { value: string; label: string }[];
}

export const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  value,
  options,
  onChange
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-muted-foreground">{label}</Label>
      <Select 
        value={value as string} 
        onValueChange={(val) => onChange(id, val)}
      >
        <SelectTrigger id={id}>
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem 
              key={option.value} 
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

// Text input component
export const TextInput: React.FC<BaseInputProps> = ({
  id,
  label,
  value,
  placeholder,
  onChange
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-muted-foreground">{label}</Label>
      <input
        id={id}
        value={value as string}
        onChange={(e) => onChange(id, e.target.value)}
        className="border p-2 rounded-md"
        placeholder={placeholder}
      />
    </div>
  );
};

// Button input component
interface ButtonInputProps {
  id: string;
  label: string;
  onClick: () => void;
}

export const ButtonInput: React.FC<ButtonInputProps> = ({
  id,
  label,
  onClick
}) => {
  return (
    <div className="flex flex-col gap-2">
      <button
        id={id}
        onClick={onClick}
        className="bg-primary text-white p-2 rounded-md hover:bg-primary/90 transition-colors"
      >
        {label}
      </button>
    </div>
  );
};