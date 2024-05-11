import { IconProps, TypographyProps } from '@chakra-ui/react';

export const headerResponsiveFontProps: {
  fontSize: TypographyProps['fontSize'];
} = {
  fontSize: ['md', 'lg', 'lg', 'xl', '2xl'],
};

export const subHeaderResponsiveFontProps: {
  fontSize: TypographyProps['fontSize'];
} = {
  fontSize: ['md', 'md', 'lg'],
};
export const smallSubHeaderResponsiveFontProps: {
  fontSize: TypographyProps['fontSize'];
} = {
  fontSize: ['sm', 'md', 'md'],
};

export const responsiveFontProps: { fontSize: TypographyProps['fontSize'] } = {
  fontSize: ['2xs', '2xs', 'xs', 'xs', 'sm'],
};

export const copyResponsiveFontProps: {
  fontSize: TypographyProps['fontSize'];
} = {
  fontSize: ['2xs', '2xs', 'xs', 'xs', 'xs'],
};

export const responsiveIconProps: { boxSize: IconProps['boxSize'] } = {
  boxSize: [4, 5, 5, 6, 6],
};
