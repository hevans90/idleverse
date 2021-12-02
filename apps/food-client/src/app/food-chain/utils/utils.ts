import {
  BoardObject,
  Board,
  getConnectedRoads,
  getAdjacentRoads,
} from '../board';
import { isRoad, Road } from '../road';
import { Tile } from '../tile';
import { debug as debugConfig } from './constants';

export type Vector2 = {
  x: number;
  y: number;
};

export type BoardPosition = {
  i: number;
  j: number;
};

export type BoardItem = {
  name?: string;
  i?: number;
  j?: number;
  w: number;
  h: number;
  rotation?: number;
};

export const collides = (item1: BoardItem, item2: BoardItem) => {
  const item1leftitem2 = item1.i >= item2.i + item2.w;
  const item1rightitem2 = item1.i + item1.w <= item2.i;
  const item1aboveitem2 = item1.j >= item2.j + item2.h;
  const item1belowitem2 = item1.j + item1.h <= item2.j;
  return !(
    item1leftitem2 ||
    item1rightitem2 ||
    item1aboveitem2 ||
    item1belowitem2
  );
};

export const isValidPosition = (
  board: Board,
  item1: BoardItem,
  adjacentRoadRequired: boolean
) => {
  const itemsArray = [].concat(
    [board.diner],
    board.roads,
    board.houses,
    board.drinks
  );

  const collisionArray = itemsArray.filter((item2) => collides(item1, item2));

  if (collisionArray.length > 0) {
    return false;
  }

  if (adjacentRoadRequired && getAdjacentRoads(board, item1).length === 0) {
    return false;
  }

  if (
    item1.i + item1.w > board.chunksWide * 5 ||
    item1.j + item1.h > board.chunksHigh * 5 ||
    item1.i < 0 ||
    item1.j < 0
  )
    return false;

  return true;
};

export const getRandomPosition = (size: number) => {
  return {
    i: Math.floor(Math.random() * size),
    j: Math.floor(Math.random() * size),
  };
};

export const getRandomValidPosition = (
  board: Board,
  item: BoardObject,
  size: number,
  adjacentRoadRequired: boolean
) => {
  let randomPosition = getRandomPosition(size);
  let tries = 0;
  for (let i = 0; i < 1000; i++) {
    if (
      isValidPosition(
        board,
        { ...item, ...randomPosition },
        adjacentRoadRequired
      )
    ) {
      console.log(`tries: ${tries}`);
      return randomPosition;
    }
    randomPosition = getRandomPosition(size);
    tries++;
  }
  console.log(`tries: ${tries}`);
  return randomPosition;
};

const calcDistance = (pos1: BoardPosition, pos2: BoardPosition) => {
  return Math.abs(pos1.i - pos2.i) + Math.abs(pos1.j - pos2.j);
};

export const findPath = (
  board: Board,
  startRoads: Road[],
  endRoad: Road
): Road[] => {
  board.roads.forEach((road) => {
    road.toGoal = 99;
    road.fromStart = 99;
  });
  const openRoads = [...startRoads];
  const closedRoads = [];

  openRoads.forEach((road) => {
    road.toGoal = calcDistance(road as BoardPosition, endRoad as BoardPosition);
    road.fromStart = 0;
  });

  let pathFound = false;
  let lastRoad: Road;

  while (!pathFound) {
    if (openRoads.length === 0) break;
    openRoads.sort(
      (road1, road2) =>
        road1.toGoal + road1.fromStart - (road2.toGoal + road2.fromStart)
    );
    const currentRoad = openRoads[0];
    if (currentRoad === endRoad) {
      pathFound = true;
      lastRoad = currentRoad;
      break;
    }
    openRoads.splice(openRoads.indexOf(currentRoad), 1);
    closedRoads.push(currentRoad);

    const connectedRoads = getConnectedRoads(board, currentRoad);
    connectedRoads.forEach((road) => {
      if (!closedRoads.includes(road)) {
        road.toGoal = calcDistance(
          road as BoardPosition,
          endRoad as BoardPosition
        );
        const fromStart = currentRoad.fromStart + 1;
        if (fromStart < road.fromStart) {
          road.previousRoad = currentRoad;
          road.fromStart = fromStart;
        }
        openRoads.push(road);
      }
    });
  }

  const path = [];
  if (pathFound) {
    let currentRoad = lastRoad;
    console.log(`distance: ${currentRoad.toGoal + currentRoad.fromStart}`);
    while (!startRoads.includes(currentRoad)) {
      path.push(currentRoad);
      currentRoad = currentRoad.previousRoad;
    }
    path.push(currentRoad);
  }
  return path;
};

