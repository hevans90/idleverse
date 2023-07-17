import { useReactiveVar } from '@apollo/client';
import {
  HStack,
  Kbd,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Switch,
  Text,
  useColorMode,
} from '@chakra-ui/react';

import {
  colorsVar,
  debugVar,
  fpsVar,
  hotkeyHintsVar,
  layoutVar,
} from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { ThemePalettePicker } from './theme-palette-picker';

export const EscMenuContainer = ({ isOpen, onClose }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { sideNav, toolBar } = useReactiveVar(layoutVar);

  const debug = useReactiveVar(debugVar);

  const fps = useReactiveVar(fpsVar);

  const hotkeyHints = useReactiveVar(hotkeyHintsVar);

  const { bg, border, bgDark } = useUiBackground();

  const { secondary } = useReactiveVar(colorsVar);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          bg={bgDark}
          borderTopRightRadius={6}
          borderTopLeftRadius={6}
          borderBottom="1px solid"
          borderBottomColor={border}
        >
          Settings
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          bg={bg}
          padding={[3, 4, 5, 6, 7]}
          paddingBottom={4}
          borderBottomRightRadius={6}
          borderBottomLeftRadius={6}
        >
          <SimpleGrid minChildWidth="300px" spacing={5}>
            <ThemePalettePicker palette="primary" />
            <ThemePalettePicker palette="secondary" />
            <HStack>
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
            <HStack>
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
            <HStack>
              <Text flexGrow={1}>Dark Theme</Text>
              <Switch
                isChecked={colorMode === 'dark'}
                onChange={toggleColorMode}
                colorScheme={secondary}
                size="lg"
              />
            </HStack>
            <HStack>
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
            <HStack>
              <Text flexGrow={1}>
                <Kbd>Hotkey Hints</Kbd>
              </Text>
              <Switch
                isChecked={hotkeyHints}
                onChange={() => {
                  hotkeyHintsVar(!hotkeyHints);
                }}
                colorScheme={secondary}
                size="lg"
              />
            </HStack>
          </SimpleGrid>
        </ModalBody>

        {/* <ModalFooter></ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};
