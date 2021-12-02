import * as PIXI from 'pixi.js';
import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { ts } from './utils/constants';
import {
  getRandomValidPosition,
  isValidPosition,
  Vector2D,
} from './utils/utils';
import { Diner, Drink, EmployeeTypes, House, Road } from './types';
import { createEmptySquareSprite } from './emptySquare';
import {
  Tile,
  tileConfigs,
  Chunk,
  parseTileConfig,
  rotateAboutCenter,
} from './tile';
import { drawRoad as createRoadSprite } from './road';
import { createHouseSprite } from './house';
import { createDrinkSprite, drinkTextures, DrinkTextures } from './drink';
import { createDinerSprite } from './diner';
import { drawIndicator } from './indicators';
import { addDrawer } from './drawer';
import { drawCard } from './card';

export const FoodChain = () => {
  useEffect(() => {
    const gameElement = document.getElementById('game');
    const app = new PIXI.Application({
      transparent: true,
      resizeTo: gameElement,
    });
    app.stage.sortableChildren = true;

    const animations = [];
    const tiles: Tile[] = [];

    const boardItems = {
      roads: [],
      houses: [],
      drinks: [],
    };

    const collisionArray = [];

    const chunks = tileConfigs.map((tileConfig) => parseTileConfig(tileConfig));

    const re = /(\w)(\d*)(?:-(\d+))?/;

    const invalidIndicator = drawIndicator('invalid');
    const validIndicator = drawIndicator('valid');
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
          if (
            isValidPosition(
              { i: i, j: j, h: 1, w: 1 },
              collisionArray,
              boardItems
            )
          ) {
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
          if (
            isValidPosition(
              { i: i, j: j, w: 1, h: 1 },
              collisionArray,
              boardItems
            )
          ) {
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
          boardItems.roads.push(road);
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
            orient: parseInt(match[2]),
            num: parseInt(match[3]),
          };
          boardItems.houses.push(house);
          const houseSprite = createHouseSprite(house);
          houseSprite.x = house.i * ts;
          houseSprite.y = house.j * ts;
          houseSprite.interactive = true;
          houseSprite.buttonMode = true;
          houseSprite.on('pointerdown', () => {
            console.log(house);
          });
          container.addChild(houseSprite);
        } else if (match[1] in drinkTextures) {
          const drink: Drink = {
            i: j + p * 5,
            j: i + q * 5,
            w: 0,
            h: 0,
          };
          boardItems.drinks.push(drink);
          const drinkSprite = createDrinkSprite(
            match[1] as keyof DrinkTextures
          );
          drinkSprite.x = drink.i * ts;
          drinkSprite.y = drink.j * ts;
          container.addChild(drinkSprite);
        }
      });
    };

    const board = new PIXI.Container();

    for (let p = 0; p < 5; p++) {
      for (let q = 0; q < 4; q++) {
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

    const dinerSprite = createDinerSprite(ts);
    const diner: Diner = {
      i: 0,
      j: 0,
      w: 1,
      h: 1,
      name: 'diner1',
    };
    const randomPosition = getRandomValidPosition(
      diner,
      collisionArray,
      boardItems
    );
    console.log(randomPosition);
    dinerSprite.x = randomPosition.i * ts;
    dinerSprite.y = randomPosition.j * ts;
    board.addChild(dinerSprite);

    board.pivot.x = board.width / 2;
    board.pivot.y = board.height / 2;
    board.position.x = app.screen.width / 2;
    board.position.y = app.screen.height / 2;
    app.stage.addChild(board);

    const drawer = addDrawer({
      app: app,
      x: 0,
      y: 0,
      width: 1000,
      height: app.screen.height,
      tabWidth: 40,
    });

    const executiveVP1 = drawCard({
      title: 'CFO',
      colour: EmployeeTypes.finance.color,
      description: 'Add +50% to cash\nearned this round',
    });
    app.stage.addChild(executiveVP1);

    const executiveVP2 = drawCard({
      title: 'CFO',
      colour: EmployeeTypes.finance.color,
      description: 'Add +50% to cash\nearned this round',
    });
    executiveVP2.position.x = 10;
    executiveVP2.position.y = 10;
    app.stage.addChild(executiveVP2);

    const executiveVP3 = drawCard({
      title: 'CFO',
      colour: EmployeeTypes.finance.color,
      description: 'Add +50% to cash\nearned this round',
    });
    executiveVP3.position.x = 20;
    executiveVP3.position.y = 20;
    app.stage.addChild(executiveVP3);

    const errandBoy = drawCard({
      title: 'Errand\nBoy',
      colour: EmployeeTypes.drinks.color,
      description: 'Get 1 drink of\nany type',
    });
    errandBoy.position.x = 240;
    app.stage.addChild(errandBoy);

    app.stage.addChild(drawer);

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
