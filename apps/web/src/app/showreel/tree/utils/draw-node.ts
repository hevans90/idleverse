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
  unlocked,
  unrevealed,
}: {
  id: string;
  imageUrl: string;
  name: string;
  position: { x: number; y: number };
  colorPalette: typeof colors[typeof themePaletteKeys[0]];
  radius: number;
  unlocked: boolean;
  unrevealed: boolean;
}) => {
  const container = new PIXI.Container();
  container.zIndex = 2;
  container.sortableChildren = true;

  const overlay = new PIXI.Graphics();
  const hoverOverlay = new PIXI.Graphics();
  const nodeBg = new PIXI.Graphics();

  hoverOverlay.name = 'hoverOverlay';
  hoverOverlay.alpha = 0.1;

  overlay.name = 'overlay';
  overlay.alpha = 0.15;
  nodeBg.name = 'nodeBg';

  const iconAssets = await Assets.loadBundle('tech-tree');
  const placeholders = await Assets.loadBundle('placeholders');

  if (!unlocked) {
    overlay.alpha = 0;
    nodeBg.alpha = 0.4;
  }

  if (unrevealed) {
    overlay.alpha = 0;
    nodeBg.alpha = 0.25;
  }

  const iconTexture: PIXI.Texture = unrevealed
    ? placeholders['75x75-circle']
    : iconAssets[imageUrl];

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
      .lineStyle(unlocked ? 3 : 0, hexStringToNumber(colorPalette['200']))
      .drawCircle(0, 0, radius)
      .endFill();
  } else {
    nodeBg
      .beginFill(hexStringToNumber(colorPalette['800']))
      .lineStyle(unlocked ? 3 : 0, hexStringToNumber(colorPalette['200']))
      .drawCircle(0, 0, radius);
  }

  overlay
    .lineStyle(1, hexStringToNumber(colorPalette['200']))
    .beginFill(hexStringToNumber(colorPalette['300']))
    .drawCircle(0, 0, radius);

  hoverOverlay
    .lineStyle(1, hexStringToNumber(colorPalette['200']))
    .beginFill(hexStringToNumber(colorPalette['300']))
    .drawCircle(0, 0, radius);

  nodeBg.zIndex = 1;
  overlay.zIndex = 2;
  hoverOverlay.zIndex = 3;

  const text = new PIXI.Text(unrevealed ? '' : name, {
    ...textStyle,
    fill: colorPalette['100'],
    strokeThickness: 0,
  });

  text.anchor.set(0.5);
  text.position.y = -radius - 15;
  text.zIndex = 3;
  if (!unlocked) {
    text.alpha = 0.35;
  }

  container.name = id;
  container.position = position;
  container.addChild(hoverOverlay, overlay, nodeBg, text);

  return container;
};

export const connectNodes = ({
  graphic,
  parent,
  self,
  dashedLine,
  unrevealed,
  unlocked,
  nodeRadius,
  color = '0xffffff',
}: {
  graphic: PIXI.Graphics;
  parent: { x: number; y: number };
  self: { x: number; y: number };
  dashedLine: boolean;
  unrevealed: boolean;
  unlocked: boolean;
  nodeRadius: number;
  color?: string;
}) => {
  if (!unlocked) {
    graphic.alpha = 0.5;
  }
  if (unrevealed) {
    graphic.alpha = 0.25;
  }
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

  const { selfEdge, parentEdge } = circleConnectingCoords({
    parent,
    self,
    radius: nodeRadius,
  });

  line.moveTo(selfEdge.x, selfEdge.y);
  line.lineTo(parentEdge.x, parentEdge.y);

  return line;
};

const circleConnectingCoords = ({
  parent,
  self,
  radius,
}: {
  parent: { x: number; y: number };
  self: { x: number; y: number };
  radius: number;
}) => {
  const deltaY = self.y - parent.y;
  const deltaX = self.x - parent.x;
  // same for both circles since we have consistent radii
  const length = radius / Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  return {
    selfEdge: {
      x: self.x - deltaX * length,
      y: self.y - deltaY * length,
    },
    parentEdge: {
      x: parent.x + deltaX * length,
      y: parent.y + deltaY * length,
    },
  };
};
