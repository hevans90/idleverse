import { ColyseusCelestial } from '@idleverse/colyseus-shared';
import { hexStringToNumber } from '@idleverse/theme';
import * as PIXI from 'pixi.js';

export const drawBoundingBoxes = ({
  celestials,
  boxColor,
}: {
  celestials: ColyseusCelestial[];
  boxColor: string;
}) => {
  const container = new PIXI.Container();

  const color = hexStringToNumber(boxColor);

  celestials.forEach((celestial) => {
    const graphic = new PIXI.Graphics();
    graphic.name = `${celestial.name}_graphic`;
    graphic.alpha = 0.2;

    const { positionX, positionY, radius, gravityWellMaxRadius } = celestial;

    graphic
      .beginFill(color)
      .drawCircle(positionX, positionY, radius)
      .drawCircle(positionX, positionY, gravityWellMaxRadius);

    container.addChild(graphic);
  });

  container.name = 'boundingBoxes';
  return container;
};
