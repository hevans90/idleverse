import { ApolloError } from '@apollo/client';
import { Avatar, Box, Button, Link, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useUiBackground } from '../../../../../../../libs/theme/src/lib/use-ui-background';
import { responsiveFontProps } from '../../../_responsive-utils/font-props';
import { Loading } from '../../../components/loading';
import { CelestialOwner } from '../celestial-owner';

type PlayerPanelProps = {
  owners: CelestialOwner[];
  loading: boolean;
  error?: ApolloError;
  galaxyId: string;
  userId: string;
};

export const PlayerPanel = ({
  owners,
  loading,
  error,
  galaxyId,
  userId,
}: PlayerPanelProps) => {
  const { bg, border } = useUiBackground();

  const [userHasEmpire, setUserHasEmpire] = useState<boolean>();

  useEffect(() => {
    setUserHasEmpire(!!owners.find(({ id }) => id === userId));
  }, [owners, userId]);

  if (loading) {
    return <Loading text="Loading players"></Loading>;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <Box
      padding="1rem"
      display="flex"
      flexDirection="column"
      position="absolute"
      alignItems="start"
      bgColor={bg}
      top="25%"
      right="0"
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      borderRight="unset"
    >
      {owners.map(({ display_name, avatar_url, ownedCount }) => (
        <Box
          key={display_name}
          display="flex"
          alignItems="center"
          mb="1rem"
          width="100%"
          _last={{ marginBottom: 'unset' }}
        >
          <Avatar size="md" src={avatar_url} mr={2} name={display_name} />
          <Text mr="1rem" flexGrow={1}>
            {display_name}
          </Text>
          <Text>{ownedCount}</Text>
        </Box>
      ))}
      {!owners.length && <Text>No celestials owned</Text>}

      {(!owners.length || !userHasEmpire) && (
        <Link
          as={ReactRouterLink}
          to={`/galaxies/${galaxyId}/join`}
          width="100%"
          mt={3}
        >
          <Button {...responsiveFontProps} width="100%">
            Join
          </Button>
        </Link>
      )}
    </Box>
  );
};
