import * as PIXI from 'pixi.js';
import { BoardObject } from './board';

const dinerTexture = PIXI.Texture.from('https://i.imgur.com/gPK9T8l.png');

export type Diner = BoardObject & {
  time?: number;
  duration?: number;
  previousPosition?: number;
  nextPosition?: number;
  update?: () => void;
};

export const createDinerSprite = (ts: number) => {
  const dinerSprite = new PIXI.Sprite(dinerTexture);

  dinerSprite.width = ts * 2;
  dinerSprite.height = ts * 2;

  return dinerSprite;
};
