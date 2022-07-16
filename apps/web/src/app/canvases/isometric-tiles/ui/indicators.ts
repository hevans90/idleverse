import * as PIXI from 'pixi.js';
import { TextStyle } from 'pixi.js';

export enum IndicatorColor {
  white = 0xffffff,
  green = 0x00ff00,
}

const indicatorPreset: Partial<TextStyle> = {
  fontFamily: 'Courier',
  fontSize: 14,
  fill: IndicatorColor.white,
  align: 'center',
};

const indicatorFactory = (
  x: number,
  y: number,
  initialText = '',
  z: 1 | 2 | 3 = 2
): PIXI.Text => {
  const indicator = new PIXI.Text(initialText, indicatorPreset);
  indicator.position.x = x;
  indicator.position.y = y;
  indicator.zIndex = z;
  return indicator;
};

// bottom left indicators
export const draggedIndicatorFactory = (height: number) =>
  indicatorFactory(10, height - 65);

export const dragIndicatorFactory = (height: number) =>
  indicatorFactory(10, height - 45);

export const orientationIndicatorFactory = (height: number) =>
  indicatorFactory(10, height - 25);

// bottom right indicators
export const upArrowIndicatorFactory = (height: number, width: number) =>
  indicatorFactory(width - 100, height - 65, ' UP');

export const downArrowIndicatorFactory = (height: number, width: number) =>
  indicatorFactory(width - 100, height - 25, 'DOWN');

export const leftArrowIndicatorFactory = (height: number, width: number) =>
  indicatorFactory(width - 145, height - 45, 'LEFT');

export const rightArrowIndicatorFactory = (height: number, width: number) =>
  indicatorFactory(width - 55, height - 45, 'RIGHT');

export const buildIndicators = (canvasHeight: number, canvasWidth: number) => ({
  topLeft: {
    cartesianIndicator: indicatorFactory(10, 60),
    tileIndicator: indicatorFactory(10, 80),
    mapVelocityIndicator: indicatorFactory(10, 110, 'Velocity: '),
    myContainerIndicator: indicatorFactory(10, 130),
    myContainerParentIndicator: indicatorFactory(10, 150),
    selectedIndicator: indicatorFactory(10, 170, 'Selected: '),
    oldSelectedIndicator: indicatorFactory(10, 190, 'Prev. Selected: '),
  },
  bottomLeft: {
    orientationIndicator: orientationIndicatorFactory(canvasHeight),
    dragIndicator: dragIndicatorFactory(canvasHeight),
    draggedIndicator: draggedIndicatorFactory(canvasHeight),
  },
  bottomRight: {
    upArrowIndicator: upArrowIndicatorFactory(canvasHeight, canvasWidth),
    downArrowIndicator: downArrowIndicatorFactory(canvasHeight, canvasWidth),
    leftArrowIndicator: leftArrowIndicatorFactory(canvasHeight, canvasWidth),
    rightArrowIndicator: rightArrowIndicatorFactory(canvasHeight, canvasWidth),
  },
});

export type GameIndicators = ReturnType<typeof buildIndicators>;
