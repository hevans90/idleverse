import { Box } from '@chakra-ui/react';
import { Application } from '@pixi/app';
import { Graphics } from '@pixi/graphics';
import { useEffect } from 'react';
import { time } from '../../_state/reactive-variables';

export const SolarSystem = () => {
  useEffect(() => {
    const gameElement = document.getElementById('game');
    const app = new Application({
      transparent: true,
      resizeTo: gameElement,
    });
    app.stage.sortableChildren = true;
    app.ticker.add(() => {
      time(time() + 1);
    });

    const length = 400;
    const sections = 4;

    const sectionLength = length / sections;
    const road = new Graphics();

    road.lineStyle(2, 0xffffff, 1);
    road.moveTo(0, 0);
    for (let i = 0; i < sections; i += 2) {
      road.lineTo(i * 50, 0);
      road.moveTo(i + 1 * 50, 0);
    }
    road.position.x = 200;
    road.position.y = 200;

    app.stage.addChild(road);

    app.ticker.add(() => {
      const herp = 'derp';
    });

    document.getElementById('game').appendChild(app.view);

    return () => app.destroy(true, true);
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <Box id="game" mx="2vw" w="96vw" my="2vh" h="96vh"></Box>;
};
