export interface GameConfig {
  canvasHeight: number;
  canvasWidth: number;

  scale: number;

  increaseScale: () => void;
  decreaseScale: () => void;
  mapRadius: number;

  tileGap: number;
  tileWidth: number;
  offsetX: number;
  offsetY: number;

  /**
   * **radians**
   *
   * rotation of 1 gives you 45 Degrees
   */
  rotation: number;

  /**
   * Angle of Incline
   * 2 gives you isometric view
   */
  ai: number;

  borderL: number;
  borderR: number;
  borderD: number;
  borderU: number;
}
