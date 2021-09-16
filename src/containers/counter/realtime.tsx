import { useSubscription } from '@apollo/client';
import { IdleGameCountersRealTimeDescDocument } from '../../_graphql/api';

export const RealtimeCounter = () => {
  //todo fix types
  const { data, loading } = useSubscription(
    IdleGameCountersRealTimeDescDocument
  );

  if (loading) {
    return <div>websocket pending....</div>;
  } else {
    return (
      <div>
        <ol>
          {data?.idle_test.map((item: any) => (
            <li>
              <span>
                {item.user.nickname} has {item.counter} points
              </span>
            </li>
          ))}
        </ol>
      </div>
    );
  }
};
