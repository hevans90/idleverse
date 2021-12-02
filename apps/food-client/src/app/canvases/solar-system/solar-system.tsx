import { Box } from '@chakra-ui/react';
import { Application } from '@pixi/app';
import { Graphics } from 'pixi.js';
import { useEffect } from 'react';

export const SolarSystem = () => {
  useEffect(() => {
    const gameElement = document.getElementById('game');
    const app = new Application({
      transparent: true,
      resizeTo: gameElement,
    });
    app.stage.sortableChildren = true;

    const tileConfig = [
      ['es', 'es', 'rv', 'ho', 'ho'],
      ['es', 'es', 'rv', 'ho', 'ho'],
      ['rh', 'rh', 'rc', 'rh', 'rh'],
      ['es', 'es', 'rv', 'es', 'es'],
      ['es', 'es', 'rv', 'es', 'es'],
    ];

    const drawEmptySquare = (x, y) => {
      const square = new Graphics();
      square.lineStyle(2, 0x0, 1);
      square.beginFill(0xffffff);
      square.drawRect(2, 2, 78, 78);
      square.endFill();

      square.position.x = x;
      square.position.y = y;

      return square;
    };

    const drawRoad = (x, y, rotation) => {
      const road = new Graphics();

      road.beginFill(0xd3d3d3);
      road.drawRect(0, 0, 80, 80);
      road.endFill();

      road.lineStyle(4, 0x0, 1);

      const lineX = 40;
      road.moveTo(0, lineX);
      const lineSections = 4;
      const lineLength = 78;
      const sectionLength = lineLength / (lineSections * 2);
      for (let i = 0; i < 10; i += 2) {
        road.lineTo(i * sectionLength, lineX);
        road.moveTo((i + 1) * sectionLength, lineX);
      }

      road.position.x = x;
      road.position.y = y;
      if (rotation > 0) road.position.x += 80;
      road.rotation = rotation;
      return road;
    };

    const drawCrossRoad = (x, y) => {
      const road = new Graphics();
      road.beginFill(0xd3d3d3);
      road.drawRect(0, 0, 80, 80);
      road.endFill();
      road.lineStyle(4, 0x0, 1);

      const lineSections = 4;
      const lineLength = 70;
      const sectionLength = lineLength / (lineSections * 2);
      const lineX = 40;
      road.moveTo(0, lineX);
      for (let i = 0; i < 10; i += 2) {
        road.lineTo(i * sectionLength, lineX);
        road.moveTo((i + 1) * sectionLength, lineX);
      }

      road.moveTo(lineX, 0);
      for (let i = 0; i < 10; i += 2) {
        road.lineTo(lineX, i * sectionLength);
        road.moveTo(lineX, (i + 1) * sectionLength);
      }

      road.position.x = x;
      road.position.y = y;
      return road;
    };

    // tileConfig.forEach((tileRow) => {
    //   tileRow.map((tile) => {
    //     if (tile === 'es') {
    //       return {
    //         label: 'Empty Square',
    //         drawn: '',
    //       };
    //     } else if (tile === 'rh') {
    //       return {
    //         label: 'Empty Square',
    //         drawn: '',
    //       };
    //     } else if (tile === 'rv') {
    //       return {
    //         label: 'Empty Square',
    //         drawn: '',
    //       };
    //     } else if (tile === 'rc') {
    //       return {
    //         label: 'Empty Square',
    //         drawn: '',
    //       };
    //     }
    //   });
    // });

    tileConfig.forEach((tileRow, i) => {
      tileRow.forEach((tile, j) => {
        let occupant;
        if (tile === 'es') {
          occupant = drawEmptySquare(j * 80, i * 80);
          app.stage.addChild(occupant);
        } else if (tile === 'rh') {
          occupant = drawRoad(j * 80, i * 80, 0);
          app.stage.addChild(occupant);
        } else if (tile === 'rv') {
          occupant = drawRoad(j * 80, i * 80, Math.PI / 2);
          app.stage.addChild(occupant);
        } else if (tile === 'rc') {
          occupant = drawCrossRoad(j * 80, i * 80);
          app.stage.addChild(occupant);
        }
        // app.stage.addChild(occupant);
      });
    });

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
