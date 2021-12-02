import * as PIXI from 'pixi.js';
import { Anim } from './animation';
import { Board, BoardObject } from './board';
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

export const addDrinkToBoard = (
  app: PIXI.Application,
  animations: Anim[],
  board: Board,
  i: number,
  j: number,
  key: keyof DrinkTextures
) => {
  const drink: Drink = {
    i,
    j,
    w: 0,
    h: 0,
  };
  board.drinks.push(drink);
  const drinkSprite = createDrinkSprite(key);
  drinkSprite.x = drink.i * ts + 3;
  drinkSprite.y = drink.j * ts + 3;
  board.container.addChild(drinkSprite);
};
