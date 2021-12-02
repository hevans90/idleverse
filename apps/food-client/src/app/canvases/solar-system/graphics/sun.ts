import * as PIXI from 'pixi.js';

export type SunProps = {
  x: number;
  y: number;
};

export const Sun = ({ x, y }: SunProps) =>
  new PIXI.Graphics()
    .clear()
    .beginFill(0xffff00)
    .drawCircle(x, y, 50)
    .endFill();
