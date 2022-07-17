import * as PIXI from 'pixi.js';
import { IndicatorColor } from '../ui/indicators';
import { keyboard } from '../utils/keyboard';

export const bindKeyboardListeners = (
  upArrowIndicator: PIXI.Text,
  downArrowIndicator: PIXI.Text,
  rightArrowIndicator: PIXI.Text,
  leftArrowIndicator: PIXI.Text,
  emitVelocityChange: (delta: {
    dvelx?: number;
    dvely?: number;
    hardSetX?: number;
    hardSetY?: number;
  }) => void
) => [
  keyboard({
    value: 'ArrowUp',
    press: () => {
      upArrowIndicator.style.fill = IndicatorColor.green;
      emitVelocityChange({ dvely: 5 });
    },
    release: () => {
      upArrowIndicator.style.fill = IndicatorColor.white;
      emitVelocityChange({ hardSetY: 0 });
    },
    holdDown: () => emitVelocityChange({ dvely: 2 }),
  }),

  keyboard({
    value: 'ArrowDown',
    press: () => {
      downArrowIndicator.style.fill = IndicatorColor.green;
      emitVelocityChange({ dvely: -5 });
    },
    release: () => {
      downArrowIndicator.style.fill = IndicatorColor.white;
      emitVelocityChange({ hardSetY: 0 });
    },
    holdDown: () => emitVelocityChange({ dvely: -2 }),
  }),

  keyboard({
    value: 'ArrowRight',
    press: () => {
      rightArrowIndicator.style.fill = IndicatorColor.green;
      emitVelocityChange({ dvelx: -5 });
    },
    release: () => {
      rightArrowIndicator.style.fill = IndicatorColor.white;
      emitVelocityChange({ hardSetX: 0 });
    },
    holdDown: () => emitVelocityChange({ dvelx: -2 }),
  }),

  keyboard({
    value: 'ArrowLeft',
    press: () => {
      leftArrowIndicator.style.fill = IndicatorColor.green;
      emitVelocityChange({ dvelx: 5 });
    },
    release: () => {
      leftArrowIndicator.style.fill = IndicatorColor.white;
      emitVelocityChange({ hardSetX: 0 });
    },
    holdDown: () => emitVelocityChange({ dvelx: 2 }),
  }),
];
