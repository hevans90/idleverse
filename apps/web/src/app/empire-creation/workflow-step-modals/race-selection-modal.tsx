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
import { playableRacesVar } from '../../_state/playable-races';

export const RaceSelectionModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const playableRaces = useReactiveVar(playableRacesVar);
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom="1px solid" borderBottomColor="gray.600">
          Select Race
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingBottom={4}>{JSON.stringify(playableRaces)}</ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
