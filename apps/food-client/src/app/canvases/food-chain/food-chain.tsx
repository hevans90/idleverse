import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { tileConfigRegex, ts } from './utils/constants';
import { getRandomValidPosition, isValidPosition } from './utils/utils';
import { Diner, Drink, House, lineColour, Road } from './types';
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
import { drawBoxIndicator, drawIndicator, Indicator } from './indicators';
import {
  renderDrawer,
  Drawer,
  addToDrawer,
  removeFromDrawer,
  organiseRecruitDrawer,
} from './drawer';
import {
  Card,
  cardConfigs,
  ceoCardConfig,
  createCardSprite,
  emptyCardConfig,
  enableCardHire,
  enableCardStructure,
} from './card';

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

    const invalidIndicator = drawIndicator('invalid');
    const validIndicator = drawIndicator('valid');
    let activeIndicator = validIndicator;
    let inactiveIndicator = invalidIndicator;

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
            activeIndicator = validIndicator;
            inactiveIndicator = invalidIndicator;
          } else {
            activeIndicator = invalidIndicator;
            inactiveIndicator = validIndicator;
          }
          activeIndicator.position.x = i * ts;
          activeIndicator.position.y = j * ts;
          board.addChild(activeIndicator);
          board.removeChild(inactiveIndicator);
        });
        squareSprite.on('mouseout', () => {
          board.removeChild(activeIndicator);
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
        const match = tileConfigRegex.exec(tile.contents);

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
      boardItems,
      20
    );
    console.log(randomPosition);
    dinerSprite.x = randomPosition.i * ts;
    dinerSprite.y = randomPosition.j * ts;
    dinerSprite.interactive = true;
    dinerSprite.buttonMode = true;
    board.addChild(dinerSprite);

    board.pivot.x = board.width / 2;
    board.pivot.y = board.height / 2;
    board.position.x = app.screen.width / 2;
    board.position.y = app.screen.height / 2;
    app.stage.addChild(board);

    const player = {
      cards: [],
      hiresAvailable: 3,
    };

    const phases = ['Structure', 'Hire', 'Train'];

    const recruitDrawer: Drawer = {
      open: false,
      y: 0,
      width: 900,
      height: app.screen.height,
      tabWidth: 40,
      orient: 'right',
      cards: [],
    };

    const structureDrawer: Drawer = {
      open: false,
      y: 0,
      width: 1500,
      height: app.screen.height * 0.8,
      tabWidth: 40,
      orient: 'left',
      cards: [],
    };

    const beachDrawer: Drawer = {
      open: false,
      y: app.screen.height * 0.8,
      width: 1500,
      height: app.screen.height * 0.2,
      tabWidth: 40,
      orient: 'left',
      cards: [],
    };

    renderDrawer(app, structureDrawer);
    renderDrawer(app, beachDrawer);
    renderDrawer(app, recruitDrawer);

    const cards = [];

    Object.values(cardConfigs).forEach((card) =>
      Array.from({ length: card.count }, () =>
        cards.push({
          ...card,
          container: createCardSprite(card),
          owner: null,
        })
      )
    );

    const validCardTint = new PIXI.Graphics();
    validCardTint.beginFill(0x37946e, 0.25);
    validCardTint.drawRoundedRect(0, 0, 200, 192, 12);
    validCardTint.endFill();

    const invalidCardTint = new PIXI.Graphics();
    invalidCardTint.beginFill(0xd3002c, 0.25);
    invalidCardTint.drawRoundedRect(0, 0, 200, 192, 12);
    invalidCardTint.endFill();

    const ceoCard: Card = {
      ...ceoCardConfig,
      container: createCardSprite(ceoCardConfig),
      owner: player,
      managing: [],
    };

    ceoCard.container.on('pointerover', () => {
      if (ceoCard.managing.length < ceoCard.managementSlots) {
        ceoCard.container.addChild(validCardTint);
      } else ceoCard.container.addChild(invalidCardTint);
    });

    ceoCard.container.on('pointerout', () => {
      ceoCard.container.removeChild(validCardTint);
      ceoCard.container.removeChild(invalidCardTint);
    });

    ceoCard.container.position.x =
      structureDrawer.width / 2 - ceoCard.container.width / 2;
    ceoCard.container.position.y = 200;
    structureDrawer.container.addChild(ceoCard.container);

    ceoCard.managingContainer = new PIXI.Container();
    ceoCard.managingContainer.x = ceoCard.container.position.x;
    ceoCard.managingContainer.y =
      ceoCard.container.position.y + ceoCard.container.height + 60;

    for (let i = -1; i < 2; i++) {
      const emptyCard = {
        ...emptyCardConfig,
        container: createCardSprite(emptyCardConfig),
      };
      emptyCard.container.position.x = 3 * i * (ceoCard.container.width + 20);

      ceoCard.managingContainer.addChild(emptyCard.container);
    }

    structureDrawer.container.addChild(ceoCard.managingContainer);

    const divisionLine = PIXI.Graphics;

    const hiresIndicator: Indicator = {
      height: 50,
      width: 250,
      borderColor: 0xffbd2e,
      bgColor: 0xffd67d,
      textColor: 0x000000,
      text: `Hires Available: ${player.hiresAvailable.toString()}`,
    };
    drawBoxIndicator(hiresIndicator);
    beachDrawer.container.addChild(hiresIndicator.container);
    hiresIndicator.container.position.x = 620;
    hiresIndicator.container.position.y = 180;

    cards.forEach((card) => {
      addToDrawer(recruitDrawer, card);
      //enableCardHire(player, card, recruitDrawer, beachDrawer, hiresIndicator);
      enableCardStructure(app, recruitDrawer, card, ceoCard);
    });
    organiseRecruitDrawer(recruitDrawer);

    const phaseIndicatorContainer = new PIXI.Container();
    phases.forEach((phase, i) => {
      const phaseIndicatorElement = drawBoxIndicator({
        height: 50,
        width: 200,
        borderColor: 0x27684d,
        bgColor: 0x37946e,
        textColor: 0xffffff,
        text: phase,
      });
      phaseIndicatorElement.position.x = i * 200;
      phaseIndicatorContainer.addChild(phaseIndicatorElement);
    });

    phaseIndicatorContainer.pivot.x = phaseIndicatorContainer.width / 2;

    phaseIndicatorContainer.x = app.screen.width * 0.5;
    phaseIndicatorContainer.y = app.screen.height - 100;

    app.stage.addChild(phaseIndicatorContainer);

    app.ticker.add((delta) => {
      animations.forEach((animate) => animate());
    });

    gameElement.appendChild(app.view);

    return () => app.destroy(true, true);
  }, []);

  return <Box id="game" mx="2vw" w="96vw" my="2vh" h="96vh"></Box>;
};
