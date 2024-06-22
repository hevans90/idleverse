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
import { Playable_Race } from '@idleverse/galaxy-gql';
import { useState } from 'react';

import {
  headerResponsiveFontProps,
  responsiveFontProps,
  responsiveIconProps,
} from '../../_responsive-utils/font-props';

import { playableRacesVar, racesMediaListenedToVar } from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import {
  AnimatedText,
  ArrowRightPixelIcon,
  RepeatPixelIcon,
} from '@idleverse/ui';

import { GallerySelector } from '../components/gallery-selector';
import { useReplayableAudio } from './use-replayable-audio.hook';

export const RaceSelectionModal = ({
  isOpen,
  onClose,
  selectedRace,
}: {
  isOpen: boolean;
  onClose: ({
    race,
    progress,
  }: {
    race: Playable_Race;
    progress: 'none' | 'next';
  }) => void;
  selectedRace?: Playable_Race;
}) => {
  const playableRaces = useReactiveVar(playableRacesVar);

  const { bg, border, bgLight } = useUiBackground();

  const [locallySelectedRace, setLocallySelectedRace] =
    useState<Playable_Race>(selectedRace);

  const { audioRef, listenedToCurrent, replayCurrentAudio, track } =
    useReplayableAudio({
      category: 'races',
      locallySelectedName: locallySelectedRace?.name.toLowerCase(),
      isOpen,
    });

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose({ race: locallySelectedRace, progress: 'none' })}
      size={['full', '6xl', '5xl']}
      isCentered
      closeOnOverlayClick={true}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          p={3}
          {...headerResponsiveFontProps}
          bg={bg}
          borderTopRightRadius={6}
          borderTopLeftRadius={6}
          borderBottom="1px solid"
          borderBottomColor={border}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <AnimatedText
            duration={{ enter: 0.3 }}
            content="Select Race"
            animationType="decipher"
            textAlign="center"
            fontSize="xl"
          ></AnimatedText>
          {locallySelectedRace && (
            <Button
              isDisabled={!listenedToCurrent}
              {...responsiveFontProps}
              onClick={() => replayCurrentAudio()}
            >
              <Icon as={RepeatPixelIcon} {...responsiveIconProps} />
            </Button>
          )}
        </ModalHeader>
        <ModalBody bg={bgLight} padding={0} display="flex">
          <audio
            autoPlay={!listenedToCurrent}
            ref={audioRef}
            src={track?.url}
            onEnded={() =>
              racesMediaListenedToVar({
                ...racesMediaListenedToVar(),
                [locallySelectedRace.name.toLowerCase()]: true,
              })
            }
          />
          <GallerySelector
            name="race"
            items={playableRaces}
            selectedId={locallySelectedRace?.id}
            progressingText={!listenedToCurrent}
            progressingTextDuration={track?.metadata?.duration}
            onSelectionChange={(race) => setLocallySelectedRace(race)}
          />
        </ModalBody>

        <ModalFooter
          p={3}
          bg={bg}
          borderBottomRightRadius={6}
          borderBottomLeftRadius={6}
          borderTop="1px solid"
          borderTopColor={border}
        >
          <Button
            {...responsiveFontProps}
            isDisabled={!locallySelectedRace}
            onClick={() =>
              onClose({ race: locallySelectedRace, progress: 'next' })
            }
          >
            Background &nbsp;
            <Icon as={ArrowRightPixelIcon} {...responsiveIconProps} />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
