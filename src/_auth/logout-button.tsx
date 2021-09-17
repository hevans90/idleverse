import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react';
import { redirectUri } from '../index';

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      colorScheme="gray"
      onClick={() => logout({ returnTo: redirectUri })}
    >
      Log Out
    </Button>
  );
};
