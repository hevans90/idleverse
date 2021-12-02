import * as PIXI from 'pixi.js';
import { ts } from './utils/constants';

export type IndicatorColours = {
  invalid: number;
  valid: number;
};

const indicatorColours: IndicatorColours = {
  invalid: 0x8b0000,
  valid: 0x8b8000,
};

export const drawIndicator = (indicatorType: keyof IndicatorColours) => {
  const indicator = new PIXI.Graphics();
  indicator.lineStyle(4, indicatorColours[indicatorType], 1);
  indicator.beginFill(indicatorColours[indicatorType], 0.25);
  indicator.drawRect(0, 0, ts * 2 - 2, ts * 2 - 2);
  indicator.endFill();
  return indicator;
};
