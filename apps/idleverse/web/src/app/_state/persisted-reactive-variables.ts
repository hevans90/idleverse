import { LayoutConfig } from './models';
import { makeVarPersisted } from './utils';

export const layoutVar = makeVarPersisted<LayoutConfig>(
  {
    sideNav: true,
    toolBar: true,
  },
  'layout'
);

export const debugVar = makeVarPersisted<boolean>(false, 'debug');

export const fpsVar = makeVarPersisted<boolean>(false, 'fps');
