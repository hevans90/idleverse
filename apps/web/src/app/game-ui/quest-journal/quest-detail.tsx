import { useMutation, useReactiveVar } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
  HStack,
  StackDivider,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import {
  ActiveGalacticEmpireQuestsSubscription,
  CompleteQuestDocument,
  CompleteQuestMutation,
  CompleteQuestMutationVariables,
  CompleteQuestStepDocument,
  CompleteQuestStepMutation,
  CompleteQuestStepMutationVariables,
  Quest_Reward_Type_Enum,
} from '@idleverse/galaxy-gql';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { useEffect, useState } from 'react';
import { colorsVar } from '../../_state/colors';
import { questDetailVar, questJournalVar } from '../../_state/global-ui';
import { npcsVar } from '../../_state/npcs';
import { resourcesVar } from '../../_state/resources';
import { useUiBackground } from '../../hooks/use-ui-background';
import { QuestRewardThumbnails } from './quest-reward-thumbnail';
import {
  OrderedQuestStepWithIcon,
  generateStepIcon,
  orderSteps,
} from './utils/quest-step-utils';
import { useValidateQuestStep } from './utils/use-validate-quest-step';

const StepCompletionRequirements = ({
  type,
  resource_cost_amount,
  npc_contact_id,
}: ActiveGalacticEmpireQuestsSubscription['galactic_empire_quest'][0]['quest']['steps'][0]) => {
  return <Box></Box>;
};

export const QuestDetail = () => {
  const { border, bgLight } = useUiBackground();
  const { secondary } = useReactiveVar(colorsVar);

  const { quest, questStepId, empireQuestId, completed } =
    useReactiveVar(questDetailVar);

  const npcs = useReactiveVar(npcsVar);
  const resources = useReactiveVar(resourcesVar);

  const [questStep, setQuestStep] = useState<OrderedQuestStepWithIcon>();
  const [stepperSteps, setStepperSteps] =
    useState<OrderedQuestStepWithIcon[]>();

  const stepCompletable = useValidateQuestStep(questStep);

  const toast = useToast();

  const { setStep, activeStep, nextStep } = useSteps({
    initialStep: 0,
  });

  useEffect(() => {
    const steps = orderSteps(quest.steps).map((item) =>
      generateStepIcon(item, npcs, resources)
    );
    const step = steps.find(({ id }) => id === questStepId);
    setQuestStep(step);
    setStepperSteps(steps);
    setStep(step.index);
  }, [quest?.steps, questStepId, npcs, resources]);

  const [completeStep] = useMutation<
    CompleteQuestStepMutation,
    CompleteQuestStepMutationVariables
  >(CompleteQuestStepDocument, {
    onCompleted: (data) => {
      toast({
        title: 'Step completed',
        status: 'success',
      });

      questDetailVar({
        ...questDetailVar(),
        questStepId: data.progressQuestStep.next_step_in_quest_added,
      });

      nextStep();
    },
  });

  const [completeQuest] = useMutation<
    CompleteQuestMutation,
    CompleteQuestMutationVariables
  >(CompleteQuestDocument, {
    onCompleted: (data) => {
      toast({
        title: 'Quest completed!',
        status: 'success',
      });

      data.completeQuest.rewards.forEach((reward) => {
        const rewardType = reward.type as Quest_Reward_Type_Enum;

        let toastTitle: string;

        switch (rewardType) {
          case Quest_Reward_Type_Enum.NpcUnlock: {
            const npc = npcs.find(({ id }) => id === reward.npc_unlock_id);
            toastTitle = `${npc?.name} is now available to contact! 
            Open the NPC contact menu by pressing D or clicking the new button available in the in-game menu.`;
            break;
          }
          case Quest_Reward_Type_Enum.ResourceAccrual: {
            const resource = resources.find(
              ({ id }) => id === reward.resource_accrual_type_id
            );
            toastTitle = `${reward?.resource_accrual_amount} ${resource?.type} gained!`;
            break;
          }
          case Quest_Reward_Type_Enum.ResourceUnlock: {
            const resource = resources.find(
              ({ id }) => id === reward.resource_unlock_id
            );
            toastTitle = `${resource?.type} unlocked!`;
            break;
          }
        }
        toast({
          title: toastTitle,
          status: 'info',
          variant: 'subtle',
          duration: 60000,
          isClosable: true,
        });
      });

      questJournalVar({
        ...questJournalVar(),
        state: 'home',
      });

      questDetailVar({
        quest: undefined,
        empireQuestId: undefined,
        questStepId: undefined,
        completed: undefined,
      });

      nextStep();
    },
  });

  return (
    <VStack width="100%">
      <HStack
        width="100%"
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
              onClickStep={(index) => {
                if (completed) {
                  setStep(index);
                  setQuestStep(stepperSteps.find((x) => x.index === index));
                }
              }}
              orientation="vertical"
            >
              {stepperSteps?.map(({ icon }, i) => (
                <Step key={i} icon={icon}></Step>
              ))}
            </Steps>
          </Flex>
        </VStack>
        <VStack
          flexGrow={1}
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
            width="100%"
            textAlign="start"
            padding={3}
            flexGrow={1}
            fontSize="sm"
            minHeight={['unset', 'unset', '200px']}
          >
            {questStep?.description}
          </Text>
          <HStack width="100%" padding={3} justifyContent="space-between">
            <StepCompletionRequirements {...questStep} />
            <Button
              colorScheme={secondary}
              disabled={!stepCompletable || completed}
              onClick={() =>
                questStep?.final
                  ? completeQuest({ variables: { empireQuestId } })
                  : completeStep({ variables: { empireQuestId } })
              }
            >
              {completed
                ? 'Quest Complete'
                : questStep?.final
                ? 'Complete Quest'
                : 'Complete Step'}
            </Button>
          </HStack>
        </VStack>
      </HStack>
      <QuestRewardThumbnails detail={true} rewards={quest.rewards} />
    </VStack>
  );
};