export const calcRectsDistance = (item1: BoardObject, item2: BoardObject) => {
  const debug = debugConfig.enabled;
  let distance: number;

  const item1leftitem2 = item2.i >= item1.i + item1.w;
  const item1rightitem2 = item2.i + item2.w <= item1.i;
  const item1aboveitem2 = item2.j >= item1.j + item1.h;
  const item1belowitem2 = item2.j + item2.h <= item1.j;

  if (item1aboveitem2 && item1leftitem2) {
    if (debug) item1.sprite.tint = 0xac3232;
    distance =
      calcDistance(
        { i: item1.i + item1.w, j: item1.j + item1.h },
        { i: item2.i, j: item2.j }
      ) + 1;
  } else if (item1aboveitem2 && item1rightitem2) {
    if (debug) item1.sprite.tint = 0x37946e;
    distance =
      calcDistance(
        { i: item1.i, j: item1.j + item1.h },
        { i: item2.i + item2.w, j: item2.j }
      ) + 1;
  } else if (item1belowitem2 && item1leftitem2) {
    if (debug) item1.sprite.tint = 0x5b6ee1;
    distance =
      calcDistance(
        { i: item1.i + item1.w, j: item1.j },
        { i: item2.i, j: item2.j + item2.h }
      ) + 1;
  } else if (item1belowitem2 && item1rightitem2) {
    if (debug) item1.sprite.tint = 0xfbf236;
    distance =
      calcDistance(
        { i: item1.i, j: item1.j },
        { i: item2.i + item2.w, j: item2.j + item2.h }
      ) + 1;
  } else if (item1leftitem2) {
    if (debug) item1.sprite.tint = 0xdf7126;
    distance = calcDistance(
      { i: item1.i + item1.w, j: item2.j },
      { i: item2.i, j: item2.j }
    );
  } else if (item1rightitem2) {
    if (debug) item1.sprite.tint = 0x76428a;
    distance = calcDistance(
      { i: item1.i, j: item2.j },
      { i: item2.i + item2.w, j: item2.j }
    );
  } else if (item1aboveitem2) {
    if (debug) item1.sprite.tint = 0xd77bba;
    distance = calcDistance(
      { i: item2.i, j: item1.j + item1.h },
      { i: item2.i, j: item2.j }
    );
  } else if (item1belowitem2) {
    if (debug) item1.sprite.tint = 0x222034;
    distance = calcDistance(
      { i: item2.i, j: item1.j },
      { i: item2.i, j: item2.j + item2.h }
    );
  }

  return distance;
};

export const getSquaresInRange = (
  board: Board,
  item2: BoardObject,
  range: number
) => {
  board.tiles.forEach((tile) => (tile.sprite.tint = 0xffffff));
  return board.tiles.filter((item1) => {
    const distance = calcRectsDistance(item1, item2);

    return distance < range;
  });
};

export const getAdjacentSquares = (tiles: Tile[], tile1: Tile) => {
  return tiles.filter((tile2) => calcDistance(tile1, tile2) === 1);
};

export const getConnectedSquares = (
  board: Board,
  startSquares: Tile[]
): Tile[] => {
  const tilePool = [...board.tiles];
  const openSquares = [...startSquares];
  const validSquares = [];

  let i = 1000;
  while (openSquares.length > 0 && i > 0) {
    i--;
    const currentSquare = openSquares[0];
    openSquares.splice(openSquares.indexOf(currentSquare), 1);
    validSquares.push(currentSquare);
    const adjacentSquares = getAdjacentSquares(tilePool, currentSquare);
    adjacentSquares.forEach((square) => {
      let containsRoad = false;
      square.occupants.forEach((occupant) => {
        if (isRoad(occupant)) containsRoad = true;
      });
      if (!containsRoad) openSquares.push(square);
      tilePool.splice(tilePool.indexOf(square), 1);
    });
  }

  return validSquares;
};
