import { useReactiveVar } from '@apollo/client';
import { Box, Button, Link, Text, VStack } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { colorsVar } from '../_state/colors';

export const Showreel = () => {
  const { secondary } = useReactiveVar(colorsVar);

  const links: { route: string; display: string }[] = [
    {
      route: 'galaxies',
      display: 'Galaxy Gallery',
    },
    {
      route: 'galaxy-gen',
      display: 'Galaxy Generator',
    },
    {
      route: 'solar-system',
      display: 'Solar System Viewer',
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
        Old Showreel Projects
      </Text>
      <Text fontSize="l" textAlign="center" marginBottom="2rem">
        Legacy experiments that are mostly outdated now.
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
