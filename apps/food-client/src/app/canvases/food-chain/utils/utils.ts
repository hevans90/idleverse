import * as PIXI from 'pixi.js';
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

export const collides = (item1: BoardObject, item2: BoardObject) => {
  const item1leftitem2 = item1.i > item2.i + item2.w;
  const item1rightitem2 = item1.i + item1.w < item2.i;
  const item1aboveitem2 = item1.j > item2.j + item2.h;
  const item1belowitem2 = item1.j + item1.h < item2.j;
  return !(
    item1leftitem2 ||
    item1rightitem2 ||
    item1aboveitem2 ||
    item1belowitem2
  );
};

export const drawLine = (
  graphic: PIXI.Graphics,
  start: Vector2D,
  end: Vector2D
) => {
  graphic.moveTo(start.x, start.y);
  graphic.lineTo(end.x, end.y);
};

export const drawDottedLine = (
  graphic: PIXI.Graphics,
  start: Vector2D,
  end: Vector2D,
  sections: number
) => {
  const step = sections * 2 + (sections - 1) * 2 + 2;
  const xStep = (end.x - start.x) / step;
  const yStep = (end.y - start.y) / step;
  graphic.moveTo(start.x + xStep, start.y + yStep);
  for (let i = 0; i < step; i += 1) {
    if (i % 4 > 1) graphic.lineTo(start.x + xStep * i, start.y + yStep * i);
    else graphic.moveTo(start.x + xStep * i, start.y + yStep * i);
  }
};

export const isValidPosition = (board: Board, item1: BoardObject) => {
  if (item1.name === 'diner1') console.log(item1);
  const itemsArray = board.roads.concat(board.houses, board.drinks);

  const collisionArray = itemsArray.filter((item2) => collides(item1, item2));
  if (item1.name === 'diner1') console.log(collisionArray.length);

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
