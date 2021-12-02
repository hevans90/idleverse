import * as PIXI from 'pixi.js';
import { BoardObject } from './board';
import { Card } from './card/card';
import {
  addMarketingTileToDrawer,
  renderMarketingDrawerContents,
  toggleDrawerOpen,
} from './drawer';
import { createFoodSelect, FoodKind, foodKinds } from './food';
import { addFoodToHouse, House } from './house';
import {
  triggerBillBoardAnimation,
  triggerMailboxAnimation,
  triggerPlaneAnimation,
  triggerRadioAnimation,
} from './marketingTile.animations';
import { Player } from './player';
import { applyRotation, disablePlacement, enablePlacement, Tile } from './tile';
import { ts } from './utils/constants';
import { createSprite, darken } from './utils/graphics-utils';
import {
  app,
  board,
  communalDrawers,
  marketingTiles,
} from './utils/singletons';
import {
  getConnectedSquares,
  getSquaresInLine,
  getSquaresInRange,
  isValidOuterPosition,
  isValidPosition,
  rangeOverlapsItem,
} from './utils/utils';

export type MarketingTileKind = {
  name?: string;
  texture: PIXI.Texture;
  validTiles: Tile[];
  isValidPlacement: (tile: BoardObject, square: Tile) => boolean;
  getTilesInRange: (tile: BoardObject, square: Tile) => Tile[];
  advertise: (tile: MarketingTile, affectedHouses: House[]) => void;
};

export const marketingTileKinds: { [key: string]: MarketingTileKind } = {
  billboard: {
    texture: PIXI.Texture.from('https://i.imgur.com/adBXURw.png'),
    validTiles: board.tiles,
    isValidPlacement: (tile: BoardObject, square: Tile) =>
      isValidPosition(tile, square),
    getTilesInRange: (tile: BoardObject, square: Tile) =>
      getSquaresInRange(tile, square, 1),
    advertise: (tile: MarketingTile, affectedHouses: House[]) =>
      triggerBillBoardAnimation(tile, affectedHouses),
  },
  mailbox: {
    texture: PIXI.Texture.from('https://i.imgur.com/uQuBooP.png'),
    validTiles: board.tiles,
    isValidPlacement: (tile: BoardObject, square: Tile) =>
      isValidPosition(tile, square),
    getTilesInRange: (tile: BoardObject, square: Tile) =>
      getConnectedSquares(square as Tile),
    advertise: (tile: MarketingTile, affectedHouses: House[]) =>
      triggerMailboxAnimation(tile, affectedHouses),
  },
  airplane: {
    texture: PIXI.Texture.from('https://i.imgur.com/BDo38zP.png'),
    validTiles: board.outerTiles,
    isValidPlacement: (tile: BoardObject, square: Tile) =>
      isValidOuterPosition(tile, square),
    getTilesInRange: (tile: BoardObject, square: Tile) =>
      getSquaresInLine(tile, square),
    advertise: (tile: MarketingTile, affectedHouses: House[]) =>
      triggerPlaneAnimation(tile, affectedHouses),
  },
  radio: {
    texture: PIXI.Texture.from('https://i.imgur.com/m9ksWCR.png'),
    validTiles: board.tiles,
    isValidPlacement: (tile: BoardObject, square: Tile) =>
      isValidPosition(tile, square),
    getTilesInRange: (tile: BoardObject, square: Tile) =>
      getSquaresInRange(tile, square, 10),
    advertise: (tile: MarketingTile, affectedHouses: House[]) =>
      triggerRadioAnimation(tile, affectedHouses),
  },
};
Object.entries(marketingTileKinds).forEach((kind) => {
  kind[1].name = kind[0];
});

export type MarketingTileConfig = {
  num: number;
  w: number;
  h: number;
  kind: MarketingTileKind;
};

export type MarketingTile = BoardObject &
  MarketingTileConfig & {
    foodQuant: number;
    foodKind?: FoodKind;
    foodSprites?: PIXI.Sprite[];
    owner?: Player;
  };

export const createMarketTileSprite = (config: MarketingTileConfig) => {
  const graphic = new PIXI.Graphics();
  graphic.lineStyle(2, 0x000000);
  graphic.beginFill(0xa3e8f5);
  graphic.drawRect(0, 0, config.w * ts, config.h * ts);
  graphic.endFill();

  const tileNum = new PIXI.Text(
    config.num.toString(),
    new PIXI.TextStyle({
      fontFamily: 'zx-spectrum',
      fontSize: 24,
      fontWeight: 'bold',
      fill: '#000000',
    })
  );
  tileNum.position.x = 5;
  tileNum.position.y = 5;

  const marketingSprite = new PIXI.Sprite(config.kind.texture);
  const xScale = (config.h * ts) / marketingSprite.height;
  const yScale = (config.w * ts) / marketingSprite.width;
  const scale = 0.9 * (xScale > yScale ? yScale : xScale);
  marketingSprite.scale.x = scale;
  marketingSprite.scale.y = scale;
  marketingSprite.x = (config.w * ts) / 2;
  marketingSprite.anchor.x = 0.5;
  marketingSprite.y = (config.h * ts) / 2;
  marketingSprite.anchor.y = 0.5;

  const renderContainer = new PIXI.Container();
  renderContainer.addChild(graphic, marketingSprite, tileNum);

  const baseTexture = new PIXI.BaseRenderTexture({
    width: ts * config.w,
    height: ts * config.h,
  });
  const renderTexture = new PIXI.RenderTexture(baseTexture);

  app.renderer.render(renderContainer, { renderTexture });

  return new PIXI.Sprite(renderTexture);
};

