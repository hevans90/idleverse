/* eslint-disable react-hooks/exhaustive-deps */
import { useReactiveVar } from '@apollo/client';
import { generateHypotenuse } from '@idleverse/pixi-utils';
import { useApp } from '@pixi/react';
import { Container, TickerCallback } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useResize } from '../../canvases/_utils/use-resize.hook';
import { useViewport } from '../../canvases/_utils/use-viewport.hook';
import { useFpsTracker } from '../../canvases/galaxy-generator/utils/fps-counter';

import { simulationPaused, timeVar } from '@idleverse/state';
import { generateBalls, generateGravitationalCenter } from './drawing';
import { calculateGravity } from './gravity';
import { BallConfig, NewtonianGraphics } from './models';

export const GravitySimulation = () => {
  const app = useApp();
  const size = useResize('gravity-sim');
  const gravitySimContainerRef = useRef(new Container());
  useFpsTracker(app);
  useViewport({
    app,
    size,
    containerRef: gravitySimContainerRef,
    clampDrag: true,
  });
  const time = useReactiveVar(timeVar);
  const paused = useReactiveVar(simulationPaused);

  const gravityCalculationTickerRef = useRef<TickerCallback<unknown>>((dt) =>
    processGracityCalculations(dt)
  );

  const centerRadius = 50;
  const centerMass = 1000;

  const ballConfigs: BallConfig[] = [
    {
      x: 125,
      y: 100,
    },
    {
      x: -100,
      y: -100,
    },
  ].map(({ x, y }) => ({
    x,
    y,
    id: uuidv4() as string,
    velocity: { vx: x > 0 ? -2 : 2, vy: y > 0 ? -2 : 2 },
  }));

  const ballContainer = useRef<Container>(new Container());

  const balls = useRef<NewtonianGraphics[]>(
    generateBalls(ballConfigs, centerRadius)
  );

  const center = useRef<NewtonianGraphics>(
    generateGravitationalCenter(centerRadius, centerMass)
  );

  const removeBalls = () => {
    ballContainer.current.destroy(true);
  };

  const addBalls = () => {
    ballContainer.current = new Container();

    gravitySimContainerRef.current.addChild(ballContainer.current);

    balls.current.forEach((ball) => {
      const { container, hyp, theta } = generateHypotenuse(
        center.current.position,
        ball.position,
        ball.id
      );

      ball.hyp = hyp;
      ball.theta = theta;

      ballContainer.current.addChild(ball, container);
    });
  };

  const processGracityCalculations = (dt: number) => {
    timeVar(Math.round(timeVar() + dt));

    balls.current.forEach((ball) => {
      ballContainer.current.getChildByName(ball.id).destroy(true);

      ball.resultantForce = calculateGravity(center.current, ball);
      ball.velocity.vx += ball.resultantForce.fx;
      ball.velocity.vy += ball.resultantForce.fy;
      ball.position.x += ball.velocity.vx * dt;
      ball.position.y += ball.velocity.vy * dt;

      const { container } = generateHypotenuse(
        center.current.position,
        ball.position,
        ball.id
      );
      ballContainer.current.addChild(container);
    });
  };

  /**
   * Initial one-time setup.
   */
  useEffect(() => {
    timeVar(0);
    gravitySimContainerRef.current.sortableChildren = true;
    gravitySimContainerRef.current.addChild(center.current);
    gravitySimContainerRef.current.addChild(ballContainer.current);
  }, []);

  useEffect(() => {
    if (time === 0) {
      app.ticker.stop();
      app.ticker.remove(gravityCalculationTickerRef.current);
      removeBalls();
      balls.current = generateBalls(ballConfigs, centerRadius);
      addBalls();
      app.ticker.add(gravityCalculationTickerRef.current);
      app.ticker.update();
      if (!paused) {
        app.ticker.start();
      }
    }
  }, [time]);

  useEffect(() => {
    if (paused) {
      app.ticker.stop();
    } else {
      app.ticker.start();
    }
  }, [paused]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
