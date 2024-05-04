import { colorsVar } from '@idleverse/state';
import { colors, hexStringToNumber } from '@idleverse/theme';
import { ParticleContainer, useApp } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { useEffect, useRef } from 'react';

function getRandomInteger(min: number, max: number) {
  // Generate a random floating-point number between 0 and 1
  const randomFloat = Math.random();

  // Scale the random number to fit within the range [min, max)
  const randomScaled = randomFloat * (max - min) + min;

  // Round down to the nearest integer
  const randomInteger = Math.floor(randomScaled);

  return randomInteger;
}

export const StarField = ({
  dimensions,
  initialScale,
}: {
  dimensions: {
    width: number;
    height: number;
  };
  initialScale: number;
}) => {
  const app = useApp();

  const noStars = 1000;
  const particleContainerRef = useRef<PIXI.ParticleContainer>();

  const defaultRadius = 1;

  const scaleFactors = [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1];

  useEffect(() => {
    const starTexture = app.renderer.generateTexture(
      new PIXI.Graphics()
        .clear()
        .beginFill(hexStringToNumber(colors[colorsVar().secondary]['300']))
        .drawCircle(0, 0, defaultRadius)
        .endFill()
    );

    for (let i = 0; i < noStars; i++) {
      const star = new PIXI.Sprite(starTexture);
      star.anchor.set(0.5);
      const scaleFactor = scaleFactors[i % 10];

      star.scale = {
        x: scaleFactor / initialScale,
        y: scaleFactor / initialScale,
      };

      const rand1 = Math.random();
      const rand2 = Math.random();

      star['scaleFactor'] = scaleFactor;

      star.name = 'PRESERVE_SCALE';

      star.alpha =
        (2 * scaleFactors[getRandomInteger(0, scaleFactors.length - 1)]) / 3;

      star.position.x =
        Math.random() * dimensions.width * 3 * (rand1 > 0.5 ? -1 : 1);
      star.position.y =
        Math.random() * dimensions.height * 3 * (rand2 > 0.5 ? -1 : 1);
      particleContainerRef.current.addChild(star);
    }
  }, []);

  return (
    <ParticleContainer
      name="starfield"
      maxSize={noStars}
      ref={particleContainerRef}
    />
  );
};
