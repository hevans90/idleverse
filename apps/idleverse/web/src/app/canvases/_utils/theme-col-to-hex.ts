export const themeColToHex = (val: string) =>
  parseInt(val.replace(/^#/, ''), 16);
