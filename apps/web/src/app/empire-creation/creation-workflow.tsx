import { useReactiveVar } from '@apollo/client';
import {
  Box,
  Button,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { AnimatedButton } from '@idleverse/ui';

import {
  characterCreationVar,
  colorsVar,
  planetGenerationColorDrawerVar,
} from '@idleverse/state';
import { DataUriGenerator } from '../canvases/celestial-viewer/data-uri-generator';
import { runPixelDataGenOnWorker } from '../canvases/planet-generator/texture-generation/run-texture-gen-on-worker';
import { creationStep } from './creation-types';

const WorkflowButton = ({
  stepName,
  onClick,
  displayName,
  disabled,
  value,
  imageUrl,
}: {
  stepName: creationStep;
  displayName?: string;
  disabled?: boolean;
  onClick: (stepName: creationStep) => unknown;
  value?: string;
  imageUrl?: string;
}) => {
  const { secondary } = useReactiveVar(colorsVar);
  return (
    <Box
      as={Button}
      padding={5}
      height={[16, 24, 32]}
      lineHeight="inherit"
      whiteSpace="normal"
      isDisabled={disabled || false}
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      px="8px"
      borderRadius="3px"
      fontSize={['2xs', 'xs', 'xs', 'sm', 'md']}
      bg={value ? `${secondary}.600` : 'whiteAlpha.200'}
      color="white.900"
      _hover={{ bg: value ? `${secondary}.500` : 'whiteAlpha.300' }}
      _active={{
        bg: 'whiteAlpha.300',
        transform: 'scale(0.98)',
        borderColor: `${secondary}.700`,
      }}
      paddingInlineStart={4}
      paddingInlineEnd={4}
      onClick={() => onClick(stepName)}
    >
      <Stack direction={['row', 'column']} alignItems="center">
        {imageUrl && (
          <Image boxSize="50px" src={imageUrl} borderRadius="full" />
        )}
        <Text>{value || displayName || stepName}</Text>
      </Stack>
    </Box>
  );
};

export const CreationWorkflow = ({
  onStepClicked,
  value: { race, background, faction, homeworld },
}: {
  onStepClicked: (step: creationStep) => unknown;
  value: ReturnType<typeof characterCreationVar>;
}) => {
  const [ready, setReady] = useState<boolean>(false);
  const [
    generatingPlanetThumbnailPixelData,
    setGeneratingPlanetThumbnailPixelData,
  ] = useState<boolean>(false);

  const [
    generatingPlanetThumbnailDataURI,
    setGeneratingPlanetThumbnailDataURI,
  ] = useState<boolean>(false);

  const [planetThumbnailPixelData, setplanetThumbnailPixelData] = useState<{
    seed: string;
    data: Uint8Array;
    width: number;
    height: number;
  }>(undefined);

  const [homeworldDataURI, setHomeworldDataURI] = useState<string>(undefined);

  const homeworldColors = useReactiveVar(planetGenerationColorDrawerVar);

  useEffect(() => {
    if (homeworld) {
      setGeneratingPlanetThumbnailPixelData(true);

      const { water, sand, grass, forest } = homeworldColors.currentPalette;

      runPixelDataGenOnWorker(
        'perlin',
        homeworld.texture_resolution,
        [water, sand, grass, forest],
        homeworld.terrain_bias as [number, number, number, number],
        homeworld.id
      ).then((pixelData) => {
        setplanetThumbnailPixelData(pixelData);
        setGeneratingPlanetThumbnailPixelData(false);
        setGeneratingPlanetThumbnailDataURI(true);
      });
    }
  }, [homeworld, homeworldColors]);

  useEffect(() => {
    setReady(!!(race && background && faction && homeworld));
  }, [race, background, faction, homeworld]);

  return (
    <SimpleGrid
      width={['95%', '95%', '95%', '95%', '80%', '1400px']}
      minChildWidth={['180px', '120px']}
      spacing={2}
    >
      <AnimatedButton onClick={() => onStepClicked('race')}>
        <VStack>
          <Text>{race?.name ?? 'race'}</Text>

          {race && (
            <Image
              height="50px"
              src={`/races/icons/${race.name.toLowerCase()}.png`}
            />
          )}
        </VStack>
      </AnimatedButton>
      <AnimatedButton onClick={() => onStepClicked('background')}>
        <VStack>
          <Text>{background?.name ?? 'background'}</Text>
          {background && (
            <Image
              boxSize="50px"
              src={`/backgrounds/icons/${background.name.toLowerCase()}.png`}
              borderRadius="full"
            />
          )}
        </VStack>
      </AnimatedButton>
      <AnimatedButton onClick={() => onStepClicked('faction')}>
        <VStack>
          <Text>{faction?.name ?? 'faction'}</Text>
          {faction && (
            <Image
              boxSize="50px"
              src={`/factions/icons/${faction.name.toLowerCase()}.png`}
              borderRadius="full"
            />
          )}
        </VStack>
      </AnimatedButton>
      <AnimatedButton onClick={() => onStepClicked('homeworld')}>
        <VStack>
          <Text>{homeworld?.name ?? 'generate homeworld'}</Text>
          {!generatingPlanetThumbnailPixelData &&
            generatingPlanetThumbnailDataURI && (
              <DataUriGenerator
                celestialId="character-creation"
                input={[planetThumbnailPixelData]}
                onGenerationFinished={({ uris }) => {
                  setHomeworldDataURI(uris[0].uri);
                  setGeneratingPlanetThumbnailDataURI(false);
                }}
              />
            )}
          {homeworldDataURI && (
            <Image boxSize="50px" src={homeworldDataURI} borderRadius="full" />
          )}
        </VStack>
      </AnimatedButton>

      <WorkflowButton
        onClick={() => onStepClicked('start')}
        stepName="start"
        displayName="create your empire"
        disabled={!ready}
      />
    </SimpleGrid>
  );
};
