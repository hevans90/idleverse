import { useLazyQuery, useReactiveVar, useSubscription } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import { dbGalaxyToGalaxyConfig } from '@idleverse/galaxy-gen';
import {
  CelestialsByGalaxyIdDocument,
  CelestialsByGalaxyIdSubscription,
  CelestialsByGalaxyIdSubscriptionVariables,
  GalaxyByNameSubDocument,
  GalaxyByNameSubSubscription,
  GalaxyByNameSubSubscriptionVariables,
  UserInfoByIdDocument,
  UserInfoByIdQuery,
} from '@idleverse/galaxy-gql';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Loading } from '../../components/loading';
import { PixiWrapper } from '../_utils/pixi-wrapper';
import { GameUIBottomBar } from '../galaxy-generator/ui/bottom-bar';

import {
  galacticEmpireVar,
  galaxyConfigVar,
  myEmpireVar,
  selfVar,
} from '@idleverse/state';
import { celestialOwnerMapper } from './celestial-owner';
import { GalaxyViewer } from './galaxy-viewer';
import { PlayerPanel } from './ui/player-panel';

export const GalaxyViewerContainer = () => {
  const { name } = useParams<{ name: string }>();

  const { id: userId } = useReactiveVar(selfVar);

  const [userByIdQuery] = useLazyQuery<UserInfoByIdQuery>(UserInfoByIdDocument);

  const { data, loading: galaxyLoading } = useSubscription<
    GalaxyByNameSubSubscription,
    GalaxyByNameSubSubscriptionVariables
  >(GalaxyByNameSubDocument, {
    variables: { name },
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
    variables: { id: data?.galaxy[0]?.id },
    skip: galaxyLoading,
  });

  useEffect(() => {
    if (data?.galaxy?.[0]) {
      galaxyConfigVar(dbGalaxyToGalaxyConfig(data.galaxy[0]));

      const myEmpire = data.galaxy[0].galactic_empires.find(
        ({ user_id }) => user_id === userId
      );

      if (myEmpire) {
        galacticEmpireVar(myEmpire);
        myEmpireVar(true);
      } else {
        galacticEmpireVar(null);
        myEmpireVar(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (galaxyLoading || celestialLoading) {
    return <Loading width="100%" height="100%" text="Loading Galaxy"></Loading>;
  } else if (data.galaxy?.[0] && celestialData) {
    return (
      <PixiWrapper
        ui={
          <>
            <PlayerPanel
              userId={userId}
              galaxyName={data.galaxy[0].name}
              owners={celestialOwnerMapper(celestialData)}
              loading={celestialLoading}
              error={celestialError}
            ></PlayerPanel>
            <GameUIBottomBar bottom={0} />
          </>
        }
      >
        <GalaxyViewer
          newUserQuery={userByIdQuery}
          claimedCelestials={celestialData.galaxy_by_pk.celestials}
          galaxyConfig={dbGalaxyToGalaxyConfig(data.galaxy[0])}
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
