import { useReactiveVar } from '@apollo/client';
import { HydratedMediaResult } from '@idleverse/models';
import {
  CelestialAudioName,
  DialogEntry,
  celestialMediaVar,
  dialogVar,
} from '@idleverse/state';
import { useEffect, useRef } from 'react';

export const useCelestialAudio = ({
  locallySelectedName,
  isOpen,
}: {
  locallySelectedName?: CelestialAudioName;
  isOpen: boolean;
}) => {
  const { data: mediaData } = useReactiveVar(celestialMediaVar);

  const audioRef = useRef<HTMLAudioElement>(null);

  const handleLoadDialogEntry = async (
    url: string,
    track: HydratedMediaResult
  ) => {
    const response = await fetch(url);
    const data = (await response.json()) as { entries: DialogEntry[] };

    const entries = data.entries.map((entry) => ({ ...entry, audio: track }));

    dialogVar({
      open: true,
      entries,
    });
  };

  useEffect(() => {
    if (isOpen && mediaData?.length && locallySelectedName) {
      const foundTrack = mediaData.find(
        ({ name, metadata }) =>
          metadata.contentType === 'audio/mpeg' &&
          name.includes(locallySelectedName)
      );
      const foundDialogEntry = mediaData.find(
        ({ name, metadata }) =>
          metadata.contentType === 'application/json' &&
          name.includes(locallySelectedName)
      );

      if (foundTrack && foundDialogEntry) {
        handleLoadDialogEntry(foundDialogEntry.url, foundTrack);
      }

      audioRef.current.src = foundTrack.url;
      audioRef.current.play().catch((e) => {
        // user has not interacted with the DOM yet
      });
    }
  }, [isOpen, audioRef, locallySelectedName, mediaData]);

  return {
    audioRef,
  };
};
