import { makeVar } from '@apollo/client';
import { PlanetGenerationConfig, textureColorMap } from './models';
import { makeVarPersisted } from './utils';

export const planetGeneratorConfigVar = makeVar<PlanetGenerationConfig>({
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
}>(
  { panelOpen: false, palettePresetName: 'desert', currentPalette: undefined },
  'planetGenerationColorPanelControls'
);
