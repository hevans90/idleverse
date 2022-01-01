/* eslint-disable react-hooks/exhaustive-deps */
import { useReactiveVar } from '@apollo/client';
import { useApp } from '@inlet/react-pixi';
import { Container, TickerCallback } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { Vector2D } from '../../_state/models';
import { simulationPaused, timeVar } from '../../_state/reactive-variables';
import { useResize } from '../common-utils/use-resize.hook';
import { useViewport } from '../common-utils/use-viewport';
import { useFpsTracker } from '../galaxy-generator/utils/fps-counter';
import {
  generateBalls,
  generateGravitationalCenter,
  generateHypotenuse,
} from './drawing';
import { calculateGravity } from './gravity';
import { NewtonianGraphics } from './models';

export const GravitySimulation = () => {
  const app = useApp();
  const size = useResize('gravity-sim');
  const gravitySimContainerRef = useRef(new Container());
  useFpsTracker(app, size);
  useViewport(app, size, gravitySimContainerRef, true);
  const time = useReactiveVar(timeVar);
  const paused = useReactiveVar(simulationPaused);

  const gravityCalculationTickerRef = useRef<TickerCallback<unknown>>((dt) =>
    processGracityCalculations(dt)
  );

  const centerRadius = 20;
  const centerMass = 200;

  const ballConfigs: Vector2D[] = [
    {
      x: 150,
      y: -100,
    },
    {
      x: -200,
      y: 100,
    },
    {
      x: 100,
      y: 100,
    },
    {
      x: 300,
      y: 100,
    },
    {
      x: 100,
      y: -200,
    },
  ];

  const balls = useRef<NewtonianGraphics[]>(
    generateBalls(ballConfigs, centerRadius)
  );

  const center = generateGravitationalCenter(centerRadius, centerMass);

  const removeBalls = () =>
    gravitySimContainerRef.current.children.forEach((child) =>
      child.name === 'center' ? null : child.destroy(true)
    );

  const addBalls = () =>
    balls.current.forEach((ball) => {
      const { container, hyp, theta } = generateHypotenuse(
        center.position,
        ball.position
      );

      ball.hyp = hyp;
      ball.theta = theta;

      gravitySimContainerRef.current.addChild(ball);
      gravitySimContainerRef.current.addChild(container);
    });

  const processGracityCalculations = (dt: number) => {
    timeVar(Math.round(timeVar() + dt));

    balls.current.forEach((ball) => {
      gravitySimContainerRef.current.getChildByName('triangle')?.destroy();

      calculateGravity(center, ball);
      ball.velocity.vx += ball.resultantForce.fx;
      ball.velocity.vy += ball.resultantForce.fy;
      ball.position.x += ball.velocity.vx * dt;
      ball.position.y += ball.velocity.vy * dt;
      const { container } = generateHypotenuse(center.position, ball.position);
      gravitySimContainerRef.current.addChild(container);
    });
  };

  /**
   * Initial one-time setup.
   */
  useEffect(() => {
    gravitySimContainerRef.current.sortableChildren = true;
    gravitySimContainerRef.current.addChild(center);
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
