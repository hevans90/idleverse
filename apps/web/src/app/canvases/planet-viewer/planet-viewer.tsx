import { useQuery, useReactiveVar } from '@apollo/client';
import { Box, Flex } from '@chakra-ui/react';
import {
  PlanetByNameDocument,
  PlanetByNameQuery,
  PlanetByNameQueryVariables,
} from '@idleverse/galaxy-gql';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Loading } from '../../components/loading';

import { galacticEmpireVar, myEmpireVar, planetVar } from '@idleverse/state';

import { GameUI } from '../../game-ui/game-ui';
import { useEmpire } from '../../hooks/use-my-empire';
import { Planet } from '../_rendering/planet';
import { useResize } from '../_utils/use-resize.hook';
import { PlanetActions } from './ui/planet-actions';
import { PlanetUI } from './ui/planet-ui';

export const PlanetViewer = () => {
  const { name } = useParams<{ name: string }>();

  const myEmpire = useReactiveVar(myEmpireVar);
  const galacticEmpire = useReactiveVar(galacticEmpireVar);

  const { data, loading } = useQuery<
    PlanetByNameQuery,
    PlanetByNameQueryVariables
  >(PlanetByNameDocument, {
    variables: { name },
  });

  const { width, height } = useResize();

  useEffect(() => {
    if (!loading && data?.planet?.[0]) {
      planetVar(data.planet?.[0]);
    }
  }, [loading, data]);

  useEmpire(data?.planet?.[0]?.celestial?.galactic_empire);

  if (loading) {
    return (
      <Loading width="100%" height="100%" text="Loading Planet data"></Loading>
    );
  }

  if (data?.planet[0]) {
    return (
      <Box position="relative" width={width} height={height}>
        <Flex height="100%" flexDir="column">
          <Planet data={data.planet?.[0]} />
          {myEmpire && (
            <>
              <PlanetUI />
              <GameUI empireId={galacticEmpire?.id} />
            </>
          )}
          <PlanetActions active={true} />
        </Flex>
      </Box>
    );
  } else {
    return (
      <Box h="100%" display="flex" alignItems="center" justifyContent="center">
        Something went wrong. There is no planet here.
      </Box>
    );
  }
};
