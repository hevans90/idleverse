import { Theme } from '@chakra-ui/react';
import { writeFileSync } from 'fs';
import { colors } from '../theme';
import { hexToRGB } from '../theme-colour-conversions';

type CustomColors = Omit<
  Partial<Theme['colors']>,
  'transparent' | 'current' | 'black' | 'white'
>;

export const themeToPal = (colors: CustomColors): string => {
  let output = `JASC-PAL\n0100\n256`;

  Object.values(colors).forEach((val) =>
    Object.values(val).forEach((val) => {
      const { r, g, b } = hexToRGB(val);
      output += `\n${r} ${g} ${b}`;
    })
  );

  return output;
};

writeFileSync('.asperite/theme.pal', themeToPal(colors), {
  flag: 'w+',
});
