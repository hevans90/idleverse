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
import { useState } from 'react';
import { PlayableRace, playableRacesVar } from '../../_state/playable-races';
import { GallerySelector } from '../components/gallery-selector';

export const RaceSelectionModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: (race: PlayableRace) => void;
}) => {
  const playableRaces = useReactiveVar(playableRacesVar);

  const [selectedRace, setSelectedRace] = useState<PlayableRace>();

  return (
    <Modal
      closeOnOverlayClick={false}
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
