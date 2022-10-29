import { useReactiveVar } from '@apollo/client';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { RoomState } from '@idleverse/colyseus-shared';
import { useUiBackground } from '../../../hooks/use-ui-background';
import { colyseusGridVar } from '../../../_state/colyseus';

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
    | 'connectedUsers'
    | 'impulses'
    | 'ships'
    | 'spawnLocations'
    | 'width'
    | 'height'
    | 'columns'
    | 'rows'
  >;
}) => {
  const { bg, border, bgDark } = useUiBackground();

  const gridChecked = useReactiveVar(colyseusGridVar);

  return (
    <>
      <Box
        padding="1rem"
        display="flex"
        alignItems="start"
        bgColor={bg}
        borderWidth="1px"
        borderStyle="solid"
        borderColor={border}
        borderLeft="unset"
        position="fixed"
        left={0}
        top="10vh"
        maxHeight="75px"
      >
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
            {/* <Code>{JSON.stringify(roomState.spawnLocations, null, 2)}</Code> */}
            {/* <Code width="100%">{JSON.stringify(roomState.ships, null, 2)}</Code> */}
          </>
        )}
      </Box>
      {roomState && (
        <VStack
          bg={bg}
          border={border}
          borderWidth={1}
          padding={4}
          margin={2}
          position="fixed"
          left={0}
          top="60vh"
          width="50vw"
          minWidth="500px"
          maxHeight="50vh"
          overflow="scroll"
          opacity={0.8}
          alignItems="stretch"
          spacing={5}
        >
          <TableContainer borderColor={border} borderWidth="1px">
            <Table variant="simple" fontSize="xs" size="sm">
              <Thead>
                <Tr bg={bgDark}>
                  <Th>width</Th>
                  <Th>height</Th>
                  <Th>cols</Th>
                  <Th>rows</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td borderColor={border}>{roomState.width}</Td>
                  <Td borderColor={border}>{roomState.height}</Td>
                  <Td borderColor={border}>{roomState.columns}</Td>
                  <Td borderColor={border}>{roomState.rows}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>

          <TableContainer borderColor={border} borderWidth="1px">
            <Table variant="simple" fontSize="xs" size="sm">
              <TableCaption>ships</TableCaption>
              <Thead>
                <Tr bg={bgDark}>
                  <Th>User</Th>
                  <Th>&#123; x, y &#125;</Th>
                  <Th>rotation</Th>
                  <Th>velocity</Th>
                </Tr>
              </Thead>
              <Tbody>
                {roomState?.ships
                  .map(({ userId, ...rest }) => {
                    const { displayName, avatarUrl } =
                      roomState.connectedUsers.find(
                        (user) => user.userId === userId
                      );

                    return { ...rest, displayName, avatarUrl };
                  })
                  .map(
                    (
                      {
                        positionX,
                        positionY,
                        displayName,
                        avatarUrl,
                        rotation,
                        velocityX,
                        velocityY,
                      },
                      i
                    ) => (
                      <Tr key={i}>
                        <Td borderColor={border}>
                          <HStack>
                            <Avatar src={avatarUrl} size="xs" />
                            <Text>{displayName}</Text>
                          </HStack>
                        </Td>
                        <Td borderColor={border}>
                          &#123; {positionX}, {positionY} &#125;
                        </Td>
                        <Td borderColor={border}>{rotation}</Td>
                        <Td borderColor={border}>
                          &#123; {velocityX}, {velocityY} &#125;
                        </Td>
                      </Tr>
                    )
                  )}
              </Tbody>
            </Table>
          </TableContainer>
          <TableContainer borderColor={border} borderWidth="1px">
            <Table variant="simple" fontSize="xs" size="sm">
              <TableCaption>spawn locations</TableCaption>
              <Thead>
                <Tr bg={bgDark}>
                  <Th>User</Th>
                  <Th>&#123; x, y &#125;</Th>
                </Tr>
              </Thead>
              <Tbody>
                {roomState?.spawnLocations
                  .filter((spawn) => spawn.userId)
                  .sort((a, b) =>
                    a.userId > b.userId ? 1 : b.userId > a.userId ? -1 : 0
                  )
                  .map(({ userId, ...rest }) => {
                    const { displayName, avatarUrl } =
                      roomState.connectedUsers.find(
                        (user) => user.userId === userId
                      );

                    return { ...rest, displayName, avatarUrl };
                  })
                  .map(({ x, y, displayName, avatarUrl }, i) => (
                    <Tr key={i}>
                      <Td borderColor={border}>
                        <HStack>
                          <Avatar src={avatarUrl} size="xs" />
                          <Text>{displayName}</Text>
                        </HStack>
                      </Td>
                      <Td borderColor={border}>
                        &#123; {x}, {y} &#125;
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>

          <HStack width="100%">
            <Text minWidth="175px">Grid</Text>
            <Checkbox
              size="lg"
              isChecked={gridChecked}
              onChange={() => colyseusGridVar(!colyseusGridVar())}
            ></Checkbox>
          </HStack>
        </VStack>
      )}
    </>
  );
};
