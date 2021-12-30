import { renderWithChakra } from '../_test-utils/render-with-chakra';
import { Loading } from './loading';

describe('loading', () => {
  it('should render', () => {
    const { container } = renderWithChakra(<Loading></Loading>);
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('should render custom text', () => {
    const { container } = renderWithChakra(
      <Loading text="Loading memes"></Loading>
    );
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('should render custom text and size', () => {
    const { container } = renderWithChakra(
      <Loading width="50%" height="100%" text="Loading memes"></Loading>
    );
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
