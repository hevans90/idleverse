import {
  BoardItem,
  BoardObject,
  BoardPosition,
  getAdjacentRoads,
} from '../board';
import { getConnectedRoads, isRoad, Road } from '../road';
import { getAdjacentSquares, Tile } from '../tile';
import { debug as debugConfig } from './constants';
import { board } from './singletons';

export type Vector2 = {
  x: number;
  y: number;
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(() => resolve(''), ms));
}

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
  item: BoardItem,
  position: BoardPosition,
  adjacentRoadRequired = false
) => {
  const itemsArray = [].concat(
    board.diners,
    board.roads,
    board.houses,
    board.drinks
  );
  const item1 = { ...item, i: position.i, j: position.j };

  const collisionArray = itemsArray.filter((item2) => collides(item1, item2));

  if (collisionArray.length > 0) {
    return false;
  }

  if (adjacentRoadRequired && getAdjacentRoads(item1).length === 0) {
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

export const isValidOuterPosition = (
  item: BoardItem,
  position: BoardPosition
) => {
  const itemsArray = [].concat(
    board.diners,
    board.roads,
    board.houses,
    board.drinks
  );
  const item1 = { ...item, i: position.i, j: position.j };

  const collisionArray = itemsArray.filter((item2) => collides(item1, item2));

  if (collisionArray.length > 0) {
    return false;
  }

  if (
    collides(item1, {
      i: 0,
      j: 0,
      w: board.chunksWide * 5,
      h: board.chunksHigh * 5,
    }) ||
    collides(item1, {
      i: board.chunksWide * 5 + 2,
      j: -3,
      w: 1,
      h: board.chunksHigh * 5 + 4,
    }) ||
    collides(item1, {
      i: -3,
      j: -3,
      w: 1,
      h: board.chunksHigh * 5 + 4,
    }) ||
    collides(item1, {
      i: -3,
      j: -3,
      w: board.chunksWide * 5 + 4,
      h: 1,
    }) ||
    collides(item1, {
      i: -3,
      j: board.chunksHigh * 5 + 2,
      w: board.chunksWide * 5 + 4,
      h: 1,
    })
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
  item: BoardObject,
  size: number,
  adjacentRoadRequired: boolean
) => {
  let randomPosition = getRandomPosition(size);
  let tries = 0;
  for (let i = 0; i < 1000; i++) {
    if (isValidPosition(item, randomPosition, adjacentRoadRequired)) {
      return randomPosition;
    }
    randomPosition = getRandomPosition(size);
    tries++;
  }
  console.log(`tries: ${tries}`);
  return randomPosition;
};

export const calcDistance = (pos1: BoardPosition, pos2: BoardPosition) => {
  return Math.abs(pos1.i - pos2.i) + Math.abs(pos1.j - pos2.j);
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

export const itemContainsTile = (item: BoardObject, tile: Tile) => {
  return (
    tile.i >= item.i &&
    tile.i < item.i + item.w &&
    tile.j >= item.j &&
    tile.j < item.j + item.h
  );
};

export const squareContainsRoad = (square: Tile) => {
  for (let i = 0; i < square.occupants.length; i++) {
    const occupant = square.occupants[i];
    if (isRoad(occupant)) return true;
  }
  return false;
};

export const rangeOverlapsItem = (item: BoardObject, range: Tile[]) => {
  for (let i = 0; i < range.length; i++) {
    const tile = range[i];
    if (itemContainsTile(item, tile)) return true;
  }
  return false;
};

export const getSquaresInRange = (
  item: BoardObject,
  position: BoardPosition,
  range: number
) => {
  const item2 = { ...item, i: position.i, j: position.j };
  return board.tiles.filter((item1) => {
    const distance = calcRectsDistance(item1, item2);

    return distance < range;
  });
};

export const getSquaresInLine = (
  item: BoardObject,
  position: BoardPosition
) => {
  const boardItem = { ...item, i: position.i, j: position.j };
  const isVertical = [Math.PI / 2, (Math.PI * 3) / 2].includes(
    boardItem.rotation
  );
  if (isVertical)
    return board.tiles.filter(
      (tile) => tile.j >= boardItem.j && tile.j < boardItem.j + boardItem.h
    );
  else
    return board.tiles.filter(
      (tile) => tile.i >= boardItem.i && tile.i < boardItem.i + boardItem.w
    );
};

export const getConnectedSquares = (startSquare: Tile): Tile[] => {
  const tilePool = [...board.tiles];
  const openSquares = [startSquare];
  const validSquares = [];

  let i = 1000;
  while (openSquares.length > 0 && i > 0) {
    i--;
    const currentSquare = openSquares[0];
    openSquares.splice(openSquares.indexOf(currentSquare), 1);
    validSquares.push(currentSquare);
    const adjacentSquares = getAdjacentSquares(tilePool, currentSquare);
    adjacentSquares.forEach((square) => {
      if (!squareContainsRoad(square)) openSquares.push(square);
      tilePool.splice(tilePool.indexOf(square), 1);
    });
  }

  return validSquares;
};

export const findRoadPath = (
  validRoads: Road[],
  startRoads: Road[],
  endRoad: Road
): Road[] => {
  validRoads.forEach((road) => {
    road.toGoal = 99;
    road.fromStart = 99;
  });
  const openRoads = [...startRoads];
  const closedRoads = [];

  openRoads.forEach((road) => {
    road.toGoal = calcDistance(road, endRoad);
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

    const connectedRoads = getConnectedRoads(validRoads, currentRoad);
    connectedRoads.forEach((road) => {
      if (!closedRoads.includes(road)) {
        road.toGoal = calcDistance(road, endRoad);
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
    while (!startRoads.includes(currentRoad)) {
      path.push(currentRoad);
      currentRoad = currentRoad.previousRoad;
    }
    path.push(currentRoad);
  }
  return path.reverse();
};

export const findTilePath = (startTile: Tile, endTile: Tile): Tile[] => {
  const debug = debugConfig.enabled;
  board.tiles.forEach((tile) => {
    tile.fromStart = null;
  });
  const openTiles = [startTile];
  const closedTiles = [];

  openTiles.forEach((tile) => {
    tile.toGoal = calcDistance(tile, endTile);
    tile.fromStart = 0;
  });

  let pathFound = false;
  let lastTile: Tile;

  let i = 0;
  while (!pathFound && i < 1000) {
    i++;
    if (openTiles.length === 0) break;
    openTiles.sort(
      (tile1, tile2) =>
        tile1.toGoal + tile1.fromStart - (tile2.toGoal + tile2.fromStart)
    );
    const currentTile = openTiles[0];
    if (currentTile.i === endTile.i && currentTile.j === endTile.j) {
      pathFound = true;
      lastTile = currentTile;
      break;
    }
    openTiles.splice(openTiles.indexOf(currentTile), 1);
    closedTiles.push(currentTile);
    if (debug) currentTile.sprite.tint = 0xb8312c;

    const connectedTiles = getAdjacentSquares(board.tiles, currentTile);
    connectedTiles.forEach((tile) => {
      if (!closedTiles.includes(tile) && !squareContainsRoad(tile)) {
        if (!openTiles.includes(tile)) {
          tile.toGoal = calcDistance(tile, endTile);
          openTiles.push(tile);
          if (debug) tile.sprite.tint = 0xaecd84;
        }
        const fromStart = currentTile.fromStart + 1;
        if (tile.fromStart === null || fromStart < tile.fromStart) {
          tile.previousTile = currentTile;
          tile.fromStart = fromStart;
        }
      }
    });
  }

  const path = [];
  if (pathFound) {
    let currentTile = lastTile;
    while (startTile !== currentTile) {
      path.push(currentTile);
      if (debug) currentTile.sprite.tint = 0x9fc8d0;
      currentTile = currentTile.previousTile;
    }
    if (debug) currentTile.sprite.tint = 0x9fc8d0;
    path.push(currentTile);
  }
  return path.reverse();
};

export const findShortestRoadPath = (
  validRoads: Road[],
  item1: BoardObject,
  item2: BoardObject
) => {
  let path: Road[] = null;
  if (isRoad(item1) && isRoad(item2)) {
    path = findRoadPath(validRoads, [item1], item2);
  } else if (isRoad(item2)) {
    path = findRoadPath(validRoads, getAdjacentRoads(item1), item2);
  } else {
    const item1AdjacentRoads = getAdjacentRoads(item1);
    const item2AdjacentRoads = getAdjacentRoads(item2);
    item2AdjacentRoads.forEach((road) => {
      const currentPath = findRoadPath(validRoads, item1AdjacentRoads, road);
      if (!path || currentPath.length < path.length) path = currentPath;
    });
  }
  return path;
};
