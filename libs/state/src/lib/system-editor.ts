import { makeVar } from '@apollo/client';
import { CelestialGenerationConfig } from '@idleverse/models';
import { celestialPresets } from './celestial-creation';
import { makeVarPersisted } from './utils';

type CelestialVariant = {
  name: string;
  type: 'star' | 'black hole';
  config: CelestialGenerationConfig;
};

export const SYSTEM_FOCI = [
  'celestial',
  'goldilocks-zone',
  'asteroid-belt',
] as const;

type SystemFociTuple = typeof SYSTEM_FOCI;

export type SystemFocus = SystemFociTuple[number];

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
