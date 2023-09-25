import {
  Avatar,
  CircularProgress,
  HStack,
  Kbd,
  Text,
  VStack,
} from '@chakra-ui/react';
import { RoomState } from '@idleverse/colyseus-shared';
import { useUiBackground } from '@idleverse/theme';

type IndicatorProps = {
  left: boolean;
  up: boolean;
  down: boolean;
  right: boolean;
  connected: boolean;
};

const ArrowKeyIndicators = ({
  left,
  up,
  down,
  right,
  connected,
}: IndicatorProps) => {
  const { bgLightSecondary } = useUiBackground();

  return (
    <HStack mr={2} opacity={connected ? 1 : 0.5}>
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
      {connectedUsers.map(
        ({ avatarUrl, displayName, colyseusUserId, connected }, i) => (
          <HStack key={i}>
            <ArrowKeyIndicators
              connected={connected}
              {...impulses.find(
                (impulse) => impulse.colyseusUserId === colyseusUserId
              )}
            />
            {connected && (
              <Avatar size="md" src={avatarUrl} mr={2} name={displayName} />
            )}
            {!connected && <CircularProgress isIndeterminate color={border} />}
            <Text mr="1rem" flexGrow={1} opacity={connected ? 1 : 0.5}>
              {displayName}
            </Text>
          </HStack>
        )
      )}
    </VStack>
  );
};
