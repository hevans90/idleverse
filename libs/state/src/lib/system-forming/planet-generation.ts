import { v4 as uuidv4 } from 'uuid';

import { makeVar } from '@apollo/client';
import {
  generateCelestialName,
  randomGoldilocksRadii,
} from '@idleverse/galaxy-gen';
import {
  PlanetAppearanceConfig,
  PlanetGenerationConfig,
  PlanetTerrain,
  RingConfig,
} from '@idleverse/models';

const defaultPlanetConfig: () => PlanetGenerationConfig = () => ({
  name: generateCelestialName(),
  ui: true,
  radius: 1,
  seed: uuidv4(),
  textureResolution: 128,
  pixelSize: 3,
  atmosphericDistance: 3,
  atmosphere: true,
  rotate: true,
  orbitalRadius: randomGoldilocksRadii(),
});

export const planetGenerationPresets: {
  name: PlanetTerrain;
  appearance: PlanetAppearanceConfig;
  config: PlanetGenerationConfig;
  rings: RingConfig[];
}[] = [
  {
    name: 'terran',
    appearance: {
      palettePresetName: 'terran',
      terrainBias: [0, 0.55, 0.65, 0.82],
    },
    config: defaultPlanetConfig(),
    rings: [],
  },
  {
    name: 'desert',
    appearance: {
      palettePresetName: 'desert',
      terrainBias: [0, 0.5, 0.62, 0.9],
    },
    config: defaultPlanetConfig(),
    rings: [],
  },
  {
    name: 'alien',
    appearance: {
      palettePresetName: 'alien',
      terrainBias: [0, 0.35, 0.6, 0.82],
    },
    config: defaultPlanetConfig(),
    rings: [],
  },
  {
    name: 'primordial',
    appearance: {
      palettePresetName: 'primordial',
      terrainBias: [0, 0.38, 0.5, 0.66],
    },
    config: defaultPlanetConfig(),
    rings: [],
  },
];

export const planetGeneratorConfigVar = makeVar<PlanetGenerationConfig>(
  defaultPlanetConfig()
);

export const planetGenerationColorDrawerVar = makeVar<
  {
    panelOpen: boolean;
  } & PlanetAppearanceConfig
>({
  panelOpen: false,
  ...planetGenerationPresets[0].appearance,
});

export const planetGenerationRingDrawerVar = makeVar<{
  panelOpen: boolean;
  rings: RingConfig[];
}>({ panelOpen: false, rings: [] });
