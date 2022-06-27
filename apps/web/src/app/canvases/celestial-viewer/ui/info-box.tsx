import { useReactiveVar } from '@apollo/client';
import { ChevronRightIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Image,
  StackDivider,
  StackProps,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { CelestialByIdQuery } from '@idleverse/galaxy-gql';
import {
  celestialViewerPlanetDataUris,
  celestialViewerSelectedPlanet,
} from '../../../_state/celestial-viewer';

type Props = Pick<
  CelestialByIdQuery['celestial_by_pk'],
  'name' | 'user_info' | 'planets'
>;

const rowProps: StackProps = {
  width: '100%',
  justify: 'space-between',
  spacing: 5,
};

export const InfoBox = ({
  name,
  planets,
  user_info: { display_name, avatar_url },
}: Props) => {
  const planetDataUris = useReactiveVar(celestialViewerPlanetDataUris);

  const bg = useColorModeValue('gray.300', 'gray.700');
  const border = useColorModeValue('gray.200', 'gray.600');

  const selectedPlanetId = useReactiveVar(celestialViewerSelectedPlanet).id;

  return (
    <VStack
      padding="1rem"
      position="absolute"
      alignItems="start"
      bgColor={bg}
      top="0"
      right="0"
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      borderTop="unset"
      borderRight="unset"
      fontSize="sm"
    >
      <HStack {...rowProps}>
        <Text>Name:</Text>
        <Text>{name}</Text>
      </HStack>
      <HStack {...rowProps}>
        <Text>Owner:</Text>
        <HStack>
          <Avatar size="sm" src={avatar_url} mr={1} name={display_name} />
          <Text>{display_name}</Text>
        </HStack>
      </HStack>
      <HStack {...rowProps} align="start">
        <Text>Planets:</Text>
        <VStack
          align="end"
          borderWidth="1px"
          borderStyle="solid"
          borderColor={border}
          spacing={0}
          flexGrow={1}
        >
          {planets.map((planet, i) => (
            <Box
              key={i}
              textAlign="end"
              width="100%"
              position="relative"
              padding={2}
              paddingLeft={4}
              _hover={{
                fontWeight: 'bold',
                cursor: 'pointer',
                background: 'gray.500',
                color: 'teal.500',
              }}
              onClick={() =>
                celestialViewerSelectedPlanet({
                  name: planet.name,
                  id: planet.id,
                })
              }
              color={selectedPlanetId === planet.id ? 'teal.500' : 'white'}
            >
              {selectedPlanetId === planet.id && (
                <ChevronRightIcon
                  position="absolute"
                  left="0"
                  top="10px"
                  boxSize={5}
                ></ChevronRightIcon>
              )}
              {planet.name}
            </Box>
          ))}
        </VStack>
      </HStack>

      {!selectedPlanetId && (
        <Box paddingTop={5}>
          <Text>Click to select a planet.</Text>
        </Box>
      )}
      {selectedPlanetId && (
        <PlanetInfo
          planetImageUrl={
            planetDataUris.uris.find(({ seed }) => seed === selectedPlanetId)
              .uri
          }
          planetInfo={planets.find(({ id }) => id === selectedPlanetId)}
          onClose={() => celestialViewerSelectedPlanet(null)}
        ></PlanetInfo>
      )}
    </VStack>
  );
};

const PlanetInfo = ({
  planetImageUrl,
  planetInfo,
  onClose,
}: {
  onClose: () => void;
  planetImageUrl: string;
  planetInfo: Pick<
    CelestialByIdQuery['celestial_by_pk'],
    'planets'
  >['planets'][0];
}) => {
  const border = useColorModeValue('gray.200', 'gray.600');

  return (
    <VStack
      position="relative"
      padding={5}
      width="100%"
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      fontSize="xs"
      spacing={3}
    >
      <IconButton
        position="absolute"
        top="5px"
        right="5px"
        aria-label="Deselect planet"
        icon={<CloseIcon />}
        size="xs"
        onClick={() => onClose()}
      />

      <Image boxSize="150px" src={planetImageUrl} borderRadius="full" />

      <StackDivider />

      <HStack {...rowProps}>
        <Text>Name:</Text>
        <Text>{planetInfo.name}</Text>
      </HStack>

      <HStack {...rowProps}>
        <Text>Radius:</Text>
        <Text>{planetInfo.radius}km</Text>
      </HStack>

      <HStack {...rowProps}>
        <Text>Atmospheric Height:</Text>
        <Text>{planetInfo.atmospheric_distance * 100}m</Text>
      </HStack>
    </VStack>
  );
};
