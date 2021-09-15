import { useSubscription } from '@apollo/client';
import { IdleGameCounterRealTimeDocument } from '../../_graphql/api';

export const RealtimeCounter = () => {
  const { data, loading } = useSubscription(IdleGameCounterRealTimeDocument);

  if (loading) {
    return <div>websocket pending....</div>;
  } else {
    return <div>{JSON.stringify(data)}</div>;
  }
};
