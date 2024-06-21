import { makeVar } from '@apollo/client';
import { SystemFocus } from '@idleverse/galaxy-gen';
import { CelestialVariant } from '@idleverse/models';
import { celestialPresets } from './celestial-creation';
import { makeVarPersisted } from './utils';

export const systemEditorNewPlanetVar = makeVar<boolean>(false);
export const systemEditorFocusVar = makeVar<SystemFocus | undefined>(undefined);

export const systemEditorConfigVar = makeVarPersisted<{
  celestial: CelestialVariant;
}>(
  {
    celestial: {
      name: '',
      type: 'star',
      config: celestialPresets[0],
    },
  },
  'systemEditorConfigVar'
);
