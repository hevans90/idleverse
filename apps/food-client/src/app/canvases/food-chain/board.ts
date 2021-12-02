import * as PIXI from 'pixi.js';
import { Diner } from './diner';
import { Drink } from './drink';
import { House } from './house';
import { Road } from './road';
import { collides } from './utils/utils';

export type Board = {
  roads: Road[];
  houses: House[];
  drinks: Drink[];
  diner: Diner;
  container: PIXI.Container;
};

export type BoardObject = {
  name?: string;
  i: number;
  j: number;
  w: number;
  h: number;
  sprite?: PIXI.Sprite;
};

export const getAdjacentRoads = (board: Board, object: BoardObject) => {
  return board.roads.filter((road) => {
    return (
      collides(object, { ...road, i: road.i + 1 }) ||
      collides(object, { ...road, i: road.i - 1 }) ||
      collides(object, { ...road, j: road.j + 1 }) ||
      collides(object, { ...road, j: road.j - 1 })
    );
  });
};
