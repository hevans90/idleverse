import * as PIXI from 'pixi.js';
import { Board, BoardObject } from './board';
import {
  addMarketingTileToDrawer,
  Drawer,
  renderMarketingDrawer,
  toggleOpen,
} from './drawer';
import { createFoodSelect, FoodKind, foodKindConfigs } from './food';
import { addFoodToHouse, House } from './house';
import {
  triggerBillBoardAnimation,
  triggerMailboxAnimation,
  triggerPlaneAnimation,
  triggerRadioAnimation,
} from './marketingTile.animations';
import { Player } from './player';
import { disablePlacement, enablePlacement, Tile } from './tile';
import { defaultZ, ts } from './utils/constants';
import { app, board } from './utils/singletons';
import {
  getConnectedSquares,
  getSquaresInLine,
  getSquaresInRange,
  isValidOuterPosition,
  isValidPosition,
  rangeOverlapsItem,
} from './utils/utils';

export enum MarketingTileKinds {
  billboard,
  mailbox,
  airplane,
  radio,
}

export const marketingTileKindConfigs = {
  [MarketingTileKinds.billboard]: {
    texture: PIXI.Texture.from('https://i.imgur.com/adBXURw.png'),
    getValidTiles: (board: Board) => board.tiles,
    isValidPlacement: (board: Board, tile: BoardObject, square: Tile) =>
      isValidPosition(board, tile, square),
    getTilesInRange: (board: Board, tile: BoardObject, square: Tile) =>
      getSquaresInRange(board, tile, square, 1),
    advertise: (board: Board, tile: MarketingTile, affectedHouses: House[]) =>
      triggerBillBoardAnimation(board, tile, affectedHouses),
  },
  [MarketingTileKinds.mailbox]: {
    texture: PIXI.Texture.from('https://i.imgur.com/uQuBooP.png'),
    getValidTiles: (board: Board) => board.tiles,
    isValidPlacement: (board: Board, tile: BoardObject, square: Tile) =>
      isValidPosition(board, tile, square),
    getTilesInRange: (board: Board, tile: BoardObject, square: Tile) =>
      getConnectedSquares(board, square as Tile),
    advertise: (board: Board, tile: MarketingTile, affectedHouses: House[]) =>
      triggerMailboxAnimation(tile, affectedHouses),
  },
  [MarketingTileKinds.airplane]: {
    texture: PIXI.Texture.from('https://i.imgur.com/BDo38zP.png'),
    getValidTiles: (board: Board) => board.outerTiles,
    isValidPlacement: (board: Board, tile: BoardObject, square: Tile) =>
      isValidOuterPosition(board, tile, square),
    getTilesInRange: (board: Board, tile: BoardObject, square: Tile) =>
      getSquaresInLine(board, tile, square),
    advertise: (board: Board, tile: MarketingTile, affectedHouses: House[]) =>
      triggerPlaneAnimation(board, tile, affectedHouses),
  },
  [MarketingTileKinds.radio]: {
    texture: PIXI.Texture.from('https://i.imgur.com/m9ksWCR.png'),
    getValidTiles: (board: Board) => board.tiles,
    isValidPlacement: (board: Board, tile: BoardObject, square: Tile) =>
      isValidPosition(board, tile, square),
    getTilesInRange: (board: Board, tile: BoardObject, square: Tile) =>
      getSquaresInRange(board, tile, square, 10),
    advertise: (board: Board, tile: MarketingTile, affectedHouses: House[]) =>
      triggerRadioAnimation(board, tile, affectedHouses),
  },
};

export const marketingTileTextures = {
  [MarketingTileKinds.radio]: PIXI.Texture.from(
    'https://i.imgur.com/m9ksWCR.png'
  ),
  [MarketingTileKinds.airplane]: PIXI.Texture.from(
    'https://i.imgur.com/BDo38zP.png'
  ),
  [MarketingTileKinds.mailbox]: PIXI.Texture.from(
    'https://i.imgur.com/uQuBooP.png'
  ),
  [MarketingTileKinds.billboard]: PIXI.Texture.from(
    'https://i.imgur.com/adBXURw.png'
  ),
};

export type MarketingTileConfig = {
  num: number;
  w: number;
  h: number;
  kind: MarketingTileKinds;
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

  const marketingSprite = new PIXI.Sprite(
    marketingTileKindConfigs[config.kind].texture
  );
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
  marketingDrawer: Drawer,
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
    marketingTile.container.addChild(marketingTile.sprite);
    marketingTile.container.zIndex = defaultZ.marketingTile;
    marketingTiles.push(marketingTile);
  });

  marketingTiles.forEach((tile) => {
    addMarketingTileToDrawer(marketingDrawer, tile);
  });
  renderMarketingDrawer(marketingDrawer);
  return marketingTiles;
};

export const selectMarketingTileFood = (tile: MarketingTile) => {
  disablePlacement(board);
  tile.container.zIndex = 50;
  const oldFoodSelect = tile.container.getChildByName('foodSelect');
  tile.container.removeChild(oldFoodSelect);

  const newFoodSelect = createFoodSelect(foodKindConfigs, (foodKind) => {
    tile.foodKind = foodKind;
    tile.foodQuant = 4;
    tile.container.zIndex = defaultZ.marketingTile;
    renderMarketingTileFood(tile);
    tile.container.removeChild(newFoodSelect);
  });
  newFoodSelect.y = tile.h * ts;
  newFoodSelect.name = 'foodSelect';

  tile.container.addChild(newFoodSelect);
};

export const renderMarketingTileFood = (tile: MarketingTile) => {
  tile.foodSprites.forEach((sprite) => sprite.destroy());
  tile.foodSprites = [];
  for (let i = 0; i < tile.foodQuant; i++) {
    const foodSprite = new PIXI.Sprite(tile.foodKind.texture);
    foodSprite.height = ts;
    foodSprite.width = ts;
    foodSprite.position.x = i * 20 + (tile.w * ts) / 2 - ts;
    foodSprite.position.y = 20;
    tile.container.addChild(foodSprite);
    tile.foodSprites.push(foodSprite);
  }
};

export const enableMarketingTilePlacement = (
  marketingDrawer: Drawer,
  tiles: MarketingTile[]
) => {
  tiles.forEach((tile) => {
    tile.sprite.interactive = true;
    tile.sprite.buttonMode = true;
    tile.sprite.on('pointerdown', () => {
      enablePlacement(
        tile,
        marketingTileKindConfigs[tile.kind].getValidTiles(board),
        (square) =>
          marketingTileKindConfigs[tile.kind].isValidPlacement(
            board,
            tile,
            square
          ),
        (square) =>
          marketingTileKindConfigs[tile.kind].getTilesInRange(
            board,
            tile,
            square
          ),
        () => selectMarketingTileFood(tile)
      );

      if (marketingDrawer.open) toggleOpen(marketingDrawer);
    });
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
  const tilesInRange = marketingTileKindConfigs[tile.kind].getTilesInRange(
    board,
    tile,
    tile
  );
  console.log(tile);
  if (tile.foodQuant > 0) {
    tile.foodQuant--;
    renderMarketingTileFood(tile);
    const affectedHouses = [];
    board.houses.forEach((house) => {
      if (rangeOverlapsItem(house, tilesInRange) && house.food.length < 3)
        affectedHouses.push(house);
    });
    affectedHouses.forEach((house) => {
      addFoodToHouse(house, tile.foodKind);
    });
    marketingTileKindConfigs[tile.kind].advertise(board, tile, affectedHouses);
  }
};
