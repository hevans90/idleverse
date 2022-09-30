import { useReactiveVar } from '@apollo/client';
import {
  Table,
  TableCellProps,
  TableColumnHeaderProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { ActiveGalacticEmpireQuestsSubscription } from '@idleverse/galaxy-gql';
import { useEffect, useState } from 'react';
import { useUiBackground } from '../../hooks/use-ui-background';
import { colorsVar } from '../../_state/colors';
import {
  activeQuestsVar,
  completedQuestsVar,
} from '../../_state/galactic-empire';
import { questDetailVar, questJournalVar } from '../../_state/global-ui';
import { QuestRewardThumbnails } from './quest-reward-thumbnail';

export const QuestList = ({ showCompleted }: { showCompleted: boolean }) => {
  const { border, bgLightSecondary } = useUiBackground();

  const thProps: TableColumnHeaderProps = {
    borderColor: border,
    padding: 2,
    fontSize: 'xxs',
  };

  const tdProps: TableCellProps = {
    borderColor: border,
    padding: 2,
    fontSize: 'xxs',
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
              background={completed ? bgLightSecondary : 'unset'}
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
              <Td {...tdProps}>{quest.name}</Td>
              <Td {...tdProps}>{quest.description}</Td>
              <Td {...tdProps}>
                <QuestRewardThumbnails rewards={quest.rewards} detail={false} />
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};
