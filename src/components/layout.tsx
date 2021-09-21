import styled from "styled-components";
import { Footer } from "../containers/footer/footer";
import { SideNav } from "../containers/sidenav/sidenav";
import { ToolBar } from "../containers/toolbar/toolbar";

export const sideNavWidth = 450;
export const topBarHeight = 50;
export const footerHeight = 200;

const ResponsiveGrid = styled.div`
  height: 100vh;

  display: grid;

  grid-template-columns: ${sideNavWidth}px auto;
  grid-template-rows: ${topBarHeight}px auto ${footerHeight}px;

  grid-template-areas:
    "side-nav   toolbar"
    "side-nav   main"
    "side-nav   footer";

  div.toolbar {
    grid-area: toolbar;
  }

  div.sidenav {
    grid-area: side-nav;
  }

  main {
    grid-area: main;
  }

  div.footer {
    grid-area: footer;
  }
`;

export const Layout = (props: {
  children: JSX.Element;
  curvature: number;
  setCurvature: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <ResponsiveGrid>
      <SideNav></SideNav>
      <ToolBar></ToolBar>
      <main>{props.children}</main>
      <Footer
        curvature={props.curvature}
        setCurvature={props.setCurvature}
      ></Footer>
    </ResponsiveGrid>
  );
};
