import { Box } from '@chakra-ui/react';
import { Application, Container } from 'pixi.js';
import React, { useEffect, useRef, useState } from 'react';
import { useResize } from '../containers/counter/responsive-canvas';
import { IdleGameCountersRealTimeDescSubscription } from '../_graphql/api';
import { InitializeCelestials } from './generate';
import { Star } from './star';

export const Game = ({
  data,
}: {
  data: IdleGameCountersRealTimeDescSubscription;
}) => {
  const ref = useRef<HTMLDivElement>(null!);
  const size = useResize();

  const [starPositions] = useState(
    InitializeCelestials(size.width, size.height, 5000)
  );

  useEffect(() => {
    const app = new Application({
      ...size,
      backgroundColor: 0x2d3239,
      resizeTo: ref.current,
    });

    // Add app to DOM
    ref.current.appendChild(app.view);
    // Start the PixiJS app
    app.start();

    const galaxy = new Container();
    app.stage.addChild(galaxy);

    starPositions.forEach((starPosition) =>
      galaxy.addChild(Star(starPosition))
    );

    galaxy.x = size.width / 2;
    galaxy.y = size.height / 2;

    console.log(app.stage.children[0]);

    app.ticker.add((delta) => {
      // rotate the container!
      // use delta to create frame-independent transform
      galaxy.rotation -= 0.001 * delta;
    });

    return () => {
      // On unload completely destroy the application and all of it's children
      app.destroy(true, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Box height="100%" ref={ref} />;
};
