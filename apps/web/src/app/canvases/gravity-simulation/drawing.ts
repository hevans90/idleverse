import * as PIXI from 'pixi.js';
import { Vector2D } from '../../_state/models';
import { indicatorFactory } from '../galaxy-generator/utils/indicator-factory';
import { BallConfig, NewtonianGraphics } from './models';

const getOffsetPosition = ({ x, y }: Vector2D, centerRadius: number) => ({
  x: centerRadius / 2 + x,
  y: centerRadius / 2 + y,
});

export const generateGravitationalCenter = (
  centerRadius: number,
  centerMass: number
) => {
  const center = new PIXI.Graphics()
    .beginFill(0xd69e4f)
    .drawCircle(0, 0, centerRadius) as NewtonianGraphics;

  center.name = 'center';
  center.mass = centerMass;
  center.position.x = 0;
  center.position.y = 0;

  return center;
};

const generateBall = (
  mass: number,
  { x, y, id }: BallConfig,
  radius: number
) => {
  const ball = new PIXI.Graphics() as NewtonianGraphics;

  ball.beginFill(0xffffff).drawCircle(0, 0, radius);
  ball.name = 'ball';
  ball.mass = mass;
  ball.velocity = { vx: 0, vy: 1 };
  ball.position.x = x;
  ball.position.y = y;
  ball.id = id;

  return ball as NewtonianGraphics;
};

export const generateBalls = (configs: BallConfig[], centerRadius: number) => {
  const balls: NewtonianGraphics[] = [];

  const ballConfigs = configs.map(({ x, y, id }) => ({
    ...getOffsetPosition({ x, y }, centerRadius),
    id,
  }));

  ballConfigs.forEach((config) => balls.push(generateBall(1, config, 20)));
  return balls;
};

export const calculateHypotenuse = (a: number, b: number) =>
  Math.round(Math.hypot(a, b) * 100) / 100;

export const generateHypotenuse = (
  { x: x1, y: y1 }: Vector2D,
  { x: x2, y: y2 }: Vector2D,
  ballId: string
) => {
  const a = x1 - x2;
  const b = y1 - y2;

  const hyp = calculateHypotenuse(a, b);

  const theta = Math.acos(a / hyp);

  const container = new PIXI.Container();

  container.name = ballId;

  const hypotenuse = new PIXI.Graphics()
    .lineStyle({ width: 1, color: 0xff0000 })
    .moveTo(x1, y1)
    .lineTo(x2, y2);

  const hypotenuseInd = indicatorFactory(
    hyp.toString(),
    x2 + a / 2,
    y2 + b / 2,
    'hyp'
  );

  const adjacent = new PIXI.Graphics()
    .lineStyle({ width: 1, color: 0xff0000 })
    .moveTo(x1, y1)
    .lineTo(x2, y1);

  const opposite = new PIXI.Graphics()
    .lineStyle({ width: 1, color: 0xff0000 })
    .moveTo(x2, y1)
    .lineTo(x2, y2);

  container.addChild(hypotenuse);
  container.addChild(hypotenuseInd);
  container.addChild(adjacent);
  container.addChild(opposite);

  return { container, hyp, theta };
};
