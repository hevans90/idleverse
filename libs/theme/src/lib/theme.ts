import { Theme } from '@chakra-ui/theme';
import { StyleFunctionProps } from '@chakra-ui/theme-tools';
import { StepsStyleConfig } from 'chakra-ui-steps';

import {
  Checkbox,
  ColorHues,
  extendTheme,
  Input,
  NumberInput,
  RangeSliderFilledTrack,
  Slider,
} from '@chakra-ui/react';

type DefaultHues = {
  dark: { text: keyof ColorHues; bg: keyof ColorHues };
  light: { text: keyof ColorHues; bg: keyof ColorHues };
};

export const defaultShades: DefaultHues = {
  dark: {
    text: 200,
    bg: 800,
  },
  light: {
    text: 800,
    bg: 300,
  },
};

export const fontSizes: Partial<Theme['fontSizes']> = {
  '2xs': '0.6rem',
  xs: '0.7rem',
  sm: '0.8rem',
  md: '0.9rem',
  lg: '1.1rem',
  xl: '1.3rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  '4xl': '2.5rem',
  '5xl': '3rem',
  '6xl': '3.5rem',
};

type themePalettes = Pick<
  Theme['colors'],
  | 'pink'
  | 'orange'
  | 'red'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'cyan'
  | 'blue'
  | 'purple'
  | 'gray'
>;

export const themePaletteKeys: (keyof themePalettes)[] = [
  'pink',
  'orange',
  'red',
  'yellow',
  'green',
  'teal',
  'cyan',
  'blue',
  'purple',
  'gray',
];

export const colors: themePalettes = {
  pink: {
    '50': '#F4F1F2',
    '100': '#E0D6DB',
    '200': '#CCBCC5',
    '300': '#B8A2AE',
    '400': '#A58897',
    '500': '#916E80',
    '600': '#745866',
    '700': '#57424D',
    '800': '#3A2C33',
    '900': '#1D161A',
  },
  orange: {
    '50': '#FCF1E9',
    '100': '#F5D7C1',
    '200': '#EFBE9A',
    '300': '#E9A472',
    '400': '#E28A4A',
    '500': '#DC7123',
    '600': '#B05A1C',
    '700': '#844415',
    '800': '#582D0E',
    '900': '#2C1707',
  },
  red: {
    '50': '#F9EBEB',
    '100': '#EEC8C8',
    '200': '#E4A5A5',
    '300': '#D98282',
    '400': '#CE5F5F',
    '500': '#C43B3B',
    '600': '#9D2F2F',
    '700': '#752424',
    '800': '#4E1818',
    '900': '#270C0C',
  },
  green: {
    '50': '#EDF8F2',
    '100': '#CCEBDA',
    '200': '#ABDEC2',
    '300': '#8AD1AB',
    '400': '#69C493',
    '500': '#48B77B',
    '600': '#399362',
    '700': '#2B6E4A',
    '800': '#1D4931',
    '900': '#0E2519',
  },
  teal: {
    '50': '#EDF8F7',
    '100': '#CCEAEA',
    '200': '#ABDDDC',
    '300': '#8BD0CE',
    '400': '#6AC3C1',
    '500': '#49B6B3',
    '600': '#3B918F',
    '700': '#2C6D6B',
    '800': '#1D4948',
    '900': '#0F2424',
  },
  cyan: {
    '50': '#E7FAFE',
    '100': '#BBF1FC',
    '200': '#8FE9FA',
    '300': '#63E0F8',
    '400': '#37D7F6',
    '500': '#0BCEF4',
    '600': '#09A5C3',
    '700': '#067C93',
    '800': '#045262',
    '900': '#022931',
  },
  blue: {
    '50': '#ECF2F9',
    '100': '#C9DCEE',
    '200': '#A6C5E3',
    '300': '#83AFD8',
    '400': '#6098CD',
    '500': '#3D82C2',
    '600': '#31689B',
    '700': '#254E74',
    '800': '#18344E',
    '900': '#0C1A27',
  },
  purple: {
    '50': '#F0EEF7',
    '100': '#D6CFE8',
    '200': '#BCAFD9',
    '300': '#A290CB',
    '400': '#8871BC',
    '500': '#6E52AD',
    '600': '#58428A',
    '700': '#423168',
    '800': '#2C2145',
    '900': '#161023',
  },
  gray: {
    '50': '#F1F2F4',
    '100': '#D7DBDF',
    '200': '#BEC3CB',
    '300': '#A4ACB6',
    '400': '#8B94A2',
    '500': '#717D8E',
    '600': '#5B6471',
    '700': '#444B55',
    '800': '#2D3239',
    '900': '#17191C',
  },
  yellow: {
    '50': '#f9f8f3',
    '100': '#f2f0e2',
    '200': '#e3dec5',
    '300': '#d2c99f',
    '400': '#c2b280',
    '500': '#b19a5e',
    '600': '#a48752',
    '700': '#886d46',
    '800': '#53432e',
    '900': '#1f1a12',
  },
};

export const theme: ({
  primary,
  secondary,
}: {
  primary: keyof Theme['colors'];
  secondary: keyof Theme['colors'];
}) => Partial<Theme> = ({ primary, secondary }) => {
  Slider.defaultProps = { ...Slider.defaultProps, colorScheme: secondary };
  Input.defaultProps = {
    ...Input.defaultProps,
    focusBorderColor: `${secondary}.400`,
  };
  NumberInput.defaultProps = {
    ...NumberInput.defaultProps,
    focusBorderColor: `${secondary}.400`,
  };

  RangeSliderFilledTrack.defaultProps = {
    ...RangeSliderFilledTrack.defaultProps,
    background: `${secondary}.200`,
  };
  Checkbox.defaultProps = {
    ...Checkbox.defaultProps,
    colorScheme: secondary,
  };

  const CustomSteps = {
    ...StepsStyleConfig,
    baseStyle: (props) => {
      return {
        ...StepsStyleConfig.baseStyle(props),
        stepIconContainer: {
          ...StepsStyleConfig.baseStyle(props)['stepIconContainer'],
          overflow: 'hidden',
        },
      };
    },
  };

  return extendTheme({
    components: {
      Steps: CustomSteps,
    },
    styles: {
      global: (props: StyleFunctionProps) => ({
        body: {
          background:
            props.colorMode === 'dark'
              ? `${primary}.${defaultShades.dark.bg}`
              : `${primary}.${defaultShades.light.bg}`,
          color:
            props.colorMode === 'dark'
              ? `${primary}.${defaultShades.dark.text}`
              : `${primary}.${defaultShades.light.text}`,
        },
      }),
    } as Partial<Pick<Theme, 'styles'>>,
    config: { initialColorMode: 'dark', useSystemColorMode: false },
    colors,
    fonts: {
      body: 'zx spectrum',
      heading: 'zx spectrum',
      mono: 'zx spectrum',
    } as Partial<Pick<Theme, 'fonts'>>,
    fontSizes,
    shadows: { outline: `0 0 0 3px var(--chakra-colors-${secondary}-400)` },
  });
};
