import * as PIXI from 'pixi.js';

export type NebulaProps = {
  x: number;
  y: number;
};

export const Nebula = ({ x, y }: NebulaProps) =>
  new PIXI.Graphics().clear().beginFill(0xffff00).drawCircle(x, y, 2).endFill();
