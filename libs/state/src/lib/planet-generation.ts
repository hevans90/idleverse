import { v4 as uuidv4 } from 'uuid';

import { makeVarPersisted } from './utils';

import { generateCelestialName } from '@idleverse/galaxy-gen';
import {
  PlanetGenerationConfig,
  RingConfig,
  TerrainHexPalette,
  TerrainRGBPalette,
} from '@idleverse/models';

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
      orbitalRadius: 1,
    },
    'planetGenerationWorldVar'
  );

export const planetGenerationColorDrawerVar = makeVarPersisted<{
  panelOpen: boolean;
  palettePresetName: string;
  currentPalette: TerrainRGBPalette;
  currentHexPalette?: TerrainHexPalette;
  currentPaletteId: string;
  terrainBias: [number, number, number, number];
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
    currentPaletteId: '196080d1-ed3c-496b-a913-3c14ccf11edf',
    terrainBias: [0, 0.2, 0.4, 0.6],
  },
  'planetGenerationColors'
);

export const planetGenerationRingDrawerVar = makeVarPersisted<{
  panelOpen: boolean;
  rings: RingConfig[];
}>({ panelOpen: false, rings: [] }, 'planetGenerationRingControls');
