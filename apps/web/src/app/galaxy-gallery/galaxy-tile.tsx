import {
  Box,
  Button,
  HStack,
  Link,
  Text,
  TextProps,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { dbGalaxyToGalaxyConfig } from '@idleverse/galaxy-gen';
import { GalaxiesSubscription } from '@idleverse/galaxy-gql';
import { Link as ReactRouterLink } from 'react-router-dom';
import { GalaxyThumbnail } from '../canvases/galaxy-thumbnail/galaxy-thumbnail';
import { galaxyConfigVar } from '../_state/reactive-variables';

export const GalaxyTile = ({
  alreadyJoined,
  galaxyConfig,
  i,
  displayOwnershipTotals,
  totalUserOwns,
}: {
  alreadyJoined: boolean;
  galaxyConfig: GalaxiesSubscription['galaxy'][0];
  i: number;
  displayOwnershipTotals: boolean;
  totalUserOwns: number;
}) => {
  const bgcol = useColorModeValue('gray.800', 'gray.900');
  const col = useColorModeValue('teal.500', 'teal.300');

  const hoverCol = useColorModeValue('teal.300', 'teal.200');
  const hoverBg = useColorModeValue(
    alreadyJoined ? 'teal.800' : 'teal.900',
    alreadyJoined ? 'teal.800' : 'teal.900'
  );

  const {
    isOpen: isHovered,
    onOpen: onHover,
    onClose: onHoverEnd,
  } = useDisclosure();

  const customHover = {
    _hover: {
      textDecor: 'unset',
      background: hoverBg,
      color: hoverCol,
    },
  };

  const galaxyUrl = `/galaxies/${galaxyConfig.id}`;

  const alreadyJoinedProps = {
    as: ReactRouterLink,
    to: galaxyUrl,
  };

  const textProps: TextProps = {
    position: 'absolute',
    fontSize: 'xxs',
    bgColor: 'gray.600',
    padding: 1,
    paddingTop: 1.5,
    opacity: 0.85,
    margin: 'unset !important',
  };

  return (
    <Box
      height="20vw"
      width="20vw"
      minWidth="250px"
      minHeight="250px"
      maxHeight="400px"
      maxWidth="400px"
      key={galaxyConfig.id}
      bgColor={bgcol}
      color={col}
      {...customHover}
      marginRight={2}
      marginBottom={2}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
      as={alreadyJoined ? alreadyJoinedProps.as : null}
      to={alreadyJoined ? alreadyJoinedProps.to : null}
    >
      <HStack
        justify="center"
        position="relative"
        width="100%"
        height="100%"
        marginRight={5}
      >
        <GalaxyThumbnail galaxyConfig={dbGalaxyToGalaxyConfig(galaxyConfig)} />

        <Text top="0.5rem" left="0.5rem" {...textProps}>
          {galaxyConfig.name}
        </Text>
        <Text top="2.5rem" left="0.5rem" {...textProps}>
          Stars: {galaxyConfig.stars}
        </Text>
        {displayOwnershipTotals && (
          <HStack
            bottom="2.5rem"
            left="0.5rem"
            {...textProps}
            width="calc(100% - 1rem)"
            justify="space-between"
          >
            <Text>My Celestials:</Text>
            <Text>{totalUserOwns}</Text>
          </HStack>
        )}

        {!alreadyJoined && isHovered && (
          <HStack
            position="absolute"
            top={0}
            right={0}
            bottom={0}
            left={0}
            margin="auto !important"
            justify="center"
          >
            <Link as={ReactRouterLink} to={`${galaxyUrl}/join`}>
              <Button
                colorScheme="teal"
                size="sm"
                onClick={() => {
                  galaxyConfigVar(dbGalaxyToGalaxyConfig(galaxyConfig));
                }}
              >
                Join
              </Button>
            </Link>

            <Link as={ReactRouterLink} to={galaxyUrl}>
              <Button
                _hover={{ backgroundColor: 'gray.400' }}
                backgroundColor="gray.500"
                color="white"
                opacity={1}
                size="sm"
              >
                Visit
              </Button>
            </Link>
          </HStack>
        )}

        <HStack
          bottom="0.5rem"
          left="0.5rem"
          {...textProps}
          width="calc(100% - 1rem)"
          justify="space-between"
          color="red.200"
        >
          <Text>Owned Celestials:</Text>
          <Text>{galaxyConfig.celestials.length}</Text>
        </HStack>
      </HStack>
    </Box>
  );
};
