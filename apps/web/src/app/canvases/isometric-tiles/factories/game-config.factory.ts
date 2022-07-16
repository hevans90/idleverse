import { GameConfig } from '../models/game-config';

export const gameConfigFactory = (
  canvasWidth: number,
  canvasHeight: number,
  /**
   * logic to be run when the scene is forcably re-rendered (zooming for example)
   */
  reRenderCallback: () => void,

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
    return -this.offsetX * 2 + this.canvasWidth;
  },

  get borderR() {
    return 0;
  },

  get borderD() {
    return (
      -(this.offsetY + (this.tileWidth * this.scale) / this.ai) * 2 +
      this.canvasHeight
    );
  },

  get borderU() {
    return 0;
  },
});
