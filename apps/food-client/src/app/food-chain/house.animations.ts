import * as PIXI from 'pixi.js';
import { translateObject } from './animation';
import { BoardObject } from './board';
import { createCarSprite, ts, ts1_2 } from './utils/constants';
import { setSpriteZOrder } from './utils/graphics-utils';
import { board } from './utils/singletons';

export const addCarToBoard = () => {
  const carContainer = new PIXI.Container();
  const carSprite = createCarSprite();
  board.container.addChild(carSprite);
  carSprite.anchor.x = 0.5;
  carSprite.anchor.y = 0.5;
  const scaleFactor = ts / carSprite.height;
  carSprite.scale.x = scaleFactor;
  carSprite.scale.y = scaleFactor;
  carContainer.addChild(carSprite);
  board.container.addChild(carContainer);
  return { carContainer, carSprite };
};

export const travelPath = async (
  path: BoardObject[],
  container: PIXI.Container,
  sprite: PIXI.Sprite,
  stepDuration: number
) => {
  for (let i = 0; i < path.length - 1; i++) {
    const item1 = path[i];
    const item2 = path[i + 1];
    if (item1 !== item2)
      sprite.rotation = Math.atan2(
        item2.container.position.y - item1.container.position.y,
        item2.container.position.x - item1.container.position.x
      );
    setSpriteZOrder(container, item1, item2);
    await translateObject(
      container,
      {
        x: item1.container.position.x + ts1_2,
        y: item1.container.position.y + ts1_2,
      },
      {
        x: item2.container.position.x + ts1_2,
        y: item2.container.position.y + ts1_2,
      },
      stepDuration
    );
  }
};
