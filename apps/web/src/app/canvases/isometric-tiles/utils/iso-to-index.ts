import { GameConfig } from '../models/game-config';

export const isoToIndex = (
  x: number,
  y: number,
  { ai, offsetX, offsetY, rotation, tileWidth }: GameConfig
): [number, number] => {
  const s = x - offsetX;
  const t = y - offsetY;

  let j =
    (((t - (s * rotation) / ai) / (1 + rotation * rotation)) * ai) / tileWidth;
  let i = (s + j * tileWidth * rotation) / tileWidth;

  i = Math.floor(i);
  j = Math.floor(j);

  if (Number.isNaN(i) || Number.isNaN(j)) {
    console.warn(`i: ${i}, j: ${j} looking fishy...`);
  }

  return [i, j];
};
