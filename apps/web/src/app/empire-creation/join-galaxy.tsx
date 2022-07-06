import { useQuery, useReactiveVar } from '@apollo/client';
import { Box, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GalaxyByIdDocument, GalaxyByIdQuery } from '@idleverse/galaxy-gql';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GalaxyThumbnail } from '../canvases/galaxy-thumbnail/galaxy-thumbnail';
import { dbGalaxyToGalaxyConfig } from '../canvases/_utils/db-galaxy-to-galaxy-config';
import { Loading } from '../components/loading';
import { characterCreationVar } from '../_state/character-creation';
import { galaxyConfigVar } from '../_state/reactive-variables';
import { PixelateSVGFilter } from './components/pixelate-svg-filter';
import { creationStep } from './creation-types';
import { CreationWorkflow } from './creation-workflow';
import { BackgroundSelectionModal } from './workflow-step-modals/background-selection-modal';
import { FactionSelectionModal } from './workflow-step-modals/faction-selection-modal';
import { RaceSelectionModal } from './workflow-step-modals/race-selection-modal';

export const JoinGalaxy = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading } = useQuery<GalaxyByIdQuery>(GalaxyByIdDocument, {
    variables: { id },
  });

  const [ready, setReady] = useState<boolean>(false);

  const {
    isOpen: raceSelectionOpen,
    onOpen: onRaceSelectionOpen,
    onClose: onRaceSelectionClose,
  } = useDisclosure();

  const {
    isOpen: backgroundSelectionOpen,
    onOpen: onBackgroundSelectionOpen,
    onClose: onBackgroundSelectionClose,
  } = useDisclosure();

  const {
    isOpen: factionSelectionOpen,
    onOpen: onFactionSelectionOpen,
    onClose: onFactionSelectionClose,
  } = useDisclosure();

  const characterCreationState = useReactiveVar(characterCreationVar);

  useEffect(() => {
    return () => {
      characterCreationVar({
        race: undefined,
        background: undefined,
        faction: undefined,
      });
    };
  }, []);

  useEffect(() => {
    if (data) {
      galaxyConfigVar(dbGalaxyToGalaxyConfig(data.galaxy_by_pk));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (loading) {
    return (
      <Loading width="100%" height="100%" text="Loading Galaxy info"></Loading>
    );
  }

  return (
    <>
      <RaceSelectionModal
        isOpen={raceSelectionOpen}
        onClose={(race) => {
          characterCreationVar({ ...characterCreationVar(), race });
          onRaceSelectionClose();
        }}
      />

      <BackgroundSelectionModal
        isOpen={backgroundSelectionOpen}
        onClose={(background) => {
          characterCreationVar({ ...characterCreationVar(), background });
          onBackgroundSelectionClose();
        }}
      />

      <FactionSelectionModal
        isOpen={factionSelectionOpen}
        onClose={(faction) => {
          characterCreationVar({ ...characterCreationVar(), faction });
          onFactionSelectionClose();
        }}
      />

      <VStack
        height="100%"
        justify="center"
        spacing={10}
        filter={'url(#pixelate)'}
      >
        <VStack spacing={3}>
          <Text textAlign="center">It's time to begin your journey in:</Text>
          <Text textAlign="center" fontWeight="bold" color="teal.500">
            {data.galaxy_by_pk.name}
          </Text>
        </VStack>

        <Box>
          <GalaxyThumbnail
            galaxyConfig={dbGalaxyToGalaxyConfig(data.galaxy_by_pk)}
          />
        </Box>

        <CreationWorkflow
          onStepClicked={(creationStep) => {
            const stepFunctions: {
              [key in creationStep]: () => void;
            } = {
              race: () => onRaceSelectionOpen(),
              background: () => onBackgroundSelectionOpen(),
              faction: () => onFactionSelectionOpen(),
              homeworld: () => undefined,
              start: () => setReady(true),
            };

            stepFunctions[creationStep]();
          }}
          value={characterCreationState}
        />
      </VStack>

      {ready && (
        <PixelateSVGFilter
          reversed={false}
          minDistortion={0.1}
          maxDistortion={20}
        />
      )}
    </>
  );
};
