import { useReactiveVar } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Badge, Box, Text } from '@chakra-ui/react';
import { Loading } from '../components/loading';
import { roleVar } from '../_state/reactive-variables';
import { LoginButton } from './login-button';
import { LogoutButton } from './logout-button';

export const Auth = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const role = useReactiveVar(roleVar);

  if (isLoading) {
    return <Loading fontSize="md"></Loading>;
  }

  if (isAuthenticated && user) {
    return (
      <Box display="flex" alignItems="center">
        <Avatar size="sm" src={user.picture} mr={2} name={user.name} />

        <Text marginRight="1rem" display={['none', 'none', 'block']}>
          {user.name}
        </Text>
        {role === 'dev' && <Badge mr={3}>dev</Badge>}

        <LogoutButton></LogoutButton>
      </Box>
    );
  } else {
    return <LoginButton></LoginButton>;
  }
};
