import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react';

import { responsiveFontProps } from '../_responsive-utils/font-props';

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      colorScheme="gray"
      onClick={() => logout({ returnTo: window.location.origin })}
      {...responsiveFontProps}
    >
      Log Out
    </Button>
  );
};
