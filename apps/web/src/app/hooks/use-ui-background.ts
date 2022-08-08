import { useReactiveVar } from '@apollo/client';
import { useColorModeValue } from '@chakra-ui/react';
import { colorsVar } from '../_state/colors';

import { colors } from '@idleverse/theme';

export const useUiBackground = () => {
  const { primary } = useReactiveVar(colorsVar);

  const bgLight = useColorModeValue(`${primary}.200`, `${primary}.600`);
  const bg = useColorModeValue(`${primary}.300`, `${primary}.700`);
  const bgDark = useColorModeValue(`${primary}.400`, `${primary}.800`);
  const bgDarker = useColorModeValue(`${primary}.500`, `${primary}.900`);
  const border = useColorModeValue(`${primary}.200`, `${primary}.600`);

  const canvasBg = colors[primary]['800'];

  return { bg, bgLight, bgDark, bgDarker, border, canvasBg };
};
