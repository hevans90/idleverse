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
  UserInfoDocument,
  UserInfoQuery,
} from '@idleverse/galaxy-gql';
import { ReactNode, useEffect, useState } from 'react';

import {
  backgroundsVar,
  factionsVar,
  npcsVar,
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

/**
 * Performs all async loading and blocks any children rendering until complete.
 */
export const PreloadContainer = ({ children }: { children: ReactNode }) => {
  const [userAvatarsLoading, setUserAvatarsLoading] = useState(true);
  const [placeholdersLoading, setPlaceholdersLoading] = useState(true);
  const [techTreeLoading, setTechTreeLoading] = useState(true);

  const self = useReactiveVar(selfVar);

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

  if (usersLoading) return <Loading text="Loading Users"></Loading>;

  if (profileLoading) return <Loading text="Loading Profile"></Loading>;
  if (!self) return <Loading text="Setting Profile"></Loading>;

  if (characterDataLoading)
    return <Loading text="Loading Races, Backgrounds &amp; Factions"></Loading>;

  if (npcsLoading) return <Loading text="Loading Npcs"></Loading>;

  if (resourcesLoading) return <Loading text="Loading Resources"></Loading>;
  if (resourceGeneratorsLoading)
    return <Loading text="Loading Resource Generators"></Loading>;
  if (technologiesLoading) {
    return <Loading text="Loading Technologies"></Loading>;
  }
  if (questsLoading) {
    return <Loading text="Loading Quests"></Loading>;
  }

  if (userAvatarsLoading) return <Loading text="Creating Avatars"></Loading>;
  if (placeholdersLoading) {
    return <Loading text="Loading Placeholders"></Loading>;
  }
  if (techTreeLoading) return <Loading text="Generating Tech Tree"></Loading>;

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
