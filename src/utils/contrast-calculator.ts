import {
  isTheme,
  isThemeSection,
  Theme,
  ThemeKeys,
  ThemeSection,
  ThemeSectionKeys,
} from '../_theme/theme';

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

export const themeContraster = (theme: Theme): Theme =>
  recursiveContrast(JSON.parse(JSON.stringify(theme))) as Theme;

const recursiveContrast = (parent: Theme | ThemeSection) => {
  if (isTheme(parent)) {
    Object.keys(parent).forEach((themeKey) =>
      recursiveContrast(parent[themeKey as ThemeKeys])
    );
  } else if (isThemeSection(parent)) {
    Object.keys(parent).forEach((themeSectionKey) => {
      (parent as any)[themeSectionKey as ThemeSectionKeys] = contrastCalculator(
        (parent as any)[themeSectionKey as ThemeSectionKeys]
      );
    });
  }
  return parent;
};
