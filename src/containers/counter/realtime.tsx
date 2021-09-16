import { useSubscription } from '@apollo/client';
import { ListItem, OrderedList } from '@chakra-ui/react';
import {
  IdleGameCountersRealTimeDescDocument,
  IdleGameCountersRealTimeDescSubscription,
} from '../../_graphql/api';
import { Stage, Container, Sprite, Text, useTick } from '@inlet/react-pixi';
import { TextStyle } from 'pixi.js';
import { InitializeStars } from '../../game/generate';
import { useState } from 'react';
import { Star, StarProps } from '../../game/star'

const canvasWidth = 500;
const canvasHeight = 500;

export const RealtimeCounter = () => {
  //todo fix types
  const { data, loading } =
    useSubscription<IdleGameCountersRealTimeDescSubscription>(
      IdleGameCountersRealTimeDescDocument
    );

  const [stars, setStars] = useState(InitializeStars(canvasWidth, canvasHeight));
  console.log(stars);

  if (loading) {
    return <div>websocket pending....</div>;
  } else {
    return (
      <div>
        <Stage width={canvasWidth} height={canvasHeight}>
          <>
            {data?.idle_test.map((item, i) => (
              <>
                <Sprite image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png" x={100} y={100 * i} />
                <Text text={`${item?.user?.nickname} has ${item.counter} points`} x={150} y={100 * i} style={
                  new TextStyle({
                    align: 'center',
                    fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                    fontSize: 20,
                    fontWeight: "400",
                    fill: '#ffffff',
                    strokeThickness: 5,
                  })
                } />
              </>
            ))}
            {stars.map((item, i) => (
              <>
                <Star x={item.x} y={item.y}></Star>
              </>
            ))}
          </>
        </Stage>
      </div>
    );
  }
};
