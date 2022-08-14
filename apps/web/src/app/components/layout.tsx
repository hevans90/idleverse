import { useReactiveVar } from '@apollo/client';
import { Box } from '@chakra-ui/layout';
import styled from 'styled-components';
import { SideNav } from '../global-ui/sidenav/sidenav';
import { ToolBar } from '../global-ui/toolbar/toolbar';
import { useUiBackground } from '../hooks/use-ui-background';
import { layoutVar } from '../_state/global-settings';
import { LayoutConfig } from '../_state/models';
import { Breadcrumb } from './breadcrumb';

export const sideNavWidth = 450;
export const topBarHeight = 50;

export const ResponsiveGrid = styled.div`
  height: 100vh;

  display: grid;

  grid-template-columns: ${({ sideNav }: LayoutConfig) =>
    sideNav ? `${sideNavWidth}px auto` : `auto`};

  grid-template-rows: ${topBarHeight}px auto;

  grid-template-areas: ${({ sideNav }: LayoutConfig) =>
    sideNav
      ? `'side-nav   toolbar'
         'side-nav   main   '
         `
      : `'toolbar'
        ' main   '`};

  div.sidenav {
    grid-area: side-nav;
  }
  div.toolbar {
    grid-area: toolbar;
  }

  main {
    grid-area: main;
    position: relative;

    .container {
      height: calc(100vh - ${topBarHeight}px);
    }
  }
`;

export const Layout = (props: { children?: JSX.Element }) => {
  const layoutConfig = useReactiveVar(layoutVar);

  const { bgDark } = useUiBackground();

  return (
    <ResponsiveGrid {...layoutConfig}>
      {layoutConfig.sideNav ? <SideNav></SideNav> : null}
      <ToolBar></ToolBar>
      <main>
        <Breadcrumb />
        <Box className="container" overflow="auto" bg={bgDark}>
          {props?.children}
        </Box>
      </main>
    </ResponsiveGrid>
  );
};
