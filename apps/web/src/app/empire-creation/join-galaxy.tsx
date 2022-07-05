import { useQuery } from '@apollo/client';
import { Box, Text, VStack } from '@chakra-ui/react';
import { GalaxyByIdDocument, GalaxyByIdQuery } from '@idleverse/galaxy-gql';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GalaxyThumbnail } from '../canvases/galaxy-thumbnail/galaxy-thumbnail';
import { dbGalaxyToGalaxyConfig } from '../canvases/_utils/db-galaxy-to-galaxy-config';
import { Loading } from '../components/loading';
import { galaxyConfigVar } from '../_state/reactive-variables';
import { creationStep } from './creation-types';
import { CreationWorkflow } from './creation-workflow';
import { PixelateSVGFilter } from './pixelate-svg-filter';

export const JoinGalaxy = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading } = useQuery<GalaxyByIdQuery>(GalaxyByIdDocument, {
    variables: { id },
  });

  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      galaxyConfigVar(dbGalaxyToGalaxyConfig(data.galaxy_by_pk));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (loading) {
    return (
      <Loading width="100%" height="100%" text="Loading Galaxy info"></Loading>
    );
  }

  return (
    <>
      <VStack
        height="100%"
        justify="center"
        spacing={5}
        filter={'url(#pixelate)'}
      >
        <Text textAlign="center">It's time to begin your journey in:</Text>
        <Text textAlign="center" fontWeight="bold" color="teal.500">
          {data.galaxy_by_pk.name}
        </Text>

        <Box>
          <GalaxyThumbnail
            galaxyConfig={dbGalaxyToGalaxyConfig(data.galaxy_by_pk)}
          />
        </Box>

        <CreationWorkflow
          onStepClicked={(creationStep) => {
            const stepFunctions: {
              [key in creationStep]: () => void;
            } = {
              race: () => undefined,
              background: () => undefined,
              faction: () => undefined,
              homeworld: () => undefined,
              start: () => setReady(true),
            };

            stepFunctions[creationStep]();
          }}
          padding={[3, 4, 5]}
        />
      </VStack>

      {ready && (
        <PixelateSVGFilter
          reversed={false}
          minDistortion={0.1}
          maxDistortion={20}
        />
      )}
    </>
  );
};
