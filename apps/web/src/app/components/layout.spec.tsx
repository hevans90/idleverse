import { ToolBar } from '../global-ui/toolbar/toolbar';
import { renderWithChakra } from '../_test-utils/render-with-chakra';
import { ResponsiveGrid } from './layout';

jest.mock('../global-ui/toolbar/toolbar', () => ({
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
