import { v4 as uuidv4 } from 'uuid';

import { makeVar } from '@apollo/client';
import { generateCelestialName } from '@idleverse/galaxy-gen';
import {
  PlanetAppearanceConfig,
  PlanetGenerationConfig,
  RingConfig,
} from '@idleverse/models';

export const NEW_PLANET_ID = 'new-planet';

const defaultPlanetConfig: PlanetGenerationConfig = {
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
};

export const planetGenerationPresets: {
  name: 'terran' | 'desert' | 'alien' | 'primordial';
  appearance: PlanetAppearanceConfig;
  config: PlanetGenerationConfig;
  rings: RingConfig[];
}[] = [
  {
    name: 'terran',
    appearance: {
      palettePresetName: 'terran',
      terrainBias: [0, 0.65, 0.73, 0.82],
    },
    config: defaultPlanetConfig,
    rings: [],
  },
  {
    name: 'desert',
    appearance: {
      palettePresetName: 'desert',
      terrainBias: [0, 0.5, 0.62, 0.9],
    },
    config: defaultPlanetConfig,
    rings: [],
  },
  {
    name: 'alien',
    appearance: {
      palettePresetName: 'desert',
      terrainBias: [0, 0.65, 0.73, 0.82],
    },
    config: defaultPlanetConfig,
    rings: [],
  },
  {
    name: 'primordial',
    appearance: {
      palettePresetName: 'desert',
      terrainBias: [0, 0.65, 0.73, 0.82],
    },
    config: defaultPlanetConfig,
    rings: [],
  },
];

export const planetGeneratorConfigVar =
  makeVar<PlanetGenerationConfig>(defaultPlanetConfig);

export const planetGenerationColorDrawerVar = makeVar<
  {
    panelOpen: boolean;
  } & PlanetAppearanceConfig
>({
  panelOpen: false,
  palettePresetName: 'desert',
  terrainBias: [0, 0.2, 0.4, 0.6],
});

export const planetGenerationRingDrawerVar = makeVar<{
  panelOpen: boolean;
  rings: RingConfig[];
}>({ panelOpen: false, rings: [] });
