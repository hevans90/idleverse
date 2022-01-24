import {
  FetchResult,
  useMutation,
  useQuery,
  useReactiveVar,
  useSubscription,
} from '@apollo/client';
import { Box, Theme, useTheme, useToast } from '@chakra-ui/react';
import {
  CelestialsByGalaxyIdDocument,
  CelestialsByGalaxyIdSubscription,
  CelestialsByGalaxyIdSubscriptionVariables,
  GalaxyByIdDocument,
  GalaxyByIdQuery,
  RequestRandomCelestialByGalaxyIdDocument,
  RequestRandomCelestialByGalaxyIdMutation,
  RequestRandomCelestialByGalaxyIdMutationVariables,
  SelfDocument,
} from '@idleverse/galaxy-gql';
import { Stage } from '@inlet/react-pixi';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { galaxyConfigVar, selfVar } from '../../_state/reactive-variables';
import { dbGalaxyToGalaxyConfig } from '../common-utils/db-galaxy-to-galaxy-config';
import { themeColToHex } from '../common-utils/theme-col-to-hex';
import { useResize } from '../common-utils/use-resize.hook';
import { GameUIBottomBar } from '../galaxy-generator/ui/bottom-bar';
import { celestialOwnerMapper } from './celestial-owner';
import { GalaxyViewer } from './galaxy-viewer';
import { PlayerPanel } from './ui/player-panel';

export const GalaxyViewerContainer = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading } = useQuery<GalaxyByIdQuery>(GalaxyByIdDocument, {
    variables: { id },
  });

  const [claimPending, setClaimPending] = useState(false);

  const toast = useToast();

  const self = useReactiveVar(selfVar);

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

  const [claimCelestialFunction] = useMutation<
    RequestRandomCelestialByGalaxyIdMutation,
    RequestRandomCelestialByGalaxyIdMutationVariables
  >(RequestRandomCelestialByGalaxyIdDocument, {
    refetchQueries: [{ query: SelfDocument }],
  });

  const claimCelestialFn = useRef<() => unknown>(null);
  const { colors } = useTheme<Theme>();

  useEffect(() => {
    if (data) {
      galaxyConfigVar(dbGalaxyToGalaxyConfig(data.galaxy_by_pk));
    }

    claimCelestialFn.current = async () => {
      let claimed: FetchResult<RequestRandomCelestialByGalaxyIdMutation>;

      try {
        setClaimPending(true);
        claimed = await claimCelestialFunction({
          variables: {
            galaxy_id: data.galaxy_by_pk.id,
          },
        });
        toast({
          title: `Claim successful. ${claimed.data.requestRandomCelestial.freeClaimsLeft} claims remaining.`,
          status: 'success',
        });
        selfVar({
          ...self,
          free_claims: claimed.data.requestRandomCelestial.freeClaimsLeft,
        });
        setClaimPending(false);
      } catch (e) {
        console.error(e);
        toast({ title: e.message, status: 'error' });
        setClaimPending(false);
      }
    };
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
            backgroundColor: themeColToHex(colors.gray['800']),
            antialias: true,
          }}
        >
          <GalaxyViewer
            claimedCelestials={celestialData.galaxy_by_pk.celestials}
            galaxyConfig={dbGalaxyToGalaxyConfig(data.galaxy_by_pk)}
          />
        </Stage>
        <PlayerPanel
          owners={celestialOwnerMapper(celestialData)}
          loading={celestialLoading}
          error={celestialError}
          claimCelestialFunction={() => claimCelestialFn.current()}
          claimPending={claimPending}
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
