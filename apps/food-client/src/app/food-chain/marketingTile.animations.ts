import * as PIXI from 'pixi.js';
import {
  addShockwave,
  Anim,
  bounceObject,
  scaleObject,
  translateObject,
} from './animation';
import { ShockwaveFilter } from '@pixi/filter-shockwave';
import { BoardObject } from './board';
import { House, isHouse, renderHouseFood } from './house';
import { MarketingTile, marketingTileKinds } from './marketingTile';
import { animations, board, mainLayer } from './utils/singletons';
import { calcDistance, findTilePath, sleep } from './utils/utils';
import { createPostmanSprite, createSprite } from './utils/graphics-utils';
import { ts } from './utils/constants';

export const bounceFood = (tile: MarketingTile, house: House) => {
  const queue: Anim[] = [];
  const foodSprite = createSprite(tile.foodKind.name, ts);
  foodSprite.parentLayer = mainLayer;
  foodSprite.zOrder = 10;
  foodSprite.anchor.x = 0.5;
  foodSprite.anchor.y = 0.5;
  foodSprite.position.x = (house.w * ts) / 2;
  foodSprite.position.y = (house.h * ts) / 2;
  const startPosX = foodSprite.position.x;
  const startPosY = foodSprite.position.y;
  house.container.addChild(foodSprite);
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
            house.container.removeChild(foodSprite);
            renderHouseFood(house);
          }
        }
      )
    );
  }
  queue[0].start();
};

export const triggerBillBoardAnimation = (
  tile: MarketingTile,
  affectedHouses: House[]
) => {
  affectedHouses.forEach((house) => {
    bounceFood(tile, house);
  });
};

export const triggerMailboxAnimation = async (
  tile: MarketingTile,
  affectedHouses: House[]
) => {
  if (affectedHouses.length > 0) {
    await walkBetween(tile, affectedHouses[0]);
    await sleep(500);
    for (let i = 0; i < affectedHouses.length - 1; i++) {
      await walkBetween(affectedHouses[i], affectedHouses[i + 1]);
      await sleep(500);
    }
    await walkBetween(affectedHouses[affectedHouses.length - 1], tile);
  }
};

export const walkBetween = async (item1: BoardObject, item2: BoardObject) => {
  const path = findTilePath(item1, item2);
  const postmanSprite = createPostmanSprite();
  postmanSprite.parentLayer = mainLayer;
  postmanSprite.zOrder = 10;
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
      if (tile1.i < tile2.i) postmanSprite.scale.x = scaleFactor;
      if (tile1.i > tile2.i) postmanSprite.scale.x = -scaleFactor;
      await translateObject(
        postmanSprite,
        {
          x: tile1.i * ts + (tile1.w * ts) / 2,
          y: tile1.j * ts,
        },
        {
          x: tile2.i * ts + (tile2.w * ts) / 2,
          y: tile2.j * ts,
        },
        20
      );
    }
  }
  board.container.removeChild(postmanSprite);
  if (isHouse(item2)) renderHouseFood(item2);
};

export const triggerPlaneAnimation = async (
  tile: MarketingTile,
  affectedHouses: House[]
) => {
  const sin = Math.round(Math.sin(tile.rotation));
  const cos = Math.round(Math.cos(tile.rotation));
  const planeTexture = marketingTileKinds.airplane.texture;
  const planeSprite = new PIXI.Sprite(planeTexture);
  planeSprite.parentLayer = mainLayer;
  planeSprite.zOrder = 10;
  planeSprite.anchor.x = 0.5;
  planeSprite.anchor.x = 0.5;
  const scale = ((sin === 0 ? tile.w : tile.h) * ts) / planeSprite.width;
  planeSprite.scale.x = scale;
  planeSprite.scale.y = scale;
  board.container.addChild(planeSprite);
  for (let i = 0; i < 35; i++) {
    planeSprite.rotation = tile.rotation;
    const starti = tile.i + i * sin;
    const startj = tile.j - i * cos;
    const endi = starti + sin;
    const endj = startj - cos;
    await translateObject(
      planeSprite,
      {
        x: ts * starti + (tile.w * ts) / 2,
        y: ts * startj + (tile.h * ts) / 2,
      },
      {
        x: ts * endi + (tile.w * ts) / 2,
        y: ts * endj + (tile.h * ts) / 2,
      },
      10
    );

    (async () => {
      for (let j = 0; j < affectedHouses.length; j++) {
        const house = affectedHouses[j];
        if (
          (cos === 0 && house.i === starti - sin * 2) ||
          (sin === 0 && house.j === startj + cos * 2)
        ) {
          const foodSprite = createSprite(tile.foodKind.name, ts);
          foodSprite.parentLayer = mainLayer;
          foodSprite.zOrder = 9;
          foodSprite.anchor.x = 0.5;
          foodSprite.anchor.y = 0.5;
          foodSprite.position.x =
            house.container.position.x + house.container.width / 2;
          foodSprite.position.y =
            house.container.position.y + house.container.height / 2;
          board.container.addChild(foodSprite);
          await scaleObject(
            foodSprite,
            foodSprite.scale.x * 3,
            foodSprite.scale.x,
            100
          );
          board.container.removeChild(foodSprite);
          renderHouseFood(house);
        }
      }
    })();
  }
  board.container.removeChild(planeSprite);
};

export const triggerRadioAnimation = (
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
        bounceFood(tile, house);
        affectedHouses.splice(affectedHouses.indexOf(house), 1);
      }
    });
  };

  const shockwave = addShockwave(
    animations,
    mainLayer,
    shockwaveFilter,
    (pixelRadius / shockwaveFilter.speed) * 60,
    update
  );
  shockwave.start();
};
