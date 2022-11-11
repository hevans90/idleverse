import * as PIXI from 'pixi.js';
import { indicatorFactory } from './indicator-factory';

type Vector2D = { x: number; y: number };

export const calculateHypotenuse = (a: number, b: number) =>
  Math.round(Math.hypot(a, b) * 100) / 100;

export const generateHypotenuse = (
  { x: x1, y: y1 }: Vector2D,
  { x: x2, y: y2 }: Vector2D,
  nameForContainer: string,
  color = 0xff0000,
  drawEntireTriangle = true
) => {
  const a = x1 - x2;
  const b = y1 - y2;

  const hyp = calculateHypotenuse(a, b);

  const theta = Math.atan2(b, a);

  const container = new PIXI.Container();

  container.name = nameForContainer;

  const hypotenuse = new PIXI.Graphics()
    .lineStyle({ width: 1, color })
    .moveTo(x1, y1)
    .lineTo(x2, y2);

  const hypotenuseInd = indicatorFactory(
    hyp.toString(),
    x2 + a / 2,
    y2 + b / 2,
    'hyp'
  );

  const adjacent = new PIXI.Graphics()
    .lineStyle({ width: 1, color })
    .moveTo(x1, y1)
    .lineTo(x2, y1);

  const opposite = new PIXI.Graphics()
    .lineStyle({ width: 1, color })
    .moveTo(x2, y1)
    .lineTo(x2, y2);

  container.addChild(hypotenuse);
  container.addChild(hypotenuseInd);

  if (drawEntireTriangle) {
    container.addChild(adjacent);
    container.addChild(opposite);
  }

  return { container, hyp, theta };
};
