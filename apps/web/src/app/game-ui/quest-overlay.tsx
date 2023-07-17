import { useReactiveVar } from '@apollo/client';
import {
  Heading,
  StackDivider,
  StackProps,
  Text,
  VStack,
} from '@chakra-ui/react';

import { activeQuestsVar, globalUiVar } from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { responsiveFontProps } from '../_responsive-utils/font-props';

type QuestOverlayProps = StackProps;

export const QuestOverlay = ({ ...stackProps }: QuestOverlayProps) => {
  const { bg, border } = useUiBackground();

  const activeQuests = useReactiveVar(activeQuestsVar);

  return (
    <VStack
      {...stackProps}
      display={['none', 'block']}
      bgColor={bg}
      borderColor={border}
      borderStyle="dashed"
      maxWidth={['unset', '65%', '40%', '35%', '30%']}
      padding={[1, 3, 5]}
      paddingTop={[3, 5, 7]}
      divider={<StackDivider borderColor={border} />}
      spacing={5}
      opacity={0.75}
      _hover={{ opacity: 1 }}
      cursor="pointer"
      onClick={() => {
        globalUiVar({ ...globalUiVar(), questJournalOpen: true });
      }}
    >
      {activeQuests.map((questData, i) => (
        <VStack key={i} width="100%" alignItems="start">
          <Heading size="xs">
            <u>{questData.quest?.name}</u>
          </Heading>
          <Text {...responsiveFontProps}>
            {
              questData.quest.steps.find(
                (step) => step.id === questData.quest_step_id
              ).description
            }
          </Text>
        </VStack>
      ))}
      {activeQuests.length === 0 && (
        <Heading size="xs">No active quests</Heading>
      )}
    </VStack>
  );
};
