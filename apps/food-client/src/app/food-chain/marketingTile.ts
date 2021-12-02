import * as PIXI from 'pixi.js';
import { Board, BoardObject } from './board';
import {
  addMarketingTileToDrawer,
  Drawer,
  organiseMarketingDrawer,
  toggleOpen,
} from './drawer';
import { enablePlacement } from './tile';
import { Player } from './types';
import { ts } from './utils/constants';
import { app } from './utils/singletons';

export enum MarketingTileKinds {
  'billboard',
  'mailbox',
  'airplane',
  'radio',
}

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
  MarketingTileConfig & { owner?: Player; container?: PIXI.Container };

export const createMarketTileSprite = (config: MarketingTileConfig) => {
  const container = new PIXI.Container();

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

  const marketingSprite = new PIXI.Sprite(marketingTileTextures[config.kind]);
  const xScale = (config.h * ts) / marketingSprite.height;
  const yScale = (config.w * ts) / marketingSprite.width;
  const scale = 0.9 * (xScale > yScale ? yScale : xScale);
  marketingSprite.scale.x = scale;
  marketingSprite.scale.y = scale;
  marketingSprite.x = (config.w * ts) / 2;
  marketingSprite.anchor.x = 0.5;
  marketingSprite.y = (config.h * ts) / 2;
  marketingSprite.anchor.y = 0.5;

  container.addChild(graphic, marketingSprite, tileNum);

  return container;
};

export const initMarketingTiles = (
  board: Board,
  marketingDrawer: Drawer,
  configs: MarketingTileConfig[],
  marketingTiles: MarketingTile[]
) => {
  configs.forEach((config) => {
    marketingTiles.push({
      ...config,
      container: createMarketTileSprite(config),
      owner: null,
    });
  });

  marketingTiles.forEach((tile) => {
    addMarketingTileToDrawer(marketingDrawer, tile);
    enableMarketingTilePlacement(board, marketingDrawer, tile);
  });
  organiseMarketingDrawer(marketingDrawer);
};

export const enableMarketingTilePlacement = (
  board: Board,
  marketingDrawer: Drawer,
  tile: MarketingTile
) => {
  tile.container.removeAllListeners();
  tile.container.interactive = true;
  tile.container.buttonMode = true;
  tile.container.on('pointerdown', () => {
    enablePlacement(board, tile, false);
    toggleOpen(marketingDrawer);
  });
};
