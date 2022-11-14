import { colors, hexStringToNumber, themePaletteKeys } from '@idleverse/theme';
import * as PIXI from 'pixi.js';
import { Application } from 'pixi.js';

const textStyle: Partial<PIXI.ITextStyle> = {
  fontFamily: 'zx spectrum',
  fontSize: '8px',
  align: 'center',

  strokeThickness: 4,
};

export const drawNode = ({
  app,
  id,
  name,
  position,
  colorPalette,
  radius,
}: {
  app: Application;
  id: string;
  name: string;
  position: { x: number; y: number };
  colorPalette: typeof colors[typeof themePaletteKeys[0]];
  radius: number;
}) => {
  const container = new PIXI.Container();
  container.zIndex = 2;
  container.sortableChildren = true;

  const node = new PIXI.Graphics();
  const nodeBg = new PIXI.Graphics();

  nodeBg
    .beginFill(hexStringToNumber(colorPalette['700']))
    .drawCircle(0, 0, radius);

  node
    .lineStyle(1, hexStringToNumber(colorPalette['200']))
    .beginFill(hexStringToNumber(colorPalette['300']))
    .drawCircle(0, 0, radius);

  const texture = app.renderer.generateTexture(node);
  const sprite = new PIXI.Sprite(texture);

  const textureBg = app.renderer.generateTexture(nodeBg);
  const spriteBg = new PIXI.Sprite(textureBg);

  spriteBg.anchor.set(0.5);
  sprite.anchor.set(0.5);

  spriteBg.zIndex = 1;
  sprite.zIndex = 2;

  sprite.interactive = true;
  sprite.cursor = 'pointer';
  sprite.alpha = 0.5;

  sprite.on('mouseover', () => {
    sprite.alpha = 1;
    container.zIndex = 3;
  });

  sprite.on('mouseout', () => {
    sprite.alpha = 0.5;
    container.zIndex = 2;
  });

  const text = new PIXI.Text(name, {
    ...textStyle,
    stroke: undefined,
    fill: colorPalette['100'],
  });

  text.anchor.set(0.5);
  text.zIndex = 3;

  container.name = id;
  container.position = position;
  container.addChild(sprite, spriteBg, text);

  return container;
};

export const connectNodes = ({
  parent,
  self,
  color = '0xffffff',
}: {
  parent: { x: number; y: number };
  self: { x: number; y: number };
  color?: string;
}) => {
  const line = new PIXI.Graphics();
  line.lineStyle(2, hexStringToNumber(color), 0.6);
  line.moveTo(self.x, self.y);
  line.lineTo(parent.x, parent.y);
  line.zIndex = 1;

  return line;
};
