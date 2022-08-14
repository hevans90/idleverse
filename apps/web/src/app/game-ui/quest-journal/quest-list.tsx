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
import { useUiBackground } from '../../hooks/use-ui-background';

export const QuestList = ({
  quests,
  showCompleted,
}: {
  quests?: { name: string; desc: string; rewards: any[]; completed: boolean }[];
  showCompleted: boolean;
}) => {
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

  quests = [
    {
      name: 'Learning the ropes',
      desc: 'Learn the game',
      rewards: [],
      completed: false,
    },
    {
      name: 'Basic Mining',
      desc: 'Talk to the prospector guild about common metal production',
      rewards: [],
      completed: true,
    },
    {
      name: 'Basic Ecology',
      desc: 'Talk to the ecologist guild about hydrocarbons',
      rewards: [],
      completed: true,
    },
  ];

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
          .map(({ name, desc, rewards, completed }, i) => (
            <Tr key={i} bg={completed ? bgLightSecondary : 'unset'}>
              <Td {...tdProps}>{name}</Td>
              <Td {...tdProps}>{desc}</Td>
              <Td {...tdProps}>{JSON.stringify(rewards)}</Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};
