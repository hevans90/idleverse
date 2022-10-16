import { Box, Button, Code, VStack } from '@chakra-ui/react';
import { RoomState } from '@idleverse/colyseus-shared';
import { useEffect } from 'react';
import { useUiBackground } from '../../../hooks/use-ui-background';

export const colyseusGameInfoHeight = 160;

export const ColyseusGameInfo = ({
  joined,
  joiningInProgress,
  leavingInProgress,
  joinCallback,
  leaveCallback,
  roomState,
}: {
  joined: boolean;
  joiningInProgress: boolean;
  leavingInProgress: boolean;
  joinCallback: () => void;
  leaveCallback: () => void;
  roomState: Pick<RoomState, 'connectedUsers' | 'patchFrames'>;
}) => {
  const { bg, border } = useUiBackground();

  useEffect(() => {
    console.log('updated', roomState);
  }, [roomState]);

  return (
    <Box
      padding="1rem"
      display="flex"
      position="absolute"
      alignItems="start"
      bgColor={bg}
      bottom={0}
      left="0"
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      borderLeft="unset"
      borderRight="unset"
      borderBottom="unset"
      width="100%"
      height={colyseusGameInfoHeight}
    >
      <VStack alignItems="start">
        {!roomState && (
          <Button
            onClick={joinCallback}
            disabled={joined}
            isLoading={joiningInProgress}
            loadingText="Joining..."
          >
            Join
          </Button>
        )}
        {roomState && (
          <>
            <Button
              onClick={leaveCallback}
              isLoading={leavingInProgress}
              loadingText="Quitting..."
            >
              Quit
            </Button>
            <Code>{roomState.connectedUsers.length} users connected</Code>
            <Code>{roomState.patchFrames} server patch frames</Code>
          </>
        )}
      </VStack>
    </Box>
  );
};
