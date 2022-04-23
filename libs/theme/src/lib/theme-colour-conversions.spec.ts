import { hexToRGB } from './theme-colour-conversions';

describe('hexToRGB', () => {
  it('should successfully convert some preset hex values', () => {
    expect(hexToRGB('#F4F1F2')).toEqual({
      r: 244,
      g: 241,
      b: 242,
    });

    expect(hexToRGB('#4E1818')).toEqual({
      r: 78,
      g: 24,
      b: 24,
    });
  });
});
