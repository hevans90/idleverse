import { Box, Button, SimpleGrid } from '@chakra-ui/react';
import { characterCreationVar } from '../_state/character-creation';
import { creationStep } from './creation-types';

const WorkflowButton = ({
  stepName,
  onClick,
  displayName,
  disabled,
  value,
}: {
  stepName: creationStep;
  displayName?: string;
  disabled?: boolean;
  onClick: (stepName: creationStep) => unknown;
  value?: string;
}) => {
  return (
    <Box
      as={Button}
      height="125px"
      minWidth={['unset']}
      maxWidth={['40vw', '30vw', '20vw']}
      lineHeight="inherit"
      whiteSpace="normal"
      disabled={disabled || false}
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      px="8px"
      borderRadius="3px"
      fontWeight="semibold"
      fontSize={['xxs', 'xs', 'xs', 'sm', 'md']}
      bg={value ? 'teal.600' : 'whiteAlpha.200'}
      color="white.900"
      _hover={{ bg: 'whiteAlpha.300' }}
      _active={{
        bg: 'whiteAlpha.300',
        transform: 'scale(0.98)',
        borderColor: 'teal.700',
      }}
      paddingInlineStart={4}
      paddingInlineEnd={4}
      onClick={() => onClick(stepName)}
    >
      {value || displayName || stepName}
    </Box>
  );
};

export const CreationWorkflow = ({
  onStepClicked,
  value: { race },
}: {
  onStepClicked: (step: creationStep) => unknown;
  value: ReturnType<typeof characterCreationVar>;
}) => {
  return (
    <SimpleGrid
      width={['95%', '95%', '95%', '95%', '95%', '70%']}
      minChildWidth="120px"
      spacing={3}
    >
      <WorkflowButton
        onClick={() => onStepClicked('race')}
        stepName="race"
        value={race?.name}
      />
      <WorkflowButton
        onClick={() => onStepClicked('background')}
        stepName="background"
      />
      <WorkflowButton
        onClick={() => onStepClicked('faction')}
        stepName="faction"
      />
      <WorkflowButton
        onClick={() => onStepClicked('homeworld')}
        stepName="homeworld"
        displayName="generate homeworld"
      />
      <WorkflowButton
        onClick={() => onStepClicked('start')}
        stepName="start"
        displayName="begin your journey"
        disabled={true}
      />
    </SimpleGrid>
  );
};