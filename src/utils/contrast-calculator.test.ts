import { contrastCalculator } from './contrast-calculator';

describe('contrastCalculator', () => {
  it('should return the correct contrast color', () => {
    expect(contrastCalculator('red')).toEqual('black');
    expect(contrastCalculator('blue')).toEqual('white');
    expect(contrastCalculator('white')).toEqual('black');
    expect(contrastCalculator('black')).toEqual('white');
  });
});
