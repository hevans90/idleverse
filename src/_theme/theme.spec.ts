import { isTheme, isThemeSection, theme, ThemeSection } from './theme';

const regularSection: ThemeSection = { light: '', dark: '', default: '' };
const trafficSection: ThemeSection = { red: '', orange: '', green: '' };

describe('isThemeSection', () => {
  it('should return true for sections', () => {
    expect(isThemeSection(regularSection)).toEqual(true);
    expect(isThemeSection(trafficSection)).toEqual(true);
  });

  it('should return false for a theme', () =>
    expect(isThemeSection(theme)).toEqual(false));
});

describe('isTheme', () => {
  it('should return true for a base theme', () =>
    expect(isTheme(theme)).toEqual(true));

  it('should return false otherwise', () => {
    expect(isTheme(regularSection)).toEqual(false);
    expect(isTheme(trafficSection)).toEqual(false);
  });
});
