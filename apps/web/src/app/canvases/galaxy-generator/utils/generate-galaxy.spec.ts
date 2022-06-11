import { generateCelestials } from '@idleverse/galaxy-gen';

describe('generateCelestials', () => {
  it('should generate the same galaxy from a given seed', () => {
    const stars = generateCelestials(50, 'abc');
    const stars2 = generateCelestials(50, 'abc');
    expect(stars).toEqual(stars2);
  });
});
