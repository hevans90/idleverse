import * as PIXI from 'pixi.js';
import { AssetCollection } from '../../../_state/models';
import { GameConfig } from '../models/game-config';

export const zoomButtonsFactory = (
  {
    'zoom-out': { texture: zoomOutTexture },
    'zoom-in': { texture: zoomInTexture },
  }: Pick<AssetCollection, 'zoom-in' | 'zoom-out'>,
  canvasWidth: number,
  canvasHeight: number,
  config: GameConfig
): [PIXI.Sprite, PIXI.Sprite] => {
  const zoomInButtonSprite = new PIXI.Sprite(zoomInTexture);
  const zoomOutButtonSprite = new PIXI.Sprite(zoomOutTexture);

  zoomInButtonSprite.buttonMode = true;
  zoomOutButtonSprite.buttonMode = true;
  zoomInButtonSprite.interactive = true;
  zoomOutButtonSprite.interactive = true;

  zoomInButtonSprite.anchor.set(0.5);
  zoomOutButtonSprite.anchor.set(0.5);

  zoomInButtonSprite.width = 45;
  zoomInButtonSprite.height = 45;
  zoomInButtonSprite.position.x = canvasWidth - 275;
  zoomInButtonSprite.position.y = canvasHeight - 40;
  zoomInButtonSprite.zIndex = 2;

  zoomOutButtonSprite.width = 45;
  zoomOutButtonSprite.height = 45;
  zoomOutButtonSprite.position.x = canvasWidth - 200;
  zoomOutButtonSprite.position.y = canvasHeight - 40;
  zoomOutButtonSprite.zIndex = 2;

  zoomInButtonSprite.on('pointerdown', () => config.increaseScale());

  zoomOutButtonSprite.on('pointerdown', () => config.decreaseScale());

  return [zoomInButtonSprite, zoomOutButtonSprite];
};

export const buildZoomButtons = (
  canvasHeight: number,
  canvasWidth: number,
  assetCollection: AssetCollection,
  config: GameConfig
) => {
  if (assetCollection['zoom-in'] && assetCollection['zoom-out']) {
    return zoomButtonsFactory(
      {
        'zoom-in': assetCollection['zoom-in'],
        'zoom-out': assetCollection['zoom-out'],
      },
      canvasWidth,
      canvasHeight,
      config
    );
  } else {
    console.warn('No zoom button assets found.');
  }
};

export type ZoomButtons = ReturnType<typeof buildZoomButtons>;
