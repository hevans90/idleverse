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
import { useUiBackground } from '../../hooks/use-ui-background';
import {
  headerResponsiveFontProps,
  responsiveFontProps,
} from '../../_responsive-utils/font-props';
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

  const { bg, border, bgLight } = useUiBackground();

  const [locallySelectedRace, setLocallySelectedRace] =
    useState<Playable_Race>(selectedRace);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose(locallySelectedRace)}
      size={['full', '6xl', '5xl']}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          {...headerResponsiveFontProps}
          bg={bg}
          borderTopRightRadius={6}
          borderTopLeftRadius={6}
          borderBottom="1px solid"
          borderBottomColor={border}
        >
          Select Race
        </ModalHeader>
        <ModalBody bg={bgLight} padding={0} display="flex">
          <GallerySelector
            name="race"
            items={playableRaces}
            defaultItem={locallySelectedRace}
            onSelectionChange={(race) => setLocallySelectedRace(race)}
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
            {...responsiveFontProps}
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
