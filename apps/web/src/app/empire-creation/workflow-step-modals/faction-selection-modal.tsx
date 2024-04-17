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
import { Faction } from '@idleverse/galaxy-gql';
import { useState } from 'react';

import {
  headerResponsiveFontProps,
  responsiveFontProps,
  responsiveIconProps,
} from '../../_responsive-utils/font-props';

import { factionsMediaListenedToVar, factionsVar } from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { AnimatedText } from '@idleverse/ui';
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdRefresh,
} from 'react-icons/md';
import { GallerySelector } from '../components/gallery-selector';
import { useReplayableAudio } from './use-replayable-audio.hook';

export const FactionSelectionModal = ({
  isOpen,
  onClose,
  selectedFaction,
}: {
  isOpen: boolean;
  onClose: ({
    faction,
    progress,
  }: {
    faction: Faction;
    progress: 'none' | 'next' | 'prev';
  }) => void;
  selectedFaction?: Faction;
}) => {
  const factions = useReactiveVar(factionsVar);

  const [locallySelectedFaction, setLocallySelectedFaction] =
    useState<Faction>(selectedFaction);

  const { audioRef, listenedToCurrent, replayCurrentAudio, track } =
    useReplayableAudio({
      category: 'factions',
      locallySelectedName: locallySelectedFaction?.name.toLowerCase(),
      isOpen,
    });

  const { bg, border, bgLight } = useUiBackground();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() =>
        onClose({ faction: locallySelectedFaction, progress: 'none' })
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
            content="Select Faction"
            duration={{ enter: 0.3 }}
            animationType="decipher"
            textAlign="center"
            fontSize="xl"
          ></AnimatedText>
          {locallySelectedFaction && (
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
              factionsMediaListenedToVar({
                ...factionsMediaListenedToVar(),
                [locallySelectedFaction.name.toLowerCase()]: true,
              })
            }
          />
          <GallerySelector
            name="faction"
            items={factions}
            selectedId={locallySelectedFaction?.id}
            progressingText={!listenedToCurrent}
            progressingTextDuration={track?.metadata?.duration}
            onSelectionChange={(faction) => setLocallySelectedFaction(faction)}
          />
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
                faction: locallySelectedFaction,
                progress: 'prev',
              })
            }
          >
            <Icon
              as={MdOutlineKeyboardDoubleArrowLeft}
              {...responsiveIconProps}
            />
            &nbsp;Background
          </Button>
          <Button
            {...responsiveFontProps}
            isDisabled={!locallySelectedFaction}
            onClick={() =>
              onClose({ faction: locallySelectedFaction, progress: 'next' })
            }
          >
            Homeworld &nbsp;
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
