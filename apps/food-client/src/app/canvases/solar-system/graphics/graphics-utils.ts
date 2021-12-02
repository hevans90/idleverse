import {
  Application,
  BaseTexture,
  Texture,
  Rectangle,
  AnimatedSprite,
  Sprite,
  Graphics,
} from 'pixi.js';

export type SpriteSheetConfig = {
  url: string;
  cols: number;
  rows: number;
  lastRowItemCount: number;
  animationSpeed: number;
  spriteScale: number;
};

export const CreateAnimatedPlanetSprite = (
  app: Application,
  conf: SpriteSheetConfig
) => {
  const sheet = BaseTexture.from(conf.url);
  const frames = [];
  const rowSpacing = sheet.width / conf.cols;
  const colSpacing = sheet.height / conf.rows;

  for (let j = 0; j < conf.rows; j++) {
    for (let i = 0; i < conf.cols; i++) {
      if (!(j === conf.rows - 1 && i > conf.lastRowItemCount - 1)) {
        frames.push(
          new Texture(
            sheet,
            new Rectangle(
              rowSpacing * i,
              colSpacing * j,
              rowSpacing,
              colSpacing
            )
          )
        );
      }
    }
  }
  const sprite = new AnimatedSprite(frames);
  sprite.animationSpeed = conf.animationSpeed;
  sprite.height = sprite.height * conf.spriteScale;
  sprite.width = sprite.width * conf.spriteScale;
  sprite.play();
  app.stage.addChild(sprite);
  return sprite;
};

export const CreateBasicPlanetSprite = (
  app: Application,
  graphic: Graphics
) => {
  const sunTexture = app.renderer.generateTexture(graphic);
  const sprite = new Sprite(sunTexture);
  app.stage.addChild(sprite);
  return sprite;
};
