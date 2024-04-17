import { useReactiveVar } from '@apollo/client';

import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Background } from '@idleverse/galaxy-gql';
import { useState } from 'react';

import {
  backgroundsMediaListenedToVar,
  backgroundsVar,
} from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { AnimatedText } from '@idleverse/ui';
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdRefresh,
} from 'react-icons/md';
import {
  headerResponsiveFontProps,
  responsiveFontProps,
  responsiveIconProps,
} from '../../_responsive-utils/font-props';
import { GallerySelector } from '../components/gallery-selector';
import { useReplayableAudio } from './use-replayable-audio.hook';

export const BackgroundSelectionModal = ({
  isOpen,
  onClose,
  selectedBackground,
}: {
  isOpen: boolean;
  onClose: ({
    background,
    progress,
  }: {
    background: Background;
    progress: 'none' | 'next' | 'prev';
  }) => void;
  selectedBackground?: Background;
}) => {
  const backgrounds = useReactiveVar(backgroundsVar);

  const [locallySelectedBackground, setLocallySelectedBackround] =
    useState<Background>(selectedBackground);

  const { bg, border, bgLight } = useUiBackground();

  const { audioRef, listenedToCurrent, replayCurrentAudio, track } =
    useReplayableAudio({
      category: 'backgrounds',
      locallySelectedName: locallySelectedBackground?.name.toLowerCase(),
      isOpen,
    });

  return (
    <Modal
      isOpen={isOpen}
      onClose={() =>
        onClose({ background: locallySelectedBackground, progress: 'none' })
      }
      size={['full', '6xl', '5xl']}
      isCentered
      closeOnOverlayClick={true}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          p={3}
          {...headerResponsiveFontProps}
          borderBottom="1px solid"
          bg={bg}
          borderTopRightRadius={6}
          borderTopLeftRadius={6}
          borderBottomColor={border}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <AnimatedText
            content="Select Background"
            duration={{ enter: 0.3 }}
            animationType="decipher"
            textAlign="center"
            fontSize="xl"
          ></AnimatedText>

          {locallySelectedBackground && (
            <Button
              isDisabled={!listenedToCurrent}
              {...responsiveFontProps}
              onClick={() => replayCurrentAudio()}
            >
              <Icon as={MdRefresh} {...responsiveIconProps} />
            </Button>
          )}
        </ModalHeader>
        <ModalBody bg={bgLight} padding={0} display="flex">
          <audio
            autoPlay={!listenedToCurrent}
            ref={audioRef}
            src={track?.url}
            onEnded={() =>
              backgroundsMediaListenedToVar({
                ...backgroundsMediaListenedToVar(),
                [locallySelectedBackground.name.toLowerCase()]: true,
              })
            }
          />
          <GallerySelector
            name="background"
            items={backgrounds}
            selectedId={locallySelectedBackground?.id}
            progressingText={!listenedToCurrent}
            progressingTextDuration={track?.metadata?.duration}
            onSelectionChange={(background) =>
              setLocallySelectedBackround(background)
            }
          ></GallerySelector>
        </ModalBody>

        <ModalFooter
          p={3}
          bg={bg}
          borderBottomRightRadius={6}
          borderBottomLeftRadius={6}
          borderTop="1px solid"
          borderTopColor={border}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            {...responsiveFontProps}
            onClick={() =>
              onClose({
                background: locallySelectedBackground,
                progress: 'prev',
              })
            }
          >
            <Icon
              as={MdOutlineKeyboardDoubleArrowLeft}
              {...responsiveIconProps}
            />
            &nbsp;Race
          </Button>
          <Button
            {...responsiveFontProps}
            isDisabled={!locallySelectedBackground}
            onClick={() =>
              onClose({
                background: locallySelectedBackground,
                progress: 'next',
              })
            }
          >
            Faction &nbsp;
            <Icon
              as={MdOutlineKeyboardDoubleArrowRight}
              {...responsiveIconProps}
            />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
