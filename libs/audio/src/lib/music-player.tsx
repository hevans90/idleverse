import { useUiBackground } from '@idleverse/theme';
import { AnimatedFrame } from '@idleverse/ui';

import { useQuery, useReactiveVar } from '@apollo/client';

import { Box, Flex, Icon, IconButton, Spinner } from '@chakra-ui/react';
import { musicPlayerVar } from '@idleverse/state';
import { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';

import { MusicDocument, MusicQuery } from '@idleverse/galaxy-gql';
import {
  IoPauseSharp,
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
} from 'react-icons/io5';

import { HydratedMediaResult } from '@idleverse/models';
import { BsMusicNoteBeamed } from 'react-icons/bs';

const CurrentTrack = ({
  track,
}: {
  track: HydratedMediaResult | undefined;
}) => {
  return (
    <>
      {JSON.stringify(track)}
      <Icon as={BsMusicNoteBeamed} />
    </>
  );
};

const AudioPlayer = () => {
  const { data } = useReactiveVar(musicPlayerVar);

  const [track, setTrack] = useState<HydratedMediaResult>(data?.[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, audioRef]);

  return (
    <>
      <CurrentTrack track={track} />
      {JSON.stringify(track)}
      <Flex gap={2} position="relative">
        <IconButton
          isDisabled={!track}
          icon={<IoPlaySkipBackSharp />}
          aria-label="play-skip-back"
        />
        <IconButton
          isDisabled={!track}
          icon={<IoPlayBackSharp />}
          aria-label="play-back"
        />

        <IconButton
          onClick={() => setIsPlaying((prev) => !prev)}
          isDisabled={!track}
          icon={isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
          aria-label="pause"
        />

        <IconButton
          isDisabled={!track}
          icon={<IoPlayForwardSharp />}
          aria-label="play-forward"
        />
        <IconButton
          isDisabled={!track}
          icon={<IoPlaySkipForwardSharp />}
          aria-label="play-skip-forward"
        />
      </Flex>
      <audio ref={audioRef} src={track?.url} />
    </>
  );
};

export const MusicPlayer = ({
  environment,
}: {
  environment: { secure: boolean; minioUri: string };
}) => {
  const { bg, border } = useUiBackground();

  const [dragging, setDragging] = useState(false);
  const [zIndex, setZIndex] = useState(2);

  const { show, data, ...rest } = useReactiveVar(musicPlayerVar);

  const { loading } = useQuery<MusicQuery>(MusicDocument, {
    onCompleted: ({ music }) =>
      musicPlayerVar({
        show,
        data:
          music?.map(({ name, ...rest }) => ({
            url: `${environment.secure ? 'https' : 'http'}://${
              environment.minioUri
            }/music/${name}`,
            name,
            ...rest,
          })) ?? [],
        ...rest,
      }),
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (show) {
      setZIndex(2);
    } else {
      timer = setTimeout(() => setZIndex(0), 1200);

      return () => clearTimeout(timer);
    }
  }, [show]);

  const dragRef = useRef(null);

  return (
    <Draggable
      bounds="body"
      nodeRef={dragRef}
      disabled={!show}
      onMouseDown={() => setDragging(true)}
      onStop={() => setDragging(false)}
    >
      <Box
        ref={dragRef}
        position="absolute"
        bottom={10}
        left={10}
        zIndex={zIndex}
        maxWidth="30rem"
        cursor={dragging ? 'grabbing' : 'grab'}
      >
        <AnimatedFrame show={show}>
          {loading ? <Spinner position="relative" /> : <AudioPlayer />}
        </AnimatedFrame>
      </Box>
    </Draggable>
  );
};
