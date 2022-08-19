import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { PlanetGenerator } from '../../canvases/planet-generator/planet-generator';
import { useResize } from '../../canvases/_utils/use-resize.hook';
import { useUiBackground } from '../../hooks/use-ui-background';
import {
  headerResponsiveFontProps,
  responsiveFontProps,
} from '../../_responsive-utils/font-props';

export const HomeworldGenerationModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { bg, border, bgDark } = useUiBackground();

  const { width, height } = useResize('planet-gen', { sidenavOverride: true });

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} size={['full']} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          borderBottom="1px solid"
          bg={bg}
          borderTopRightRadius={6}
          borderTopLeftRadius={6}
          borderBottomColor={border}
          {...headerResponsiveFontProps}
        >
          Create your homeworld
        </ModalHeader>
        <ModalBody bg={bgDark} padding={0} position="relative">
          <PlanetGenerator customSize={{ width, height }} />
        </ModalBody>

        <ModalFooter
          borderTop="1px solid"
          bg={bg}
          borderTopColor={border}
          borderBottomRightRadius={6}
          borderBottomLeftRadius={6}
        >
          <Button {...responsiveFontProps} onClick={onClose}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
