import * as PIXI from 'pixi.js';
import { Tile } from './tile';

export type IsometricContainer = PIXI.Container & {
  sx: number;
  sy: number;
  selected: Tile | undefined;
  hovered: Tile | undefined;
};
