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
  selectedFaction,
}: {
  isOpen: boolean;
  onClose: (faction: Faction) => void;
  selectedFaction?: Faction;
}) => {
  const factions = useReactiveVar(factionsVar);

  const [locallySelectedFaction, setLocallySelectedFaction] =
    useState<Faction>(selectedFaction);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose(locallySelectedFaction)}
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
            defaultItem={locallySelectedFaction}
            onSelectionChange={(faction) => setLocallySelectedFaction(faction)}
          />
        </ModalBody>

        <ModalFooter borderTop="2px solid" borderTopColor="gray.600">
          <Button
            disabled={!locallySelectedFaction}
            onClick={() => onClose(locallySelectedFaction)}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
