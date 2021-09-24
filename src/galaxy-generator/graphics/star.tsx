import * as PIXI from 'pixi.js';

export type StarProps = {
  x: number;
  y: number;
};

export const Star = ({ x, y }: StarProps) =>
  new PIXI.Graphics().clear().beginFill(0xffffff).drawCircle(x, y, 1).endFill();
