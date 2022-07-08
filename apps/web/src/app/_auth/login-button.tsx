import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react';
import { responsiveFontProps } from '../_responsive-utils/font-props';

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button onClick={() => loginWithRedirect()} {...responsiveFontProps}>
      Log In
    </Button>
  );
};
