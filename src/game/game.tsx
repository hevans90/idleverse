import { Box } from '@chakra-ui/react';
import { Application } from 'pixi.js';
import React, { useEffect, useRef, useState } from 'react';
import { useResize } from '../containers/counter/responsive-canvas';
import { IdleGameCountersRealTimeDescSubscription } from '../_graphql/api';
import { InitializeStars } from './generate';
import { Star } from './star';

export const Game = ({
  data,
}: {
  data: IdleGameCountersRealTimeDescSubscription;
}) => {
  const ref = useRef<HTMLDivElement>(null!);
  const size = useResize();

  const [starPositions] = useState(InitializeStars(size.width, size.height));

  useEffect(() => {
    const app = new Application({
      ...size,
      backgroundColor: 0x000000,
      resizeTo: ref.current,
    });

    // Add app to DOM
    ref.current.appendChild(app.view);
    // Start the PixiJS app
    app.start();

    starPositions.forEach((starPosition) =>
      app.stage.addChild(Star(starPosition))
    );

    return () => {
      // On unload completely destroy the application and all of it's children
      app.destroy(true, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Box height="100%" ref={ref} />;
};
