import { Box } from '@chakra-ui/react';
import { Application } from '@pixi/app';
import { Graphics } from 'pixi.js';
import { useEffect } from 'react';

type Vector2D = {
  x: number;
  y: number;
};

type Tile = {
  x: number;
  y: number;
  occupant?: any;
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

    const ts = 90;
    const ts1_3 = ts / 3;
    const ts1_2 = ts / 2;
    const ts2_3 = (2 * ts) / 3;

    const tileConfig = [
      ['e', 'e', 'r24', 'h', 'h'],
      ['e', 'e', 'r24', 'h', 'h'],
      ['r13', 'r13', 'r1234', 'r13', 'r13'],
      ['e', 'e', 'r24', 'e', 'e'],
      ['e', 'e', 'r24', 'e', 'e'],
    ];

    const tileConfig2 = [
      ['e', 'e', 'r24', 'e', 'e'],
      ['e', 'e', 'r24', 'e', 'e'],
      ['r13', 'r13', 'r124', 'e', 'e'],
      ['e', 'e', 'r24', 'e', 'e'],
      ['e', 'e', 'r24', 'e', 'e'],
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

    const DrawLine = (graphic: Graphics, start: Vector2D, end: Vector2D) => {
      graphic.moveTo(start.x, start.y);
      graphic.lineTo(end.x, end.y);
    };

    const DrawDottedLine = (
      graphic: Graphics,
      start: Vector2D,
      end: Vector2D,
      sections: number
    ) => {
      const xStep = (end.x - start.x) / (sections * 4 + 1);
      const yStep = (end.y - start.y) / (sections * 4 + 1);
      console.log(xStep);
      graphic.moveTo(start.x, start.y);
      for (let i = 0; i < sections * 2 + 1; i += 2) {
        graphic.lineTo(start.x + xStep * 2 * i, start.y + yStep * 2 * i);
        graphic.moveTo(
          start.x + xStep * 2 * (i + 1),
          start.y + yStep * 2 * (i + 1)
        );
      }
    };

    const drawRoad = (x: number, y: number, connections: number[]) => {
      const road = new Graphics();

      road.beginFill(0xd3d3d3);
      road.drawRect(ts1_3, ts1_3, ts1_3, ts1_3);
      road.endFill();

      road.lineStyle(4, 0x0, 1);

      console.log(connections);

      if (connections.includes(1)) {
        road.lineStyle(4, 0x0, 0);
        road.beginFill(0xd3d3d3);
        road.drawRect(0, ts1_3, ts1_3, ts1_3);
        road.endFill();

        road.lineStyle(4, 0x0, 1);
        DrawLine(road, { x: 0, y: ts1_3 }, { x: ts1_3, y: ts1_3 });
        DrawDottedLine(road, { x: 0, y: ts1_2 }, { x: ts1_2, y: ts1_2 }, 2);
        DrawLine(road, { x: 0, y: ts2_3 }, { x: ts1_3, y: ts2_3 });
      } else {
        DrawLine(road, { x: ts1_3, y: ts1_3 }, { x: ts1_3, y: ts2_3 });
      }

      if (connections.includes(2)) {
        road.lineStyle(4, 0x0, 0);
        road.beginFill(0xd3d3d3);
        road.drawRect(ts1_3, 0, ts1_3, ts1_3);
        road.endFill();

        road.lineStyle(4, 0x0, 1);
        DrawLine(road, { x: ts1_3, y: ts1_3 }, { x: ts1_3, y: 0 });
        DrawDottedLine(road, { x: ts1_2, y: 0 }, { x: ts1_2, y: ts1_2 }, 2);
        DrawLine(road, { x: ts2_3, y: ts1_3 }, { x: ts2_3, y: 0 });
      } else {
        DrawLine(road, { x: ts1_3, y: ts1_3 }, { x: ts2_3, y: ts1_3 });
      }

      if (connections.includes(3)) {
        road.lineStyle(4, 0x0, 0);
        road.beginFill(0xd3d3d3);
        road.drawRect(ts2_3, ts1_3, ts1_3, ts1_3);
        road.endFill();

        road.lineStyle(4, 0x0, 1);
        DrawLine(road, { x: ts2_3, y: ts1_3 }, { x: ts, y: ts1_3 });
        DrawDottedLine(road, { x: ts, y: ts1_2 }, { x: ts1_2, y: ts1_2 }, 2);
        DrawLine(road, { x: ts2_3, y: ts2_3 }, { x: ts, y: ts2_3 });
      } else {
        DrawLine(road, { x: ts2_3, y: ts1_3 }, { x: ts2_3, y: ts2_3 });
      }

      if (connections.includes(4)) {
        road.lineStyle(4, 0x0, 0);
        road.beginFill(0xd3d3d3);
        road.drawRect(ts1_3, ts2_3, ts1_3, ts1_3);
        road.endFill();

        road.lineStyle(4, 0x0, 1);
        DrawLine(road, { x: ts1_3, y: ts2_3 }, { x: ts1_3, y: ts });
        DrawDottedLine(road, { x: ts1_2, y: ts }, { x: ts1_2, y: ts1_2 }, 2);
        DrawLine(road, { x: ts2_3, y: ts2_3 }, { x: ts2_3, y: ts });
      } else {
        DrawLine(road, { x: ts2_3, y: ts2_3 }, { x: ts1_3, y: ts2_3 });
      }

      road.position.x = x;
      road.position.y = y;
      return road;
    };

    const re = /(\w)(\d*)/;

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
          }
        });
      });
    };

    drawChunk(0, 0, tileConfig);
    drawChunk(1, 0, tileConfig2);

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
