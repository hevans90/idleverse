import { Box } from '@chakra-ui/react';
import { Application } from '@pixi/app';
import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { drawRoad as createRoadSprite } from './road';
import { Tile } from './tile';
import { tileConfigs, Chunk, parseTileConfig, rotateAboutCenter } from './tile';
import { BoardObject, Diner, Drink, House, Road } from './types';
import { ts } from './utils/constants';
import { collides, Vector2D } from './utils/utils';

export const FoodChain = () => {
  useEffect(() => {
    const gameElement = document.getElementById('game');
    const app = new Application({
      transparent: true,
      resizeTo: gameElement,
    });
    app.stage.sortableChildren = true;

    const animations = [];
    const tiles: Tile[] = [];
    const roads: Road[] = [];
    const houses: House[] = [];
    const drinks: Drink[] = [];

    let collisionArray = [];

    const isValidPosition = (item1: BoardObject) => {
      if (item1.name === 'diner1') console.log(item1);
      const itemsArray = roads.concat(houses, drinks);
      collisionArray = itemsArray.filter((item2) => collides(item1, item2));
      if (item1.name === 'diner1') console.log(collisionArray.length);
      if (collisionArray.length > 0) {
        return false;
      }

      // collisionArray = roads.filter(
      //   (road) => Math.abs(road.i - item1.i) + Math.abs(road.j - item1.j) < 3
      // );
      // if (collisionArray.length === 0) {
      //   console.log(`not next to road`);
      //   return false;
      // }

      return true;
    };

    const getRandomPosition = () => {
      return {
        i: Math.floor(Math.random() * 14),
        j: Math.floor(Math.random() * 14),
      };
    };

    const getRandomValidPosition = (item: BoardObject) => {
      let randomPosition = getRandomPosition();
      let tries = 0;
      for (let i = 0; i < 1000; i++) {
        if (isValidPosition({ ...item, ...randomPosition })) {
          console.log(`tries: ${tries}`);
          return randomPosition;
        }
        randomPosition = getRandomPosition();
        tries++;
      }
      console.log(`tries: ${tries}`);
      return randomPosition;
    };

    const chunks = tileConfigs.map((tileConfig) => parseTileConfig(tileConfig));

    const createEmptySquareSprite = () => {
      const square = new PIXI.Graphics();
      square.lineStyle(2, 0x0, 1);
      square.beginFill(0xffffff);
      square.drawRect(2, 2, ts - 2, ts - 2);
      square.endFill();

      return square;
    };

    const createHouseSprite = (house: House) => {
      const houseContainer = new PIXI.Container();
      const houseSprite = new PIXI.Sprite(houseTextures[house.orient]);
      houseSprite.width = ts * 2;
      houseSprite.height = ts * 2;
      const houseNum = new PIXI.Text(
        house.num,
        new PIXI.TextStyle({
          fontFamily: 'zx-spectrum',
          fontSize: 24,
          fontWeight: 'bold',
          fill: '#ffffff',
        })
      );
      houseNum.position.x = 5;
      houseNum.position.y = 5;

      houseContainer.addChild(houseSprite, houseNum);

      return houseContainer;
    };

    const createDrinkSprite = (texture: PIXI.Texture) => {
      const drink = new PIXI.Sprite(texture);
      drink.width = ts;
      drink.height = ts;
      return drink;
    };

    const re = /(\w)(\d*)(?:-(\d+))?/;
    const houseTextures = {
      '1': PIXI.Texture.from('https://i.imgur.com/rGgNlV1.png'),
      '2': PIXI.Texture.from('https://i.imgur.com/OYDsDs7.png'),
      '3': PIXI.Texture.from('https://i.imgur.com/rGgNlV1.png'),
      '4': PIXI.Texture.from('https://i.imgur.com/jYSXUk0.png'),
    };
    const dinerTexture = PIXI.Texture.from('https://i.imgur.com/gPK9T8l.png');
    const beerTexture = PIXI.Texture.from('https://i.imgur.com/eNwKilN.png');
    const colaTexture = PIXI.Texture.from('https://i.imgur.com/LMUTwgN.png');
    const lemonadeTexture = PIXI.Texture.from(
      'https://i.imgur.com/6ilmUUU.png'
    );

    const drawInvalidIndicator = () => {
      const indicator = new PIXI.Graphics();
      indicator.lineStyle(4, 0x8b0000, 1);
      indicator.beginFill(0x8b0000, 0.25);
      indicator.drawRect(0, 0, ts * 2 - 2, ts * 2 - 2);
      indicator.endFill();
      return indicator;
    };

    const drawValidIndicator = () => {
      const indicator = new PIXI.Graphics();
      indicator.lineStyle(4, 0x8b8000, 1);
      indicator.beginFill(0x8b8000, 0.25);
      indicator.drawRect(0, 0, ts * 2 - 2, ts * 2 - 2);
      indicator.endFill();
      return indicator;
    };

    const invalidIndicator = drawInvalidIndicator();
    const validIndicator = drawValidIndicator();
    let indicator = validIndicator;
    let otherIndicator = invalidIndicator;

    const drawChunk = (
      p: number,
      q: number,
      container: PIXI.Container,
      chunk: Chunk
    ) => {
      chunk.forEach((tile) => {
        const i = tile.i + p * 5;
        const j = tile.j + q * 5;

        const emptySquare: Tile = {
          i: i,
          j: j,
        };

        const squareSprite = createEmptySquareSprite();
        squareSprite.x = emptySquare.i * ts;
        squareSprite.y = emptySquare.j * ts;
        squareSprite.interactive = true;
        squareSprite.buttonMode = true;
        squareSprite.on('mouseover', () => {
          if (isValidPosition({ i: i, j: j, h: 1, w: 1 })) {
            indicator = validIndicator;
            otherIndicator = invalidIndicator;
          } else {
            indicator = invalidIndicator;
            otherIndicator = validIndicator;
          }
          indicator.position.x = i * ts;
          indicator.position.y = j * ts;
          board.addChild(indicator);
          board.removeChild(otherIndicator);
        });
        squareSprite.on('mouseout', () => {
          board.removeChild(indicator);
        });
        squareSprite.on('pointerdown', () => {
          console.log(i, j);
          if (isValidPosition({ i: i, j: j, w: 1, h: 1 })) {
            dinerSprite.x = i * ts;
            dinerSprite.y = j * ts;
          }
        });
        container.addChild(squareSprite);
      });

      chunk.forEach((tile) => {
        const i = tile.i;
        const j = tile.j;
        const match = re.exec(tile.contents);

        if (match[1] === 'r') {
          const road: Road = {
            i: j + p * 5,
            j: i + q * 5,
            w: 0,
            h: 0,
            connections: match[2].split('').map((i) => parseInt(i)),
          };
          roads.push(road);
          const roadSprite = createRoadSprite(road);
          roadSprite.x = road.i * ts;
          roadSprite.y = road.j * ts;
          container.addChild(roadSprite);
        } else if (match[1] === 'h') {
          const house: House = {
            i: j + p * 5,
            j: i + q * 5,
            w: 1,
            h: 1,
            orient: match[2],
            num: match[3],
          };
          houses.push(house);
          const houseSprite = createHouseSprite(house);
          houseSprite.x = house.i * ts;
          houseSprite.y = house.j * ts;
          houseSprite.interactive = true;
          houseSprite.buttonMode = true;
          houseSprite.on('pointerdown', () => {
            console.log(house);
          });
          container.addChild(houseSprite);
        } else if (match[1] === 'b') {
          const beer: Drink = {
            i: j + p * 5,
            j: i + q * 5,
            w: 0,
            h: 0,
          };
          drinks.push(beer);
          const beerSprite = createDrinkSprite(beerTexture);
          beerSprite.x = beer.i * ts;
          beerSprite.y = beer.j * ts;
          container.addChild(beerSprite);
        } else if (match[1] === 'l') {
          const cola: Drink = {
            i: j + p * 5,
            j: i + q * 5,
            w: 0,
            h: 0,
          };
          drinks.push(cola);
          const colaSprite = createDrinkSprite(colaTexture);
          colaSprite.x = cola.i * ts;
          colaSprite.y = cola.j * ts;
          container.addChild(colaSprite);
        } else if (match[1] === 'c') {
          const lemonade: Drink = {
            i: j + p * 5,
            j: i + q * 5,
            w: 0,
            h: 0,
          };
          drinks.push(lemonade);
          const lemonadeSprite = createDrinkSprite(lemonadeTexture);
          lemonadeSprite.x = lemonade.i * ts;
          lemonadeSprite.y = lemonade.j * ts;
          container.addChild(lemonadeSprite);
        }
      });
    };

    const createDinerSprite = (dinerTexture: PIXI.Texture) => {
      const dinerSprite = new PIXI.Sprite(dinerTexture);

      dinerSprite.width = ts * 2;
      dinerSprite.height = ts * 2;

      dinerSprite.interactive = true;
      dinerSprite.buttonMode = true;
      // dinerSprite.on('pointerdown', () => {
      //   let time = 0;
      //   diner.prevPosition.x = dinerSprite.position.x;
      //   diner.prevPosition.y = dinerSprite.position.y;
      //   const randomPosition = getRandomValidPosition(dinerSprite);
      //   diner.nextPosition.x = randomPosition.i * ts + 2;
      //   diner.nextPosition.y = randomPosition.j * ts + 2;
      //   animations.push(() => {
      //     time += 1;
      //     if (diner.time < diner.duration) {
      //       dinerSprite.position.x =
      //         diner.prevPosition.x +
      //         (diner.nextPosition.x - diner.prevPosition.x) *
      //           (diner.time / diner.duration);
      //       dinerSprite.position.y =
      //         diner.prevPosition.y +
      //         (diner.nextPosition.y - diner.prevPosition.y) *
      //           (diner.time / diner.duration);
      //     } else {
      //       dinerSprite.x = diner.nextPosition.x;
      //       dinerSprite.y = diner.nextPosition.y;
      //       diner.prevPosition = { ...diner.nextPosition };
      //       animations.splice(0, 1);
      //     }
      //   });
      // });

      return dinerSprite;
    };

    const board = new PIXI.Container();

    for (let p = 0; p < 3; p++) {
      for (let q = 0; q < 3; q++) {
        const chunk = chunks[Math.floor(Math.random() * chunks.length)];
        const rotatedChunk = rotateAboutCenter(
          chunk,
          Math.floor(Math.random() * 4),
          5
        );
        chunks.splice(chunks.indexOf(chunk), 1);
        drawChunk(p, q, board, chunk);
      }
    }

    const dinerSprite = createDinerSprite(dinerTexture);
    const diner: Diner = {
      i: 0,
      j: 0,
      w: 1,
      h: 1,
      name: 'diner1',
    };
    const randomPosition = getRandomValidPosition(diner);
    console.log(randomPosition);
    dinerSprite.x = randomPosition.i * ts;
    dinerSprite.y = randomPosition.j * ts;
    board.addChild(dinerSprite);

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
          item.displayItem.x = endPos.x;
          item.displayItem.y = endPos.y;
          animations.splice(this);
        }
      }
      animations.push(animate);
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
