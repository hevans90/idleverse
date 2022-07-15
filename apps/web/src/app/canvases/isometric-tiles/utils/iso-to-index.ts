import { GameConfig } from '../models/game-config';

export const isoToIndex = (
  x: number,
  y: number,
  { ai, offsetX, offsetY, rotation, scale, tileWidth }: GameConfig,
): [number, number] => {
  const b = scale * tileWidth;

  const s = x - offsetX;
  const t = y - offsetY;

  let j = (((t - (s * rotation) / ai) / (1 + rotation * rotation)) * ai) / b;
  let i = (s + j * b * rotation) / b;

  i = Math.floor(i);
  j = Math.floor(j);

  if (Number.isNaN(i) || Number.isNaN(j)) {
    console.warn(`i: ${i}, j: ${j} looking fishy...`);
  }

  return [i, j];
};
