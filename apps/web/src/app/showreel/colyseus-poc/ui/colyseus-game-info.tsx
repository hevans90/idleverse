import {
  Avatar,
  Box,
  Button,
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
import { useUiBackground } from '@idleverse/theme';
import round from 'lodash/round';

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
    | 'celestials'
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
        top="20vh"
        maxHeight="75px"
      >
        {!roomState && (
          <Button
            onClick={joinCallback}
            isDisabled={joined || joiningInProgress}
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
              isDisabled={leavingInProgress}
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
          borderLeftWidth={0}
          borderBottomWidth={0}
          padding={4}
          position="fixed"
          left={0}
          bottom={0}
          width="50vw"
          minWidth="500px"
          maxHeight="50vh"
          overflow="scroll"
          opacity={0.8}
          alignItems="stretch"
          spacing={5}
        >
          {/* <TableContainer borderColor={border} borderWidth="1px">
            <Table variant="simple" size="sm">
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
          </TableContainer> */}

          <TableContainer borderColor={border} borderWidth="1px">
            <Table variant="simple" size="sm">
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
                          {positionX}, {positionY}
                        </Td>
                        <Td borderColor={border}>{rotation}</Td>
                        <Td borderColor={border}>
                          {round(velocityX, 2)}, {round(velocityY, 2)}
                        </Td>
                      </Tr>
                    )
                  )}
              </Tbody>
            </Table>
          </TableContainer>
          {/* <TableContainer borderColor={border} borderWidth="1px">
            <Table variant="simple" size="sm">
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
          <TableContainer borderColor={border} borderWidth="1px">
            <Table variant="simple" size="sm">
              <TableCaption>celestials</TableCaption>
              <Thead>
                <Tr bg={bgDark}>
                  <Th>Name</Th>
                  <Th>Radius</Th>
                  <Th>&#123; x, y &#125;</Th>
                </Tr>
              </Thead>
              <Tbody>
                {roomState?.celestials
                  .sort((a: ColyseusCelestial, b: ColyseusCelestial) =>
                    a.id > b.id ? 1 : b.id > a.id ? -1 : 0
                  )
                  .map(({ positionX, positionY, radius, name }, i) => (
                    <Tr key={i}>
                      <Td borderColor={border}>
                        <HStack>
                          <Text>{name}</Text>
                        </HStack>
                      </Td>
                      <Td borderColor={border}>{radius}</Td>
                      <Td borderColor={border}>
                        &#123; {positionX}, {positionY} &#125;
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer> */}
        </VStack>
      )}
    </>
  );
};
