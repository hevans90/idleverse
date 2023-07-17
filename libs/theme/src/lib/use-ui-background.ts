import { useReactiveVar } from '@apollo/client';
import { useColorModeValue } from '@chakra-ui/react';

import { colorsVar } from '@idleverse/state';
import { colors } from './theme';

export const useUiBackground = () => {
  const { primary, secondary } = useReactiveVar(colorsVar);

  const bgLightSecondary = useColorModeValue(
    `${secondary}.200`,
    `${secondary}.600`
  );
  const bgLight = useColorModeValue(`${primary}.200`, `${primary}.600`);
  const bg = useColorModeValue(`${primary}.300`, `${primary}.700`);
  const bgDark = useColorModeValue(`${primary}.400`, `${primary}.800`);
  const bgDarker = useColorModeValue(`${primary}.500`, `${primary}.900`);
  const border = useColorModeValue(`${primary}.200`, `${primary}.600`);

  const canvasBg: string = colors[primary]['800'];
  const canvasBorder: string = colors[primary]['600'];

  return {
    bg,
    bgLight,
    bgLightSecondary,
    bgDark,
    bgDarker,
    border,
    canvasBg,
    canvasBorder,
  };
};
