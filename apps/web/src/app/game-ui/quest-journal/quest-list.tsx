import { useReactiveVar } from '@apollo/client';
import {
  Table,
  TableCellProps,
  TableColumnHeaderProps,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
} from '@chakra-ui/react';
import { ActiveGalacticEmpireQuestsSubscription } from '@idleverse/galaxy-gql';
import { useEffect, useState } from 'react';

import {
  activeQuestsVar,
  colorsVar,
  completedQuestsVar,
  questDetailVar,
  questJournalVar,
} from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { QuestRewardThumbnails } from './quest-reward-thumbnail';

export const QuestList = ({ showCompleted }: { showCompleted: boolean }) => {
  const { border, bgDarkSecondary, bgDarkerSecondary } = useUiBackground();

  const { colorMode } = useColorMode();

  const thProps: TableColumnHeaderProps = {
    borderColor: border,
    padding: 2,
    fontSize: '2xs',
    color: colorMode === 'dark' ? 'whiteAlpha.700' : 'blackAlpha.700',
  };

  const tdProps: TableCellProps = {
    borderColor: border,
    padding: 2,
    fontSize: '2xs',
  };

  const [quests, setQuests] = useState<
    ActiveGalacticEmpireQuestsSubscription['galactic_empire_quest']
  >([]);

  const activeQuests = useReactiveVar(activeQuestsVar);
  const completedQuests = useReactiveVar(completedQuestsVar);

  useEffect(() => {
    if (showCompleted) {
      setQuests([...completedQuests, ...activeQuests]);
    } else {
      setQuests(activeQuests);
    }
  }, [completedQuests, activeQuests, showCompleted]);

  const { secondary } = useReactiveVar(colorsVar);

  return (
    <Table variant="simple" fontSize="xs" size="sm">
      <Thead>
        <Tr>
          <Th {...thProps}>Name</Th>
          <Th {...thProps}>Description</Th>
          <Th {...thProps}>Rewards</Th>
        </Tr>
      </Thead>
      <Tbody>
        {quests
          .filter(({ completed }) => (showCompleted ? true : !completed))
          .sort((a, b) => Number(b.completed) - Number(a.completed))
          .map(({ id: empireQuestId, completed, quest, quest_step_id }, i) => (
            <Tr
              key={i}
              // opacity={completed ? 0.75 : 1}
              background={completed ? bgDarkSecondary : bgDarkerSecondary}
              minWidth={['30vw', 'unset']}
              lineHeight="inherit"
              whiteSpace="normal"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              px="8px"
              _hover={{ bg: 'whiteAlpha.300' }}
              _active={{
                bg: `${secondary}.600`,
                borderColor: `${secondary}.700`,
              }}
              cursor="pointer"
              onClick={() => {
                questJournalVar({
                  ...questJournalVar(),
                  state: 'detail',
                });
                questDetailVar({
                  quest,
                  empireQuestId,
                  questStepId: quest_step_id,
                  completed,
                });
              }}
            >
              <Td {...tdProps}>
                <Text as={completed ? 's' : 'span'}>{quest.name}</Text>
              </Td>
              <Td {...tdProps}>
                <Text as={completed ? 's' : 'span'}>{quest.description}</Text>
              </Td>
              <Td {...tdProps}>
                <QuestRewardThumbnails rewards={quest.rewards} detail={false} />
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};
