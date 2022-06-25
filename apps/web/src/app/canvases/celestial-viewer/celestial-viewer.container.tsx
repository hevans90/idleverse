import { useQuery } from '@apollo/client';
import { Box, Theme, useTheme } from '@chakra-ui/react';
import {
  CelestialByIdDocument,
  CelestialByIdQuery,
} from '@idleverse/galaxy-gql';
import { hexStringToNumber } from '@idleverse/theme';
import { Stage } from '@inlet/react-pixi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadPlanets } from '../../asset-loading/load-planets';
import { Loading } from '../../components/loading';
import { celestialVar } from '../../_state/reactive-variables';
import { GameUIBottomBar } from '../galaxy-generator/ui/bottom-bar';
import { useResize } from '../_utils/use-resize.hook';
import { CelestialViewer } from './celestial-viewer';

export const CelestialViewerContainer = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading } = useQuery<CelestialByIdQuery>(
    CelestialByIdDocument,
    {
      variables: { id },
    }
  );

  const [celestialSpritesLoading, setCelestialSpritesLoading] = useState(true);

  const size = useResize();
  const { colors } = useTheme<Theme>();

  useEffect(() => {
    loadPlanets().then(() => setCelestialSpritesLoading(false));
  }, []);

  useEffect(() => {
    if (data) {
      celestialVar(data.celestial_by_pk);
    }
  }, [data]);

  if (loading) {
    return (
      <Loading
        width="100%"
        height="100%"
        text="Loading Celestial data"
      ></Loading>
    );
  }
  if (celestialSpritesLoading) {
    return (
      <Loading width="100%" height="100%" text="Loading sprites"></Loading>
    );
  } else if (data.celestial_by_pk) {
    return (
      <>
        <Stage
          {...size}
          options={{
            backgroundColor: hexStringToNumber(colors.gray['800']),
            antialias: true,
          }}
        >
          <CelestialViewer celestial={data.celestial_by_pk} />
        </Stage>

        <GameUIBottomBar bottom={0} />
      </>
    );
  } else {
    return (
      <Box h="100%" display="flex" alignItems="center" justifyContent="center">
        Something went wrong. There is no celestial.
      </Box>
    );
  }
};
