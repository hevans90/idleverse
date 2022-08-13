import { useReactiveVar } from '@apollo/client';
import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  TabProps,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useUiBackground } from '../../hooks/use-ui-background';
import { colorsVar } from '../../_state/colors';
import { hotkeyHintsVar } from '../../_state/global-settings';
import { globalUiVar } from '../../_state/global-ui';
import { QuestList } from './quest-list';

export const QuestJournal = ({ isOpen, onClose }) => {
  const hotkeyHints = useReactiveVar(hotkeyHintsVar);

  const { bg, border, bgDark, bgLight } = useUiBackground();

  const { secondary } = useReactiveVar(colorsVar);
  const { questJournalShowCompleted } = useReactiveVar(globalUiVar);

  const tabProps: TabProps = {
    _selected: { bg: bgLight },
    flexGrow: '1',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          bg={bgDark}
          borderTopRightRadius={6}
          borderTopLeftRadius={6}
          borderBottom="1px solid"
          borderBottomColor={border}
        >
          <HStack justifyContent="space-between">
            <Text>Quest Journal</Text>
            <HStack paddingRight={6}>
              <Text flexGrow={1} fontSize="sm">
                Show completed
              </Text>
              <Switch
                isChecked={questJournalShowCompleted}
                onChange={() => {
                  globalUiVar({
                    ...globalUiVar(),
                    questJournalShowCompleted: !questJournalShowCompleted,
                  });
                }}
                colorScheme={secondary}
                size="md"
              />
            </HStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          bg={bg}
          padding={0}
          borderRight="1px solid"
          borderRightColor={border}
        >
          <Tabs orientation="vertical" minHeight="40vh">
            <TabList
              justifyContent="stretch"
              borderColor={border}
              borderRight="2px solid"
              borderRightColor={border}
            >
              <Tab {...tabProps}>Main</Tab>
              <Tab {...tabProps}>Race</Tab>
              <Tab {...tabProps} isDisabled>
                Misc
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel padding={0}>
                <QuestList showCompleted={questJournalShowCompleted} />
              </TabPanel>
              <TabPanel>
                <p>Coming soon.</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter
          bg={bgDark}
          borderBottomRightRadius={6}
          borderBottomLeftRadius={6}
          borderTop="1px solid"
          borderTopColor={border}
        ></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
