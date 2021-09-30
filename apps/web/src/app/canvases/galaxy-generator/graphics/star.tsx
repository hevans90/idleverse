import * as PIXI from 'pixi.js';

export type StarProps = {
  x: number;
  y: number;
  isClaimed?: boolean;
};

export const Star = ({ x, y, isClaimed }: StarProps) =>
  isClaimed
    ? new PIXI.Graphics()
        .clear()
        .beginFill(0xff0000)
        .drawCircle(x, y, 1)
        .endFill()
    : new PIXI.Graphics()
        .clear()
        .beginFill(0xffffff)
        .drawCircle(x, y, 1)
        .endFill();
