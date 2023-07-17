import { v4 as uuidv4 } from 'uuid';
import {
  PlanetGenerationConfig,
  RingConfig,
  TerrainHexPalette,
  TerrainRGBPalette,
} from './models';
import { makeVarPersisted } from './utils';

import { generateCelestialName } from '@idleverse/galaxy-gen';

export const planetGeneratorConfigVar =
  makeVarPersisted<PlanetGenerationConfig>(
    {
      name: generateCelestialName(),
      ui: true,
      radius: 1,
      seed: uuidv4(),
      textureResolution: 80,
      pixelSize: 3,
      atmosphericDistance: 3,
      atmosphere: true,
      rotate: true,
    },
    'planetGenerationWorldVar'
  );

export const planetGenerationColorDrawerVar = makeVarPersisted<{
  panelOpen: boolean;
  palettePresetName: string;
  currentPalette: TerrainRGBPalette;
  currentHexPalette: TerrainHexPalette;
  currentPaletteId: string;
}>(
  {
    panelOpen: false,
    palettePresetName: 'desert',
    currentPalette: {
      water: { r: 0, g: 0, b: 0 },
      sand: { r: 0, g: 0, b: 0 },
      grass: { r: 0, g: 0, b: 0 },
      forest: { r: 0, g: 0, b: 0 },
    },
    currentHexPalette: undefined,
    currentPaletteId: undefined,
  },
  'planetGenerationColorControls'
);

export const planetGenerationTerrainDrawerVar = makeVarPersisted<{
  panelOpen: boolean;
  terrainBias: [number, number, number, number];
}>(
  { panelOpen: false, terrainBias: [0, 0.2, 0.4, 0.6] },
  'planetGenerationTerrainControls'
);

export const planetGenerationRingDrawerVar = makeVarPersisted<{
  panelOpen: boolean;
  rings: RingConfig[];
}>({ panelOpen: false, rings: [] }, 'planetGenerationRingControls');
