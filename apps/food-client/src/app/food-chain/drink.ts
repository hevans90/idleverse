import * as PIXI from 'pixi.js';
import { Board, BoardObject } from './board';
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

export const parseDrinkConfig = (config: RegExpExecArray, zOffset: number) => {
  const drink: Drink = {
    w: 1,
    h: 1,
    kind: drinkKinds[config[1]],
    container: new PIXI.Container(),
  };
  drink.sprite = createDrinkSprite(drink);
  drink.container.addChild(drink.sprite);
  drink.sprite.zIndex = 10 + zOffset;
  return drink;
};

export const addDrinkToBoard = (board: Board, drink: Drink) => {
  drink.container.x += 2;
  drink.container.y += 2;
  board.drinks.push(drink);
};
