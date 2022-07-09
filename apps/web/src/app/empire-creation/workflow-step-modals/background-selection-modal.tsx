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
import { Background } from '@idleverse/galaxy-gql';
import { useState } from 'react';
import { backgroundsVar } from '../../_state/backgrounds';
import { GallerySelector } from '../components/gallery-selector';

export const BackgroundSelectionModal = ({
  isOpen,
  onClose,
  selectedBackground,
}: {
  isOpen: boolean;
  onClose: (background: Background) => void;
  selectedBackground?: Background;
}) => {
  const backgrounds = useReactiveVar(backgroundsVar);

  const [locallySelectedBackground, setLocallySelectedBackround] =
    useState<Background>(selectedBackground);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose(locallySelectedBackground)}
      size="3xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom="2px solid" borderBottomColor="gray.600">
          Select Background
        </ModalHeader>
        <ModalBody padding={0}>
          <GallerySelector
            name="background"
            items={backgrounds}
            defaultItem={locallySelectedBackground}
            onSelectionChange={(background) =>
              setLocallySelectedBackround(background)
            }
          />
        </ModalBody>

        <ModalFooter borderTop="2px solid" borderTopColor="gray.600">
          <Button
            disabled={!locallySelectedBackground}
            onClick={() => onClose(locallySelectedBackground)}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
