import * as PIXI from 'pixi.js';
import { lineColour } from './types';
import { ts } from './utils/constants';

export const createEmptySquareSprite = () => {
  const square = new PIXI.Graphics();
  square.lineStyle(2, lineColour, 1);
  square.beginFill(0xffffff);
  square.drawRect(2, 2, ts - 2, ts - 2);
  square.endFill();

  return square;
};
