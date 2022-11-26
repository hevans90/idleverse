import { GameConfig } from '../models/game-config';

export const gameConfigFactory = (
  canvasWidth: number,
  canvasHeight: number,

  options: {
    mapRadius: number;
    tileWidth: number;
    tileGap: number;
  }
): GameConfig => ({
  canvasHeight,
  canvasWidth,
  ai: 2,
  rotation: 1,
  mapRadius: options.mapRadius,
  tileWidth: options.tileWidth,
  tileGap: options.tileGap,

  get offsetX() {
    return (this.mapRadius * 2 + 1) * this.tileWidth;
  },

  get offsetY() {
    return (
      ((this.mapRadius * 2 + 1) * this.tileWidth - this.tileWidth) / this.ai
    );
  },

  get borderL() {
    return -this.canvasWidth;
  },

  get borderR() {
    return this.canvasWidth;
  },

  get borderD() {
    return -this.canvasHeight;
  },

  get borderU() {
    return this.canvasHeight;
  },
});
