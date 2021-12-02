import * as PIXI from 'pixi.js';
import { Diner } from './diner';
import { Drink, isDrink } from './drink';
import { House, isHouse } from './house';
import { MarketingTile } from './marketingTile';
import { isRoad, Road, triggerCarAnimation } from './road';
import { Tile } from './tile';
import { ts } from './utils/constants';
import { BoardItem, collides } from './utils/utils';

export type Board = {
  chunksWide: number;
  chunksHigh: number;
  tiles: Tile[];
  roads: Road[];
  houses: House[];
  drinks: Drink[];
  marketingTiles: MarketingTile[];
  diner: Diner;
  container: PIXI.Container;
  deliverFood?: () => void;
};

export type BoardObject = BoardItem & {
  zIndex?: number;
  sprite?: PIXI.Sprite;
  container?: PIXI.Container;
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

export const addObjectToBoard = (
  board: Board,
  tile: Tile,
  boardObject: BoardObject
) => {
  if (isHouse(boardObject)) {
    boardObject.sprite.x += 2;
    boardObject.sprite.y += 2;
    boardObject.sprite.interactive = true;
    boardObject.sprite.buttonMode = true;
    boardObject.sprite.on('pointerdown', () => {
      const adjacentRoads = getAdjacentRoads(board, boardObject);
      board.roads.forEach((road) => (road.sprite.tint = 0xffffff));
      adjacentRoads.forEach((road) => (road.sprite.tint = 0x9b39f7));
      console.log(boardObject);
    });
    board.houses.push(boardObject);
  } else if (isRoad(boardObject)) {
    boardObject.sprite.x -= 2;
    boardObject.sprite.y -= 2;
    boardObject.sprite.interactive = true;
    boardObject.sprite.buttonMode = true;
    boardObject.sprite.on('pointerdown', () => {
      triggerCarAnimation(board, boardObject);
    });
    board.roads.push(boardObject);
  } else if (isDrink(boardObject)) {
    boardObject.sprite.x += 2;
    boardObject.sprite.y += 2;
    board.drinks.push(boardObject);
  }
  boardObject.i = tile.i;
  boardObject.j = tile.j;
  boardObject.sprite.x += boardObject.i * ts;
  boardObject.sprite.y += boardObject.j * ts;
  board.container.addChild(boardObject.sprite);
};

export const addBoardToStage = (app: PIXI.Application, board: Board) => {
  board.container.pivot.x = board.container.width / 2;
  board.container.pivot.y = board.container.height / 2;
  board.container.position.x = app.screen.width / 2;
  board.container.position.y = app.screen.height / 2;
  board.container.scale.x = 0.8;
  board.container.scale.y = 0.8;
  board.container.sortableChildren = true;
  app.stage.addChild(board.container);
};
