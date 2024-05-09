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
import { useEffect, useMemo, useRef } from 'react';
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
import { Viewport } from 'pixi-viewport';
import { StarField } from '../_rendering/starfield';
import { useResize } from '../_utils/use-resize.hook';
import { PixiViewport } from '../_utils/viewport';
import { celestialOwnerMapper } from './celestial-owner';
import { GalaxyViewer } from './galaxy-viewer';
import { PlayerPanel } from './ui/player-panel';

export const GalaxyViewerContainer = () => {
  const viewportRef = useRef<Viewport>(null);
  const { name } = useParams<{ name: string }>();
  const size = useResize();

  const { id: userId } = useReactiveVar(selfVar);

  const [userByIdQuery] = useLazyQuery<UserInfoByIdQuery>(UserInfoByIdDocument);

  const worldSize = useMemo(() => ({ width: 1200, height: 1200 }), []);

  const center = useMemo(
    () => ({
      x: worldSize.width / 2,
      y: worldSize.height / 2,
    }),
    [worldSize]
  );

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
        bg="darker"
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
        <PixiViewport
          ref={viewportRef}
          size={size}
          screenWidth={size.width}
          screenHeight={size.height}
          worldHeight={worldSize.height}
          worldWidth={worldSize.width}
          minScale={0.2}
          initialZoom={0.4}
        >
          <StarField
            center={center}
            dimensions={worldSize}
            initialScale={0.4}
            numberOfStars={5000}
            radius={worldSize.width * 4}
          />
          <GalaxyViewer
            center={center}
            newUserQuery={userByIdQuery}
            claimedCelestials={celestialData.galaxy_by_pk.celestials}
            galaxyConfig={dbGalaxyToGalaxyConfig(data.galaxy[0])}
            navigate={navigate}
            viewportRef={viewportRef}
          />
        </PixiViewport>
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
