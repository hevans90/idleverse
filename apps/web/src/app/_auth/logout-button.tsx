import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react';

import { responsiveFontProps } from '../_responsive-utils/font-props';

export const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Button colorScheme="gray" onClick={handleLogout} {...responsiveFontProps}>
      Log Out
    </Button>
  );
};
