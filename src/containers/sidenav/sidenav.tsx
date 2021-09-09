import styled from 'styled-components';

const Nav = ({ className }: any) => {
  return (
    <nav className={className}>
      <h1>Sidebarchamp</h1>
    </nav>
  );
};

export const SideNav = styled(Nav)`
  grid-area: side-nav;
  background: ${(props) => props.theme.theme.primary.default};
  color: ${(props) => props.theme.contrast.primary.default};
`;
