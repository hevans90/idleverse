import { Avatar, HStack, Text, VStack } from '@chakra-ui/react';
import { RoomState } from '@idleverse/colyseus-shared';
import { useUiBackground } from '../../../hooks/use-ui-background';

export const ColyseusSocial = ({
  connectedUsers,
}: {
  connectedUsers: RoomState['connectedUsers'];
}) => {
  const { bg, border } = useUiBackground();

  return (
    <VStack
      spacing={5}
      padding="1rem"
      position="absolute"
      alignItems="start"
      bgColor={bg}
      bottom="30vh"
      right="0"
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      borderRight="unset"
      height={300}
    >
      <Text>Social</Text>
      {connectedUsers.map(({ avatarUrl, displayName }, i) => (
        <HStack key={i}>
          <Avatar size="md" src={avatarUrl} mr={2} name={displayName} />
          <Text mr="1rem" flexGrow={1}>
            {displayName}
          </Text>
        </HStack>
      ))}
    </VStack>
  );
};
