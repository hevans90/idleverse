import { Assets, Graphics, Matrix, Renderer, Sprite, Texture } from 'pixi.js';
import { spaceshipSpriteConfig } from '../utils/sprite-configs';

export const drawPlayerShip = async ({
  renderer,
  shipDimensions,
  userId,
  boundingBoxColor,
  avatarBgColor,
  avatarRadius,
  avatarConnectingLineHeight,
}: {
  renderer: Renderer;
  shipDimensions: { width: number; height: number };
  userId: string;
  boundingBoxColor: number;
  avatarBgColor: number;
  avatarRadius: number;
  avatarConnectingLineHeight: number;
}) => {
  const colyseusAssets = await Assets.loadBundle('colyseus');
  const shipSprite = new Sprite(
    colyseusAssets[spaceshipSpriteConfig.name] as Texture
  );

  shipSprite.name = spaceshipSpriteConfig.name;
  shipSprite.height = shipSprite.height * spaceshipSpriteConfig.spriteScale;
  shipSprite.width = shipSprite.width * spaceshipSpriteConfig.spriteScale;

  const userAvatars = await Assets.loadBundle('user-avatars');
  const avatarTexture: Texture = userAvatars[userId];

  if (!avatarTexture) {
    console.warn(`no texture found for ${userId}`);
  }

  const { height, width } = avatarTexture || { height: null, width: null };

  const avatarGraphic = avatarTexture
    ? new Graphics()
        .beginTextureFill({
          texture: avatarTexture,
          matrix: new Matrix(0.5, 0, 0, 0.5, width / 4, height / 4),
        })
        .drawCircle(0, 0, avatarRadius)
        .endFill()
    : new Graphics()
        .beginFill(avatarBgColor)
        .drawCircle(0, 0, avatarRadius)
        .endFill();

  const avatarConnectingLine = avatarGraphic
    .lineStyle({ width: 1, color: avatarBgColor })
    .moveTo(0, 0)
    .lineTo(0, avatarConnectingLineHeight);

  const avatarSprite = new Sprite(renderer.generateTexture(avatarGraphic));
  const avatarConnectingLineSprite = new Sprite(
    renderer.generateTexture(avatarConnectingLine)
  );

  const boundingBoxGraphic = new Graphics()
    .lineStyle({
      width: 1,
      color: boundingBoxColor,
    })
    .drawRect(0, 0, shipDimensions.width, shipDimensions.height);

  return {
    shipSprite,
    avatarConnectingLineSprite,
    avatarSprite,
    boundingBoxGraphic,
  };
};
