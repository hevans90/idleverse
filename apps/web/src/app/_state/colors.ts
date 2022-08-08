import { Theme } from '@chakra-ui/react';
import { makeVarPersisted } from './utils';

export const colorsVar = makeVarPersisted<{
  primary: keyof Theme['colors'];
  secondary: keyof Theme['colors'];
}>({ primary: 'orange', secondary: 'red' }, 'colors');
