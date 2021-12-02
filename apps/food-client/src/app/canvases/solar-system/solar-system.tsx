import { Box } from '@chakra-ui/react';
import { Application } from '@pixi/app';
import { useEffect } from 'react';

export const SolarSystem = () => {
  useEffect(() => {
    const gameElement = document.getElementById('game');
    const app = new Application({
      transparent: true,
      resizeTo: gameElement,
    });
    app.stage.sortableChildren = true;

    app.ticker.add(() => {
      app.screen.height = gameElement.clientHeight;
      app.screen.width = gameElement.clientWidth;
    });

    document.getElementById('game').appendChild(app.view);

    return () => app.destroy(true, true);
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <Box id="game" mx="2vw" w="96vw" my="2vh" h="96vh"></Box>;
};
