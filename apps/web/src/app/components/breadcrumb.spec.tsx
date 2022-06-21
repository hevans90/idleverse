/* eslint-disable react/jsx-no-useless-fragment */
import { renderWithChakra } from '../_test-utils/render-with-chakra';
import { Breadcrumb } from './breadcrumb';

import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

describe('breadcrumb', () => {
  it('should render', () => {
    const history = createMemoryHistory();
    history.push('/one/two/three');

    const { container } = renderWithChakra(
      <Router location={history.location} navigator={history}>
        <Breadcrumb />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });
});
