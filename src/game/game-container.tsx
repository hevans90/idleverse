import { useSubscription } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import {
  IdleGameCountersRealTimeDescDocument,
  IdleGameCountersRealTimeDescSubscription,
} from '../_graphql/api';
import { Game } from './game';

export const GameContainer = () => {
  const { data, loading } =
    useSubscription<IdleGameCountersRealTimeDescSubscription>(
      IdleGameCountersRealTimeDescDocument
    );

  if (loading) {
    return (
      <Box h="100%" display="flex" alignItems="center" justifyContent="center">
        loading universe...
      </Box>
    );
  } else if (data) {
    return <Game data={data}></Game>;
  } else {
    return (
      <Box h="100%" display="flex" alignItems="center" justifyContent="center">
        Something went wrong. There is no universe.
      </Box>
    );
  }
};
