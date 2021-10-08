import {
  FetchResult,
  useMutation,
  useQuery,
  useReactiveVar,
  useSubscription,
} from '@apollo/client';
import { Box, useToast } from '@chakra-ui/react';
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
} from '@idleverse/graphql';
import { Stage } from '@inlet/react-pixi';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { selfVar } from '../../_state/reactive-variables';
import { dbGalaxyToGalaxyConfig } from '../common-utils/db-galaxy-to-galaxy-config';
import { useResize } from '../common-utils/use-resize.hook';
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

  useEffect(() => {
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
