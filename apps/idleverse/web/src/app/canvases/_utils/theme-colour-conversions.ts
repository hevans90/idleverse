import { Theme } from '@chakra-ui/react';
import { rgb } from '../../_state/models';

export type ThemeShades =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export const themeColorToHex = (col: string, colors: Theme['colors']) => {
  const split = col.split('.');

  const palette = split[0] as keyof Theme['colors'];
  const shade = split[1] as ThemeShades;

  return colors[palette][shade];
};

export const hexStringToNumber = (val: string) =>
  parseInt(val.replace(/^#/, ''), 16);

export const hexToRGB = (hex: string) =>
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => '#' + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16))
    .reduce((a, v, i) => ({ ...a, [i === 0 ? 'r' : i === 1 ? 'g' : 'b']: v }), {
      r: 0,
      g: 0,
      b: 0,
    });

const rgbValueToHex = (color: number) => {
  const hexadecimal = color.toString(16);
  return hexadecimal.length === 1 ? `0${hexadecimal}` : hexadecimal;
};

export const rgbToHex = ({ r: red, g: green, b: blue }: rgb) =>
  `#${rgbValueToHex(red)}${rgbValueToHex(green)}${rgbValueToHex(blue)}`;
