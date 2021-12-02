import { Box } from '@chakra-ui/react';
import { render } from '@inlet/react-pixi';
import { Application } from '@pixi/app';
import * as PIXI from 'pixi.js';
import { useEffect } from 'react';

type Vector2D = {
  x: number;
  y: number;
};

type Tile = {
  x: number;
  y: number;
  occupant?: PIXI.Sprite;
};

type TileConfig = string[][];

type House = {
  number: number;
};

type Road = {
  connections: number[];
};

type Drawer = {
  body: {
    height: number;
    width: number;
  };
  tab;
};

type Diner = {
  time: number;
  duration: number;
  previousPosition: number;
  nextPosition: number;
  update?: () => void;
};

type Animation = {
  time: number;
  update?: () => void;
};

export const SolarSystem = () => {
  useEffect(() => {
    const gameElement = document.getElementById('game');
    const app = new Application({
      transparent: true,
      resizeTo: gameElement,
    });
    app.stage.sortableChildren = true;

    const animations = [];
    const roads = [];
    const houses = [];

    const isValidPosition = (position) => {
      if (
        roads.filter((road) => road.i === position.i && road.j === position.j)
          .length > 0
      )
        return false;
      if (
        houses.filter(
          (house) => house.i === position.i && house.j === position.j
        ).length > 0
      )
        return false;
      if (
        roads.filter(
          (road) =>
            Math.abs(road.i - position.i) + Math.abs(road.j - position.j) < 2
        ).length === 0
      )
        return false;

      return true;
    };

    const getRandomPosition = () => {
      return {
        i: Math.floor(Math.random() * 10),
        j: Math.floor(Math.random() * 10),
      };
    };

    const ts = 80;
    const ts1_3 = ts / 8;
    const ts1_2 = ts / 2;
    const ts2_3 = (7 * ts) / 8;
    const rls = 2;

    const tileConfigs = [
      [
        ['e', 'e', 'r24', 'h1', 'e'],
        ['e', 'e', 'r24', 'e', 'e'],
        ['r13', 'r13', 'r1234', 'r13', 'r13'],
        ['e', 'e', 'r24', 'e', 'e'],
        ['e', 'e', 'r24', 'e', 'e'],
      ],
      [
        ['e', 'e', 'r24', 'e', 'e'],
        ['e', 'e', 'r24', 'h4', 'e'],
        ['r13', 'r13', 'r124', 'e', 'e'],
        ['d', 'e', 'r24', 'e', 'e'],
        ['e', 'e', 'r24', 'e', 'e'],
      ],
      [
        ['r34', 'r13', 'r123', 'r13', 'r14'],
        ['r24', 'e', 'h2', 'e', 'r24'],
        ['r12', 'e', 'e', 'e', 'r23'],
        ['e', 'e', 'e', 'e', 'e'],
        ['e', 'e', 'e', 'e', 'e'],
      ],
    ];

    const drawEmptySquare = (x: number, y: number) => {
      const square = new PIXI.Graphics();
      square.lineStyle(2, 0x0, 1);
      square.beginFill(0xffffff);
      square.drawRect(2, 2, ts - 2, ts - 2);
      square.endFill();

      square.position.x = x;
      square.position.y = y;

      return square;
    };

    const drawLine = (
      graphic: PIXI.Graphics,
      start: Vector2D,
      end: Vector2D
    ) => {
      graphic.moveTo(start.x, start.y);
      graphic.lineTo(end.x, end.y);
    };

    const drawDottedLine = (
      graphic: PIXI.Graphics,
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
      const road = new PIXI.Graphics();

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

    const drawHouse = (x: number, y: number, orientation: string) => {
      const house = new PIXI.Sprite(houseTextures[orientation]);
      house.position.x = x;
      house.position.y = y;
      house.width = ts;
      house.height = ts;
      return house;
    };

    const re = /(\w)(\d*)/;
    const houseTextures = {
      '1': PIXI.Texture.from('https://i.imgur.com/rGgNlV1.png'),
      '2': PIXI.Texture.from('https://i.imgur.com/OYDsDs7.png'),
      '3': PIXI.Texture.from('https://i.imgur.com/rGgNlV1.png'),
      '4': PIXI.Texture.from('https://i.imgur.com/jYSXUk0.png'),
    };
    const dinerTexture = PIXI.Texture.from('https://i.imgur.com/gPK9T8l.png');

    const drawChunk = (
      p: number,
      q: number,
      container: PIXI.Container,
      tileConfig: TileConfig
    ) => {
      tileConfig.forEach((tileRow, i) => {
        tileRow.forEach((tile, j) => {
          const occupant = drawEmptySquare(
            j * ts + p * 5 * ts,
            i * ts + q * 5 * ts
          );
          container.addChild(occupant);
        });
      });

      tileConfig.forEach((tileRow, i) => {
        tileRow.forEach((tile, j) => {
          const match = re.exec(tile);
          if (match[1] === 'r') {
            const road = { i: j + p * 5, j: i + q * 5 };
            roads.push(road);
            const occupant = drawRoad(
              road.i * ts,
              road.j * ts,
              match[2].split('').map((i) => parseInt(i))
            );
            container.addChild(occupant);
          } else if (match[1] === 'h') {
            const house = { i: j + p * 5, j: i + q * 5 };
            houses.push(house);
            const occupant = drawHouse(house.i * ts, house.j * ts, match[2]);
            container.addChild(occupant);
          }
        });
      });

      tileConfig.forEach((tileRow, i) => {
        tileRow.forEach((tile, j) => {
          const match = re.exec(tile);
          if (match[1] === 'd') {
            const diner = new PIXI.Sprite(dinerTexture);

            diner.width = ts - 2;
            diner.height = ts - 2;
            diner.x = j * ts + p * 5 * ts + 2;
            diner.y = i * ts + q * 5 * ts + 2;
            diner.name = 'diner1';
            container.addChild(diner);

            const _diner = {
              time: 0,
              duration: 240,
              prevPosition: {
                x: 0,
                y: 0,
              },
              nextPosition: {
                x: 0,
                y: 0,
              },
              displayItem: {
                diner,
              },
            };

            diner.interactive = true;
            diner.buttonMode = true;
            diner.on('pointerdown', () => {
              _diner.time = 0;
              _diner.prevPosition.x = diner.position.x;
              _diner.prevPosition.y = diner.position.y;
              let randomPosition = getRandomPosition();
              for (let i = 0; i < 1000; i++) {
                console.log(`next position: ${JSON.stringify(randomPosition)}`);
                if (isValidPosition(randomPosition)) break;
                randomPosition = getRandomPosition();
              }
              _diner.nextPosition.x = randomPosition.i * ts + 2;
              _diner.nextPosition.y = randomPosition.j * ts + 2;
              animations.push(() => {
                _diner.time += 1;
                if (_diner.time < _diner.duration) {
                  diner.position.x =
                    _diner.prevPosition.x +
                    (_diner.nextPosition.x - _diner.prevPosition.x) *
                      (_diner.time / _diner.duration);
                  diner.position.y =
                    _diner.prevPosition.y +
                    (_diner.nextPosition.y - _diner.prevPosition.y) *
                      (_diner.time / _diner.duration);
                } else {
                  console.log(
                    `prev position: ${JSON.stringify(_diner.prevPosition)}`
                  );
                  console.log(
                    `next position: ${JSON.stringify(_diner.nextPosition)}`
                  );
                  diner.x = _diner.nextPosition.x;
                  diner.y = _diner.nextPosition.y;
                  _diner.prevPosition = { ..._diner.nextPosition };
                  animations.splice(0, 1);
                }
              });
            });
          }
        });
      });
    };

    const board = new PIXI.Container();

    drawChunk(0, 0, board, tileConfigs[0]);
    drawChunk(0, 1, board, tileConfigs[2]);
    drawChunk(1, 1, board, tileConfigs[2]);
    drawChunk(1, 0, board, tileConfigs[1]);

    console.log(JSON.stringify(roads));

    board.pivot.x = board.width / 2;
    board.pivot.y = board.height / 2;
    board.position.x = app.screen.width / 2;
    board.position.y = app.screen.height / 2;

    app.stage.addChild(board);

    const addDrawer = ({
      app,
      width,
      height,
      x,
      y,
      tabWidth,
    }: {
      app: PIXI.Application;
      width: number;
      height: number;
      x: number;
      y: number;
      tabWidth: number;
    }) => {
      const drawerContainer = new PIXI.Container();

      const drawerBody = new PIXI.Graphics();
      drawerBody.lineStyle(2, 0x0, 1);
      drawerBody.beginFill(0xeed9ba);
      drawerBody.drawRoundedRect(0, 0, width, height, 20);
      drawerBody.endFill();

      // set recruit spacing
      const rs = 0.1;
      // set recruit tile size
      const rts = 160;
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 8; j++) {
          const item = new PIXI.Graphics();
          item.lineStyle(2, 0x0, 1);
          item.beginFill(0xc370ff);
          item.drawRoundedRect(
            rts * ((1 + rs) * i + rs),
            rts * ((1 + rs) * j + rs),
            rts,
            rts,
            5
          );
          item.endFill();
          drawerBody.addChild(item);
        }
      }

      const drawerTab = new PIXI.Graphics();

      drawerTab.lineStyle(2, 0x0, 1);
      drawerTab.beginFill(0xeed9ba);
      drawerTab.drawRoundedRect(-40, 0, 40, app.screen.height, 20);
      drawerTab.endFill();

      drawerContainer.addChild(drawerBody, drawerTab);

      const drawer = {
        open: false,
      };

      drawerContainer.x = drawer.open
        ? app.screen.width - 1000
        : app.screen.width;
      drawerContainer.y = 0;

      const translateDraw = () => {
        drawer.open = !drawer.open;
        drawerContainer.x = drawer.open
          ? app.screen.width - 1000
          : app.screen.width;
      };

      drawerTab.interactive = true;
      drawerTab.buttonMode = true;
      drawerTab.on('pointerdown', translateDraw);

      app.stage.addChild(drawerContainer);
    };

    addDrawer({
      app: app,
      x: 0,
      y: 0,
      width: 1000,
      height: app.screen.height,
      tabWidth: 40,
    });

    const translate = (item, endPos: Vector2D, duration) => {
      let time = 0;
      const startPos: Vector2D = { ...item.displayItem.position };
      function animate() {
        time += 1;
        if (time < duration) {
          item.displayItem.x =
            startPos.x + (startPos.x - endPos.x) * (time / duration);
          item.displayItem.y =
            startPos.y + (startPos.y - endPos.y) * (time / duration);
        } else {
          console.log(`start position: ${JSON.stringify(startPos)}`);
          console.log(`end position: ${JSON.stringify(endPos)}`);
          item.displayItem.x = endPos.x;
          item.displayItem.y = endPos.y;
          animations.splice(this);
        }
      }
      animations.push(animate);
    };

    const updateAnimation = (delta, animation) => {
      if (animation.timeElapsed < animation.duration) {
        animation.timeElapsed += delta;
        animation.render(delta, animation.timeElapsed);
      }
    };

    app.ticker.add((delta) => {
      animations.forEach((animate) => animate());
    });

    gameElement.appendChild(app.view);

    return () => app.destroy(true, true);
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <Box id="game" mx="2vw" w="96vw" my="2vh" h="96vh"></Box>;
};
