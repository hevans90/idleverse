import {
  FetchResult,
  useMutation,
  useReactiveVar,
  useSubscription,
} from '@apollo/client';
import { Box, useToast } from '@chakra-ui/react';
import {
  CreateGalaxyDocument,
  CreateGalaxyMutation,
  GalaxiesDocument,
  GalaxiesSubscription,
  Galaxy_Insert_Input,
} from '@idleverse/graphql';
import { Stage } from '@inlet/react-pixi';
import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Back } from '../../components/back';
import {
  animateVar,
  galaxyConfigVar,
  roleVar,
} from '../../_state/reactive-variables';
import { useResize } from '../common-utils/use-resize.hook';
import { GalaxyGenerator } from './galaxy-generator';
import { GameUIBottomBar } from './ui/bottom-bar';
import { GeneratorControls } from './ui/generator-controls';
import { GameUIRightBar } from './ui/right-bar';

export const GalaxyGenContainer = () => {
  const { data, loading } =
    useSubscription<GalaxiesSubscription>(GalaxiesDocument);

  const size = useResize();

  const history = useHistory();

  const toast = useToast();

  const [createGalaxy, x] = useMutation<
    CreateGalaxyMutation,
    { input: Galaxy_Insert_Input }
  >(CreateGalaxyDocument);

  const role = useReactiveVar(roleVar);
  const galaxyConfig = useReactiveVar(galaxyConfigVar);

  const saveGalaxyFn = useRef<() => unknown>(null);

  useEffect(() => {
    saveGalaxyFn.current = async () => {
      let created: FetchResult<CreateGalaxyMutation>;

      try {
        created = await createGalaxy({
          variables: {
            input: {
              id: galaxyConfig.seed,
              name: galaxyConfig.name,
              radius: galaxyConfig.radius,
              arms: galaxyConfig.arms,
              arm_width: galaxyConfig.armWidth,
              stars: galaxyConfig.stars,
              curvature: galaxyConfig.curvature,
              core_concentration_factor: galaxyConfig.coreConcentrationFactor,
              core_radius_factor: galaxyConfig.coreRadiusFactor,
            },
          },
        });
        toast({
          title: `${created.data.insert_galaxy_one.name} created successfully.`,
          status: 'success',
        });
      } catch (e) {
        console.error(e);
        toast({ title: e.message, status: 'error' });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [galaxyConfig]);

  if (loading) {
    return (
      <Box h="100%" display="flex" alignItems="center" justifyContent="center">
        loading galaxy generator...
      </Box>
    );
  } else if (data) {
    return (
      <Box position="relative">
        <Stage
          {...size}
          options={{
            backgroundColor: 0x2d3239,
            antialias: true,
          }}
          onUnmount={() => animateVar(false)}
        >
          <GalaxyGenerator />
        </Stage>
        <Back />
        <GameUIBottomBar />
        <GameUIRightBar
          role={role}
          saveGalaxyFunction={() => saveGalaxyFn.current()}
        />
        <GeneratorControls />
      </Box>
    );
  } else {
    return (
      <Box h="100%" display="flex" alignItems="center" justifyContent="center">
        Something went wrong. There is no universe.
      </Box>
    );
  }
};
