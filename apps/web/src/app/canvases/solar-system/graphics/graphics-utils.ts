import {
  AnimatedSprite,
  BaseTexture,
  Container,
  Graphics,
  Rectangle,
  Renderer,
  Sprite,
  Texture,
} from 'pixi.js';

export type SpriteSheetConfig = {
  name: string;
  url: string;
  cols: number;
  rows: number;
  lastRowItemCount: number;
  animationSpeed: number;
  spriteScale: number;
};

export const createAnimatedPlanetSprite = (conf: SpriteSheetConfig) => {
  const sheet = BaseTexture.from(conf.name);

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
  sprite.zIndex = 1;
  sprite.play();
  return sprite;
};

export const createRadialEllipse = (
  x: number,
  y: number,
  width: number,
  height: number,
  color: number
) => {
  const gr = new Graphics();
  gr.lineStyle(1, color);
  gr.drawEllipse(x, y, width, height);
  gr.endFill();
  gr.zIndex = 0;
  return gr;
};

const createBasicPlanetSprite = (
  container: Container,
  renderer: Renderer,
  graphic: Graphics
) => {
  const sunTexture = renderer.generateTexture(graphic);
  const sprite = new Sprite(sunTexture);
  return sprite;
};
