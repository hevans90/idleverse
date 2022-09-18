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
import {
  activeQuestsVar,
  completedQuestsVar,
} from '../../_state/galactic-empire';

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
          .map(({ completed, quest: { name, description, rewards } }, i) => (
            <Tr key={i} bg={completed ? bgLightSecondary : 'unset'}>
              <Td {...tdProps}>{name}</Td>
              <Td {...tdProps}>{description}</Td>
              <Td {...tdProps}>{}</Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};
