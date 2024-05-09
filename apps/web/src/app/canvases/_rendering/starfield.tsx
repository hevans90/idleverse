import { colorsVar } from '@idleverse/state';
import { colors, hexStringToNumber } from '@idleverse/theme';
import { ParticleContainer, useApp } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { useEffect, useRef } from 'react';
import { randomIntegerInRange } from '../_utils/random-integer-in-range';

export const StarField = ({
  center,
  dimensions,
  initialScale,
  numberOfStars = 1000,
  radius = 1000,
}: {
  center: { x: number; y: number };
  dimensions: {
    width: number;
    height: number;
  };
  initialScale: number;
  numberOfStars?: number;
  radius?: number;
}) => {
  const app = useApp();

  const particleContainerRef = useRef<PIXI.ParticleContainer>();

  const defaultRadius = 1;

  const scaleFactors = [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1];

  const randomPointInCircle = () => {
    // generate a random angle
    const theta = Math.random() * 2 * Math.PI;

    // generate a random distance
    const randomRadius = Math.sqrt(Math.random()) * radius;
    // Convert polar coordinates to Cartesian coordinates
    return {
      x: randomRadius * Math.cos(theta) + center.x,
      y: randomRadius * Math.sin(theta) + center.y,
    };
  };

  useEffect(() => {
    const starTexture = app.renderer.generateTexture(
      new PIXI.Graphics()
        .clear()
        .beginFill(hexStringToNumber(colors[colorsVar().secondary]['300']))
        .drawCircle(0, 0, defaultRadius)
        .endFill()
    );

    for (let i = 0; i < numberOfStars; i++) {
      const star = new PIXI.Sprite(starTexture);
      star.anchor.set(0.5);
      const scaleFactor = scaleFactors[i % 10];

      star.scale = {
        x: scaleFactor / initialScale,
        y: scaleFactor / initialScale,
      };

      star['scaleFactor'] = scaleFactor;

      star.name = 'PRESERVE_SCALE';

      star.alpha =
        scaleFactors[randomIntegerInRange(0, scaleFactors.length - 1)];

      star.position = randomPointInCircle();

      particleContainerRef.current.addChild(star);
    }
  }, []);

  return (
    <ParticleContainer
      name="starfield"
      maxSize={numberOfStars}
      ref={particleContainerRef}
    />
  );
};
