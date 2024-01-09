import { useReactiveVar } from '@apollo/client';
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
import { Stage } from '@pixi/react';
import { useEffect, useRef, useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { colorsVar, galaxyConfigVar } from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { UnderlinedFrame } from '@idleverse/ui';
import { GalaxyThumbnail } from '../canvases/galaxy-thumbnail/galaxy-thumbnail';

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
  const { primary, secondary } = useReactiveVar(colorsVar);
  const { bgDarker } = useUiBackground();

  const col = useColorModeValue(`${secondary}.500`, `${secondary}.300`);

  const hoverCol = useColorModeValue(`${secondary}.300`, `${secondary}.200`);
  const hoverBg = useColorModeValue(`${primary}.800`, `${primary}.700`);

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
    fontSize: '2xs',
    bgColor: 'gray.600',
    padding: 1,
    paddingTop: 1.5,
    opacity: 0.85,
    margin: 'unset !important',
  };

  const [tileWidth, setTileWidth] = useState(0);
  const [tileHeight, setTileHeight] = useState(0);

  const tileContainerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      setTileWidth(event[0].contentBoxSize[0].inlineSize);
      setTileHeight(event[0].contentBoxSize[0].blockSize);
    });

    if (tileContainerRef) {
      resizeObserver.observe(tileContainerRef.current);
    }
  }, [tileContainerRef]);

  return (
    <UnderlinedFrame>
      <Box
        ref={tileContainerRef}
        bgColor={bgDarker}
        id="tile-container"
        display="block"
        height={[150, 200, 250]}
        width={[150, 200, 250]}
        maxW={[150, 200, 250]}
        key={galaxyConfig.id}
        color={col}
        {...customHover}
        onTouchStart={onHover}
        onMouseEnter={onHover}
        onMouseLeave={onHoverEnd}
        as={alreadyJoined ? alreadyJoinedProps.as : null}
        to={alreadyJoined ? alreadyJoinedProps.to : null}
      >
        <HStack justify="center" width="100%" height="100%">
          <Stage
            height={tileHeight}
            width={tileWidth}
            options={{
              antialias: true,
              backgroundAlpha: 0,
            }}
          >
            <GalaxyThumbnail
              galaxyConfig={dbGalaxyToGalaxyConfig(galaxyConfig)}
            />
          </Stage>

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
                  colorScheme={secondary}
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
    </UnderlinedFrame>
  );
};
