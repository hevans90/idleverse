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
  const bgDarkSecondary = useColorModeValue(
    `${secondary}.400`,
    `${secondary}.800`
  );
  const bgDarkerSecondary = useColorModeValue(
    `${secondary}.500`,
    `${secondary}.900`
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

  const rawBg: string = colors[primary][colorMode === 'dark' ? '700' : '200'];
  const rawBgDark: string =
    colors[primary][colorMode === 'dark' ? '800' : '200'];
  const rawBgDarker: string =
    colors[primary][colorMode === 'dark' ? '900' : '300'];

  const rawBorder: string =
    colors[primary][colorMode === 'dark' ? '200' : '600'];

  const rawBorderSecondary: string =
    colors[secondary][colorMode === 'dark' ? '600' : '200'];

  return {
    bg,
    bgLight,
    bgLightSecondary,
    bgDark,
    bgDarker,
    bgDarkSecondary,
    bgDarkerSecondary,
    border,
    borderSecondary,
    rawBg,
    rawBgDark,
    rawBgDarker,
    rawBorder,
    rawBorderSecondary,
  };
};
