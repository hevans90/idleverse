import { useQuery } from '@apollo/client';
import {
  MediaMetadataDocument,
  MediaMetadataQuery,
  MediaResult,
} from '@idleverse/galaxy-gql';
import { HydratedMediaResult, IdleverseMedia } from '@idleverse/models';
import {
  backgroundsMediaVar,
  celestialMediaVar,
  factionsMediaVar,
  playableRacesMediaVar,
} from '@idleverse/state';
import { environment } from '../environments/environment';

const mediaMapper = (
  media: MediaResult[],
  category: IdleverseMedia
): HydratedMediaResult[] =>
  media?.map(({ name, ...rest }) => ({
    url: `${environment.secure ? 'https' : 'http'}://${
      environment.minioUri
    }/${category}/${name}`,
    name,
    ...rest,
  })) ?? [];

export const useLoadAudioMetadata = () => {
  const { loading: mediaMetadataLoading } = useQuery<MediaMetadataQuery>(
    MediaMetadataDocument,
    {
      onCompleted: ({ backgrounds, factions, races, celestialSystems }) => {
        const celestialMedia = mediaMapper(
          celestialSystems,
          'celestial-systems'
        );
        celestialMediaVar({
          data: celestialMedia,
        });
        celestialMedia.forEach(({ url }) => fetch(url));
        backgroundsMediaVar({
          data: mediaMapper(backgrounds, 'backgrounds'),
        });
        factionsMediaVar({
          data: mediaMapper(factions, 'factions'),
        });
        playableRacesMediaVar({
          data: mediaMapper(races, 'races'),
        });
      },
    }
  );

  return { mediaMetadataLoading };
};
