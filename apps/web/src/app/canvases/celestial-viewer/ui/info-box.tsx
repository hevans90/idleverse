import { useReactiveVar } from '@apollo/client';

import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Image,
  Link,
  StackProps,
  Text,
  VStack,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { CelestialByIdQuery } from '@idleverse/galaxy-gql';

import { Link as ReactRouterLink } from 'react-router-dom';

import {
  celestialViewerPlanetDataUris,
  celestialViewerSelectedPlanetVar,
  colorsVar,
} from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { ChevronRightPixelIcon, ClosePixelIcon } from '@idleverse/ui';
import {
  responsiveFontProps,
  responsiveIconProps,
} from '../../../_responsive-utils/font-props';

type InfoBoxProps = Pick<
  CelestialByIdQuery['celestial_by_pk'],
  'name' | 'user_info' | 'planets'
> &
  StackProps;

const rowProps: StackProps = {
  width: '100%',
  justify: 'space-between',
};

export const InfoBox = ({
  name,
  planets,
  user_info: { display_name, avatar_url },
  ...stackProps
}: InfoBoxProps) => {
  const planetDataUris = useReactiveVar(celestialViewerPlanetDataUris);

  const { bg, border } = useUiBackground();

  const { primary, secondary } = useReactiveVar(colorsVar);

  const selectedPlanetId = useReactiveVar(celestialViewerSelectedPlanetVar)?.id;

  const selectedPlanetColor = useColorModeValue(
    `${secondary}.900`,
    `${secondary}.300`
  );

  const bp: 'small' | 'medium' | 'large' = useBreakpointValue({
    base: 'small',
    md: 'medium',
    lg: 'large',
  });

  return (
    <HStack
      {...stackProps}
      padding={[2, 4]}
      bgColor={bg}
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      justifyContent="space-between"
      alignItems="start"
      height={['200px', '200px', '200px', 'unset']}
      width={['100%', '100%', '100%', 'unset']}
      spacing={[5, 7, 12]}
    >
      <HStack alignItems="start">
        {bp === 'large' && (
          <Image
            bgColor={bg}
            borderWidth="1px"
            borderStyle="solid"
            display={['none', 'none', 'block']}
            boxSize="150px"
            fallbackSrc="/placeholders/150x150.png"
            src="/sprites/sun.png"
          />
        )}
        <VStack height="100%">
          <HStack {...rowProps}>
            <Text {...responsiveFontProps}>Name:</Text>
            <Text {...responsiveFontProps}>{name}</Text>
          </HStack>
          <HStack {...rowProps}>
            <Text {...responsiveFontProps}>Owner:</Text>
            <HStack>
              <Avatar size="sm" src={avatar_url} mr={1} name={display_name} />
              <Text {...responsiveFontProps}>{display_name}</Text>
            </HStack>
          </HStack>
          <HStack {...rowProps} align="start">
            {planets.length && (
              <>
                <Text {...responsiveFontProps}>Planets:</Text>
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
                        background: `${primary}.600`,
                      }}
                      onClick={() =>
                        celestialViewerSelectedPlanetVar({
                          name: planet.name,
                          id: planet.id,
                        })
                      }
                      color={
                        selectedPlanetId === planet.id
                          ? selectedPlanetColor
                          : 'white'
                      }
                    >
                      {selectedPlanetId === planet.id && (
                        <Icon
                          as={ChevronRightPixelIcon}
                          position="absolute"
                          left="0"
                          {...responsiveIconProps}
                        />
                        // <ChevronRightIcon
                        //   position="absolute"
                        //   left="0"
                        //   boxSize={5}
                        // ></ChevronRightIcon>
                      )}
                      <Text {...responsiveFontProps}>{planet.name}</Text>
                    </Box>
                  ))}
                </VStack>
              </>
            )}
          </HStack>
        </VStack>
      </HStack>

      {/* {!selectedPlanetId && (
        <Box paddingTop={5}>
          <Text>
            {planets.length ? (
              <>Click to select a planet.</>
            ) : (
              <>This system has no planets.</>
            )}
          </Text>
        </Box>
      )} */}
      {selectedPlanetId && (
        <PlanetInfo
          planetImageUrl={
            planetDataUris.uris.find(({ seed }) => seed === selectedPlanetId)
              ?.uri
          }
          planetInfo={planets.find(({ id }) => id === selectedPlanetId)}
          onClose={() => celestialViewerSelectedPlanetVar(null)}
        ></PlanetInfo>
      )}
    </HStack>
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
  const { border } = useUiBackground();

  const bp: 'small' | 'medium' | 'large' = useBreakpointValue({
    base: 'small',
    md: 'medium',
    lg: 'large',
  });

  return (
    <HStack
      position="relative"
      padding={[2, 2, 3, 5]}
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      spacing={3}
    >
      {bp === 'large' && (
        <IconButton
          position="absolute"
          top="5px"
          right="5px"
          aria-label="Deselect planet"
          icon={
            <Icon
              as={ClosePixelIcon}
              position="absolute"
              left="0"
              {...responsiveIconProps}
            />
          }
          size="xs"
          onClick={() => onClose()}
        />
      )}

      {bp === 'large' && (
        <Image
          boxSize="100px"
          src={planetImageUrl}
          fallbackSrc="/placeholders/150x150.png"
          borderRadius="full"
          style={{ margin: 'unset' }}
        />
      )}

      <VStack spacing={3} paddingTop={[0, 0, 0, 3]}>
        <HStack {...rowProps}>
          <Text {...responsiveFontProps}>Name:</Text>
          <Text {...responsiveFontProps}>{planetInfo.name}</Text>
        </HStack>

        <HStack {...rowProps}>
          <Text {...responsiveFontProps}>Radius:</Text>
          <Text {...responsiveFontProps}>{planetInfo.radius}km</Text>
        </HStack>

        <HStack {...rowProps}>
          <Text {...responsiveFontProps}>Atmospheric Height:</Text>
          <Text {...responsiveFontProps}>
            {planetInfo.atmospheric_distance * 100}m
          </Text>
        </HStack>

        <Link
          as={ReactRouterLink}
          unstable_viewTransition
          to={`/planets/${planetInfo.name}`}
          width="100%"
        >
          <Button width="100%" {...responsiveFontProps}>
            Visit
          </Button>
        </Link>
      </VStack>
    </HStack>
  );
};
