import { colyseusAssetsVar } from '../../../_state/colyseus';
import { userAvatarResourcesVar } from '../../../_state/pixi-resources';

import * as PIXI from 'pixi.js';
import { spaceshipSpriteConfig } from '../utils/sprite-configs';

export const drawPlayerShip = (
  renderer: PIXI.Renderer,
  userId: string,
  avatarBgColor: number,
  avatarRadius = 24,
  avatarConnectingLineHeight = 28
) => {
  const shipTexture = colyseusAssetsVar()[spaceshipSpriteConfig.name]?.texture;
  const shipSprite = new PIXI.Sprite(shipTexture);
  shipSprite.name = spaceshipSpriteConfig.name;
  shipSprite.height = shipSprite.height * spaceshipSpriteConfig.spriteScale;
  shipSprite.width = shipSprite.width * spaceshipSpriteConfig.spriteScale;

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

  const avatarConnectingLine = avatarGraphic
    .lineStyle({ width: 1, color: avatarBgColor })
    .moveTo(0, 0)
    .lineTo(0, avatarConnectingLineHeight);

  const avatarSprite = new PIXI.Sprite(renderer.generateTexture(avatarGraphic));
  const avatarConnectingLineSprite = new PIXI.Sprite(
    renderer.generateTexture(avatarConnectingLine)
  );

  return { shipSprite, avatarConnectingLineSprite, avatarSprite };
};
