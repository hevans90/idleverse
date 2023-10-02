import { useReactiveVar } from '@apollo/client';
import { Box, Button, Checkbox } from '@chakra-ui/react';

import { animateVar, colorsVar } from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { generatorControlsHeight } from './generator-controls';

type Props = {
  role: string;
  saveGalaxyFunction: () => unknown;
};

export const GameUIRightBar = ({ role, saveGalaxyFunction }: Props) => {
  const { bg, border } = useUiBackground();

  const { secondary } = useReactiveVar(colorsVar);

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
      borderBottomWidth={0}
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
          colorScheme={secondary}
          onClick={() => saveGalaxyFunction()}
        >
          Save
        </Button>
      ) : null}
    </Box>
  );
};
