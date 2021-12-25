import { useQuery } from '@apollo/client';
import { SelfDocument, SelfQuery } from '@idleverse/galaxy-gql';
import { Loading } from '../components/loading';
import { useUserPreload } from '../hooks/use-user-preload';
import { selfVar } from '../_state/reactive-variables';

export const SelfContainer = (props: any) => {
  const { loading, error, data } = useQuery<SelfQuery>(SelfDocument, {
    onCompleted: (data) => {
      if (data && data.user_me && data.user_me[0]) {
        selfVar(data.user_me[0]);
      }
    },
    fetchPolicy: 'network-only',
  });

  useUserPreload();

  if (loading || !data) return <Loading></Loading>;
  return props.children;
};
