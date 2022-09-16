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
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import {
  GalacticEmpiresByUserIdDocument,
  GalacticEmpiresByUserIdSubscription,
  GalacticEmpiresByUserIdSubscriptionVariables,
} from '@idleverse/galaxy-gql';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Loading } from '../components/loading';
import { useUiBackground } from '../hooks/use-ui-background';
import { responsiveFontProps } from '../_responsive-utils/font-props';
import { colorsVar } from '../_state/colors';
import { roleVar, selfVar } from '../_state/reactive-variables';

export const Home = () => {
  const { id: userId } = useReactiveVar(selfVar);

  const { bgDarker, border } = useUiBackground();

  const { secondary } = useReactiveVar(colorsVar);

  const role = useReactiveVar(roleVar);

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

  if (loadingGameplaySessions)
    return <Loading text="Loading gameplay sessions"></Loading>;

  return (
    <Box
      height={`calc(100% - 1rem)`}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      margin="0 1rem 1rem 1rem"
    >
      <VStack justify="end" flexGrow={1}>
        <Text
          fontSize={['xl', '2xl', '3xl', '4xl', '5xl']}
          textAlign="center"
          marginBottom={[10, 20]}
        >
          Welcome back commander.
        </Text>
      </VStack>

      <Stack
        direction={['column', 'column', 'column', 'row']}
        width="100%"
        divider={<StackDivider />}
        align="start"
        spacing={5}
        flexGrow={2}
        maxHeight={['80vh', '80vh', '80vh', '70vh']}
      >
        <HStack
          width={['100%', '100%', '100%', '50%']}
          justify={['center', 'center', 'center', 'end']}
        >
          <VStack divider={<StackDivider />} spacing={5}>
            <Link as={ReactRouterLink} to="/showreel">
              <Button {...responsiveFontProps}>Old showreel</Button>
            </Link>
            <Link as={ReactRouterLink} to="/galaxy-gen">
              <Button {...responsiveFontProps} disabled={role !== 'dev'}>
                Make a galaxy
              </Button>
            </Link>
            <Link as={ReactRouterLink} to="/galaxies">
              <Button {...responsiveFontProps} colorScheme={secondary}>
                Join a galaxy
              </Button>
            </Link>
          </VStack>
        </HStack>

        <VStack
          width={['100%', '100%', '100%', '50%']}
          align={['center', 'center', 'center', 'start']}
          height={['75%', '75%', '75%', '100%']}
        >
          <>
            <Text marginBottom={5} textAlign="center">
              You have {data.galactic_empire.length} galactic&nbsp;
              {data.galactic_empire.length === 1 ? 'empire' : 'empires'}.
            </Text>

            {data.galactic_empire.length > 0 && (
              <SimpleGrid
                padding={2}
                columns={2}
                spacing={5}
                overflow="auto"
                borderWidth="1px"
                borderStyle="solid"
                borderColor={border}
              >
                {data.galactic_empire.map(
                  (
                    {
                      galaxy: { name, id: galaxyId },
                      celestials: ownedCelestials,
                    },
                    i
                  ) => (
                    <Box
                      key={i}
                      bgColor={bgDarker}
                      borderWidth="1px"
                      borderStyle="solid"
                      borderColor={border}
                      minHeight="20vh"
                    >
                      <VStack height="100%" padding={3} align="start">
                        <VStack
                          width="100%"
                          align="start"
                          fontSize={['xxs', 'xs', 'xs', 'sm']}
                        >
                          <HStack width="100%" justifyContent="space-between">
                            <Text>Galaxy Name:</Text>
                            <Text>{name}</Text>
                          </HStack>
                          <HStack width="100%" justifyContent="space-between">
                            <Text>Owned celestials:</Text>
                            <Text color={secondaryTextColor}>
                              {ownedCelestials.length}
                            </Text>
                          </HStack>
                        </VStack>
                        <SimpleGrid
                          width="100%"
                          columns={2}
                          spacing={2}
                          maxHeight="200px"
                          overflow="auto"
                        >
                          {ownedCelestials.map(({ id, name, planets }, i) => (
                            <Link
                              key={i}
                              as={ReactRouterLink}
                              to={`/celestials/${id}`}
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
                                <Text fontSize="xxs" color={secondaryTextColor}>
                                  {planets.length}{' '}
                                  {planets.length > 1 ? 'planets' : 'planet'}
                                </Text>
                              ) : (
                                <Text fontSize="xxs" color={redTextColor}>
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
                            to={`/galaxies/${galaxyId}`}
                          >
                            <Button width="100%" {...responsiveFontProps}>
                              Go to Galaxy
                            </Button>
                          </Link>
                        </VStack>
                      </VStack>
                    </Box>
                  )
                )}
              </SimpleGrid>
            )}
          </>
        </VStack>
      </Stack>
    </Box>
  );
};
