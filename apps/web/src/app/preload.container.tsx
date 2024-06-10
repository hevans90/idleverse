import { useQuery, useReactiveVar } from '@apollo/client';
import {
  CharacterDataDocument,
  CharacterDataQuery,
  NpcsDocument,
  NpcsQuery,
  QuestsDocument,
  QuestsQuery,
  ResourceGeneratorsDocument,
  ResourceGeneratorsQuery,
  ResourcesDocument,
  ResourcesQuery,
  SelfDocument,
  SelfQuery,
  TechnologiesDocument,
  TechnologiesQuery,
  TerrainHexPalettesDocument,
  TerrainHexPalettesQuery,
  UserInfoDocument,
  UserInfoQuery,
} from '@idleverse/galaxy-gql';
import { ReactNode, useEffect, useState } from 'react';

import {
  backgroundsVar,
  colorPalettesVar,
  factionsVar,
  npcsVar,
  planetGenerationColorDrawerVar,
  playableRacesVar,
  questsVar,
  resourceGeneratorsVar,
  resourcesVar,
  selfVar,
  technologiesVar,
  usersVar,
} from '@idleverse/state';
import { loadNoise } from './asset-loading/load-noise';
import { loadPlaceholders } from './asset-loading/load-placeholders';
import { loadTechTree } from './asset-loading/load-tech-tree';
import { loadUserInfo } from './asset-loading/load-users';
import { Loading } from './components/loading';
import { useLoadAudioMetadata } from './use-load-audio-metadata';

/**
 * Performs all async loading and blocks any children rendering until complete.
 */
export const PreloadContainer = ({ children }: { children: ReactNode }) => {
  const [userAvatarsLoading, setUserAvatarsLoading] = useState(true);
  const [placeholdersLoading, setPlaceholdersLoading] = useState(true);
  const [techTreeLoading, setTechTreeLoading] = useState(true);

  const self = useReactiveVar(selfVar);

  const { mediaMetadataLoading } = useLoadAudioMetadata();

  const { loading: colorPalettesLoading } = useQuery<TerrainHexPalettesQuery>(
    TerrainHexPalettesDocument,
    {
      onCompleted: (data) => {
        colorPalettesVar(data.terrain_hex_palette);
        const firstPalette = data.terrain_hex_palette?.[0];
        planetGenerationColorDrawerVar({
          ...planetGenerationColorDrawerVar(),
          palettePresetName: firstPalette?.name,
        });
      },
    }
  );

  const { loading: profileLoading } = useQuery<SelfQuery>(SelfDocument, {
    onCompleted: (data) => {
      if (data && data.user_me && data.user_me[0]) {
        selfVar(data.user_me[0]);
      }
    },
    fetchPolicy: 'network-only',
  });

  const { data: userInfo, loading: usersLoading } =
    useQuery<UserInfoQuery>(UserInfoDocument);

  const { loading: characterDataLoading } = useQuery<CharacterDataQuery>(
    CharacterDataDocument,
    {
      onCompleted: ({ playable_race, background, faction }) => {
        playableRacesVar(playable_race);
        backgroundsVar(background);
        factionsVar(faction);
      },
    }
  );

  const { loading: npcsLoading } = useQuery<NpcsQuery>(NpcsDocument, {
    onCompleted: ({ npc }) => npcsVar(npc),
  });

  const { data: resources, loading: resourcesLoading } =
    useQuery<ResourcesQuery>(ResourcesDocument, {
      onCompleted: ({ resource_type }) => resourcesVar(resource_type),
    });

  const { loading: resourceGeneratorsLoading } =
    useQuery<ResourceGeneratorsQuery>(ResourceGeneratorsDocument, {
      onCompleted: ({ resource_generator }) =>
        resourceGeneratorsVar(resource_generator),
    });

  const { loading: technologiesLoading } = useQuery<TechnologiesQuery>(
    TechnologiesDocument,
    {
      onCompleted: ({ technology }) => technologiesVar(technology),
    }
  );

  const { loading: questsLoading } = useQuery<QuestsQuery>(QuestsDocument, {
    onCompleted: ({ quest }) => questsVar(quest),
  });

  useEffect(() => {
    if (!usersLoading && userInfo) {
      usersVar(userInfo.user_info);
      loadUserInfo(userInfo).then(() => setUserAvatarsLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersLoading]);

  useEffect(() => {
    if (!userAvatarsLoading) {
      Promise.all([loadNoise(), loadPlaceholders()]).then(() =>
        setPlaceholdersLoading(false)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAvatarsLoading]);

  useEffect(() => {
    if (!resourcesLoading && resources) {
      loadTechTree(resources).then(() => setTechTreeLoading(false));
    }
  }, [resourcesLoading, resources]);

  const loadingItems = [
    { loading: usersLoading, text: 'Loading Users' },
    { loading: profileLoading, text: 'Loading Profile' },
    { loading: !self, text: 'Setting Profile' },
    {
      loading: characterDataLoading,
      text: 'Loading Races, Backgrounds & Factions',
    },
    { loading: npcsLoading, text: 'Loading Npcs' },
    { loading: resourcesLoading, text: 'Loading Resources' },
    {
      loading: resourceGeneratorsLoading,
      text: 'Loading Resource Generators',
    },
    { loading: technologiesLoading, text: 'Loading Technologies' },
    { loading: questsLoading, text: 'Loading Quests' },
    { loading: userAvatarsLoading, text: 'Creating Avatars' },
    { loading: placeholdersLoading, text: 'Loading Placeholders' },
    { loading: techTreeLoading, text: 'Generating Tech Tree' },
    { loading: mediaMetadataLoading, text: 'Loading Audio Metadata' },
    { loading: colorPalettesLoading, text: 'Loading Color Palettes' },
  ];

  for (const { loading, text } of loadingItems) {
    if (loading) {
      return <Loading text={text} />;
    }
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
