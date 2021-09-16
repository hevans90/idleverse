import styled from 'styled-components';
import { SideNav } from '../containers/sidenav/sidenav';
import { ToolBar } from '../containers/toolbar/toolbar';

const ResponsiveGrid = styled.div`
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
  }

  main {
    grid-area: main;
    padding: 2rem;
  }

  footer {
    grid-area: footer;
  }
`;

export const Layout = (props: { children: JSX.Element }) => {
  return (
    <ResponsiveGrid>
      <SideNav></SideNav>
      <ToolBar></ToolBar>
      <main>{props.children}</main>
      <footer>nice</footer>
    </ResponsiveGrid>
  );
};
