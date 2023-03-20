import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import {
  Box,
  Button,
  Link,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { dbGalaxyToGalaxyConfig } from '@idleverse/galaxy-gen';
import {
  CreateEmpireOriginCelestialDocument,
  CreateEmpireOriginCelestialMutation,
  CreateEmpireOriginCelestialMutationVariables,
  CreateGalacticEmpireDocument,
  CreateGalacticEmpireMutation,
  CreateGalacticEmpireMutationVariables,
  CreatePlanetDocument,
  CreatePlanetMutation,
  CreatePlanetMutationVariables,
  GalaxyByIdDocument,
  GalaxyByIdQuery,
} from '@idleverse/galaxy-gql';
import { useEffect, useState } from 'react';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';
import { characterCreationVar } from '../_state/character-creation';
import { colorsVar } from '../_state/colors';
import { galaxyConfigVar, selfVar } from '../_state/reactive-variables';
import { GalaxyThumbnail } from '../canvases/galaxy-thumbnail/galaxy-thumbnail';
import { randomisePlanetSeedAndName } from '../canvases/planet-generator/_utils/randomise-planet-seed-and-name';
import { generatePlanetInsertionVars } from '../canvases/planet-generator/generate-planet-input-vars';
import { Loading } from '../components/loading';
import { creationStep } from './creation-types';
import { CreationWorkflow } from './creation-workflow';
import { BackgroundSelectionModal } from './workflow-step-modals/background-selection-modal';
import { FactionSelectionModal } from './workflow-step-modals/faction-selection-modal';
import { HomeworldGenerationModal } from './workflow-step-modals/homeworld-generation-modal';
import { RaceSelectionModal } from './workflow-step-modals/race-selection-modal';

const JoinGalaxy = () => {
  const characterCreationState = useReactiveVar(characterCreationVar);

  const { secondary } = useReactiveVar(colorsVar);

  const { id: userId } = useReactiveVar(selfVar);

  const { id } = useParams<{ id: string }>();

  const { data: galaxyData, loading } = useQuery<GalaxyByIdQuery>(
    GalaxyByIdDocument,
    {
      variables: { id },
    }
  );

  const [alreadyJoinedGalaxy, setalreadyJoinedGalaxy] =
    useState<boolean>(false);

  const [readyToCreateEmpire, setReadyToCreateEmpire] =
    useState<boolean>(false);

  const [empireCreationStatus, setEmpireCreationStatus] = useState<
    'origin system' | 'homeworld' | 'empire' | 'done'
  >(undefined);

  const [readyToTransition, setReadyToTransition] = useState<boolean>(false);

  const [createEmpire] = useMutation<
    CreateGalacticEmpireMutation,
    CreateGalacticEmpireMutationVariables
  >(CreateGalacticEmpireDocument);

  const [createEmpireOriginCelestial] = useMutation<
    CreateEmpireOriginCelestialMutation,
    CreateEmpireOriginCelestialMutationVariables
  >(CreateEmpireOriginCelestialDocument);

  const [createHomeworld] = useMutation<
    CreatePlanetMutation,
    CreatePlanetMutationVariables
  >(CreatePlanetDocument);

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

  const {
    isOpen: homeworldGenerationOpen,
    onOpen: onHomeworldGenerationOpen,
    onClose: onHomeworldGenerationClose,
  } = useDisclosure();

  const runCreationMutations = async () => {
    setEmpireCreationStatus('empire');

    const { data: empireData } = await createEmpire({
      variables: {
        input: {
          user_id: userId,
          galaxy_id: galaxyData.galaxy_by_pk.id,
          playable_race_id: characterCreationState.race.id,
          background_id: characterCreationState.background.id,
          faction_id: characterCreationState.faction.id,
        },
      },
    });

    setEmpireCreationStatus('origin system');
    const celestial = await createEmpireOriginCelestial({
      variables: {
        galaxy_id: galaxyData.galaxy_by_pk.id,
        galacticEmpireId: empireData.insert_galactic_empire_one.id,
      },
    });
    setEmpireCreationStatus('homeworld');

    await createHomeworld({
      variables: {
        input: {
          ...characterCreationState.homeworld,
          celestial_id:
            celestial.data.createEmpireOriginCelestial.insertedCelestialId,
        },
      },
    });
  };

  useEffect(() => {
    return () => {
      characterCreationVar({
        race: undefined,
        background: undefined,
        faction: undefined,
        homeworld: undefined,
      });
    };
  }, []);

  useEffect(() => {
    if (galaxyData) {
      galaxyConfigVar(dbGalaxyToGalaxyConfig(galaxyData.galaxy_by_pk));

      const userAlreadyHasAnEmpireHere =
        galaxyData.galaxy_by_pk.galactic_empires.find(
          ({ user_id }) => user_id === userId
        );

      if (userAlreadyHasAnEmpireHere) {
        setalreadyJoinedGalaxy(true);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [galaxyData]);

  useEffect(() => {
    if (readyToCreateEmpire) {
      runCreationMutations().then(() => {
        setEmpireCreationStatus('done');

        /**
         * After a successful creation, randomise the planet id & seed.
         * Since this is a persisted reactive var (in local storage),
         * without this the user will likely, upon trying to join another galaxy,
         * try to insert a planet that breaks db constraints (dupe ids/names).
         */
        randomisePlanetSeedAndName();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyToCreateEmpire]);

  if (loading) {
    return (
      <Loading width="100%" height="100%" text="Loading Galaxy info"></Loading>
    );
  }

  if (alreadyJoinedGalaxy) {
    return (
      <VStack height="100%" justify="center" spacing={10}>
        <Text textAlign="center">
          You already have an empire in this galaxy.
        </Text>
        <Link
          as={ReactRouterLink}
          to={`/galaxies/${galaxyData.galaxy_by_pk.id}`}
        >
          <Button>Galaxy View</Button>
        </Link>
      </VStack>
    );
  }

  if (empireCreationStatus && empireCreationStatus !== 'done') {
    return (
      <Loading
        width="100%"
        height="100%"
        text={`Creating ${empireCreationStatus}`}
      ></Loading>
    );
  }

  if (empireCreationStatus === 'done') {
    return (
      <VStack height="100%" justify="center" spacing={10}>
        <Text>Your empire was founded successfully.</Text>
        <Link
          as={ReactRouterLink}
          to={`/galaxies/${galaxyData.galaxy_by_pk.id}`}
        >
          <Button>Begin</Button>
        </Link>
      </VStack>
    );
  }

  return (
    <>
      <RaceSelectionModal
        selectedRace={characterCreationState.race}
        isOpen={raceSelectionOpen}
        onClose={(race) => {
          characterCreationVar({ ...characterCreationVar(), race });
          onRaceSelectionClose();
        }}
      />

      <BackgroundSelectionModal
        selectedBackground={characterCreationState.background}
        isOpen={backgroundSelectionOpen}
        onClose={(background) => {
          characterCreationVar({ ...characterCreationVar(), background });
          onBackgroundSelectionClose();
        }}
      />

      <FactionSelectionModal
        selectedFaction={characterCreationState.faction}
        isOpen={factionSelectionOpen}
        onClose={(faction) => {
          characterCreationVar({ ...characterCreationVar(), faction });
          onFactionSelectionClose();
        }}
      />

      <HomeworldGenerationModal
        isOpen={homeworldGenerationOpen}
        onClose={() => {
          characterCreationVar({
            ...characterCreationVar(),
            // make sure to set a celestial ID once a celestial is claimed at the end of the flow
            homeworld: generatePlanetInsertionVars('', userId),
          });
          onHomeworldGenerationClose();
        }}
      />

      <VStack height="100%" justify="center" spacing={10}>
        <VStack spacing={3}>
          <Text textAlign="center">It's time to begin your journey in:</Text>
          <Text textAlign="center" fontWeight="bold" color={`${secondary}.500`}>
            {galaxyData.galaxy_by_pk.name}
          </Text>
        </VStack>

        <Box>
          <GalaxyThumbnail
            galaxyConfig={dbGalaxyToGalaxyConfig(galaxyData.galaxy_by_pk)}
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
              homeworld: () => onHomeworldGenerationOpen(),
              start: () => setReadyToCreateEmpire(true),
            };

            stepFunctions[creationStep]();
          }}
          value={characterCreationState}
        />
      </VStack>
    </>
  );
};

export default JoinGalaxy;
