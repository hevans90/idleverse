import * as PIXI from 'pixi.js';

import { Vector2D } from '@idleverse/state';
import { BallConfig, NewtonianGraphics } from './models';

const getOffsetPosition = ({ x, y }: Vector2D, centerRadius: number) => ({
  x: x > 0 ? x + centerRadius / 2 : x - centerRadius / 2,
  y: y > 0 ? y + centerRadius / 2 : y - centerRadius / 2,
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
  { x, y, id, velocity }: BallConfig,
  radius: number
) => {
  const ball = new PIXI.Graphics() as NewtonianGraphics;

  ball.beginFill(0xffffff).drawCircle(0, 0, radius);
  ball.name = 'ball';
  ball.mass = mass;
  ball.velocity = velocity;
  ball.position.x = x;
  ball.position.y = -y;
  ball.id = id;

  return ball as NewtonianGraphics;
};

export const generateBalls = (configs: BallConfig[], centerRadius: number) => {
  const balls: NewtonianGraphics[] = [];

  const ballConfigs = configs.map(({ x, y, id, velocity }) => ({
    ...getOffsetPosition({ x, y }, centerRadius),
    id,
    velocity,
  }));

  ballConfigs.forEach((config) => balls.push(generateBall(1, config, 20)));
  return balls;
};
