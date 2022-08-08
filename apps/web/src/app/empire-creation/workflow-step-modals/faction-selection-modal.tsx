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
import { useUiBackground } from '../../hooks/use-ui-background';
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

  const { bg, border, bgLight } = useUiBackground();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose(locallySelectedFaction)}
      size="5xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          borderBottom="1px solid"
          bg={bg}
          borderTopRightRadius={6}
          borderTopLeftRadius={6}
          borderBottomColor={border}
        >
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

        <ModalFooter
          bg={bg}
          borderBottomRightRadius={6}
          borderBottomLeftRadius={6}
          borderTop="1px solid"
          borderTopColor={border}
        >
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
