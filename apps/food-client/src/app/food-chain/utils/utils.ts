import {
  BoardObject,
  Board,
  getConnectedRoads,
  getAdjacentRoads,
} from '../board';
import { Road } from '../road';

export type Vector2D = {
  x: number;
  y: number;
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

export const isValidPosition = (board: Board, item1: BoardItem) => {
  const itemsArray = [].concat(board.roads, board.houses, board.drinks);

  const collisionArray = itemsArray.filter((item2) => collides(item1, item2));

  if (collisionArray.length > 0) {
    return false;
  }

  if (getAdjacentRoads(board, item1).length === 0) {
    return false;
  }

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
  size: number
) => {
  let randomPosition = getRandomPosition(size);
  let tries = 0;
  for (let i = 0; i < 1000; i++) {
    if (isValidPosition(board, { ...item, ...randomPosition })) {
      console.log(`tries: ${tries}`);
      return randomPosition;
    }
    randomPosition = getRandomPosition(size);
    tries++;
  }
  console.log(`tries: ${tries}`);
  return randomPosition;
};

const calcDistance = (road1: Road, road2: Road) => {
  return Math.abs(road1.i - road2.i) + Math.abs(road1.j - road2.j);
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

    const connectedRoads = getConnectedRoads(board, currentRoad);
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
    console.log(currentRoad.toGoal + currentRoad.fromStart);
    while (!startRoads.includes(currentRoad)) {
      path.push(currentRoad);
      currentRoad = currentRoad.previousRoad;
    }
    path.push(currentRoad);
  }
  return path;
};
