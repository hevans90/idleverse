import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Box, Image, Text } from '@chakra-ui/react';
import { Loading } from '../components/loading';
import { LoginButton } from './login-button';
import { LogoutButton } from './logout-button';

export const Auth = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading fontSize="md"></Loading>;
  }

  if (isAuthenticated && user) {
    return (
      <Box display="flex" alignItems="center">
        <Avatar size="sm" src={user.picture} mr={2} name={user.name} />

        <Text marginRight="1rem">{user.name}</Text>

        <LogoutButton></LogoutButton>
      </Box>
    );
  } else {
    return <LoginButton></LoginButton>;
  }
};
