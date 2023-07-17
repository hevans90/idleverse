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

import {
  headerResponsiveFontProps,
  responsiveFontProps,
} from '../../_responsive-utils/font-props';

import { factionsVar } from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
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
      size={['full', '6xl', '5xl']}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          {...headerResponsiveFontProps}
          borderBottom="1px solid"
          bg={bg}
          borderTopRightRadius={6}
          borderTopLeftRadius={6}
          borderBottomColor={border}
        >
          Select Faction
        </ModalHeader>
        <ModalBody bg={bgLight} padding={0} display="flex">
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
            {...responsiveFontProps}
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
