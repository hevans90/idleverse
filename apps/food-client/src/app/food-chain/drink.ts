import * as PIXI from 'pixi.js';
import { BoardObject } from './board';
import { ts } from './utils/constants';

export type Drink = BoardObject & {
  kind: DrinkKind;
};

export type DrinkTexture = { [key: string]: PIXI.Texture };

export type DrinkKind = {
  texture: PIXI.Texture;
};

export const drinkKinds = {
  b: { texture: PIXI.Texture.from('https://i.imgur.com/eNwKilN.png') },
  c: { texture: PIXI.Texture.from('https://i.imgur.com/LMUTwgN.png') },
  l: { texture: PIXI.Texture.from('https://i.imgur.com/6ilmUUU.png') },
};

export const isDrink = (boardObject: BoardObject): boardObject is Drink => {
  return (boardObject as Drink).kind !== undefined;
};

export const createDrinkSprite = (drink: Drink) => {
  const drinkSprite = new PIXI.Sprite(drink.kind.texture);
  drinkSprite.width = ts - 4;
  drinkSprite.height = ts - 4;
  return drinkSprite;
};
