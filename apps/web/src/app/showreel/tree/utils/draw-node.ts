import * as PIXI from 'pixi.js';

const textStyle: Partial<PIXI.ITextStyle> = {
  fontFamily: 'zx spectrum',
  fontSize: '12px',
  fill: '#fff',
  align: 'center',
  stroke: '#000',
  strokeThickness: 4,
};

export const drawNode = (
  id: string,
  name: string,
  radius = 50,
  position: { x: number; y: number }
) => {
  const container = new PIXI.Container();
  const node = new PIXI.Graphics();

  node.lineStyle(2, 0xffffff).drawCircle(0, 0, radius);
  node.position.x = position.x;
  node.position.y = position.y;
  container.name = id;

  const text = new PIXI.Text(name, textStyle);
  text.anchor.set(0.5);

  container.addChild(node, text);

  return container;
};
