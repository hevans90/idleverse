import { useQuery } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import { GalaxyByIdDocument, GalaxyByIdQuery } from '@idleverse/graphql';
import { Stage } from '@inlet/react-pixi';
import { useParams } from 'react-router-dom';
import { Back } from '../../components/back';
import { Loading } from '../../components/loading';
import { useResize } from '../common-utils/use-resize.hook';
import { dbGalaxyToGalaxyConfig } from './db-galaxy-to-galaxy-config';
import { GalaxyViewer } from './galaxy-viewer';

export const GalaxyViewerContainer = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading } = useQuery<GalaxyByIdQuery>(GalaxyByIdDocument, {
    variables: { id },
  });

  const size = useResize();

  if (loading) {
    return <Loading text="Loading Galaxy"></Loading>;
  } else if (data) {
    return (
      <Box position="relative">
        <Stage
          {...size}
          options={{
            backgroundColor: 0x2d3239,
            antialias: true,
          }}
        >
          <GalaxyViewer
            galaxyConfig={dbGalaxyToGalaxyConfig(data.galaxy_by_pk)}
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
