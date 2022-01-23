import { Text } from 'pixi.js';

export const indicatorFactory = (
  text: string,
  x: number,
  y: number,
  name: string
) => {
  const ind = new Text(text, {
    fontFamily: 'zx spectrum',
    fontSize: 18,
    fill: 0xffffff,
  });

  ind.x = x;
  ind.y = y;
  ind.name = name;

  return ind;
};
