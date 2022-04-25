import { colors } from '../theme';
import { themeToPal } from './theme-to-pal';

jest.mock('fs');
describe('themToPal', () => {
  it('should generate properly', () => {
    expect(themeToPal(colors)).toMatchSnapshot();
  });
});
