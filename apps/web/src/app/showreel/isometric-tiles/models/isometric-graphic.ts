import * as PIXI from 'pixi.js';

export type IsometricGraphic = PIXI.Graphics & {
  c1: [number, number];
  c2: [number, number];
  c3: [number, number];
  c4: [number, number];
  color: string;
  selected: boolean;
  hovered: boolean;
};
