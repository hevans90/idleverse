import { Vector2D } from '@idleverse/models';
import * as PIXI from 'pixi.js';

export type NewtonianGraphics = PIXI.Graphics & {
  id?: string;
  mass?: number;
  hyp?: number;
  theta?: number;
  resultantForce?: {
    fx: number;
    fy: number;
  };
  velocity?: {
    vx: number;
    vy: number;
  };
};

export type BallConfig = Vector2D & {
  id: string;
} & Required<Pick<NewtonianGraphics, 'velocity'>>;
