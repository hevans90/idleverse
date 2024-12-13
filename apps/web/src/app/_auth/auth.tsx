import { useReactiveVar } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Badge, Box, HStack, Text } from '@chakra-ui/react';

import { roleVar } from '@idleverse/state';
import { BlinkingText } from '@idleverse/ui';
import { responsiveFontProps } from '../_responsive-utils/font-props';
import { LoginButton } from './login-button';
import { LogoutButton } from './logout-button';

export const Auth = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const role = useReactiveVar(roleVar);

  if (isLoading) {
    return (
      <HStack>
        <Text>loading</Text>{' '}
        <BlinkingText {...responsiveFontProps}>.</BlinkingText>
      </HStack>
    );
  }

  if (isAuthenticated && user) {
    return (
      <Box display="flex" alignItems="center">
        <Avatar
          size="sm"
          src={user.picture}
          mr={2}
          name={user.name}
          display={['none', 'none', 'flex']}
        />

        <Text mr={3} display={['none', 'none', 'block']}>
          {user.name}
        </Text>
        {role === 'dev' && (
          <Badge mr={3} display={['none', 'none', 'block']}>
            dev
          </Badge>
        )}

        <LogoutButton></LogoutButton>
      </Box>
    );
  } else {
    return <LoginButton></LoginButton>;
  }
};
