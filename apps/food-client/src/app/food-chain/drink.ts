import * as PIXI from 'pixi.js';
import { BoardObject } from './board';
import { createFoodSpriteIcon, FoodKind, foodKinds } from './food';
import { board, mainLayer } from './utils/singletons';

export type Drink = BoardObject & {
  kind?: FoodKind;
};

export const isDrink = (boardObject: BoardObject): boardObject is Drink => {
  return (boardObject as Drink).kind !== undefined;
};

export const parseDrinkConfig = (config: RegExpExecArray, zOffset: number) => {
  const drink: Drink = {
    w: 1,
    h: 1,
    container: new PIXI.Container(),
    kind: Object.values(foodKinds).find((kind) => config[1] === kind.letter),
  };
  drink.sprite = createFoodSpriteIcon(drink.kind);
  drink.container.addChild(drink.sprite);
  drink.container.parentLayer = mainLayer;
  drink.container.zOrder = 1;
  return drink;
};

export const addDrinkToBoard = (drink: Drink) => {
  drink.container.x -= 2;
  drink.container.y -= 2;
  board.drinks.push(drink);
};
