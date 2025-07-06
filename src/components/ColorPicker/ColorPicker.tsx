import React from 'react';
import { type ColorType } from '../../types/Colors';
import styles from './ColorPicker.module.css';

interface ColorPickerProps {
  selectedColor: ColorType;
  onColorChange: (color: ColorType) => void;
}

const COLOR_OPTIONS = [
  { type: 'yellow' as ColorType, hex: '#E6CA97', label: 'Yellow Gold' },
  { type: 'white' as ColorType, hex: '#D9D9D9', label: 'White Gold' },
  { type: 'rose' as ColorType, hex: '#E1A4A9', label: 'Rose Gold' }
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ 
  selectedColor, 
  onColorChange 
}) => {
  const selectedColorData = COLOR_OPTIONS.find(c => c.type === selectedColor);

  return (
    <div className={styles.colorPicker}>
      <div className={styles.colorOptions}>
        {COLOR_OPTIONS.map((color) => (
          <button
            key={color.type}
            className={`${styles.colorOption} ${
              selectedColor === color.type ? styles.selected : ''
            }`}
            style={{ backgroundColor: color.hex }}
            onClick={() => onColorChange(color.type)}
            title={color.label}
            aria-label={`Select ${color.label}`}
          />
        ))}
      </div>
      <span className={styles.colorLabel}>
        {selectedColorData?.label}
      </span>
    </div>
  );
};
