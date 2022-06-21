import { ToolBar } from '../containers/toolbar/toolbar';
import { renderWithChakra } from '../_test-utils/render-with-chakra';
import { ResponsiveGrid } from './layout';

jest.mock('../containers/toolbar/toolbar', () => ({
  ToolBar: () => <div className="toolbar"></div>,
}));

describe('layout', () => {
  it('should render', () => {
    const { baseElement } = renderWithChakra(
      <ResponsiveGrid sideNav={false} toolBar={false}>
        <ToolBar></ToolBar>
      </ResponsiveGrid>
    );
    expect(baseElement).toMatchSnapshot();
  });
});
