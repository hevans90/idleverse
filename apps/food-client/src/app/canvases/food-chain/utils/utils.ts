import * as PIXI from 'pixi.js';
import { BoardObject } from '../types';

export type Vector2D = {
  x: number;
  y: number;
};

export const collides = (item1: BoardObject, item2: BoardObject) => {
  const item1leftitem2 = item1.i > item2.i + item2.w;
  const item1rightitem2 = item1.i + item1.w < item2.i;
  const item1aboveitem2 = item1.j > item2.j + item2.h;
  const item1belowitem2 = item1.j + item1.h < item2.j;
  // console.log(`item 1 is left of item 2: ${item1leftitem2}`);
  // console.log(`item 1 is right of item 2: ${item1rightitem2}`);
  // console.log(`item 1 is above item 2: ${item1aboveitem2}`);
  // console.log(`item 1 is below item 2: ${item1belowitem2}`);
  return !(
    item1leftitem2 ||
    item1rightitem2 ||
    item1aboveitem2 ||
    item1belowitem2
  );
};

export const drawLine = (
  graphic: PIXI.Graphics,
  start: Vector2D,
  end: Vector2D
) => {
  graphic.moveTo(start.x, start.y);
  graphic.lineTo(end.x, end.y);
};

export const drawDottedLine = (
  graphic: PIXI.Graphics,
  start: Vector2D,
  end: Vector2D,
  sections: number
) => {
  const step = sections * 2 + (sections - 1) * 2 + 2;
  const xStep = (end.x - start.x) / step;
  const yStep = (end.y - start.y) / step;
  graphic.moveTo(start.x + xStep, start.y + yStep);
  for (let i = 0; i < step; i += 1) {
    if (i % 4 > 1) graphic.lineTo(start.x + xStep * i, start.y + yStep * i);
    else graphic.moveTo(start.x + xStep * i, start.y + yStep * i);
  }
};
