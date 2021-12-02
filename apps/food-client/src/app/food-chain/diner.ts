import * as PIXI from 'pixi.js';
import {
  findShortestRoadPath,
  getRandomValidPosition,
  isValidPosition,
} from './utils/utils';
import { board } from './utils/singletons';
import { ts } from './utils/constants';
import { BoardObject } from './board';
import { addDinerToDrawer, toggleDrawerOpen } from './drawer';
import { Player } from './player';
import { Road } from './road';
import { disablePlacement, enablePlacement } from './tile';
import { createSprite } from './utils/graphics-utils';

export type Diner = BoardObject & {
  time?: number;
  duration?: number;
  previousPosition?: number;
  nextPosition?: number;
  owner: Player;
  housePath?: Road[];
  drinksPath?: Road[];
  update?: () => void;
};

export const createDiner = (player: Player) => {
  const diner: Diner = {
    i: 0,
    j: 0,
    w: 2,
    h: 2,
    rotation: 0,
    owner: player,
    drinksPath: [],
    housePath: [],
    container: new PIXI.Container(),
  };
  player.diners.push(diner);
  addDinerToDrawer(player, diner);

  const background = new PIXI.Graphics();
  background.lineStyle(2, 0x000000);
  background.beginFill(player.colour);
  background.drawRect(0, 0, ts * 2, ts * 2);
  background.endFill();

  diner.sprite = createSprite('diner', ts * 2);
  diner.sprite.anchor.x = 0.5;
  diner.sprite.anchor.y = 0.5;
  diner.sprite.x = ts;
  diner.sprite.y = ts;

  diner.container.addChild(background, diner.sprite);
};

export const enableDinerPlacement = (player: Player) => {
  const diners = player.diners;
  const dinersDrawer = player.drawers.diners;
  diners.forEach((diner) => {
    console.log('diner placement enabled');
    diner.sprite.interactive = true;
    diner.sprite.buttonMode = true;
    diner.sprite.on('pointerdown', () => {
      enablePlacement(
        diner,
        board.tiles,
        (square) => isValidPosition(diner, square),
        () => [],
        () => {
          if (!board.diners.includes(diner)) {
            board.diners.push(diner);
          }
          diner.drinksPath = [];
          disablePlacement();
          diner.sprite.removeAllListeners();
          diner.sprite.on('pointerdown', () => {
            enableDrinksPath(diner);
          });
        }
      );

      if (dinersDrawer.open) toggleDrawerOpen(dinersDrawer);
    });
  });
};

//export const getDrinks = (diner: Diner) => {};

export const enableDrinksPath = (diner: Diner) => {
  let validRoads = board.roads.filter(
    (road) => !diner.drinksPath.includes(road)
  );
  diner.sprite.on('pointerdown', () => {
    board.roads.forEach((road) => {
      road.container.removeAllListeners();
      road.sprite.tint = 0xffffff;
    });
  });
  board.roads.forEach((road) => {
    road.container.on('pointerover', () => {
      if (diner.drinksPath.length === 0)
        findShortestRoadPath(validRoads, diner, road).forEach(
          (road) => (road.sprite.tint = 0xffff00)
        );
      else {
        const path = findShortestRoadPath(
          validRoads,
          diner.drinksPath[diner.drinksPath.length - 1],
          road
        );
        path
          .slice(1, path.length)
          .forEach((road) => (road.sprite.tint = 0xffff00));
      }
    });
    road.container.on('pointerout', () => {
      validRoads.forEach((road) => (road.sprite.tint = 0xffffff));
    });
    road.container.on('pointerdown', () => {
      if (diner.drinksPath.includes(road)) {
        diner.drinksPath = diner.drinksPath.slice(
          0,
          diner.drinksPath.indexOf(road)
        );
      } else if (diner.drinksPath.length === 0) {
        diner.drinksPath = findShortestRoadPath(validRoads, diner, road);
      } else {
        diner.drinksPath = diner.drinksPath.concat(
          findShortestRoadPath(
            validRoads,
            diner.drinksPath[diner.drinksPath.length - 1],
            road
          )
        );
      }
      validRoads = board.roads.filter(
        (road) => !diner.drinksPath.includes(road)
      );
      diner.drinksPath.forEach((road) => (road.sprite.tint = 0xff0000));
      validRoads.forEach((road) => (road.sprite.tint = 0xffffff));
    });
  });
};

export const placeDinerRandomly = (diner: Diner) => {
  const randomPosition = getRandomValidPosition(diner, 20, true);
  diner.i = randomPosition.i;
  diner.j = randomPosition.j;
  diner.container.x = randomPosition.i * ts;
  diner.container.y = randomPosition.j * ts;
  board.container.addChild(diner.container);
};
