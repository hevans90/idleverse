import * as PIXI from 'pixi.js';
import { BoardObject } from './board';
import {
  addMarketingTileToDrawer,
  Drawer,
  organiseMarketingDrawer,
} from './drawer';
import { Player } from './types';
import { ts } from './utils/constants';

export enum MarketingTileKinds {
  'billboard',
  'mailbox',
  'airplane',
  'radio',
}

export const marketingTileTextures = {
  [MarketingTileKinds.radio]: PIXI.Texture.from(
    'https://i.imgur.com/rGgNlV1.png'
  ),
  [MarketingTileKinds.airplane]: PIXI.Texture.from(
    'https://i.imgur.com/rGgNlV1.png'
  ),
  [MarketingTileKinds.mailbox]: PIXI.Texture.from(
    'https://i.imgur.com/rGgNlV1.png'
  ),
  [MarketingTileKinds.billboard]: PIXI.Texture.from(
    'https://i.imgur.com/rGgNlV1.png'
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

  container.addChild(graphic, tileNum);

  return container;
};

export const initMarketingTiles = (
  marketingDrawer: Drawer,
  configs: MarketingTileConfig[],
  tiles: MarketingTile[]
) => {
  configs.forEach((config) => {
    tiles.push({
      ...config,
      container: createMarketTileSprite(config),
      owner: null,
    });
  });

  tiles.forEach((tile) => {
    addMarketingTileToDrawer(marketingDrawer, tile);
  });
  organiseMarketingDrawer(marketingDrawer);
};
