import * as PIXI from 'pixi.js';

const textStyle: Partial<PIXI.ITextStyle> = {
  fontFamily: 'zx spectrum',
  fontSize: '12px',
  fill: '#fff',
  align: 'center',

  strokeThickness: 4,
};

export const drawNode = (
  id: string,
  name: string,
  position: { x: number; y: number },
  radius = 50
) => {
  const container = new PIXI.Container();
  const node = new PIXI.Graphics();

  node.lineStyle(2, 0xffffff).drawCircle(0, 0, radius);
  container.name = id;

  const text = new PIXI.Text(name, textStyle);
  text.anchor.set(0.5);

  container.position = position;
  container.addChild(node, text);

  return container;
};
