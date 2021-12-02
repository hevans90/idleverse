import * as PIXI from 'pixi.js';
import { BoardObject } from './board';
import { ts } from './utils/constants';

export type Drink = BoardObject;

export type DrinkTextures = {
  b: PIXI.Texture;
  c: PIXI.Texture;
  l: PIXI.Texture;
};

export const drinkTextures: DrinkTextures = {
  b: PIXI.Texture.from('https://i.imgur.com/eNwKilN.png'),
  c: PIXI.Texture.from('https://i.imgur.com/LMUTwgN.png'),
  l: PIXI.Texture.from('https://i.imgur.com/6ilmUUU.png'),
};

export const createDrinkSprite = (drinkType: keyof DrinkTextures) => {
  const drink = new PIXI.Sprite(drinkTextures[drinkType]);
  drink.width = ts - 4;
  drink.height = ts - 4;
  return drink;
};
