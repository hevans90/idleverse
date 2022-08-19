import { IconProps, TypographyProps } from '@chakra-ui/react';

export const headerResponsiveFontProps: {
  fontSize: TypographyProps['fontSize'];
} = {
  fontSize: ['md', 'lg', 'lg', 'xl', '2xl'],
};
export const responsiveFontProps: { fontSize: TypographyProps['fontSize'] } = {
  fontSize: ['xxs', 'xs', 'xs', 'sm', 'md'],
};

export const responsiveIconProps: { boxSize: IconProps['boxSize'] } = {
  boxSize: [4, 5, 5, 6, 6],
};
