import { makeVar } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { HexPalette, PlanetGenerationConfig, textureColorMap } from './models';
import { makeVarPersisted } from './utils';

export const planetGeneratorConfigVar = makeVar<PlanetGenerationConfig>({
  seed: uuidv4(),
  textureResolution: 80,
  pixelSize: 3,
  atmosphericDistance: 3,
  atmosphere: true,
  rotate: true,
});

export const planetGenerationColorDrawerVar = makeVarPersisted<{
  panelOpen: boolean;
  palettePresetName: string;
  currentPalette: textureColorMap;
  currentHexPalette: HexPalette;
}>(
  {
    panelOpen: false,
    palettePresetName: 'desert',
    currentPalette: undefined,
    currentHexPalette: undefined,
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
