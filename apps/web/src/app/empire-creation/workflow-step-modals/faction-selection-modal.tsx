import { useReactiveVar } from '@apollo/client';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Faction } from '@idleverse/galaxy-gql';
import { useState } from 'react';
import { factionsVar } from '../../_state/factions';
import { GallerySelector } from '../components/gallery-selector';

export const FactionSelectionModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: (faction: Faction) => void;
}) => {
  const factions = useReactiveVar(factionsVar);

  const [selectedFaction, setSelectedFaction] = useState<Faction>();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose(selectedFaction)}
      size="3xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom="2px solid" borderBottomColor="gray.600">
          Select Faction
        </ModalHeader>
        <ModalBody padding={0}>
          <GallerySelector
            name="faction"
            items={factions}
            defaultItem={selectedFaction}
            onSelectionChange={(faction) => setSelectedFaction(faction)}
          />
        </ModalBody>

        <ModalFooter borderTop="2px solid" borderTopColor="gray.600">
          <Button
            disabled={!selectedFaction}
            onClick={() => onClose(selectedFaction)}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
