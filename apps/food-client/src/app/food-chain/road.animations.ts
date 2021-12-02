import * as PIXI from 'pixi.js';
import { BoardObject } from './board';
import { Road } from './road';
import {
  createAnimatedCarSprite,
  createCarSprite,
  ts,
} from './utils/constants';
import { travelPath } from './utils/graphics-utils';
import { board, mainLayer } from './utils/singletons';

export const triggerCarAnimation = async (
  path: Road[],
  object: BoardObject
) => {
  const carContainer = new PIXI.Container();
  // const carSprite = createAnimatedCarSprite();
  // carSprite.play();
  const carSprite = createCarSprite();
  carSprite.parentLayer = mainLayer;
  carSprite.zOrder = 5;
  board.container.addChild(carSprite);
  carSprite.anchor.x = 0.5;
  carSprite.anchor.y = 0.5;
  const scaleFactor = ts / carSprite.height;
  carSprite.scale.x = scaleFactor;
  carSprite.scale.y = scaleFactor;
  carContainer.addChild(carSprite);
  board.container.addChild(carContainer);
  if (path.length > 1) {
    const firstRoad = path[0];
    await travelPath([firstRoad, firstRoad], carContainer, 200);
    await travelPath(path, carContainer, 20);
    const lastRoad = path[path.length - 1];
    await travelPath([lastRoad, lastRoad], carContainer, 100);
    path.reverse();
    await travelPath(path, carContainer, 20);
    await travelPath([firstRoad, firstRoad], carContainer, 100);
  } else if (path.length === 1) {
    await travelPath([path[0], path[0]], carContainer, 400);
  }
  board.container.removeChild(carContainer);
  return object;
};
