import { generateHypotenuse } from './drawing';
import { NewtonianGraphics } from './models';

export const calculateGravity = (
  center: NewtonianGraphics,
  ball: NewtonianGraphics
) => {
  const { theta, hyp } = generateHypotenuse(
    center.position,
    ball.position,
    ball.id
  );
  ball.hyp = hyp;
  ball.theta = theta;

  const G = 2;
  const force = (G * center.mass * ball.mass) / Math.pow(hyp, 2);

  return {
    fx: force * Math.cos(ball.theta),
    fy: force * Math.sin(ball.theta),
  };
};
