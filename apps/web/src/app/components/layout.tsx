import { useReactiveVar } from '@apollo/client';
import { Box } from '@chakra-ui/layout';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { SideNav } from '../containers/sidenav/sidenav';
import { ToolBar } from '../containers/toolbar/toolbar';
import { LayoutConfig } from '../_state/models';
import { layoutVar } from '../_state/persisted-reactive-variables';
import { Back } from './back';

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
         'side-nav   main   '`
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

export const Layout = (props: { children: JSX.Element }) => {
  const { pathname } = useLocation();

  const layoutConfig = useReactiveVar(layoutVar);

  return (
    <ResponsiveGrid {...layoutConfig}>
      {layoutConfig.sideNav ? <SideNav></SideNav> : null}
      <ToolBar></ToolBar>
      <main>
        {pathname === '/' ? null : <Back></Back>}
        <Box className="container" overflow="auto">
          {props.children}
        </Box>
      </main>
    </ResponsiveGrid>
  );
};
