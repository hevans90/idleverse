import { makeVar } from '@apollo/client';
import { TerrainRGBPalette } from '@idleverse/models';
import * as PIXI from 'pixi.js';

export const planetSurfaceVar = makeVar<
  | {
      palette: TerrainRGBPalette;
      pixelData: {
        seed: string;
        data: Uint8Array;
        width: number;
        height: number;
      };
      baseTexture: PIXI.BaseTexture;
    }
  | undefined
>(undefined);
