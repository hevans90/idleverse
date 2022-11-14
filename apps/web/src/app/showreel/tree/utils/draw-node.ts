import { hexStringToNumber } from '@idleverse/theme';
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
  textColor = '0xffffff',
  borderColor = '0xffffff',
  bgColor = '0x000000',
  radius = 50,
}: {
  app: Application;
  id: string;
  name: string;
  position: { x: number; y: number };
  textColor?: string;
  borderColor?: string;
  bgColor?: string;
  radius?: number;
}) => {
  const container = new PIXI.Container();
  const node = new PIXI.Graphics();

  node
    .lineStyle(2, hexStringToNumber(borderColor))
    .beginFill(hexStringToNumber(bgColor))
    .drawCircle(0, 0, radius);

  const texture = app.renderer.generateTexture(node);
  const sprite = new PIXI.Sprite(texture);
  sprite.anchor.set(0.5);

  const text = new PIXI.Text(name, {
    ...textStyle,
    stroke: undefined,
    fill: textColor,
  });
  // const textPos = new PIXI.Text(position.x, textStyle);
  text.anchor.set(0.5);
  // textPos.anchor.set(0.5, 0);

  container.name = id;
  container.position = position;
  container.addChild(sprite, text);
  container.zIndex = 2;

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
