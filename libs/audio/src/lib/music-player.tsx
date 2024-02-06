import { AnimatedFrame } from '@idleverse/ui';
import { intervalToDuration } from 'date-fns';

import { useQuery, useReactiveVar } from '@apollo/client';

import {
  Box,
  Flex,
  IconButton,
  Progress,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
} from '@chakra-ui/react';
import { musicPlayerVar } from '@idleverse/state';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';

import { MusicDocument, MusicQuery } from '@idleverse/galaxy-gql';
import {
  IoPauseSharp,
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoVolumeHigh,
  IoVolumeLow,
  IoVolumeMute,
} from 'react-icons/io5';

import { HydratedMediaResult } from '@idleverse/models';

const CurrentTrack = ({
  track,
  trackIndex,
  totalTracks,
  audioRef,
}: {
  track: HydratedMediaResult | undefined;
  trackIndex: number;
  totalTracks: number;

  audioRef: RefObject<HTMLAudioElement>;
}) => {
  return (
    <Flex gap={2} direction="column">
      {/* <Box>
        {trackIndex} / {totalTracks}
      </Box> */}
      <Box>{track?.name.replace('.mp3', '')}</Box>
    </Flex>
  );
};

export const ProgressBar = ({
  audioRef,
  trackTime,
  trackDuration,
}: {
  audioRef: RefObject<HTMLAudioElement>;
  trackTime: number;
  trackDuration: number;
}) => {
  const currentTime = intervalToDuration({ start: 0, end: trackTime * 1000 });
  const duration = intervalToDuration({ start: 0, end: trackDuration * 1000 });

  const zeroPad = (num: number) => String(num).padStart(2, '0');

  const formattedcurrentTime = `${currentTime.minutes}:${zeroPad(
    currentTime.seconds ?? 0
  )}`;
  const formattedDuration = `${duration.minutes}:${zeroPad(
    duration.seconds ?? 0
  )}`;

  return (
    <Flex alignItems="center" minW={[250, 350, 450]} my={4} gap={4}>
      <Box>{formattedcurrentTime}</Box>
      <Slider
        max={trackDuration}
        aria-label="audio-progress-slider"
        onChangeEnd={(val) => {
          if (audioRef.current) {
            audioRef.current.currentTime = val;
          }
        }}
        defaultValue={0}
      >
        <SliderTrack background="unset" />
        <Progress colorScheme="green" value={trackTime} max={trackDuration} />
        <SliderThumb boxSize={5} background="unset" />
      </Slider>

      <Box>{formattedDuration}</Box>
    </Flex>
  );
  //
};

const AudioPlayer = () => {
  const { data } = useReactiveVar(musicPlayerVar);

  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [track, setTrack] = useState<HydratedMediaResult>(data?.[trackIndex]);
  const [trackTime, setTrackTime] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);

  const [volume, setVolume] = useState(100);

  const [muteVolume, setMuteVolume] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const updateLoopRef = useRef<number>();

  const onLoadedMetadata = () => {
    setTrackDuration(audioRef?.current?.duration ?? 0);
  };

  const updateLoop = useCallback(() => {
    const currentTime = audioRef?.current?.currentTime ?? 0;
    setTrackTime(currentTime);

    updateLoopRef.current = requestAnimationFrame(updateLoop);
  }, [audioRef, setTrackTime]);

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 15;
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 15;
    }
  };

  const handleNext = () => {
    if (trackIndex >= data.length - 1) {
      setTrackIndex(0);
      setTrack(data?.[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setTrack(data?.[trackIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (trackIndex === 0) {
      const lastTrackIndex = data?.length - 1;
      setTrackIndex(lastTrackIndex);
      setTrack(data?.[lastTrackIndex]);
    } else {
      setTrackIndex((prev) => prev - 1);
      setTrack(data?.[trackIndex - 1]);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
      updateLoopRef.current = requestAnimationFrame(updateLoop);
    } else {
      audioRef.current?.pause();
      if (updateLoopRef.current) {
        cancelAnimationFrame(updateLoopRef.current);
      }
    }
  }, [isPlaying, audioRef, updateLoop]);

  useEffect(() => {
    if (audioRef?.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  return (
    <>
      <CurrentTrack
        audioRef={audioRef}
        track={track}
        trackIndex={trackIndex + 1}
        totalTracks={data.length}
      />
      <ProgressBar
        audioRef={audioRef}
        trackTime={trackTime}
        trackDuration={trackDuration}
      />
      <Flex gap={2} position="relative">
        <Flex gap={2} flexGrow={2}>
          <IconButton
            onClick={skipBackward}
            isDisabled={!track}
            icon={<IoPlaySkipBackSharp />}
            aria-label="play-skip-back"
          />
          <IconButton
            onClick={handlePrevious}
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
            onClick={handleNext}
            isDisabled={!track}
            icon={<IoPlayForwardSharp />}
            aria-label="play-forward"
          />
          <IconButton
            onClick={skipForward}
            isDisabled={!track}
            icon={<IoPlaySkipForwardSharp />}
            aria-label="play-skip-forward"
          />
        </Flex>
        <Flex gap={2} flexGrow={1}>
          <button onClick={() => setMuteVolume((prev) => !prev)}>
            {muteVolume || volume < 5 ? (
              <IoVolumeMute />
            ) : volume < 40 ? (
              <IoVolumeLow />
            ) : (
              <IoVolumeHigh />
            )}
          </button>
          <Slider
            aria-label="volume-slider"
            onChangeEnd={setVolume}
            defaultValue={volume}
            min={0}
            max={100}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Flex>
      </Flex>

      <audio
        ref={audioRef}
        src={track?.url}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
    </>
  );
};

export const MusicPlayer = ({
  environment,
}: {
  environment: { secure: boolean; minioUri: string };
}) => {
  const [dragging, setDragging] = useState(false);
  const [zIndex, setZIndex] = useState(2);

  const { show, data, ...rest } = useReactiveVar(musicPlayerVar);

  const { loading } = useQuery<MusicQuery>(MusicDocument, {
    onCompleted: ({ media }) =>
      musicPlayerVar({
        show,
        data:
          media?.map(({ name, ...rest }) => ({
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
        cursor={dragging ? 'grabbing' : 'grab'}
      >
        <AnimatedFrame show={show}>
          {loading ? <Spinner position="relative" /> : <AudioPlayer />}
        </AnimatedFrame>
      </Box>
    </Draggable>
  );
};
