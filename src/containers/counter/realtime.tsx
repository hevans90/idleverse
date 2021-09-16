import { useSubscription } from '@apollo/client';
import { ListItem, OrderedList } from '@chakra-ui/react';
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
        <OrderedList stylePosition="inside">
          {data?.idle_test.map((item) => (
            <ListItem key={item.id}>
              <span>
                {item?.user?.nickname} has {item.counter} points
              </span>
            </ListItem>
          ))}
        </OrderedList>
      </div>
    );
  }
};