export const initMarketingTiles = (
  configs: MarketingTileConfig[],
  marketingTiles: MarketingTile[]
) => {
  configs.forEach((config) => {
    const marketingTile: MarketingTile = {
      ...config,
      rotation: 0,
      container: new PIXI.Container(),
      owner: null,
      foodQuant: 0,
      foodSprites: [],
    };
    marketingTile.sprite = createMarketTileSprite(config);

    marketingTile.sprite.anchor.x = 0.5;
    marketingTile.sprite.anchor.y = 0.5;
    marketingTile.sprite.x = marketingTile.sprite.width / 2;
    marketingTile.sprite.y = marketingTile.sprite.height / 2;
    marketingTile.container.addChild(marketingTile.sprite);
    marketingTiles.push(marketingTile);
  });

  marketingTiles.forEach((tile) => {
    addMarketingTileToDrawer(tile);
  });
  renderMarketingDrawerContents();
  return marketingTiles;
};

export const selectMarketingTileFood = (
  marketer: Card,
  tile: MarketingTile
) => {
  const oldFoodSelect = tile.container.getChildByName('foodSelect');
  tile.container.removeChild(oldFoodSelect);

  const newFoodSelect = createFoodSelect(
    Object.values(foodKinds),
    marketer.maxDuration,
    (foodKind, foodQuantity) => {
      tile.foodKind = foodKind;
      tile.foodQuant = foodQuantity;
      renderMarketingTileFood(tile);
      tile.container.removeChild(newFoodSelect.container);
      marketer.used = true;
    },
    () => {
      tile.container.parentLayer = null;
      tile.container.zOrder = null;
      tile.rotation = 0;
      applyRotation(tile);
      tile.container.removeChild(newFoodSelect.container);
      board.marketingTiles.splice(board.marketingTiles.indexOf(tile), 1);
      communalDrawers.market.marketingTiles.push(tile);
      communalDrawers.market.contentsContainer.addChild(tile.container);
      communalDrawers.market.renderContents();
    }
  );
  newFoodSelect.container.y = tile.h * ts;
  newFoodSelect.container.name = 'foodSelect';

  tile.container.addChild(newFoodSelect.container);
};

export const renderMarketingTileFood = (tile: MarketingTile) => {
  tile.foodSprites.forEach((sprite) => sprite.destroy());
  tile.foodSprites = [];
  for (let i = 0; i < tile.foodQuant; i++) {
    const foodSprite = createSprite(tile.foodKind.name, ts / 2);
    const xSpacing = 15 * tile.h;
    const xOffset =
      tile.sprite.width / 2 -
      (xSpacing * (tile.foodQuant / 2 - 0.5) + foodSprite.width / 2);
    foodSprite.position.x = xOffset + xSpacing * i;
    foodSprite.position.y = (tile.h * ts) / 3 - foodSprite.height / 2 + 5;
    tile.container.addChild(foodSprite);
    tile.foodSprites.push(foodSprite);
  }
};

export const enableMarketingTilePlacement = (marketer: Card) => {
  const marketingDrawer = communalDrawers.market;
  marketingTiles.forEach((tile) => {
    if (marketer.marketingKinds.includes(tile.kind)) {
      tile.sprite.interactive = true;
      tile.sprite.buttonMode = true;
      tile.sprite.on('pointerdown', () => {
        enablePlacement(
          tile,
          tile.kind.validTiles,
          (square) => tile.kind.isValidPlacement(tile, square),
          (square) => tile.kind.getTilesInRange(tile, square),
          () => {
            disablePlacement();
            if (!board.marketingTiles.includes(tile)) {
              board.marketingTiles.push(tile);
            }
            if (marketingDrawer.marketingTiles.includes(tile)) {
              marketingDrawer.marketingTiles.splice(
                marketingDrawer.marketingTiles.indexOf(tile),
                1
              );
            }
            selectMarketingTileFood(marketer, tile);
          }
        );

        if (marketingDrawer.open) toggleDrawerOpen(marketingDrawer);
      });
    } else {
      darken(tile.container);
    }
  });
};

export const enableAdvertise = (tiles: MarketingTile[]) => {
  tiles.forEach((tile) => {
    tile.sprite.interactive = true;
    tile.sprite.buttonMode = true;
    tile.sprite.on('pointerdown', () => advertise(tile));
  });
};

export const advertise = (tile: MarketingTile) => {
  const tilesInRange = tile.kind.getTilesInRange(tile, tile);
  console.log(tile);
  if (tile.foodQuant > 0) {
    tile.foodQuant--;
    renderMarketingTileFood(tile);
    const affectedHouses = [];
    board.houses.forEach((house) => {
      if (
        rangeOverlapsItem(house, tilesInRange) &&
        house.food.length < house.maxFood
      )
        affectedHouses.push(house);
    });
    affectedHouses.forEach((house) => {
      addFoodToHouse(house, tile.foodKind);
    });
    tile.kind.advertise(tile, affectedHouses);
  }
};
