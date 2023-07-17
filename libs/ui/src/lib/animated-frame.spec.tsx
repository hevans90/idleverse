import { render } from '@testing-library/react';
import { AnimatedFrame } from './animated-frame';

describe('Ui', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AnimatedFrame />);
    expect(baseElement).toBeTruthy();
  });
});
