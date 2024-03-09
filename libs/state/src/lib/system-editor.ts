import { CelestialGenerationConfig } from '@idleverse/models';
import { celestialPresets } from './celestial-creation';
import { makeVarPersisted } from './utils';

type CelestialVariant = {
  config: CelestialGenerationConfig;
};

export const systemEditorStarConfigVar = makeVarPersisted<{
  celestial: CelestialVariant;
}>(
  {
    celestial: {
      config: celestialPresets[0],
    },
  },
  'systemEditorStarTypeVar'
);
