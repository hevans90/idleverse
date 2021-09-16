import styled from 'styled-components';
import { Auth } from '../../_auth/auth';

const Nav = ({ className }: any) => {
  return (
    <nav className={className}>
      <Auth></Auth>
    </nav>
  );
};

export const SideNav = styled(Nav)`
  grid-area: side-nav;
`;
/* background: ${(props) => props.theme.theme.primary.default};
  color: ${(props) => props.theme.contrast.primary.default}; */
