import { indicatorFactory } from '../../galaxy-generator/utils/indicator-factory';

export enum IndicatorColor {
  white = 0xffffff,
  green = 0x00ff00,
}

const smallIndicatorFactory = (
  text: string,
  x: number,
  y: number,
  name: string
) => indicatorFactory(text, x, y, name, 11);

// bottom left indicators
export const draggedIndicatorFactory = (height: number) =>
  smallIndicatorFactory('', 10, height - 65, 'draggedIndicator');

export const dragIndicatorFactory = (height: number) =>
  smallIndicatorFactory('', 10, height - 45, 'dragIndicator');

export const orientationIndicatorFactory = (height: number) =>
  smallIndicatorFactory('', 10, height - 25, 'orientationIndicator');

export const buildIndicators = (canvasHeight: number, canvasWidth: number) => ({
  topRight: {
    cartesianIndicator: smallIndicatorFactory(
      '',
      canvasWidth - 350,
      60,
      'cartesianIndicator'
    ),
    tileIndicator: smallIndicatorFactory(
      '',
      canvasWidth - 350,
      80,
      'tileIndicator'
    ),
    mapVelocityIndicator: smallIndicatorFactory(
      'Velocity: ',
      canvasWidth - 350,
      110,
      'velIndicator'
    ),
    selectedIndicator: smallIndicatorFactory(
      'Selected: ',
      canvasWidth - 350,
      170,
      'selectedIndicator'
    ),
    oldSelectedIndicator: smallIndicatorFactory(
      'Prev. selected : ',
      canvasWidth - 350,
      190,
      'prevSelectedIndicator'
    ),
  },
  bottomLeft: {
    orientationIndicator: orientationIndicatorFactory(canvasHeight),
    dragIndicator: dragIndicatorFactory(canvasHeight),
    draggedIndicator: draggedIndicatorFactory(canvasHeight),
  },
});

export type GameIndicators = ReturnType<typeof buildIndicators>;
