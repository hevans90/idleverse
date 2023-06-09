import { DashLine } from '@idleverse/pixi-utils';
import { colors, hexStringToNumber, themePaletteKeys } from '@idleverse/theme';
import * as PIXI from 'pixi.js';
import { Assets } from 'pixi.js';

const textStyle: Partial<PIXI.ITextStyle> = {
  fontFamily: 'zx spectrum',
  fontSize: '12px',
  align: 'center',

  strokeThickness: 4,
};

export const drawNode = async ({
  id,
  imageUrl,
  name,
  position,
  colorPalette,
  radius,
}: {
  id: string;
  imageUrl: string;
  name: string;
  position: { x: number; y: number };
  colorPalette: typeof colors[typeof themePaletteKeys[0]];
  radius: number;
}) => {
  const container = new PIXI.Container();
  container.zIndex = 2;
  container.sortableChildren = true;

  const overlay = new PIXI.Graphics();
  const nodeBg = new PIXI.Graphics();
  overlay.name = 'overlay';
  overlay.alpha = 0.25;
  nodeBg.name = 'nodeBg';

  const colyseusAssets = await Assets.loadBundle('tech-tree');

  const iconTexture: PIXI.Texture = colyseusAssets[imageUrl];

  if (iconTexture) {
    const { height, width } = iconTexture || { height: null, width: null };

    nodeBg
      .beginTextureFill({
        texture: iconTexture,
        matrix: new PIXI.Matrix(
          (radius * 2) / width,
          0,
          0,
          (radius * 2) / height,
          radius,
          radius
        ),
      })
      .drawCircle(0, 0, radius)
      .endFill();
  } else {
    nodeBg
      .beginFill(hexStringToNumber(colorPalette['700']))
      .drawCircle(0, 0, radius);
  }

  overlay
    .lineStyle(1, hexStringToNumber(colorPalette['200']))
    .beginFill(hexStringToNumber(colorPalette['300']))
    .drawCircle(0, 0, radius);

  nodeBg.zIndex = 1;
  overlay.zIndex = 2;

  const text = new PIXI.Text(name, {
    ...textStyle,
    fill: colorPalette['100'],
    strokeThickness: 0,
  });

  text.anchor.set(0.5);
  text.position.y = -radius - 15;
  text.zIndex = 3;

  container.name = id;
  container.position = position;
  container.addChild(overlay, nodeBg, text);

  return container;
};

export const connectNodes = ({
  graphic,
  parent,
  self,
  color = '0xffffff',
  dashedLine,
}: {
  graphic: PIXI.Graphics;
  parent: { x: number; y: number };
  self: { x: number; y: number };
  dashedLine: boolean;
  color?: string;
}) => {
  graphic.alpha = 0.75;
  graphic.zIndex = 1;

  let line: PIXI.Graphics | DashLine;

  const lineWidth = 2;

  if (dashedLine) {
    line = new DashLine(graphic, {
      dash: [20, 20],
      color: hexStringToNumber(color),
      width: lineWidth,
    });
  } else {
    line = graphic;
    line.lineStyle(lineWidth, hexStringToNumber(color), 0.6);
  }
  line.moveTo(self.x, self.y);
  line.lineTo(parent.x, parent.y);

  return line;
};
