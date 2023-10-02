import { LayoutConfig } from '@idleverse/models';
import { makeVarPersisted } from './utils';

export const hotkeyHintsVar = makeVarPersisted<boolean>(true, 'hotkeyHints');

export const debugVar = makeVarPersisted<boolean>(false, 'debug');

export const fpsVar = makeVarPersisted<boolean>(false, 'fps');

export const layoutVar = makeVarPersisted<LayoutConfig>(
  {
    sideNav: true,
    toolBar: true,
  },
  'layout'
);
