import { useSubscription } from '@apollo/client';
import {
  IdleGameCountersRealTimeDescDocument,
  IdleGameCountersRealTimeDescSubscription,
} from '../../_graphql/api';

export const RealtimeCounter = () => {
  //todo fix types
  const { data, loading } =
    useSubscription<IdleGameCountersRealTimeDescSubscription>(
      IdleGameCountersRealTimeDescDocument
    );

  if (loading) {
    return <div>websocket pending....</div>;
  } else {
    return (
      <div>
        <ol>
          {data?.idle_test.map((item) => (
            <li key={item.id}>
              <span>
                {item?.user?.nickname} has {item.counter} points
              </span>
            </li>
          ))}
        </ol>
      </div>
    );
  }
};
