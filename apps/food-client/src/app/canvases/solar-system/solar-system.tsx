import { Box } from '@chakra-ui/react';
import { Application } from '@pixi/app';
import { Graphics, Sprite, Texture } from 'pixi.js';
import { useEffect } from 'react';

type Vector2D = {
  x: number;
  y: number;
};

type Tile = {
  x: number;
  y: number;
  occupant?: Sprite;
};

type TileConfig = string[][];

type House = {
  number: number;
};

type Road = {
  connections: number[];
};

export const SolarSystem = () => {
  useEffect(() => {
    const gameElement = document.getElementById('game');
    const app = new Application({
      transparent: true,
      resizeTo: gameElement,
    });
    app.stage.sortableChildren = true;

    const ts = 80;
    const ts1_3 = ts / 8;
    const ts1_2 = ts / 2;
    const ts2_3 = (7 * ts) / 8;
    const rls = 2;

    const tileConfig = [
      ['e', 'e', 'r24', 'h1', 'e'],
      ['e', 'e', 'r24', 'e', 'e'],
      ['r13', 'r13', 'r1234', 'r13', 'r13'],
      ['e', 'e', 'r24', 'e', 'e'],
      ['e', 'e', 'r24', 'e', 'e'],
    ];

    const tileConfig2 = [
      ['e', 'e', 'r24', 'e', 'e'],
      ['e', 'h4', 'r24', 'e', 'e'],
      ['r13', 'r13', 'r124', 'e', 'e'],
      ['e', 'e', 'r24', 'e', 'e'],
      ['e', 'e', 'r24', 'e', 'e'],
    ];

    const tileConfig3 = [
      ['r34', 'r13', 'r123', 'r13', 'r14'],
      ['r24', 'e', 'h2', 'e', 'r24'],
      ['r12', 'e', 'e', 'e', 'r23'],
      ['e', 'e', 'e', 'e', 'e'],
      ['e', 'e', 'e', 'e', 'e'],
    ];

    const tileConfig4 = [
      ['r34', 'r14', 'e', 'e', 'e'],
      ['r24', 'r23', 'r14', 'e', 'e'],
      ['r12', 'e', 'r23', 'r14', 'e'],
      ['e', 'e', 'h4', 'r23', 'r14'],
      ['e', 'e', 'e', 'e', 'r23'],
    ];

    const drawEmptySquare = (x: number, y: number) => {
      const square = new Graphics();
      square.lineStyle(2, 0x0, 1);
      square.beginFill(0xffffff);
      square.drawRect(2, 2, ts - 2, ts - 2);
      square.endFill();

      square.position.x = x;
      square.position.y = y;

      return square;
    };

    const drawLine = (graphic: Graphics, start: Vector2D, end: Vector2D) => {
      graphic.moveTo(start.x, start.y);
      graphic.lineTo(end.x, end.y);
    };

    const drawDottedLine = (
      graphic: Graphics,
      start: Vector2D,
      end: Vector2D,
      sections: number
    ) => {
      const step = sections * 2 + (sections - 1) * 2 + 2;
      const xStep = (end.x - start.x) / step;
      const yStep = (end.y - start.y) / step;
      graphic.moveTo(start.x + xStep, start.y + yStep);
      for (let i = 0; i < step; i += 1) {
        if (i % 4 > 1) graphic.lineTo(start.x + xStep * i, start.y + yStep * i);
        else graphic.moveTo(start.x + xStep * i, start.y + yStep * i);
      }
    };

    const drawRoad = (x: number, y: number, connections: number[]) => {
      const road = new Graphics();

      road.beginFill(0xd3d3d3);
      road.drawRect(ts1_3, ts1_3, ts2_3 - ts1_3, ts2_3 - ts1_3);
      road.endFill();

      road.lineStyle(4, 0x0, 1);

      if (connections.includes(1)) {
        road.lineStyle(4, 0x0, 0);
        road.beginFill(0xd3d3d3);
        road.drawRect(0, ts1_3, ts1_3, ts2_3 - ts1_3);
        road.endFill();

        road.lineStyle(4, 0x0, 1);
        drawLine(road, { x: 0, y: ts1_3 }, { x: ts1_3, y: ts1_3 });
        drawDottedLine(road, { x: 0, y: ts1_2 }, { x: ts1_2, y: ts1_2 }, rls);
        drawLine(road, { x: 0, y: ts2_3 }, { x: ts1_3, y: ts2_3 });
      } else {
        drawLine(road, { x: ts1_3, y: ts1_3 }, { x: ts1_3, y: ts2_3 });
      }

      if (connections.includes(2)) {
        road.lineStyle(4, 0x0, 0);
        road.beginFill(0xd3d3d3);
        road.drawRect(ts1_3, 0, ts2_3 - ts1_3, ts1_3);
        road.endFill();

        road.lineStyle(4, 0x0, 1);
        drawLine(road, { x: ts1_3, y: ts1_3 }, { x: ts1_3, y: 0 });
        drawDottedLine(road, { x: ts1_2, y: 0 }, { x: ts1_2, y: ts1_2 }, rls);
        drawLine(road, { x: ts2_3, y: ts1_3 }, { x: ts2_3, y: 0 });
      } else {
        drawLine(road, { x: ts1_3, y: ts1_3 }, { x: ts2_3, y: ts1_3 });
      }

      if (connections.includes(3)) {
        road.lineStyle(4, 0x0, 0);
        road.beginFill(0xd3d3d3);
        road.drawRect(ts2_3, ts1_3, ts1_3, ts2_3 - ts1_3);
        road.endFill();

        road.lineStyle(4, 0x0, 1);
        drawLine(road, { x: ts2_3, y: ts1_3 }, { x: ts, y: ts1_3 });
        drawDottedLine(road, { x: ts, y: ts1_2 }, { x: ts1_2, y: ts1_2 }, rls);
        drawLine(road, { x: ts2_3, y: ts2_3 }, { x: ts, y: ts2_3 });
      } else {
        drawLine(road, { x: ts2_3, y: ts1_3 }, { x: ts2_3, y: ts2_3 });
      }

      if (connections.includes(4)) {
        road.lineStyle(4, 0x0, 0);
        road.beginFill(0xd3d3d3);
        road.drawRect(ts1_3, ts2_3, ts2_3 - ts1_3, ts1_3);
        road.endFill();

        road.lineStyle(4, 0x0, 1);
        drawLine(road, { x: ts1_3, y: ts2_3 }, { x: ts1_3, y: ts });
        drawDottedLine(road, { x: ts1_2, y: ts }, { x: ts1_2, y: ts1_2 }, rls);
        drawLine(road, { x: ts2_3, y: ts2_3 }, { x: ts2_3, y: ts });
      } else {
        drawLine(road, { x: ts2_3, y: ts2_3 }, { x: ts1_3, y: ts2_3 });
      }

      road.position.x = x;
      road.position.y = y;
      return road;
    };

    const re = /(\w)(\d*)/;
    const houseTextures = {
      '1': Texture.from('https://i.imgur.com/rGgNlV1.png'),
      '2': Texture.from('https://i.imgur.com/OYDsDs7.png'),
      '3': Texture.from('https://i.imgur.com/rGgNlV1.png'),
      '4': Texture.from('https://i.imgur.com/jYSXUk0.png'),
    };
    const houseTexture = Texture.from('https://i.imgur.com/FLqAFqq.png');

    const drawChunk = (p: number, q: number, tileConfig: TileConfig) => {
      tileConfig.forEach((tileRow, i) => {
        tileRow.forEach((tile, j) => {
          const occupant = drawEmptySquare(
            j * ts + p * 5 * ts,
            i * ts + q * 5 * ts
          );
          app.stage.addChild(occupant);
        });
      });

      tileConfig.forEach((tileRow, i) => {
        tileRow.forEach((tile, j) => {
          const match = re.exec(tile);
          if (match[1] === 'r') {
            const occupant = drawRoad(
              j * ts + p * 5 * ts,
              i * ts + q * 5 * ts,
              match[2].split('').map((i) => parseInt(i))
            );
            app.stage.addChild(occupant);
          } else if (match[1] === 'h') {
            const house = new Sprite(houseTextures[match[2]]);
            house.width = ts - 2;
            house.height = ts - 2;
            house.x = j * ts + p * 5 * ts + 2;
            house.y = i * ts + q * 5 * ts + 2;
            app.stage.addChild(house);
          }
        });
      });
    };

    drawChunk(0, 0, tileConfig);
    drawChunk(1, 0, tileConfig2);
    drawChunk(0, 1, tileConfig3);
    drawChunk(1, 1, tileConfig3);
    drawChunk(2, 1, tileConfig4);

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
