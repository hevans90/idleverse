import { useQuery } from '@apollo/client';
import { Box, Theme, useTheme, VStack } from '@chakra-ui/react';
import {
  CelestialByIdDocument,
  CelestialByIdQuery,
} from '@idleverse/galaxy-gql';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { celestialVar } from '../../_state/reactive-variables';
import { useResize } from '../common-utils/use-resize.hook';

export const CelestialViewerContainer = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading } = useQuery<CelestialByIdQuery>(
    CelestialByIdDocument,
    {
      variables: { id },
    }
  );

  const size = useResize();
  const { colors } = useTheme<Theme>();

  useEffect(() => {
    if (data) {
      console.log(data);
      celestialVar(data.celestial_by_pk);
    }
  }, [data]);

  if (loading) {
    return (
      <Loading width="100%" height="100%" text="Loading Celestial"></Loading>
    );
  } else if (data.celestial_by_pk) {
    return (
      <Box h="100%" display="flex" alignItems="center" justifyContent="center">
        <VStack>
          <Box>{data.celestial_by_pk.user_info.display_name}</Box>
          <Box>{data.celestial_by_pk.name}</Box>
        </VStack>
        {/* <Box position="relative">
          <Stage
            {...size}
            options={{
              backgroundColor: themeColToHex(colors.gray['800']),
              antialias: true,
            }}
          >
            <CelstialViewer celestial={data.celestial_by_pk} />
          </Stage>

          <GameUIBottomBar bottom={0} />
        </Box> */}
      </Box>
    );
  } else {
    return (
      <Box h="100%" display="flex" alignItems="center" justifyContent="center">
        Something went wrong. There is no celestial.
      </Box>
    );
  }
};
