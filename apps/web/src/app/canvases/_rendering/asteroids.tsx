import { Container, useApp } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { useEffect, useRef } from 'react';

import {
  AsteroidSize,
  celestialViewerAsteroidBeltVar,
  colorsVar,
} from '@idleverse/state';
import { colors, hexStringToNumber } from '@idleverse/theme';
import * as Matter from 'matter-js';
import { getRandomConvexIrregularPolygon } from './random-irregular-convex-polygon';

import { useReactiveVar } from '@apollo/client';
import 'matter-attractors';
import { randomIntegerInRange } from '../_utils/random-integer-in-range';
import { randomPointInAnnulus } from '../_utils/random-point-in-annulus';

Matter.use('matter-attractors');

export const updateAsteroidPosition = (
  time: number,
  asteroid: PIXI.Sprite,
  radius: number,
  mass: number,
  simulationSpeed: number
) => {
  const planetOffset = {
    x: radius * Math.sin(time * mass * 0.002 * simulationSpeed),
    y: radius * Math.cos(time * mass * 0.002 * simulationSpeed),
    scale: 1,
  };

  asteroid.position = {
    x: asteroid.position.x + planetOffset.x,
    y: asteroid.position.y + planetOffset.y,
  };
};

const G = 6.67408e-4; // Gravitational constant (made stronger by 7 orders of magnitude)
const SUN_RADIUS = 50;
const SUN_MASS = 100000;

const NEW_ASTEROID_MASS_MIN = 0.049;
const NEW_ASTEROID_MASS_MAX = 0.05;

type Asteroid = {
  matterBody: Matter.Body;
  sprite: PIXI.Sprite;
  constraint?: Matter.Constraint;
};

const gravity = (bodyA: Matter.Body, bodyB: Matter.Body) => {
  // use Newton's law of gravitation
  const bToA = Matter.Vector.sub(bodyB.position, bodyA.position),
    distanceSq = Matter.Vector.magnitudeSquared(bToA) || 0.0001,
    normal = Matter.Vector.normalise(bToA),
    magnitude = -G * ((bodyA.mass * bodyB.mass) / distanceSq),
    force = Matter.Vector.mult(normal, magnitude);

  // to apply forces to both bodies
  Matter.Body.applyForce(bodyA, bodyA.position, Matter.Vector.neg(force));
  Matter.Body.applyForce(bodyB, bodyB.position, force);
};

export const Asteroids = ({
  dimensions,
  center,
}: {
  dimensions: {
    innerRadius: number;
    outerRadius: number;
  };
  center: { x: number; y: number };
}) => {
  const app = useApp();

  const engineRef = useRef<Matter.Engine>(Matter.Engine.create());

  const tickerRef = useRef<(delta: number) => void>();

  const asteroidsRef = useRef<Asteroid[]>([]);

  const { noAsteroids, size, colorPalette } = useReactiveVar(
    celestialViewerAsteroidBeltVar
  );
  const containerRef = useRef<PIXI.Container>();

  useEffect(() => {
    const newAsteroids: Asteroid[] = [];

    const sun = Matter.Bodies.circle(center.x, center.y, SUN_RADIUS, {
      isStatic: true,
      mass: SUN_MASS,
      plugin: { attractors: [gravity] },
    });

    engineRef.current.gravity.scale = 0;

    for (let i = 0; i < noAsteroids; i++) {
      const verticesForSize: {
        [key in AsteroidSize]: [number, number, number, number];
      } = {
        small: [100, 200, 100, 200],
        medium: [150, 300, 150, 300],
        large: [200, 400, 200, 400],
      };

      const vertices = getRandomConvexIrregularPolygon(
        randomIntegerInRange(5, 10),
        ...verticesForSize[size]
      );

      const position = randomPointInAnnulus({ dimensions, center });

      const matterBody = Matter.Bodies.fromVertices(
        position.x,
        position.y,
        [vertices],
        {
          mass: Matter.Common.random(
            NEW_ASTEROID_MASS_MIN,
            NEW_ASTEROID_MASS_MAX
          ),
          frictionAir: 0,
          friction: 0,
          plugin: { attractors: [] },

          // disable collision until bunching is solved
          collisionFilter: {
            group: -1,
            category: 2,
            mask: 0,
          },
        }
      );

      const distanceToSun = Math.sqrt(
        Math.pow(sun.position.x - position.x, 2) +
          Math.pow(sun.position.y - position.y, 2)
      );
      const constraint = Matter.Constraint.create({
        pointA: sun.position,
        bodyB: matterBody,
        length: distanceToSun,
      });

      const orbitVelocity = Math.sqrt(sun.mass / distanceToSun);
      // Increase the orbit velocity by some factor to compensate for the gravitational pull from other planets

      // Calculate the angle between the planet and the sun
      const angleToSun = Math.atan2(
        sun.position.y - position.y,
        sun.position.x - position.x
      );
      const velocity = {
        x: -orbitVelocity * Math.sin(angleToSun),
        y: orbitVelocity * Math.cos(angleToSun),
      };

      Matter.Body.setVelocity(matterBody, velocity);

      const g = new PIXI.Graphics();

      // default color
      let color = colors[colorsVar().secondary]['500'];

      if (colorPalette) {
        // get random colour from palette
        const { forest, grass, sand, water } = colorPalette;

        color = [forest, grass, sand, water][randomIntegerInRange(0, 3)];
      }

      g.beginFill(hexStringToNumber(color));
      g.drawPolygon(vertices);
      g.alpha = 0.3;
      g.endFill();

      const sprite = new PIXI.Sprite(app.renderer.generateTexture(g));

      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
      sprite.position = position;
      sprite.name = `asteroid_${i}`;

      newAsteroids.push({
        matterBody,
        sprite,
        constraint,
      });
      containerRef.current.addChild(sprite);
    }

    asteroidsRef.current = newAsteroids;

    Matter.World.add(engineRef.current.world, [
      ...newAsteroids.map(({ matterBody }) => matterBody),
      ...newAsteroids.map(({ constraint }) => constraint),
      sun,
    ]);

    tickerRef.current = (delta) => {
      asteroidsRef.current.forEach(({ matterBody, sprite }) => {
        sprite.rotation = matterBody.angle;
        sprite.position.x = matterBody.position.x;
        sprite.position.y = matterBody.position.y;
      });

      Matter.Engine.update(engineRef.current, delta * 2);
    };

    app.ticker.add(tickerRef.current);

    return () => {
      containerRef?.current?.removeChildren();
      app.ticker?.remove(tickerRef.current);
      Matter.Composite.clear(engineRef?.current.world, false, true);
    };
  }, [noAsteroids, size, colorPalette]);

  return <Container name="asteroid-field" ref={containerRef} />;
};
