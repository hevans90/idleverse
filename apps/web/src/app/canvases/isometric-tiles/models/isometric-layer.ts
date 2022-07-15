import * as PIXI from 'pixi.js';

export interface IsometricLayer {
  container: PIXI.Container;
  texture: PIXI.RenderTexture;
  sprite: PIXI.Sprite;
}
