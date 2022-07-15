import * as PIXI from 'pixi.js';
import { Tile } from './tile';

export type IsometricStack = PIXI.Sprite & {
  sx: number;
  sy: number;
  selected: Tile | undefined;
  hovered: Tile | undefined;
};
