import { useQuery, useSubscription } from '@apollo/client';
import { Box, Theme, useTheme } from '@chakra-ui/react';
import {
  CelestialsByGalaxyIdDocument,
  CelestialsByGalaxyIdSubscription,
  CelestialsByGalaxyIdSubscriptionVariables,
  GalaxyByIdDocument,
  GalaxyByIdQuery,
} from '@idleverse/galaxy-gql';
import { hexStringToNumber } from '@idleverse/theme';
import { Stage } from '@inlet/react-pixi';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { galaxyConfigVar } from '../../_state/reactive-variables';
import { GameUIBottomBar } from '../galaxy-generator/ui/bottom-bar';
import { dbGalaxyToGalaxyConfig } from '../_utils/db-galaxy-to-galaxy-config';

import { useResize } from '../_utils/use-resize.hook';
import { celestialOwnerMapper } from './celestial-owner';
import { GalaxyViewer } from './galaxy-viewer';
import { PlayerPanel } from './ui/player-panel';

export const GalaxyViewerContainer = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading } = useQuery<GalaxyByIdQuery>(GalaxyByIdDocument, {
    variables: { id },
  });

  const navigate = useNavigate();

  const {
    data: celestialData,
    loading: celestialLoading,
    error: celestialError,
  } = useSubscription<
    CelestialsByGalaxyIdSubscription,
    CelestialsByGalaxyIdSubscriptionVariables
  >(CelestialsByGalaxyIdDocument, {
    variables: { id },
  });

  const { colors } = useTheme<Theme>();

  useEffect(() => {
    if (data) {
      galaxyConfigVar(dbGalaxyToGalaxyConfig(data.galaxy_by_pk));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const size = useResize();

  if (loading || celestialLoading) {
    return <Loading width="100%" height="100%" text="Loading Galaxy"></Loading>;
  } else if (data && celestialData) {
    return (
      <Box position="relative">
        <Stage
          {...size}
          options={{
            backgroundColor: hexStringToNumber(colors.gray['800']),
            antialias: true,
          }}
        >
          <GalaxyViewer
            claimedCelestials={celestialData.galaxy_by_pk.celestials}
            galaxyConfig={dbGalaxyToGalaxyConfig(data.galaxy_by_pk)}
            navigate={navigate}
          />
        </Stage>
        <PlayerPanel
          owners={celestialOwnerMapper(celestialData)}
          loading={celestialLoading}
          error={celestialError}
        ></PlayerPanel>
        <GameUIBottomBar bottom={0} />
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
