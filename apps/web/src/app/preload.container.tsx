import { useQuery, useReactiveVar } from '@apollo/client';
import {
  CharacterDataDocument,
  CharacterDataQuery,
  NpcsDocument,
  NpcsQuery,
  QuestsDocument,
  QuestsQuery,
  ResourcesDocument,
  ResourcesQuery,
  SelfDocument,
  SelfQuery,
  TechnologiesDocument,
  TechnologiesQuery,
  UserInfoDocument,
  UserInfoQuery,
} from '@idleverse/galaxy-gql';
import { useEffect, useState } from 'react';
import { loadTechTree } from './asset-loading/load-tech-tree';
import { loadUserInfo } from './asset-loading/load-users';
import { Loading } from './components/loading';
import { backgroundsVar } from './_state/backgrounds';
import { factionsVar } from './_state/factions';
import { npcsVar } from './_state/npcs';
import { playableRacesVar } from './_state/playable-races';
import { questsVar } from './_state/quests';
import { selfVar } from './_state/reactive-variables';
import { resourcesVar } from './_state/resources';
import { technologiesVar } from './_state/technologies';

/**
 * Performs all async loading and blocks any children rendering until complete.
 */
export const PreloadContainer = ({ children }: { children: JSX.Element }) => {
  const [userAvatarsLoading, setUserAvatarsLoading] = useState(true);
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
      loadUserInfo(userInfo).then(() => setUserAvatarsLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersLoading]);

  useEffect(() => {
    if (!resourcesLoading && resources) {
      loadTechTree(resources).then(() => setTechTreeLoading(false));
    }
  }, [resourcesLoading]);

  if (usersLoading) return <Loading text="Loading Users"></Loading>;

  if (profileLoading) return <Loading text="Loading Profile"></Loading>;
  if (!self) return <Loading text="Setting Profile"></Loading>;

  if (characterDataLoading)
    return <Loading text="Loading Races, Backgrounds &amp; Factions"></Loading>;

  if (npcsLoading) return <Loading text="Loading Npcs"></Loading>;

  if (resourcesLoading) return <Loading text="Loading Resources"></Loading>;
  if (technologiesLoading) {
    return <Loading text="Loading Technologies"></Loading>;
  }
  if (questsLoading) {
    return <Loading text="Loading Quests"></Loading>;
  }

  if (userAvatarsLoading) return <Loading text="Creating Avatars"></Loading>;
  if (techTreeLoading) return <Loading text="Generating Tech Tree"></Loading>;

  return children;
};
