import * as PIXI from 'pixi.js';
import { Board, BoardObject } from './board';
import {
  addMarketingTileToDrawer,
  Drawer,
  organiseMarketingDrawer,
  toggleOpen,
} from './drawer';
import { disablePlacement, enablePlacement } from './tile';
import { Player } from './types';
import { ts } from './utils/constants';
import { app } from './utils/singletons';
import {
  getConnectedSquares,
  getSquaresInLine,
  getSquaresInRange,
  isValidOuterPosition,
  isValidPosition,
} from './utils/utils';

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
  MarketingTileConfig & {
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
  board: Board,
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
    };
    marketingTile.sprite = createMarketTileSprite(config);
    marketingTile.container.addChild(marketingTile.sprite);
    marketingTiles.push(marketingTile);
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
    if (tile.kind === MarketingTileKinds.billboard)
      enablePlacement(
        board,
        tile,
        board.tiles,
        (square) => isValidPosition(board, tile, square, false),
        (square) => getSquaresInRange(board, tile, square, 1),
        () => disablePlacement(board, board.tiles)
      );
    else if (tile.kind === MarketingTileKinds.mailbox)
      enablePlacement(
        board,
        tile,
        board.tiles,
        (square) => isValidPosition(board, tile, square, false),
        (square) => getConnectedSquares(board, square),
        () => disablePlacement(board, board.tiles)
      );
    else if (tile.kind === MarketingTileKinds.airplane)
      enablePlacement(
        board,
        tile,
        board.outerTiles,
        (square) => isValidOuterPosition(board, tile, square),
        (square) => getSquaresInLine(board, tile, square),
        () => disablePlacement(board, board.outerTiles)
      );
    else if (tile.kind === MarketingTileKinds.radio)
      enablePlacement(
        board,
        tile,
        board.tiles,
        (square) => isValidPosition(board, tile, square, false),
        (square) => getSquaresInRange(board, tile, square, 10),
        () => disablePlacement(board, board.tiles)
      );
    if (marketingDrawer.open) toggleOpen(marketingDrawer);
  });
};
