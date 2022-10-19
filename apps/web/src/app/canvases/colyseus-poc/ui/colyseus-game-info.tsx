import { Box, Button, Code, VStack } from '@chakra-ui/react';
import { RoomState } from '@idleverse/colyseus-shared';
import { useUiBackground } from '../../../hooks/use-ui-background';

export const colyseusGameInfoHeight = 200;

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
  roomState: Pick<
    RoomState,
    'connectedUsers' | 'patchFrames' | 'impulses' | 'ships' | 'spawnLocations'
  >;
}) => {
  const { bg, border } = useUiBackground();

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
            disabled={joined || joiningInProgress}
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
              disabled={leavingInProgress}
              isLoading={leavingInProgress}
              loadingText="Quitting..."
            >
              Quit
            </Button>
            {/* <Code>{roomState.connectedUsers.length} users connected</Code> */}
            {/* <Code>{roomState.patchFrames} server patch frames</Code> */}
            {/* <Code>{JSON.stringify(roomState.spawnLocations, null, 2)}</Code> */}
            <Code width="100%">{JSON.stringify(roomState.ships, null, 2)}</Code>
          </>
        )}
      </VStack>
    </Box>
  );
};
