import { Box, Button, Checkbox, useColorModeValue } from '@chakra-ui/react';
import { animateVar } from '../../../_state/reactive-variables';
import { generatorControlsHeight } from './generator-controls';

type Props = {
  role: string;
  saveGalaxyFunction: () => unknown;
};

export const GameUIRightBar = ({ role, saveGalaxyFunction }: Props) => {
  const bg = useColorModeValue('gray.300', 'gray.700');
  const border = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      padding="1rem"
      display="flex"
      flexDirection="column"
      position="absolute"
      alignItems="start"
      bgColor={bg}
      bottom={generatorControlsHeight}
      right="0"
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      borderRight="unset"
    >
      <Checkbox
        checked={animateVar()}
        onChange={() => animateVar(!animateVar())}
      >
        Animate
      </Checkbox>
      {role === 'dev' ? (
        <Button
          width="100%"
          marginTop="1rem"
          colorScheme="teal"
          onClick={() => saveGalaxyFunction()}
        >
          Save
        </Button>
      ) : null}
    </Box>
  );
};
