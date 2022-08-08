import { ApolloError } from '@apollo/client';
import { Avatar, Box, Text } from '@chakra-ui/react';
import { Loading } from '../../../components/loading';
import { useUiBackground } from '../../../hooks/use-ui-background';
import { CelestialOwner } from '../celestial-owner';

type PlayerPanelProps = {
  owners: CelestialOwner[];
  loading: boolean;
  error?: ApolloError;
};

export const PlayerPanel = ({ owners, loading, error }: PlayerPanelProps) => {
  const { bg, border } = useUiBackground();

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
    </Box>
  );
};
