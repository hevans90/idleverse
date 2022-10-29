import { colors, hexStringToNumber } from '@idleverse/theme';
import { useApp } from '@inlet/react-pixi';
import { Viewport } from 'pixi-viewport';
import * as PIXI from 'pixi.js';
import { useEffect, useRef } from 'react';
import { colorsVar } from '../../../_state/colors';

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomFloat = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const StarField = ({
  viewport,
  dimensions,
}: {
  viewport: Viewport;
  dimensions: {
    width: number;
    height: number;
  };
}) => {
  const app = useApp();

  const noStars = 3000;

  const starTexture = useRef(
    app.renderer.generateTexture(
      new PIXI.Graphics()
        .clear()
        .beginFill(hexStringToNumber(colors[colorsVar().secondary]['200']))
        .drawCircle(0, 0, 30)
        .endFill()
    )
  );

  const particleContainerRef = useRef(new PIXI.ParticleContainer(noStars));

  useEffect(() => {
    for (let i = 0; i < noStars; i++) {
      // Make star speed & size scale non-linearly - there should be more far away than close
      const scaleFactor = Math.pow(i, 3) / Math.pow(noStars, 3);
      // Create a star sprite
      const star = new PIXI.Sprite(starTexture.current);
      star.anchor.set(0.5);
      // Make stars progressively bigger as we add them, effectively z-sorting
      star.scale.set(scaleFactor / 20 + 0.01);
      // star.dLife = scaleFactor*3
      // Make sure larger stars move faster
      // star.dy = 5 * scaleFactor;
      // Move the stars to a random location on the screen

      const rand1 = Math.random();
      const rand2 = Math.random();

      star.position.x =
        Math.random() * dimensions.width * 3 * (rand1 > 0.5 ? -1 : 1);
      star.position.y =
        Math.random() * dimensions.height * 3 * (rand2 > 0.5 ? -1 : 1);
      particleContainerRef.current.addChild(star);
    }

    viewport.addChild(particleContainerRef.current);
  }, []);

  return <></>;
};
