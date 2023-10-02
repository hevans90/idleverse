import { useReactiveVar } from '@apollo/client';
import { Box, Button, HStack, Text } from '@chakra-ui/react';
import { simulationPaused, timeVar } from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { useEffect } from 'react';

export const galaxySimControlsHeight = 80;

export const GravitySimulationControls = () => {
  const { bg, border } = useUiBackground();

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
      bgColor={bg}
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      borderBottomWidth={0}
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
