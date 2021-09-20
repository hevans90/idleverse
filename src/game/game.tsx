import { useApp } from '@inlet/react-pixi';
import { Container } from 'pixi.js';
import { useEffect, useState } from 'react';
import { Star } from './graphics/star';
import { InitializeCelestials } from './utils/generate';
import { useResize } from './utils/use-resize.hook';

export const Game = () => {
  const app = useApp();

  const size = useResize();

  const [starPositions] = useState(
    InitializeCelestials(size.width, size.height, 5000)
  );

  useEffect(() => {
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

  return <></>;
};
