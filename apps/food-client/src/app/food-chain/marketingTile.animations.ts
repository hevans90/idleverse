import * as PIXI from 'pixi.js';
import {
  addShockwave,
  Anim,
  bounceObject,
  scaleObject,
  translateObject,
} from './animation';
import { ShockwaveFilter } from '@pixi/filter-shockwave';
import { Board, BoardObject } from './board';
import { House, isHouse, renderHouseFood } from './house';
import {
  MarketingTile,
  marketingTileKindConfigs,
  MarketingTileKinds,
} from './marketingTile';
import { createPostmanSprite, ts } from './utils/constants';
import { animations } from './utils/singletons';
import { calcDistance, findTilePath } from './utils/utils';

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

export const bounceFood = (board: Board, tile: MarketingTile, house: House) => {
  const queue: Anim[] = [];
  const foodSprite = new PIXI.Sprite(tile.foodKind.texture);
  foodSprite.zIndex = 40;
  foodSprite.anchor.x = 0.5;
  foodSprite.anchor.y = 0.5;
  const scaleFactor = ts / foodSprite.height;
  foodSprite.scale.x = scaleFactor;
  foodSprite.scale.y = scaleFactor;
  foodSprite.position.x = tile.i * ts + (tile.w * ts) / 2;
  foodSprite.position.y = tile.j * ts + (tile.h * ts) / 2;
  const startPosX = house.container.position.x + house.container.width / 2;
  const startPosY = house.container.position.y + house.container.height / 2;
  board.container.addChild(foodSprite);
  for (let i = 1; i <= 3; i++) {
    queue.push(
      bounceObject(
        animations,
        foodSprite,
        { x: startPosX, y: startPosY },
        { x: startPosX, y: startPosY - ts / i },
        40,
        null,
        (anim: Anim) => {
          queue.splice(queue.indexOf(anim), 1);
          if (queue.length > 0) {
            queue[0].start();
          } else {
            board.container.removeChild(foodSprite);
            renderHouseFood(house);
          }
        }
      )
    );
  }
  queue[0].start();
};

export const triggerBillBoardAnimation = (
  board: Board,
  tile: MarketingTile,
  affectedHouses: House[]
) => {
  affectedHouses.forEach((house) => {
    bounceFood(board, tile, house);
  });
};

export const triggerMailboxAnimation = (
  board: Board,
  tile: MarketingTile,
  affectedHouses: House[]
) => {
  if (affectedHouses.length > 0)
    walkToNextHouse(board, tile, affectedHouses, tile, affectedHouses[0]);
};

export const walkToNextHouse = (
  board: Board,
  tile: MarketingTile,
  affectedHouses: House[],
  item1: BoardObject,
  item2: BoardObject
) => {
  if (isHouse(item2)) console.log(item2.num);
  const path = findTilePath(board, item1, item2);
  const queue: Anim[] = [];
  const postmanSprite = createPostmanSprite();
  postmanSprite.zIndex = 50;
  postmanSprite.anchor.x = 0.5;
  postmanSprite.anchor.x = 0.5;
  const scaleFactor = ts / postmanSprite.height;
  postmanSprite.scale.x = scaleFactor;
  postmanSprite.scale.y = scaleFactor;
  board.container.addChild(postmanSprite);
  postmanSprite.play();
  if (path.length > 1) {
    for (let i = 0; i < path.length - 1; i++) {
      const tile1 = path[i];
      const tile2 = path[i + 1];
      queue.push(
        translateObject(
          postmanSprite,
          {
            x: tile1.i * ts + (tile1.w * ts) / 2,
            y: tile1.j * ts,
          },
          {
            x: tile2.i * ts + (tile2.w * ts) / 2,
            y: tile2.j * ts,
          },
          20,
          () => {
            if (tile1.i < tile2.i) postmanSprite.scale.x = scaleFactor;
            if (tile1.i > tile2.i) postmanSprite.scale.x = -scaleFactor;
          },
          (anim: Anim) => {
            queue.splice(queue.indexOf(anim), 1);
            if (queue.length > 0) {
              queue[0].start();
            } else {
              board.container.removeChild(postmanSprite);
              if (isHouse(item2)) {
                renderHouseFood(item2);
                affectedHouses.splice(0, 1);
                if (affectedHouses.length > 0) {
                  setTimeout(
                    () =>
                      walkToNextHouse(
                        board,
                        tile,
                        affectedHouses,
                        item2,
                        affectedHouses[0]
                      ),
                    500
                  );
                } else {
                  setTimeout(
                    () =>
                      walkToNextHouse(board, tile, affectedHouses, item2, tile),
                    500
                  );
                }
              }
            }
          }
        )
      );
    }
    queue[0].start();
  }
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
        planeSprite,
        {
          x: ts * starti + (tile.w * ts) / 2,
          y: ts * startj + (tile.h * ts) / 2,
        },
        {
          x: ts * endi + (tile.w * ts) / 2,
          y: ts * endj + (tile.h * ts) / 2,
        },
        10,
        () => {
          planeSprite.rotation = tile.rotation;
          affectedHouses.forEach((house) => {
            if (
              (cos === 0 && house.i === starti - sin * 2) ||
              (sin === 0 && house.j === startj + cos * 2)
            ) {
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
                100,
                null,
                () => {
                  board.container.removeChild(foodSprite);
                  renderHouseFood(house);
                }
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

export const triggerRadioAnimation = (
  board: Board,
  tile: MarketingTile,
  affectedHouses: House[]
) => {
  const options = {
    amplitude: 20,
    wavelength: 50,
    speed: 100,
    brightness: 1,
    radius: -1,
  };

  const tileRadius = 10;
  const pixelRadius = tileRadius * ts;

  const shockwaveFilter = new ShockwaveFilter(
    [
      (tile.i + 2) * ts + (tile.w * ts) / 2,
      (tile.j + 2) * ts + (tile.h * ts) / 2,
    ],
    options,
    0
  );

  const update = (pixelRadius: number) => {
    const tileRadius = pixelRadius / ts;
    affectedHouses.forEach((house) => {
      if (tileRadius + 3 > calcDistance(tile, house)) {
        bounceFood(board, tile, house);
        affectedHouses.splice(affectedHouses.indexOf(house), 1);
      }
    });
  };

  const shockwave = addShockwave(
    animations,
    board.container,
    shockwaveFilter,
    (pixelRadius / shockwaveFilter.speed) * 60,
    update
  );
  shockwave.start();
};
