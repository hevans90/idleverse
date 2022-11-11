import { Text } from 'pixi.js';

export const indicatorFactory = (
  text: string,
  x: number,
  y: number,
  name: string,
  fontSize = 18,
  color = 0xffffff
) => {
  const ind = new Text(text, {
    fontFamily: 'zx spectrum',
    fontSize,
    fill: color,
  });

  ind.x = x;
  ind.y = y;
  ind.name = name;

  return ind;
};
