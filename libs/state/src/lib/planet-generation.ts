import { v4 as uuidv4 } from 'uuid';

import { makeVar } from '@apollo/client';
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

export const planetGeneratorConfigVar = makeVar<PlanetGenerationConfig>({
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
});

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
