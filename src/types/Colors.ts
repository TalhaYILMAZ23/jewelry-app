export type ColorType = 'yellow' | 'white' | 'rose';

export interface ColorOption {
  type: ColorType;
  name: string;
  hex: string;
  label: string;
}

export const COLOR_OPTIONS: ColorOption[] = [
  {
    type: 'yellow',
    name: 'Yellow Gold',
    hex: '#E6CA97',
    label: 'Yellow Gold'
  },
  {
    type: 'white',
    name: 'White Gold',
    hex: '#D9D9D9',
    label: 'White Gold'
  },
  {
    type: 'rose',
    name: 'Rose Gold',
    hex: '#E1A4A9',
    label: 'Rose Gold'
  }
];

export const getColorByType = (type: ColorType): ColorOption => {
  return COLOR_OPTIONS.find(color => color.type === type) || COLOR_OPTIONS[0];
};
