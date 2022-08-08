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
import { useUiBackground } from '../../hooks/use-ui-background';
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

  const { bg, border, bgLight } = useUiBackground();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose(locallySelectedBackground)}
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

        <ModalFooter
          bg={bg}
          borderBottomRightRadius={6}
          borderBottomLeftRadius={6}
          borderTop="1px solid"
          borderTopColor={border}
        >
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
