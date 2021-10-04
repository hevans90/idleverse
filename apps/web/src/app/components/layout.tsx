import { Box } from '@chakra-ui/layout';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { SideNav } from '../containers/sidenav/sidenav';
import { ToolBar } from '../containers/toolbar/toolbar';
import { Back } from './back';

export const sideNavWidth = 450;
export const topBarHeight = 50;

const ResponsiveGrid = styled.div`
  height: 100vh;

  display: grid;

  grid-template-columns: ${sideNavWidth}px auto;
  grid-template-rows: ${topBarHeight}px auto;

  grid-template-areas:
    'side-nav   toolbar'
    'side-nav   main';

  div.toolbar {
    grid-area: toolbar;
  }

  div.sidenav {
    grid-area: side-nav;
  }

  main {
    grid-area: main;
    position: relative;

    .container {
      height: calc(100vh - ${topBarHeight}px);
    }
  }

  div.footer {
    grid-area: footer;
  }
`;

export const Layout = (props: { children: JSX.Element }) => {
  const { pathname } = useLocation();

  return (
    <ResponsiveGrid>
      <SideNav></SideNav>
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
