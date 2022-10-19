import { colyseusAssetsVar } from '../../../_state/colyseus';
import { userAvatarResourcesVar } from '../../../_state/reactive-variables';

import * as PIXI from 'pixi.js';

export const drawPlayerShip = (
  renderer: PIXI.Renderer,
  userId: string,
  avatarBgColor: number,
  avatarRadius = 24,
  avatarConnectingLineHeight = 28
) => {
  const shipTexture = colyseusAssetsVar()['spaceship'].texture;
  const shipSprite = new PIXI.Sprite(shipTexture);
  shipSprite.name = 'spaceship';

  const avatarTexture = userAvatarResourcesVar()?.[userId]?.texture;

  if (!avatarTexture) {
    console.warn(`no texture found for ${userId}`);
  }

  const { height, width } = avatarTexture || { height: null, width: null };

  const avatarGraphic = avatarTexture
    ? new PIXI.Graphics()
        .beginTextureFill({
          texture: avatarTexture,
          matrix: new PIXI.Matrix(0.5, 0, 0, 0.5, width / 4, height / 4),
        })
        .drawCircle(0, 0, avatarRadius)
        .endFill()
    : new PIXI.Graphics()
        .beginFill(avatarBgColor)
        .drawCircle(0, 0, avatarRadius)
        .endFill();

  avatarGraphic.y = -(avatarConnectingLineHeight + avatarRadius);
  avatarGraphic.name = 'avatar';

  const avatarSprite = new PIXI.Sprite(renderer.generateTexture(avatarGraphic));

  return { shipSprite, avatarGraphic, avatarSprite };
};
