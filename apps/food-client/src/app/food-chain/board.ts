import * as PIXI from 'pixi.js';
import { Anim } from './animation';
import { Diner } from './diner';
import { addDrinkToBoard, Drink, DrinkTextures, drinkTextures } from './drink';
import { addHouseToBoard, House } from './house';
import { MarketingTile } from './marketingTile';
import { addRoadToBoard, Road } from './road';
import { Tile } from './tile';
import { tileConfigRegex } from './utils/constants';
import { BoardItem, collides } from './utils/utils';

export type Board = {
  roads: Road[];
  houses: House[];
  drinks: Drink[];
  marketingTiles: MarketingTile[];
  diner: Diner;
  container: PIXI.Container;
  deliverFood?: () => void;
};

export type BoardObject = BoardItem & {
  sprite?: PIXI.Sprite;
};

export const getAdjacentRoads = (board: Board, object: BoardObject): Road[] => {
  return board.roads.filter((road) => {
    return (
      collides(object, { ...road, i: road.i + 1 }) ||
      collides(object, { ...road, i: road.i - 1 }) ||
      collides(object, { ...road, j: road.j + 1 }) ||
      collides(object, { ...road, j: road.j - 1 })
    );
  });
};

export const getConnectedRoads = (board: Board, road: Road): Road[] => {
  let connectedRoads: Road[] = [];

  if (road.connections.includes(1))
    connectedRoads = connectedRoads.concat(
      board.roads.filter(
        (_road) =>
          _road.i === road.i - 1 &&
          _road.j === road.j &&
          _road.connections.includes(3)
      )
    );
  if (road.connections.includes(2))
    connectedRoads = connectedRoads.concat(
      board.roads.filter(
        (_road) =>
          _road.i === road.i &&
          _road.j === road.j - 1 &&
          _road.connections.includes(4)
      )
    );
  if (road.connections.includes(3))
    connectedRoads = connectedRoads.concat(
      board.roads.filter(
        (_road) =>
          _road.i === road.i + 1 &&
          _road.j === road.j &&
          _road.connections.includes(1)
      )
    );
  if (road.connections.includes(4))
    connectedRoads = connectedRoads.concat(
      board.roads.filter(
        (_road) =>
          _road.i === road.i &&
          _road.j === road.j + 1 &&
          _road.connections.includes(2)
      )
    );

  return connectedRoads;
};

export const addTileContentsToBoard = (
  app: PIXI.Application,
  board: Board,
  animations: Anim[],
  tile: Tile,
  p: number,
  q: number
) => {
  const i = tile.i;
  const j = tile.j;
  const match = tileConfigRegex.exec(tile.contents);

  if (match[1] === 'r') {
    addRoadToBoard(
      app,
      animations,
      board,
      i + p * 5,
      j + q * 5,
      match[2].split('').map((i) => parseInt(i))
    );
  } else if (match[1] === 'h') {
    addHouseToBoard(
      board,
      i + p * 5,
      j + q * 5,
      parseInt(match[2]),
      parseInt(match[3])
    );
  } else if (match[1] in drinkTextures) {
    addDrinkToBoard(
      app,
      animations,
      board,
      i + p * 5,
      j + q * 5,
      match[1] as keyof DrinkTextures
    );
  }
};
