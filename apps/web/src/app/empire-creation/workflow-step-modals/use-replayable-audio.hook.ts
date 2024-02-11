import { useReactiveVar } from '@apollo/client';
import { HydratedMediaResult } from '@idleverse/models';
import {
  backgroundsMediaListenedToVar,
  backgroundsMediaVar,
  factionsMediaListenedToVar,
  factionsMediaVar,
  playableRacesMediaVar,
  racesMediaListenedToVar,
} from '@idleverse/state';
import { useEffect, useMemo, useRef, useState } from 'react';

export const useReplayableAudio = ({
  category,
  locallySelectedName,
  isOpen,
}: {
  category: 'backgrounds' | 'factions' | 'races';
  locallySelectedName?: string;
  isOpen: boolean;
}) => {
  const reactiveVarMap = useMemo(
    () => ({
      backgrounds: {
        media: backgroundsMediaVar,
        listened: backgroundsMediaListenedToVar,
      },
      factions: {
        media: factionsMediaVar,
        listened: factionsMediaListenedToVar,
      },
      races: {
        media: playableRacesMediaVar,
        listened: racesMediaListenedToVar,
      },
    }),
    []
  );

  const { data: mediaData } = useReactiveVar(reactiveVarMap[category].media);
  const listenedVar = useReactiveVar(reactiveVarMap[category].listened as any);

  const listenedToCurrent = useMemo<boolean>(() => {
    return listenedVar[locallySelectedName];
  }, [locallySelectedName, listenedVar]);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [track, setTrack] = useState<HydratedMediaResult>();

  useEffect(() => {
    if (isOpen && mediaData && locallySelectedName) {
      const foundTrack = mediaData.find(({ name }) =>
        name.includes(locallySelectedName)
      );
      setTrack(foundTrack);
    }
  }, [isOpen, audioRef, locallySelectedName, mediaData]);

  const replayCurrentAudio = () => {
    const listened = reactiveVarMap[category].listened as any;

    listened({
      ...listened(),
      [locallySelectedName]: false,
    });

    audioRef.current.currentTime = 0;
  };

  return {
    listenedToCurrent,
    replayCurrentAudio,
    track,
    audioRef,
  };
};
