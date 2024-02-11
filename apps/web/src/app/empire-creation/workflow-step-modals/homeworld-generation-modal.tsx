import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { useUiBackground } from '@idleverse/theme';
import { AnimatedText } from '@idleverse/ui';
import {
  headerResponsiveFontProps,
  responsiveFontProps,
} from '../../_responsive-utils/font-props';
import { useResize } from '../../canvases/_utils/use-resize.hook';
import { PlanetGenerator } from '../../canvases/planet-generator/planet-generator';

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
          <AnimatedText
            content="Create your homeworld"
            duration={{ enter: 0.3 }}
            animationType="decipher"
            textAlign="center"
            fontSize="xl"
          ></AnimatedText>
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
