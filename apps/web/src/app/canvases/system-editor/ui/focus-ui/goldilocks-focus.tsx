import { useReactiveVar } from '@apollo/client';
import {
  Box,
  Button,
  HStack,
  Image,
  useBreakpointValue,
} from '@chakra-ui/react';
import { PlanetByIdQuery } from '@idleverse/galaxy-gql';
import {
  celestialViewerPlanetDataUris,
  celestialViewerPlanetsVar,
  celestialViewerSelectedPlanetVar,
  colorsVar,
  dialogVar,
  planetGeneratorConfigVar,
  systemEditorNewPlanetVar,
  systemEditorOrbitalEditInProgressVar,
  toSnakeCase,
} from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { AnimatedFrame, AnimatedText, BlinkingText } from '@idleverse/ui';

import { PlanetGenerationConfig } from '@idleverse/models';
import { isEqual } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { responsiveFontProps } from '../../../../_responsive-utils/font-props';
import { useResize } from '../../../_utils/use-resize.hook';
import { PlanetGenerator } from '../../../planet-generator/planet-generator';
import {
  PlanetAppearanceEditor,
  PlanetConfigEditor,
  PlanetNameEditor,
} from '../planet-editing';

export const GoldilocksFocusUI = ({
  onPlanetSave,
}: {
  onPlanetSave: ({
    planet,
    mode,
  }: {
    planet: PlanetByIdQuery['planet_by_pk'];
    mode: 'new' | 'edit';
  }) => void;
}) => {
  const selectedPlanet = useReactiveVar(celestialViewerSelectedPlanetVar);
  const { open: dialogOpen } = useReactiveVar(dialogVar);
  const sizeWithoutDialog = useResize();
  const { rawBgDarker } = useUiBackground();
  const planets = useReactiveVar(celestialViewerPlanetsVar);
  const { uris } = useReactiveVar(celestialViewerPlanetDataUris);

  const creatingNewPlanet = useReactiveVar(systemEditorNewPlanetVar);
  const { secondary } = useReactiveVar(colorsVar);

  const [updatedPlanet, setUpdatedPlanet] =
    useState<PlanetByIdQuery['planet_by_pk']>();

  const updatePlanetGenerationConfig = useCallback(
    (key: keyof PlanetGenerationConfig, val: string | number) => {
      planetGeneratorConfigVar({
        ...planetGeneratorConfigVar(),
        [key]: val,
      });

      if (key === 'orbitalRadius' && val !== updatedPlanet?.orbital_radius) {
        systemEditorOrbitalEditInProgressVar(true);
      } else {
        systemEditorOrbitalEditInProgressVar(false);
      }

      // db entity
      const snakeKey = toSnakeCase(key);
      setUpdatedPlanet({
        ...updatedPlanet,
        [snakeKey]: val,
      });
    },
    [updatedPlanet]
  );

  const currentlySelectedPlanet = useMemo(
    () => selectedPlanet && planets.find(({ id }) => id === selectedPlanet.id),
    [selectedPlanet, planets]
  );

  const planetStateDirty = useMemo(() => {
    if (creatingNewPlanet) {
      return true;
    }

    if (currentlySelectedPlanet) {
      console.log({ dirty: !isEqual(currentlySelectedPlanet, updatedPlanet) });
      return !isEqual(currentlySelectedPlanet, updatedPlanet);
    }
    return false;
  }, [creatingNewPlanet, currentlySelectedPlanet, updatedPlanet]);

  const bp: 'small' | 'medium' | 'large' = useBreakpointValue({
    base: 'small',
    md: 'medium',
    lg: 'large',
  });

  const isMobile = bp === 'small';

  const showEditor = creatingNewPlanet || !!selectedPlanet;

  const selectPlanetHandler = ({ name, id }: { name: string; id: string }) => {
    systemEditorOrbitalEditInProgressVar(false);
    systemEditorNewPlanetVar(false);
    celestialViewerSelectedPlanetVar({ name, id });

    const planet = planets.find(
      ({ id: existingPlanetId }) => existingPlanetId === id
    );
    setUpdatedPlanet(planet);
  };

  const newPlanetHandler = () => {
    celestialViewerSelectedPlanetVar(null);
    systemEditorNewPlanetVar(true);
  };

  const cancelPlanetHandler = () => {
    celestialViewerSelectedPlanetVar(null);
    systemEditorNewPlanetVar(false);
  };

  const savePlanetHandler = () => {
    onPlanetSave({
      planet: updatedPlanet,
      mode: creatingNewPlanet ? 'new' : 'edit',
    });
    systemEditorNewPlanetVar(false);
    celestialViewerSelectedPlanetVar(null);
  };

  useEffect(() => {
    return () => {
      // disable this when the component unmounts to avoid weird global state leaks
      systemEditorNewPlanetVar(false);
    };
  }, []);

  return (
    <>
      {showEditor && (
        <>
          <AnimatedText
            animationType="decipher"
            textAlign="center"
            display="block"
            duration={{ enter: 0.5, exit: 1 }}
            fontSize={['lg', 'xl']}
            content={creatingNewPlanet ? 'New' : 'Editing'}
          >
            {creatingNewPlanet && (
              <BlinkingText fontSize={['lg', 'xl']}>+</BlinkingText>
            )}
          </AnimatedText>

          <AnimatedFrame
            show={true}
            bg={rawBgDarker}
            leftBottom={!isMobile ? false : true}
            containerProps={{
              height: [sizeWithoutDialog.height / 4],
              width: ['100vw', '100%'],
              position: ['fixed', 'relative'],
              top: ['20vh', 'unset'],
              left: [0, 'unset'],
              display: isMobile && dialogOpen ? 'none' : 'block',
            }}
          >
            <PlanetGenerator stars={false} fullUI={false} />
          </AnimatedFrame>

          <PlanetNameEditor
            onNameChange={(name) => updatePlanetGenerationConfig('name', name)}
          />
          <PlanetAppearanceEditor
            onPaletteChange={(palette) =>
              setUpdatedPlanet({
                ...updatedPlanet,
                terrain_hex_palette: palette,
              })
            }
            onBiasChange={(biases) =>
              setUpdatedPlanet({
                ...updatedPlanet,
                terrain_bias: biases,
              })
            }
          />
          <PlanetConfigEditor
            onConfigChange={(key, value) =>
              updatePlanetGenerationConfig(key, value)
            }
          />
        </>
      )}

      {!showEditor &&
        planets.map(({ name, id, radius }) => (
          <HStack width="100%" key={id}>
            <Box minW="40px">
              <Image
                margin="auto"
                boxSize={`${40 * radius}px`}
                src={uris.find(({ seed }) => seed === id)?.uri}
                fallbackSrc="/placeholders/75x75-circle.png"
                borderRadius="full"
                objectFit="cover"
              />
            </Box>
            <Button
              width="100%"
              flexGrow={1}
              opacity={0.75}
              {...responsiveFontProps}
              _disabled={{
                bg: `${secondary}.700`,
                pointerEvents: 'none',
                opacity: 1,
                _hover: { bg: `${secondary}.600` },
              }}
              isDisabled={selectedPlanet?.id === id}
              onClick={() => selectPlanetHandler({ name, id })}
            >
              {name.toLocaleUpperCase()}{' '}
            </Button>
          </HStack>
        ))}
      {showEditor ? (
        <HStack width="100%">
          <Button
            isDisabled={!planetStateDirty}
            colorScheme={secondary}
            width="50%"
            onClick={savePlanetHandler}
          >
            Save
          </Button>
          <Button width="50%" onClick={cancelPlanetHandler}>
            Cancel
          </Button>
        </HStack>
      ) : (
        <Button width="100%" onClick={newPlanetHandler} colorScheme={secondary}>
          New +
        </Button>
      )}
    </>
  );
};
