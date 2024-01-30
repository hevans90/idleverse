/* eslint-disable @nx/enforce-module-boundaries */
import { useReactiveVar } from '@apollo/client';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';

import { colorsVar } from '@idleverse/state';
import { colors } from './theme';

export const useUiBackground = () => {
  const { primary, secondary } = useReactiveVar(colorsVar);

  const { colorMode } = useColorMode();

  const bgLightSecondary = useColorModeValue(
    `${secondary}.200`,
    `${secondary}.600`
  );
  const bgLight = useColorModeValue(`${primary}.200`, `${primary}.600`);
  const bg = useColorModeValue(`${primary}.300`, `${primary}.700`);
  const bgDark = useColorModeValue(`${primary}.400`, `${primary}.800`);
  const bgDarker = useColorModeValue(`${primary}.500`, `${primary}.900`);
  const border = useColorModeValue(`${primary}.200`, `${primary}.600`);
  const borderSecondary = useColorModeValue(
    `${secondary}.200`,
    `${secondary}.600`
  );

  const canvasBg: string =
    colors[primary][colorMode === 'dark' ? '800' : '200'];
  const canvasBgDarker: string =
    colors[primary][colorMode === 'dark' ? '900' : '300'];

  const canvasBorder: string =
    colors[primary][colorMode === 'dark' ? '200' : '600'];

  const canvasBorderSecondary: string =
    colors[secondary][colorMode === 'dark' ? '600' : '200'];

  return {
    bg,
    bgLight,
    bgLightSecondary,
    bgDark,
    bgDarker,
    border,
    borderSecondary,
    canvasBg,
    canvasBgDarker,
    canvasBorder,
    canvasBorderSecondary,
  };
};
