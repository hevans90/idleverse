import { useSubscription } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  Button,
  HStack,
  Link,
  SimpleGrid,
  StackDivider,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import {
  OngoingGalaxySessionsDocument,
  OngoingGalaxySessionsSubscription,
} from '@idleverse/galaxy-gql';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Loading } from '../components/loading';

export const Home = () => {
  const { user } = useAuth0();

  const bgCol = useColorModeValue('gray.400', 'gray.900');
  const tealTextColor = useColorModeValue('teal.900', 'teal.300');
  const redTextColor = useColorModeValue('red.900', 'red.300');
  const border = useColorModeValue('gray.200', 'gray.600');
  const hoverCol = useColorModeValue('teal.900', 'teal.200');
  const hoverBg = useColorModeValue('teal.300', 'teal.800');

  const customHover = {
    _hover: {
      textDecor: 'unset',
      background: hoverBg,
      color: hoverCol,
    },
  };

  const { data, loading: loadingGameplaySessions } =
    useSubscription<OngoingGalaxySessionsSubscription>(
      OngoingGalaxySessionsDocument,
      { variables: { id: user.sub } }
    );

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
        <Text fontSize="5xl" textAlign="center" marginBottom={10}>
          Welcome back commander.
        </Text>
      </VStack>

      <HStack
        width="100%"
        divider={<StackDivider />}
        align="start"
        spacing={5}
        flexGrow={2}
        maxHeight="70vh"
      >
        <HStack width="50%" justify="end">
          <VStack divider={<StackDivider />} spacing={5}>
            <Link as={ReactRouterLink} to="/showreel">
              <Button size="lg">Old showreel</Button>
            </Link>
            <Link as={ReactRouterLink} to="/galaxy-gen">
              <Button size="lg">Make a galaxy</Button>
            </Link>
            <Link as={ReactRouterLink} to="/galaxies">
              <Button size="lg" colorScheme="teal">
                Join a galaxy
              </Button>
            </Link>
          </VStack>
        </HStack>

        <VStack width="50%" align="start" height="100%">
          <>
            <Text marginBottom={5}>
              You have {data.galaxy_aggregate.nodes.length} galactic&nbsp;
              {data.galaxy_aggregate.nodes.length === 1 ? 'empire' : 'empires'}.
            </Text>

            <SimpleGrid
              padding={2}
              columns={2}
              spacing={5}
              overflow="auto"
              borderWidth="1px"
              borderStyle="solid"
              borderColor={border}
            >
              {data.galaxy_aggregate.nodes.map(
                (
                  {
                    name,
                    id: galaxyId,
                    celestials_aggregate: { nodes: ownedCelestials },
                  },
                  i
                ) => (
                  <Box
                    key={i}
                    bgColor={bgCol}
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor={border}
                    minHeight="20vh"
                  >
                    <VStack height="100%" padding={3} align="start">
                      <VStack width="100%" align="start">
                        <HStack width="100%" justifyContent="space-between">
                          <Text fontSize="sm">Galaxy Name:</Text>
                          <Text fontSize="sm">{name}</Text>
                        </HStack>
                        <HStack width="100%" justifyContent="space-between">
                          <Text fontSize="sm">Owned celestials:</Text>
                          <Text fontSize="sm" color={tealTextColor}>
                            {ownedCelestials.length}
                          </Text>
                        </HStack>
                      </VStack>
                      <SimpleGrid
                        width="100%"
                        columns={2}
                        spacing={2}
                        maxHeight="200px"
                        overflow="scroll"
                      >
                        {ownedCelestials.map(
                          (
                            { id, name, planets_aggregate: { nodes: planets } },
                            i
                          ) => (
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
                                <Text fontSize="xxs" color={tealTextColor}>
                                  {planets.length}{' '}
                                  {planets.length > 1 ? 'planets' : 'planet'}
                                </Text>
                              ) : (
                                <Text fontSize="xxs" color={redTextColor}>
                                  no planets
                                </Text>
                              )}
                            </Link>
                          )
                        )}
                      </SimpleGrid>

                      <VStack flexGrow={1} justify="end" width="100%">
                        <Link
                          width="100%"
                          as={ReactRouterLink}
                          to={`/galaxies/${galaxyId}`}
                        >
                          <Button width="100%">Go to Galaxy</Button>
                        </Link>
                      </VStack>
                    </VStack>
                  </Box>
                )
              )}
            </SimpleGrid>
          </>
        </VStack>
      </HStack>
    </Box>
  );
};
