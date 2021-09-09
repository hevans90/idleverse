import { contrastCalculator } from './contrast-calculator';

describe('contrastCalculator', () => {
  it('should return the correct contrast color', () => {
    expect(contrastCalculator('#7cb342')).toEqual('white');
    expect(contrastCalculator('#ff8f00')).toEqual('white');
    expect(contrastCalculator('#c62828')).toEqual('white');
    expect(contrastCalculator('#f5f5f5')).toEqual('black');
  });
});
