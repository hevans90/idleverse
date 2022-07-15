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
  } = { mapRadius: 8, tileWidth: 64, tileGap: 0.02 },
): GameConfig => ({
  canvasHeight,
  canvasWidth,
  scale: 1,
  ai: 2,
  rotation: 1,
  ...options,

  increaseScale() {
    if (this.scale === 3) {
      console.warn(`Cannot zoom out more; scale = ${this.scale}`);
      return;
    }

    this.scale === 0.5 ? (this.scale = 1) : this.scale++;
    reRenderCallback();
  },

  decreaseScale() {
    if (this.scale === 0.5) {
      console.warn(`Cannot zoom in more; scale = ${this.scale}`);
      return;
    }

    this.scale === 1 ? (this.scale = 0.5) : this.scale--;
    reRenderCallback();
  },

  get offsetX() {
    return (this.mapRadius * 2 + 1) * this.tileWidth * this.scale;
  },

  get offsetY() {
    return (
      (((this.mapRadius * 2 + 1) * this.tileWidth - this.tileWidth) *
        this.scale) /
      this.ai
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
