import { useReactiveVar } from '@apollo/client';
import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  StackDivider,
  Switch,
  Text,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import { colorsVar } from '../../_state/colors';
import {
  debugVar,
  fpsVar,
  layoutVar,
} from '../../_state/persisted-reactive-variables';

export const EscMenuContainer = ({ isOpen, onClose }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { sideNav, toolBar } = useReactiveVar(layoutVar);

  const debug = useReactiveVar(debugVar);

  const fps = useReactiveVar(fpsVar);

  const { secondary } = useReactiveVar(colorsVar);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom="1px solid" borderBottomColor="gray.600">
          Settings
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingBottom={4}>
          <HStack divider={<StackDivider borderColor="gray.600" />}>
            <VStack
              width="50%"
              divider={<StackDivider borderColor="gray.600" />}
              spacing={5}
            >
              <HStack width="100%" paddingTop={3}>
                <Text flexGrow={1}>Chat</Text>
                <Switch
                  isChecked={sideNav}
                  onChange={() => {
                    layoutVar({ sideNav: !sideNav, toolBar });
                  }}
                  colorScheme={secondary}
                  size="lg"
                />
              </HStack>
              <HStack width="100%">
                <Text flexGrow={1}>Debug</Text>
                <Switch
                  isChecked={debug}
                  onChange={() => {
                    debugVar(!debug);
                  }}
                  colorScheme={secondary}
                  size="lg"
                />
              </HStack>
              <HStack width="100%">
                <Text flexGrow={1}>...</Text>
              </HStack>
            </VStack>
            <VStack
              width="50%"
              divider={<StackDivider borderColor="gray.600" />}
              spacing={5}
            >
              <HStack width="100%" paddingTop={3}>
                <Text flexGrow={1}>Dark Theme</Text>
                <Switch
                  isChecked={colorMode === 'dark'}
                  onChange={toggleColorMode}
                  colorScheme={secondary}
                  size="lg"
                />
              </HStack>
              <HStack width="100%">
                <Text flexGrow={1}>FPS Counters</Text>
                <Switch
                  isChecked={fps}
                  onChange={() => {
                    fpsVar(!fps);
                  }}
                  colorScheme={secondary}
                  size="lg"
                />
              </HStack>
              <HStack width="100%">
                <Text flexGrow={1}>...</Text>
              </HStack>
            </VStack>
          </HStack>
        </ModalBody>

        {/* <ModalFooter></ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};
