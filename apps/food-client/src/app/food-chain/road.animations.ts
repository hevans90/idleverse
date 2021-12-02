import * as PIXI from 'pixi.js';
import { Anim, translateObject } from './animation';
import { Board, getAdjacentRoads } from './board';
import { Road } from './road';
import { ts, ts1_2 } from './utils/constants';
import {
  CreateAnimatedSprite,
  SpriteSheetConfig,
} from './utils/graphics-utils';
import { animations } from './utils/singletons';
import { findRoadPath } from './utils/utils';

const carSpriteConfig: SpriteSheetConfig = {
  url: 'https://i.imgur.com/RtZXue7.png',
  rows: 1,
  cols: 2,
  lastRowItemCount: 2,
  animationSpeed: 0.2,
};

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

const setCarZIndex = (carSprite: PIXI.Sprite, road1: Road, road2: Road) => {
  carSprite.zIndex =
    road1.container.zIndex > road2.container.zIndex
      ? road1.container.zIndex + 1
      : road2.container.zIndex + 1;
};

export const triggerCarAnimation = (board: Board, road: Road) => {
  const path = findRoadPath(board, getAdjacentRoads(board, board.diner), road);
  //const carTexture = PIXI.Texture.from('https://i.imgur.com/01q7OGv.png');
  const carSprite = CreateAnimatedSprite(carSpriteConfig);
  carSprite.play();
  board.container.addChild(carSprite);
  carSprite.anchor.x = 0.5;
  carSprite.anchor.y = 0.5;
  const scaleFactor = ts / carSprite.height;
  carSprite.scale.x = scaleFactor;
  carSprite.scale.y = scaleFactor;
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
          20,
          () => {
            carSprite.rotation =
              Math.atan2(
                road2.container.position.y - road1.container.position.y,
                road2.container.position.x - road1.container.position.x
              ) +
              Math.PI / 2;
            setCarZIndex(carSprite, road1, road2);
          },
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
        100,
        () => {
          carSprite.rotation =
            Math.atan2(
              road2.container.position.y - road1.container.position.y,
              road2.container.position.x - road1.container.position.x
            ) +
            Math.PI / 2;
          setCarZIndex(carSprite, road1, road2);
        },
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
          20,
          () => {
            carSprite.rotation =
              Math.atan2(
                road1.container.position.y - road2.container.position.y,
                road1.container.position.x - road2.container.position.x
              ) +
              Math.PI / 2;
            setCarZIndex(carSprite, road1, road2);
          },
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
        200,
        () => {
          setCarZIndex(carSprite, road, road);
          carSprite.rotation = Math.PI / 2;
        },
        generatePlayNext(board, queue, carSprite)
      )
    );

    board.container.addChild(carSprite);
    queue[0].start();
  }
};
