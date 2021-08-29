import styled from 'styled-components';
import { SideNav } from '../containers/sidenav/sidenav';
import { ToolBar } from '../containers/toolbar/toolbar';

const ResponsiveGrid = styled.div`
  background: rgba(255, 0, 0, 0.1);

  height: 100vh;

  display: grid;

  grid-template-columns: 300px auto;
  grid-template-rows: 50px auto 200px;

  grid-template-areas:
    'side-nav   toolbar'
    'side-nav   main'
    'side-nav   footer';

  div.toolbar {
    grid-area: toolbar;
    background: rgba(255, 0, 100, 0.1);
  }

  main {
    grid-area: main;
  }

  footer {
    grid-area: footer;
    background: rgba(255, 100, 100, 0.1);
  }
`;

export const Layout = () => {
  return (
    <ResponsiveGrid>
      <SideNav></SideNav>
      <ToolBar></ToolBar>
    </ResponsiveGrid>
  );
};
