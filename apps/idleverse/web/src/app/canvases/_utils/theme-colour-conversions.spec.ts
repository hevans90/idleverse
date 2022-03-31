import { themeColToRGB } from './theme-colour-conversions';

describe('themeColToRGB', () => {
  it('should successfully convert some preset hex values', () => {
    expect(themeColToRGB('#F4F1F2')).toEqual({
      r: 244,
      g: 241,
      b: 242,
    });

    expect(themeColToRGB('#4E1818')).toEqual({
      r: 78,
      g: 24,
      b: 24,
    });
  });
});
