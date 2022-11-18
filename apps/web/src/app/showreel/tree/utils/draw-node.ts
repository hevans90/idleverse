import { colors, hexStringToNumber, themePaletteKeys } from '@idleverse/theme';
import * as PIXI from 'pixi.js';
import { treeIconResourcesVar } from '../../../_state/pixi-resources';

const textStyle: Partial<PIXI.ITextStyle> = {
  fontFamily: 'zx spectrum',
  fontSize: '12px',
  align: 'center',

  strokeThickness: 4,
};

export const drawNode = ({
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

  const node = new PIXI.Graphics();
  const nodeBg = new PIXI.Graphics();

  const iconTexture = treeIconResourcesVar()?.[imageUrl]?.texture;

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

  node
    .lineStyle(1, hexStringToNumber(colorPalette['200']))
    .beginFill(hexStringToNumber(colorPalette['300']))
    .drawCircle(0, 0, radius);
  node.name = 'node';
  nodeBg.name = 'nodeBg';

  nodeBg.zIndex = 1;
  node.zIndex = 2;

  const text = new PIXI.Text(name, {
    ...textStyle,
    stroke: undefined,
    fill: colorPalette['100'],
  });

  text.anchor.set(0.5);
  text.position.y = -radius - 8;
  text.zIndex = 3;

  container.name = id;
  container.position = position;
  container.addChild(node, nodeBg, text);

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
  line.alpha = 0.5;
  line.zIndex = 1;

  return line;
};
