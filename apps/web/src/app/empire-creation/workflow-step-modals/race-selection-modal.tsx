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
}: {
  isOpen: boolean;
  onClose: (race: Playable_Race) => void;
}) => {
  const playableRaces = useReactiveVar(playableRacesVar);

  const [selectedRace, setSelectedRace] = useState<Playable_Race>();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose(selectedRace)}
      size="3xl"
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
            defaultItem={selectedRace}
            onSelectionChange={(race) => setSelectedRace(race)}
          />
        </ModalBody>

        <ModalFooter borderTop="2px solid" borderTopColor="gray.600">
          <Button
            disabled={!selectedRace}
            onClick={() => onClose(selectedRace)}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
