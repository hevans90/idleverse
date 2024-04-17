import { Container, useApp } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { useEffect, useRef } from 'react';

import { colorsVar } from '@idleverse/state';
import { colors, hexStringToNumber } from '@idleverse/theme';
import * as Matter from 'matter-js';
import { getRandomConvexIrregularPolygon } from './random-irregular-convex-polygon';

import 'matter-attractors';

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

  const noAsteroids = 1000;
  const containerRef = useRef<PIXI.Container>();

  const randomPointInAnnulus = () => {
    // generate a random angle
    const theta = Math.random() * 2 * Math.PI;

    // generate a random distance
    const radius =
      Math.sqrt(Math.random()) *
        (dimensions.outerRadius - dimensions.innerRadius) +
      dimensions.innerRadius;

    // Convert polar coordinates to Cartesian coordinates
    return {
      x: radius * Math.cos(theta) + center.x,
      y: radius * Math.sin(theta) + center.y,
    };
  };

  useEffect(() => {
    const newAsteroids: Asteroid[] = [];

    const sun = Matter.Bodies.circle(center.x, center.y, SUN_RADIUS, {
      isStatic: true,
      mass: SUN_MASS,
      plugin: { attractors: [gravity] },
    });

    engineRef.current.gravity.scale = 0;

    for (let i = 0; i < noAsteroids; i++) {
      const vertices = getRandomConvexIrregularPolygon(5, 100, 200, 100, 200);

      const position = randomPointInAnnulus();

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
      g.beginFill(hexStringToNumber(colors[colorsVar().secondary]['500']));
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

      Matter.Engine.update(engineRef.current, delta * (1000 / 60));
    };

    app.ticker.add(tickerRef.current);

    return () => {
      containerRef?.current.removeChildren();
      app.ticker?.remove(tickerRef.current);
      Matter.Composite.clear(engineRef?.current.world, false, true);
    };
  }, []);

  return <Container name="asteroid-field" ref={containerRef} />;
};
