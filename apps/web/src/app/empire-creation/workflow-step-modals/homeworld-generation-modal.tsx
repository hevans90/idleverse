import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { PlanetGenerator } from '../../canvases/planet-generator/planet-generator';

export const HomeworldGenerationModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} size="full" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom="2px solid" borderBottomColor="gray.600">
          Create your homeworld
        </ModalHeader>
        <ModalBody padding={0} position="relative">
          <PlanetGenerator />
        </ModalBody>

        <ModalFooter borderTop="2px solid" borderTopColor="gray.600">
          <Button onClick={onClose}>Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
