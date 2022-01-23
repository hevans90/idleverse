import { LayoutConfig } from './models';
import { makeVarPersisted } from './utils';

export const layoutVar = makeVarPersisted<LayoutConfig>(
  {
    sideNav: true,
    toolBar: true,
  },
  'layout'
);
