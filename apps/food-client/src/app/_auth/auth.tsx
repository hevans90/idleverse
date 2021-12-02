import { useAuth0 } from '@auth0/auth0-react';
import { Box, Image, Text } from '@chakra-ui/react';
import { LoginButton } from './login-button';
import { LogoutButton } from './logout-button';

export const Auth = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated && user) {
    return (
      <Box display="flex" alignItems="center">
        <Image
          borderRadius="full"
          boxSize="40px"
          src={user.picture}
          alt={user.nickname}
          marginRight="1rem"
        />

        <Text marginRight="1rem">{user.name}</Text>

        <LogoutButton></LogoutButton>
      </Box>
    );
  } else {
    return <LoginButton></LoginButton>;
  }
};
