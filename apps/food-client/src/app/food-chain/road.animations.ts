import * as PIXI from 'pixi.js';
import { Anim, translateObject } from './animation';
import { Board, getAdjacentRoads } from './board';
import { Road } from './road';
import { ts1_2 } from './utils/constants';
import { animations } from './utils/singletons';
import { findPath } from './utils/utils';

const generatePlayNext = (
  board: Board,
  queue: Anim[],
  object: PIXI.DisplayObject
) => {
  return (anim: Anim) => {
    queue.splice(queue.indexOf(anim), 1);
    if (queue.length > 0) {
      queue[0].start();
    } else board.container.removeChild(object);
  };
};

const setCarZIndex = (carSprite, road1, road2) => {
  carSprite.zIndex =
    road1.container.zIndex > road2.container.zIndex
      ? road1.container.zIndex + 1
      : road2.container.zIndex + 1;
};

export const triggerCarAnimation = (board: Board, road: Road) => {
  const path = findPath(board, getAdjacentRoads(board, board.diner), road);
  const carTexture = PIXI.Texture.from('https://i.imgur.com/01q7OGv.png');
  const carSprite = new PIXI.Sprite(carTexture);
  carSprite.anchor.x = 0.5;
  carSprite.anchor.y = 0.5;
  //carSprite.scale.x = 0.5;
  //carSprite.scale.y = 0.5;
  const queue: Anim[] = [];
  if (path.length > 1) {
    for (let i = 0; i < path.length - 1; i++) {
      const road1 = path[i];
      const road2 = path[i + 1];
      queue.push(
        translateObject(
          animations,
          carSprite,
          {
            x: road1.container.position.x + ts1_2,
            y: road1.container.position.y + ts1_2,
          },
          {
            x: road2.container.position.x + ts1_2,
            y: road2.container.position.y + ts1_2,
          },
          Math.atan2(
            road2.container.position.y - road1.container.position.y,
            road2.container.position.x - road1.container.position.x
          ),
          20,
          () => setCarZIndex(carSprite, road1, road2),
          generatePlayNext(board, queue, carSprite)
        )
      );
    }
    const road1 = path[path.length - 2];
    const road2 = path[path.length - 1];
    queue.push(
      translateObject(
        animations,
        carSprite,
        {
          x: road2.container.position.x + ts1_2,
          y: road2.container.position.y + ts1_2,
        },
        {
          x: road2.container.position.x + ts1_2,
          y: road2.container.position.y + ts1_2,
        },
        Math.atan2(
          road2.container.position.y - road1.container.position.y,
          road2.container.position.x - road1.container.position.x
        ),
        100,
        () => setCarZIndex(carSprite, road1, road2),
        generatePlayNext(board, queue, carSprite)
      )
    );
    for (let i = path.length - 2; i >= 0; i--) {
      const road1 = path[i];
      const road2 = path[i + 1];
      queue.push(
        translateObject(
          animations,
          carSprite,
          {
            x: road2.container.position.x + ts1_2,
            y: road2.container.position.y + ts1_2,
          },
          {
            x: road1.container.position.x + ts1_2,
            y: road1.container.position.y + ts1_2,
          },
          Math.atan2(
            road1.container.position.y - road2.container.position.y,
            road1.container.position.x - road2.container.position.x
          ),
          20,
          () => setCarZIndex(carSprite, road1, road2),
          generatePlayNext(board, queue, carSprite)
        )
      );
    }

    board.container.addChild(carSprite);
    queue[0].start();
  } else if (path.length === 1) {
    queue.push(
      translateObject(
        animations,
        carSprite,
        {
          x: road.container.position.x + ts1_2,
          y: road.container.position.y + ts1_2,
        },
        {
          x: road.container.position.x + ts1_2,
          y: road.container.position.y + ts1_2,
        },
        0,
        200,
        () => setCarZIndex(carSprite, road, road),
        generatePlayNext(board, queue, carSprite)
      )
    );

    board.container.addChild(carSprite);
    queue[0].start();
  }
};
