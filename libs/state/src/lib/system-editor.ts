import { generateCelestialName } from '@idleverse/galaxy-gen';
import { CelestialGenerationConfig } from '@idleverse/models';
import { celestialPresets } from './celestial-creation';
import { makeVarPersisted } from './utils';

type CelestialVariant = {
  name: string;
  type: 'star' | 'black hole';
  config: CelestialGenerationConfig;
};

export const systemEditorConfigVar = makeVarPersisted<{
  celestial: CelestialVariant;
  focus?: 'celestial' | 'planet';
}>(
  {
    celestial: {
      name: generateCelestialName(),
      type: 'star',
      config: celestialPresets[0],
    },
  },
  'systemEditorConfigVar'
);
