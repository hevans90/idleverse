import { useQuery, useSubscription } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import {
  GalaxyByIdDocument,
  GalaxyByIdQuery,
  GetCelestialsByGalaxyIdDocument,
  GetCelestialsByGalaxyIdSubscription,
  GetCelestialsByGalaxyIdSubscriptionVariables,
} from '@idleverse/graphql';
import { Stage } from '@inlet/react-pixi';
import { useParams } from 'react-router-dom';
import { Back } from '../../components/back';
import { Loading } from '../../components/loading';
import { useResize } from '../common-utils/use-resize.hook';
import { dbGalaxyToGalaxyConfig } from '../common-utils/db-galaxy-to-galaxy-config';
import { GalaxyThumbnail } from './galaxy-thumbnail';

export const GalaxyThumbnailContainer = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading } = useQuery<GalaxyByIdQuery>(GalaxyByIdDocument, {
    variables: { id },
  });

  const { data: celestialData, loading: celestialLoading } = useSubscription<
    GetCelestialsByGalaxyIdSubscription,
    GetCelestialsByGalaxyIdSubscriptionVariables
  >(GetCelestialsByGalaxyIdDocument, {
    variables: { galaxyId: id },
  });

  const size = useResize();

  if (loading && celestialLoading) {
    return <Loading text="Loading Galaxy"></Loading>;
  } else if (data && celestialData) {
    return (
      <Box position="relative">
        <Stage
          {...size}
          options={{
            backgroundColor: 0x2d3239,
            antialias: true,
          }}
        >
          <GalaxyThumbnail
            galaxyConfig={dbGalaxyToGalaxyConfig(data.galaxy_by_pk)}
            thumbnailNumber={1}
          />
        </Stage>
        <Back />
      </Box>
    );
  } else {
    return (
      <Box h="100%" display="flex" alignItems="center" justifyContent="center">
        Something went wrong. There is no galaxy.
      </Box>
    );
  }
};
