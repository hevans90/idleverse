import { Avatar, HStack, Kbd, Text, VStack } from '@chakra-ui/react';
import { RoomState } from '@idleverse/colyseus-shared';
import { useUiBackground } from '../../../hooks/use-ui-background';

type IndicatorProps = {
  left: boolean;
  up: boolean;
  down: boolean;
  right: boolean;
};

const ArrowKeyIndicators = ({ left, up, down, right }: IndicatorProps) => {
  const { bgLightSecondary } = useUiBackground();

  return (
    <HStack mr={2}>
      <Kbd bg={left ? bgLightSecondary : 'unset'}>&#11013;</Kbd>
      <VStack spacing={1}>
        <Kbd bg={up ? bgLightSecondary : 'unset'}>&#11014;</Kbd>
        <Kbd bg={down ? bgLightSecondary : 'unset'}>&#11015;</Kbd>
      </VStack>
      <Kbd bg={right ? bgLightSecondary : 'unset'}>&#11157;</Kbd>
    </HStack>
  );
};

export const ColyseusSocial = ({
  connectedUsers,
  impulses,
}: {
  connectedUsers: RoomState['connectedUsers'];
  impulses: RoomState['impulses'];
}) => {
  const { bg, border } = useUiBackground();

  return (
    <VStack
      spacing={5}
      padding="1rem"
      position="absolute"
      alignItems="start"
      bgColor={bg}
      top="0"
      right="0"
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      borderTop="unset"
      borderRight="unset"
    >
      {connectedUsers.map(({ avatarUrl, displayName, colyseusUserId }, i) => (
        <HStack key={i}>
          <ArrowKeyIndicators
            {...impulses.find(
              (impulse) => impulse.colyseusUserId === colyseusUserId
            )}
          />
          <Avatar size="md" src={avatarUrl} mr={2} name={displayName} />
          <Text mr="1rem" flexGrow={1}>
            {displayName}
          </Text>
        </HStack>
      ))}
    </VStack>
  );
};
