export const theme = {
  primary: { default: '#311b92', light: '#6746c3', dark: '#000063' },
  secondary: { default: '#d6bd92', light: '#ffefc3', dark: '#a48d64' },

  traffic: {
    green: '#7cb342',
    orange: '#ff8f00',
    red: '#c62828',
  },

  content: { default: '#f5f5f5', light: '#fafafa', dark: '#e0e0e0' },
};

export type Theme = typeof theme;
export type ThemeKeys = keyof Theme;

type regularSection = typeof theme.primary;
type trafficSection = typeof theme.traffic;

export type ThemeSection = regularSection | trafficSection;
export type ThemeSectionKeys = keyof regularSection | keyof trafficSection;

const isObjectType = <T>(test: T, target: Theme | ThemeSection) =>
  Object.keys(test)
    .reduce((boolArray, curr) => {
      boolArray.push(target.hasOwnProperty(curr));
      return boolArray;
    }, [] as boolean[])
    .filter((x) => !x).length === 0;

export const isThemeSection = (
  obj: Theme | ThemeSection
): obj is ThemeSection =>
  isObjectType<regularSection>(theme.primary, obj) ||
  isObjectType<trafficSection>(theme.traffic, obj);

export const isTheme = (obj: Theme | ThemeSection): obj is Theme =>
  isObjectType<Theme>(theme, obj);
