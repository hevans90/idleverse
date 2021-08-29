import { theme } from '../_theme/theme';

// export const contrastCalculator = (color: string): 'white' | 'black' => {
//   const serialised = Color(color);

//   const black = Color.rgb(0, 0, 0);
//   const white = Color.rgb(255, 255, 255);

//   const blackContrast = serialised.contrast(black);
//   const whiteContrast = serialised.contrast(white);

//   const result = blackContrast > whiteContrast ? 'black' : 'white';

//   // UNCOMMENT this for console feedback on the calculations

//   if (result === 'black') {
//     console.log(
//       `%c contrast to black:  ${serialised.contrast(black)}`,
//       `background: ${serialised.hex().toString()}; color: black`
//     );
//   } else {
//     console.log(
//       `%c contrast to white:  ${serialised.contrast(white)}`,
//       `background: ${serialised.hex().toString()}; color: white`
//     );
//   }

//   return result;
// };

const convertColorToArray = (color: string) => {
  color = color.slice(1);
  if (color.length === 3) {
    return color.split('').map((hex) => hex + hex);
  }

  return [color.slice(0, 2), color.slice(2, 4), color.slice(4, 6)];
};

export const contrastCalculator = (color: string): 'white' | 'black' => {
  const hexToRGB: Array<number> = convertColorToArray(color).map((hex) => {
    return parseInt(hex, 16);
  });

  return [0.2126, 0.7152, 0.0722].reduce(
    (total: number, current: number, idx: number): number => {
      return total + hexToRGB[idx] * current;
    },
    0
  ) > 165
    ? 'black'
    : 'white';
};

export const themeContraster = ({
  primary: { default: primaryDefault, light: primaryLight, dark: primaryDark },
  secondary: {
    default: secondaryDefault,
    light: secondaryLight,
    dark: secondaryDark,
  },
  traffic: { green, orange, red },
}: theme): theme => ({
  primary: {
    default: contrastCalculator(primaryDefault),
    light: contrastCalculator(primaryLight),
    dark: contrastCalculator(primaryDark),
  },
  secondary: {
    default: contrastCalculator(secondaryDefault),
    light: contrastCalculator(secondaryLight),
    dark: contrastCalculator(secondaryDark),
  },
  traffic: {
    green: contrastCalculator(green),
    orange: contrastCalculator(orange),
    red: contrastCalculator(red),
  },
});
