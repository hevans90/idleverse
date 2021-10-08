import { ApolloError, useReactiveVar } from '@apollo/client';
import {
  Box,
  Button,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Loading } from '../../../components/loading';
import { Thumbnail } from '../../../components/thumbnail';
import { selfVar } from '../../../_state/reactive-variables';
import { CelestialOwner } from '../celestial-owner';

type PlayerPanelProps = {
  owners: CelestialOwner[];
  loading: boolean;
  error?: ApolloError;
  claimCelestialFunction: () => unknown;
  claimPending: boolean;
};

export const PlayerPanel = ({
  owners,
  loading,
  error,
  claimCelestialFunction,
  claimPending,
}: PlayerPanelProps) => {
  const bg = useColorModeValue('gray.300', 'gray.700');
  const border = useColorModeValue('gray.200', 'gray.600');

  const { free_claims } = useReactiveVar(selfVar);

  if (loading) {
    return <Loading text="Loading players..."></Loading>;
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
      <Button
        width="100%"
        marginTop="1rem"
        marginBottom="1rem"
        colorScheme="teal"
        onClick={() => claimCelestialFunction()}
        disabled={free_claims === 0 || claimPending}
      >
        {claimPending ? <Spinner color="teal.500" /> : `Claim (${free_claims})`}
      </Button>
      {owners.map(({ display_name, avatar_url, ownedCount }) => (
        <Box
          key={display_name}
          d="flex"
          alignItems="center"
          mb="1rem"
          width="100%"
          _last={{ marginBottom: 'unset' }}
        >
          <Thumbnail avatar_url={avatar_url} alt={display_name} />
          <Text mr="1rem" flexGrow={1}>
            {display_name}
          </Text>
          <Text>{ownedCount}</Text>
        </Box>
      ))}
    </Box>
  );
};
