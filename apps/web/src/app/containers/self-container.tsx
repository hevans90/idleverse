import { useQuery } from '@apollo/client';
import { SelfDocument, SelfQuery } from '@idleverse/graphql';
import { Loading } from '../components/loading';
import { selfVar } from '../_state/reactive-variables';

export const SelfContainer = (props: any) => {
  const { loading, error, data } = useQuery<SelfQuery>(SelfDocument, {
    onCompleted: (data) => {
      console.log('done');
      if (data && data.user_me && data.user_me[0]) {
        selfVar(data.user_me[0]);
      }
    },
    fetchPolicy: 'network-only',
  });

  if (loading || !data) return <Loading></Loading>;
  return props.children;
};