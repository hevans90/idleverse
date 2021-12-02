import * as PIXI from 'pixi.js';
import { BoardItems, BoardObject } from '../types';

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

export const isValidPosition = (
  item1: BoardObject,
  collisionArray: BoardObject[],
  boardItems: BoardItems
) => {
  if (item1.name === 'diner1') console.log(item1);
  const itemsArray = boardItems.roads.concat(
    boardItems.houses,
    boardItems.drinks
  );

  collisionArray = itemsArray.filter((item2) => collides(item1, item2));
  if (item1.name === 'diner1') console.log(collisionArray.length);

  if (collisionArray.length > 0) {
    return false;
  }

  collisionArray = boardItems.roads.filter((road) => {
    return (
      collides(item1, { ...road, i: road.i + 1 }) ||
      collides(item1, { ...road, i: road.i - 1 }) ||
      collides(item1, { ...road, j: road.j + 1 }) ||
      collides(item1, { ...road, j: road.j - 1 })
    );
  });

  if (collisionArray.length === 0) {
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
  item: BoardObject,
  collisionArray: BoardObject[],
  boardItems: BoardItems,
  size: number
) => {
  let randomPosition = getRandomPosition(size);
  let tries = 0;
  for (let i = 0; i < 1000; i++) {
    if (
      isValidPosition(
        { ...item, ...randomPosition },
        collisionArray,
        boardItems
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

export const translate = (item, endPos, duration, animations) => {
  let time = 0;
  const startPos = { ...item.displayItem.position };
  function animate() {
    time += 1;
    if (time < duration) {
      item.displayItem.x =
        startPos.x + (startPos.x - endPos.x) * (time / duration);
      item.displayItem.y =
        startPos.y + (startPos.y - endPos.y) * (time / duration);
    } else {
      item.displayItem.x = endPos.x;
      item.displayItem.y = endPos.y;
      animations.splice(this);
    }
  }
  animations.push(animate);
};
