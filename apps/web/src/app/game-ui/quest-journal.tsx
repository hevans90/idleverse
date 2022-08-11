import { useReactiveVar } from '@apollo/client';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useUiBackground } from '../hooks/use-ui-background';
import { colorsVar } from '../_state/colors';
import { hotkeyHintsVar } from '../_state/global-settings';

export const QuestJournal = ({ isOpen, onClose }) => {
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
          Journal
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody bg={bg} padding={[3, 4, 5, 6, 7]} paddingBottom={4}>
          Journal
        </ModalBody>

        <ModalFooter
          bg={bgDark}
          borderBottomRightRadius={6}
          borderBottomLeftRadius={6}
        ></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
