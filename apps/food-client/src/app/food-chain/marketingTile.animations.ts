import * as PIXI from 'pixi.js';
import { Anim, scaleObject, translateObject } from './animation';
import { Board } from './board';
import { renderHouseFood } from './food';
import { House } from './house';
import {
  MarketingTile,
  marketingTileKindConfigs,
  MarketingTileKinds,
} from './marketingTile';
import { ts } from './utils/constants';
import { animations } from './utils/singletons';

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

export const triggerPlaneAnimation = (
  board: Board,
  tile: MarketingTile,
  affectedHouses: House[]
) => {
  const sin = Math.round(Math.sin(tile.rotation));
  const cos = Math.round(Math.cos(tile.rotation));
  const planeTexture =
    marketingTileKindConfigs[MarketingTileKinds.airplane].texture;
  const planeSprite = new PIXI.Sprite(planeTexture);
  planeSprite.zIndex = 50;
  planeSprite.anchor.x = 0.5;
  planeSprite.anchor.x = 0.5;
  const scale = ((sin === 0 ? tile.w : tile.h) * ts) / planeSprite.width;
  planeSprite.scale.x = scale;
  planeSprite.scale.y = scale;
  board.container.addChild(planeSprite);

  const queue: Anim[] = [];
  for (let k = 0; k < 35; k++) {
    const starti = tile.i + k * sin;
    const startj = tile.j - k * cos;
    const endi = starti + sin;
    const endj = startj - cos;
    queue.push(
      translateObject(
        animations,
        planeSprite,
        {
          x: ts * starti + (tile.w * ts) / 2,
          y: ts * startj + (tile.h * ts) / 2,
        },
        {
          x: ts * endi + (tile.w * ts) / 2,
          y: ts * endj + (tile.h * ts) / 2,
        },
        tile.rotation,
        20,
        () => {
          affectedHouses.forEach((house) => {
            if (
              (cos === 0 && house.i === starti - sin * 2) ||
              (sin === 0 && house.j === startj + cos * 2)
            ) {
              renderHouseFood(house);
              const foodSprite = new PIXI.Sprite(tile.foodKind.texture);
              foodSprite.zIndex = 40;
              foodSprite.anchor.x = 0.5;
              foodSprite.anchor.y = 0.5;
              foodSprite.position.x =
                house.container.position.x + house.container.width / 2;
              foodSprite.position.y =
                house.container.position.y + house.container.height / 2;
              board.container.addChild(foodSprite);
              scaleObject(
                animations,
                foodSprite,
                (ts / foodSprite.width) * 3,
                ts / foodSprite.width,
                200,
                null,
                () => board.container.removeChild(foodSprite)
              ).start();
            }
          });
        },
        generatePlayNext(board, queue, planeSprite)
      )
    );
  }
  console.log(queue);
  queue[0].start();
};
