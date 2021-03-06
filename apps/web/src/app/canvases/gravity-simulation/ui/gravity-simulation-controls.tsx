import { useReactiveVar } from '@apollo/client';
import { Box, Button, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { useEffect } from 'react';
import { simulationPaused, timeVar } from '../../../_state/reactive-variables';

export const galaxySimControlsHeight = 80;

export const GravitySimulationControls = () => {
  const color = useColorModeValue('gray.200', 'gray.600');

  const time = useReactiveVar(timeVar);
  const paused = useReactiveVar(simulationPaused);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      className="footer"
      padding="1rem"
      display="flex"
      flexDirection="column"
      bgColor={color}
      position="absolute"
      bottom="0"
      left="0"
      height={`${galaxySimControlsHeight}px`}
      width="100%"
    >
      <HStack>
        <Button onClick={() => timeVar(0)}>
          {time === 0 ? 'Start' : 'Restart'} Simulation
        </Button>
        <Button onClick={() => simulationPaused(!paused)}>
          {paused ? 'Play' : 'Pause'} Simulation
        </Button>
        <Text>{time}</Text>
      </HStack>
    </Box>
  );
};
