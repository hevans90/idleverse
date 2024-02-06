import { useQuery, useReactiveVar } from '@apollo/client';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import {
  Background,
  BackgroundsDocument,
  BackgroundsQuery,
} from '@idleverse/galaxy-gql';
import { useEffect, useRef, useState } from 'react';

import { HydratedMediaResult } from '@idleverse/models';
import { backgroundsMediaVar, backgroundsVar } from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { environment } from '../../../environments/environment';
import {
  headerResponsiveFontProps,
  responsiveFontProps,
} from '../../_responsive-utils/font-props';
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

  const { data: mediaData } = useReactiveVar(backgroundsMediaVar);

  const [locallySelectedBackground, setLocallySelectedBackround] =
    useState<Background>(selectedBackground);

  const { bg, border, bgLight } = useUiBackground();

  const audioRef = useRef<HTMLAudioElement>(null);

  const [track, setTrack] = useState<HydratedMediaResult>();

  const { loading: mediaLoading } = useQuery<BackgroundsQuery>(
    BackgroundsDocument,
    {
      onCompleted: ({ media }) =>
        backgroundsMediaVar({
          data:
            media?.map(({ name, ...rest }) => ({
              url: `${environment.secure ? 'https' : 'http'}://${
                environment.minioUri
              }/backgrounds/${name}`,
              name,
              ...rest,
            })) ?? [],
        }),
    }
  );

  useEffect(() => {
    if (isOpen && !mediaLoading && mediaData) {
      const foundTrack = mediaData.find(({ name }) =>
        name.includes(locallySelectedBackground.name.toLowerCase())
      );
      setTrack(foundTrack);
      audioRef.current?.play();
    }
  }, [isOpen, audioRef, locallySelectedBackground, mediaData, mediaLoading]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose(locallySelectedBackground)}
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
          Select Background
        </ModalHeader>
        <ModalBody bg={bgLight} padding={0} display="flex">
          <audio autoPlay ref={audioRef} src={track?.url} />
          <GallerySelector
            key={locallySelectedBackground.id}
            name="background"
            items={backgrounds}
            selectedId={locallySelectedBackground.id}
            progressingText={true}
            progressingTextDuration={track?.metadata?.duration}
            onSelectionChange={(background) =>
              setLocallySelectedBackround(background)
            }
          ></GallerySelector>
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
            isDisabled={!locallySelectedBackground}
            onClick={() => onClose(locallySelectedBackground)}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
