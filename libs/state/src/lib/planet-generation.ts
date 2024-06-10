import { v4 as uuidv4 } from 'uuid';

import { makeVarPersisted } from './utils';

import { generateCelestialName } from '@idleverse/galaxy-gen';
import {
  PlanetAppearanceConfig,
  PlanetGenerationConfig,
  RingConfig,
} from '@idleverse/models';

export const planetGenerationPresets: {
  name: 'terran';
  dimensions: PlanetGenerationConfig;
  rings: RingConfig[];
  appearance: PlanetAppearanceConfig;
}[] = [];

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

export const planetGenerationColorDrawerVar = makeVarPersisted<
  {
    panelOpen: boolean;
  } & PlanetAppearanceConfig
>(
  {
    panelOpen: false,
    palettePresetName: 'desert',
    terrainBias: [0, 0.2, 0.4, 0.6],
  },
  'planetGenerationColors'
);

export const planetGenerationRingDrawerVar = makeVarPersisted<{
  panelOpen: boolean;
  rings: RingConfig[];
}>({ panelOpen: false, rings: [] }, 'planetGenerationRingControls');
