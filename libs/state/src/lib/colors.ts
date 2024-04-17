import { themePaletteKeys } from '@idleverse/theme';
import { makeVarPersisted } from './utils';

export const colorsVar = makeVarPersisted<{
  primary: typeof themePaletteKeys[0];
  secondary: typeof themePaletteKeys[0];
}>({ primary: 'gray', secondary: 'teal' }, 'colors');
