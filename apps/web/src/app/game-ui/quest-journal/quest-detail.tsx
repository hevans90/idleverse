import { useReactiveVar } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
  HStack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ActiveGalacticEmpireQuestsSubscription } from '@idleverse/galaxy-gql';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { useEffect, useState } from 'react';
import { useUiBackground } from '../../hooks/use-ui-background';
import { colorsVar } from '../../_state/colors';
import { npcsVar } from '../../_state/npcs';
import { resourcesVar } from '../../_state/resources';
import { QuestRewardThumbnails } from './quest-reward-thumbnail';
import {
  generateStepIcon,
  OrderedQuestStepWithIcon,
  orderSteps,
  QuestStep,
} from './utils/quest-step-utils';

const StepCompletionRequirements = ({
  type,
  resource_cost_amount,
  npc_contact_id,
}: ActiveGalacticEmpireQuestsSubscription['galactic_empire_quest'][0]['quest']['steps'][0]) => {
  return <Box></Box>;
};

export const QuestDetail = ({
  quest,
  questStepId,
}: {
  questStepId: string;
  quest: ActiveGalacticEmpireQuestsSubscription['galactic_empire_quest'][0]['quest'];
}) => {
  const { border, bgLight } = useUiBackground();
  const { secondary } = useReactiveVar(colorsVar);

  const npcs = useReactiveVar(npcsVar);
  const resources = useReactiveVar(resourcesVar);

  const [questStep, setQuestStep] = useState<QuestStep>();
  const [stepperSteps, setStepperSteps] =
    useState<OrderedQuestStepWithIcon[]>();

  useEffect(() => {
    setQuestStep(quest.steps.find(({ id }) => id === questStepId));
    setStepperSteps(
      orderSteps(quest.steps).map((item) =>
        generateStepIcon(item, npcs, resources)
      )
    );
  }, [quest.steps, questStepId]);

  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  return (
    <VStack width="100%">
      <HStack
        minHeight={['unset', 'unset', '200px']}
        borderBottomStyle="solid"
        borderBottomWidth={1}
        borderBottomColor={border}
        divider={
          <StackDivider borderColor={border} margin="unset !important" />
        }
        alignItems="stretch"
      >
        <VStack padding={4} paddingRight={3} alignItems="start" bg={bgLight}>
          <Flex flexDir="column" minWidth="45px">
            <Steps
              color="white"
              colorScheme={secondary}
              activeStep={activeStep}
              onClickStep={(step) => setStep(step)}
              orientation="vertical"
            >
              {stepperSteps?.map(({ icon }, i) => (
                <Step key={i} icon={icon}></Step>
              ))}
            </Steps>
          </Flex>
        </VStack>
        <VStack
          divider={
            <StackDivider
              borderColor={border}
              justifyContent="stretch"
              margin="unset !important"
            />
          }
        >
          <HStack width="100%" padding={3} justifyContent="start">
            <Text fontWeight="bold" fontSize="sm" opacity={0.5}>
              Current Step
            </Text>
          </HStack>
          <Text
            padding={3}
            flexGrow={1}
            fontSize="sm"
            minHeight={['unset', 'unset', '200px']}
          >
            {questStep?.description}
          </Text>
          <HStack width="100%" padding={3} justifyContent="space-between">
            <StepCompletionRequirements {...questStep} />
            <Button colorScheme={secondary}>Complete Step</Button>
          </HStack>
        </VStack>
      </HStack>
      <QuestRewardThumbnails detail={true} rewards={quest.rewards} />
    </VStack>
  );
};
