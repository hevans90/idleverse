import { useQuery, useSubscription } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import { dbGalaxyToGalaxyConfig } from '@idleverse/galaxy-gen';
import {
  CelestialsByGalaxyIdDocument,
  CelestialsByGalaxyIdSubscription,
  CelestialsByGalaxyIdSubscriptionVariables,
  GalaxyByIdDocument,
  GalaxyByIdQuery,
} from '@idleverse/galaxy-gql';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { galaxyConfigVar } from '../../_state/reactive-variables';
import { GameUIBottomBar } from '../galaxy-generator/ui/bottom-bar';
import { PixiWrapper } from '../_utils/pixi-wrapper';

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

  useEffect(() => {
    if (data) {
      galaxyConfigVar(dbGalaxyToGalaxyConfig(data.galaxy_by_pk));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (loading || celestialLoading) {
    return <Loading width="100%" height="100%" text="Loading Galaxy"></Loading>;
  } else if (data && celestialData) {
    return (
      <PixiWrapper
        ui={
          <>
            <PlayerPanel
              owners={celestialOwnerMapper(celestialData)}
              loading={celestialLoading}
              error={celestialError}
            ></PlayerPanel>
            <GameUIBottomBar bottom={0} />
          </>
        }
      >
        <GalaxyViewer
          claimedCelestials={celestialData.galaxy_by_pk.celestials}
          galaxyConfig={dbGalaxyToGalaxyConfig(data.galaxy_by_pk)}
          navigate={navigate}
        />
      </PixiWrapper>
    );
  } else {
    return (
      <Box h="100%" display="flex" alignItems="center" justifyContent="center">
        Something went wrong. There is no galaxy.
      </Box>
    );
  }
};
