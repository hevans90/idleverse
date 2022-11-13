import { useReactiveVar } from '@apollo/client';
import { Box, Button, Link, Text, VStack } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { colorsVar } from '../_state/colors';

export const Showreel = () => {
  const { secondary } = useReactiveVar(colorsVar);

  const links: { route: string; display: string }[] = [
    {
      route: 'galaxy-gen',
      display: 'Galaxy Generator',
    },
    {
      route: 'gravity-sim',
      display: '2D Gravity Simulation',
    },
    {
      route: 'planet-gen',
      display: '3D Planet Generator',
    },
    {
      route: 'isometric-tiles',
      display: 'Isometric Tiles',
    },
    {
      route: 'colyseus-poc',
      display: 'Colyseus POC',
    },
    {
      route: 'pixi-tree',
      display: 'Tree',
    },
  ];

  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      margin="0 1rem 0 1rem"
    >
      <Text fontSize="5xl" textAlign="center" marginBottom="2rem">
        Showreel Projects
      </Text>
      <Text fontSize="l" textAlign="center" marginBottom="2rem">
        Projects that have ongoing experimental development.
      </Text>

      <VStack>
        {links.map(({ route, display }, i) => (
          <Link as={ReactRouterLink} key={i} to={`/${route}`}>
            <Button colorScheme={secondary} height="40px">
              {display}
            </Button>
          </Link>
        ))}
      </VStack>
    </Box>
  );
};
