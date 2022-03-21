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
