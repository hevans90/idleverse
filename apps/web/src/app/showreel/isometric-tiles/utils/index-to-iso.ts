import { GameConfig } from '../models/game-config';

export const indexToIso = (
  i: number,
  j: number,
  { ai, offsetX, offsetY, rotation, tileWidth }: GameConfig
): [number, number] => {
  const x = offsetX + (i - j * rotation) * tileWidth;
  const y = offsetY + ((j + i * rotation) * tileWidth) / ai;
  return [x, y];
};
