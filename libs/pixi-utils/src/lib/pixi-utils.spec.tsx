import { render } from '@testing-library/react';

import PixiUtils from './pixi-utils';

describe('PixiUtils', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PixiUtils />);
    expect(baseElement).toBeTruthy();
  });
});
