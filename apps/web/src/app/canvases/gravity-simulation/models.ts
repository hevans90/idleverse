import * as PIXI from 'pixi.js';

export type NewtonianGraphics = PIXI.Graphics & {
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
