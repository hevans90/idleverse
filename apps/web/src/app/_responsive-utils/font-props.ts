import { IconProps, TypographyProps } from '@chakra-ui/react';

export const responsiveFontProps: { fontSize: TypographyProps['fontSize'] } = {
  fontSize: ['xxs', 'xs', 'xs', 'sm', 'md'],
};

export const responsiveIconProps: { boxSize: IconProps['boxSize'] } = {
  boxSize: [4, 5, 5, 6, 6],
};
