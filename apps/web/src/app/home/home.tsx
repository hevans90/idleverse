import { useReactiveVar, useSubscription } from '@apollo/client';
import {
  Box,
  Button,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

import {
  GalacticEmpiresByUserIdDocument,
  GalacticEmpiresByUserIdSubscription,
  GalacticEmpiresByUserIdSubscriptionVariables,
} from '@idleverse/galaxy-gql';
import { Link as ReactRouterLink } from 'react-router-dom';

import { responsiveFontProps } from '../_responsive-utils/font-props';

import { colorsVar, layoutVar, roleVar, selfVar } from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { AnimatedFrame, AnimatedText, BlinkingText } from '@idleverse/ui';

export const Home = () => {
  const { id: userId } = useReactiveVar(selfVar);

  const { rawBgDarker, borderSecondary, rawBorderSecondary } =
    useUiBackground();

  const { secondary } = useReactiveVar(colorsVar);

  const role = useReactiveVar(roleVar);

  const { sideNav } = useReactiveVar(layoutVar);

  const secondaryTextColor = useColorModeValue(
    `${secondary}.900`,
    `${secondary}.300`
  );
  const redTextColor = useColorModeValue('red.900', 'red.300');
  const hoverCol = useColorModeValue(`${secondary}.900`, `${secondary}.200`);
  const hoverBg = useColorModeValue(`${secondary}.300`, `${secondary}.800`);

  const customHover = {
    _hover: {
      textDecor: 'unset',
      background: hoverBg,
      color: hoverCol,
    },
  };

  const { data, loading: loadingGameplaySessions } = useSubscription<
    GalacticEmpiresByUserIdSubscription,
    GalacticEmpiresByUserIdSubscriptionVariables
  >(GalacticEmpiresByUserIdDocument, { variables: { userId } });

  return (
    <Box
      height={`calc(100% - 1rem)`}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      margin="0 1rem 1rem 1rem"
    >
      <VStack justify="end" flexGrow={1} marginBottom={10}>
        <AnimatedText
          animationType="decipher"
          textAlign="center"
          display="block"
          fontSize={['2xl', '3xl']}
          content="Idleverse"
        >
          <BlinkingText interval={0.9} fontSize={['2xl', '3xl']}>
            .
          </BlinkingText>
        </AnimatedText>
      </VStack>

      <Stack
        direction={['column', 'column', 'column', 'row']}
        width="100%"
        divider={<StackDivider borderColor={borderSecondary} />}
        align="start"
        spacing={5}
        flexGrow={2}
        maxHeight={['80vh', '80vh', '80vh', '70vh']}
      >
        <HStack
          flexGrow={1}
          flexBasis={0}
          width="100%"
          justify={['center', 'center', 'center', 'end']}
        >
          <VStack
            divider={<StackDivider borderColor={borderSecondary} />}
            spacing={5}
            width={['100%', 'unset']}
          >
            <Link as={ReactRouterLink} to="/showreel" width="100%">
              <Button width="100%" {...responsiveFontProps}>
                Beta showreel
              </Button>
            </Link>
            <Link as={ReactRouterLink} to="/galaxy-gen" width="100%">
              <Button
                width="100%"
                {...responsiveFontProps}
                isDisabled={role !== 'dev'}
              >
                Make a galaxy
              </Button>
            </Link>
            <Link as={ReactRouterLink} to="/galaxies" width="100%">
              <Button
                width="100%"
                {...responsiveFontProps}
                colorScheme={secondary}
              >
                Join a galaxy
              </Button>
            </Link>
          </VStack>
        </HStack>

        <VStack
          alignItems={['center', 'center', 'center', 'start']}
          flexGrow={sideNav ? 2 : 1}
          flexBasis={0}
          align="center"
          height={['75%', '75%', '75%', '100%']}
        >
          {loadingGameplaySessions ? <>Loading</> : null}
          {!loadingGameplaySessions && data.galactic_empire.length > 0 ? (
            <>
              <Text marginBottom={5} textAlign="center">
                You have {data.galactic_empire.length} galactic&nbsp;
                {data.galactic_empire.length === 1 ? 'empire' : 'empires'}
              </Text>

              <SimpleGrid
                width="90%"
                maxWidth={['unset', 'unset', 'unset', '1000px']}
                minChildWidth={250}
                spacing={5}
                overflow="auto"
              >
                {data.galactic_empire.map(
                  (
                    {
                      galaxy: { name, id: galaxyId },
                      celestials: ownedCelestials,
                    },
                    i
                  ) => (
                    <AnimatedFrame
                      key={i}
                      show
                      bg={rawBgDarker}
                      border={rawBorderSecondary}
                    >
                      <VStack
                        key={i}
                        minHeight="20vh"
                        height="100%"
                        padding={3}
                        align="start"
                        overflow="hidden"
                      >
                        <VStack
                          width="100%"
                          align="start"
                          fontSize={['2xs', 'xs', 'xs', 'sm']}
                        >
                          <HStack width="100%" justifyContent="space-between">
                            <Text>Galaxy:</Text>
                            <Text
                              whiteSpace="nowrap"
                              overflow="hidden"
                              textOverflow="ellipsis"
                            >
                              {name}
                            </Text>
                          </HStack>
                          <HStack width="100%" justifyContent="space-between">
                            <Text>Systems:</Text>
                            <Text color={secondaryTextColor}>
                              {ownedCelestials.length}
                            </Text>
                          </HStack>
                        </VStack>
                        <SimpleGrid
                          width="100%"
                          minChildWidth={100}
                          spacing={2}
                          maxHeight="200px"
                          overflow="auto"
                        >
                          {ownedCelestials.map(({ name, planets }, i) => (
                            <Link
                              key={name}
                              as={ReactRouterLink}
                              to={`/celestials/${name}`}
                              borderRadius="3px"
                              borderWidth="1px"
                              borderStyle="solid"
                              padding={2}
                              {...customHover}
                            >
                              <Text fontSize="xs" marginBottom={1}>
                                {name}
                              </Text>
                              {planets.length >= 1 ? (
                                <Text fontSize="2xs" color={secondaryTextColor}>
                                  {planets.length}&nbsp;
                                  {planets.length > 1 ? 'planets' : 'planet'}
                                </Text>
                              ) : (
                                <Text fontSize="2xs" color={redTextColor}>
                                  no planets
                                </Text>
                              )}
                            </Link>
                          ))}
                        </SimpleGrid>

                        <VStack flexGrow={1} justify="end" width="100%">
                          <Link
                            width="100%"
                            as={ReactRouterLink}
                            to={`/galaxies/${name}`}
                          >
                            <Button width="100%" {...responsiveFontProps}>
                              Visit
                            </Button>
                          </Link>
                        </VStack>
                      </VStack>
                    </AnimatedFrame>
                  )
                )}
              </SimpleGrid>
            </>
          ) : null}
        </VStack>
      </Stack>
    </Box>
  );
};
