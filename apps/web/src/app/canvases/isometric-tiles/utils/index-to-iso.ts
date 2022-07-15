import { GameConfig } from '../models/game-config';

export const indexToIso = (
  i: number,
  j: number,
  { ai, offsetX, offsetY, rotation, scale, tileWidth }: GameConfig,
): [number, number] => {
  const x = offsetX + (i - j * rotation) * scale * tileWidth;
  const y = offsetY + ((j + i * rotation) * scale * tileWidth) / ai;
  return [x, y];
};
