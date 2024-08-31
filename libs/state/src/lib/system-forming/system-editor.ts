import { makeVar } from '@apollo/client';
import { SystemFocus } from '@idleverse/galaxy-gen';
import { CelestialVariant } from '@idleverse/models';
import { makeVarPersisted } from '../utils';
import { celestialPresets } from './celestial-creation';

export const systemEditorOrbitalEditInProgressVar = makeVar<boolean>(false);
export const systemEditorNewPlanetVar = makeVar<boolean>(false);
export const systemEditorFocusVar = makeVar<SystemFocus | undefined>(undefined);

export const systemEditorConfigVar = makeVarPersisted<{
  celestial: CelestialVariant;
  mode: 'create' | 'view' | 'edit';
  formingPoints: number;
}>(
  {
    mode: 'create',
    formingPoints: 0,
    celestial: {
      name: '',
      type: 'star',
      config: celestialPresets[0],
    },
  },
  'systemEditorConfigVar'
);
