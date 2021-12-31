/* eslint-disable react/jsx-no-useless-fragment */
import { MemoryRouter } from 'react-router-dom';
import { renderWithChakra } from '../_test-utils/render-with-chakra';
import { Breadcrumb } from './breadcrumb';

jest.mock('@apollo/client', () => ({
  makeVar: jest.fn(() => null),

  useReactiveVar: () => [
    {
      name: 'nice',
      path: '/nice',
      component: () => <></>,
    },
    {
      name: 'one',
      path: '/one',
      component: () => <></>,
    },
  ],
}));

describe('breadcrumb', () => {
  it('should render', () => {
    const { container } = renderWithChakra(
      <MemoryRouter>
        <Breadcrumb />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
