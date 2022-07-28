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
import { Playable_Race } from '@idleverse/galaxy-gql';
import { useState } from 'react';
import { playableRacesVar } from '../../_state/playable-races';
import { GallerySelector } from '../components/gallery-selector';

export const RaceSelectionModal = ({
  isOpen,
  onClose,
  selectedRace,
}: {
  isOpen: boolean;
  onClose: (race: Playable_Race) => void;
  selectedRace?: Playable_Race;
}) => {
  const playableRaces = useReactiveVar(playableRacesVar);

  const [locallySelectedRace, setLocallySelectedRace] =
    useState<Playable_Race>(selectedRace);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose(locallySelectedRace)}
      size="5xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom="2px solid" borderBottomColor="gray.600">
          Select Race
        </ModalHeader>
        <ModalBody padding={0}>
          <GallerySelector
            name="race"
            items={playableRaces}
            defaultItem={locallySelectedRace}
            onSelectionChange={(race) => setLocallySelectedRace(race)}
          />
        </ModalBody>

        <ModalFooter borderTop="2px solid" borderTopColor="gray.600">
          <Button
            disabled={!locallySelectedRace}
            onClick={() => onClose(locallySelectedRace)}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
