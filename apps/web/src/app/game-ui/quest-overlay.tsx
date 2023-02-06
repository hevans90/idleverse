import { useReactiveVar } from '@apollo/client';
import {
  Heading,
  StackDivider,
  StackProps,
  Text,
  VStack,
} from '@chakra-ui/react';
import { responsiveFontProps } from '../_responsive-utils/font-props';
import { activeQuestsVar } from '../_state/galactic-empire';
import { globalUiVar } from '../_state/global-ui';
import { useUiBackground } from '../hooks/use-ui-background';

type QuestOverlayProps = StackProps;

export const QuestOverlay = ({ ...stackProps }: QuestOverlayProps) => {
  const { bg, border } = useUiBackground();

  const activeQuests = useReactiveVar(activeQuestsVar);

  return (
    <VStack
      {...stackProps}
      bgColor={bg}
      borderColor={border}
      borderStyle="dashed"
      maxWidth={['50%', '45%', '40%', '35%', '30%']}
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
      {activeQuests.map((questData) => (
        <VStack width="100%" alignItems="start">
          <Heading size={['xxs', 'xs']}>
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
    </VStack>
  );
};
