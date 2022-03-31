import { rgb } from '../../_state/models';

export const themeColToHex = (val: string) =>
  parseInt(val.replace(/^#/, ''), 16);

export const themeColToRGB = (hex: string) =>
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
