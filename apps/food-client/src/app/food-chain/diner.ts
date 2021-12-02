import * as PIXI from 'pixi.js';
import { BoardObject } from './board';
import { addDinerToDrawer, toggleDrawerOpen } from './drawer';
import { Player } from './player';
import { Road } from './road';
import { disablePlacement, enablePlacement } from './tile';
import { ts } from './utils/constants';
import { dinerTexture } from './utils/graphics';
import { app, board } from './utils/singletons';
import { getRandomValidPosition, isValidPosition } from './utils/utils';

export type Diner = BoardObject & {
  time?: number;
  duration?: number;
  previousPosition?: number;
  nextPosition?: number;
  owner: Player;
  path?: Road[];
  update?: () => void;
};

export const createDinerSprite = (player: Player) => {
  const dinerSprite = new PIXI.Sprite(dinerTexture);

  dinerSprite.width = ts * 2;
  dinerSprite.height = ts * 2;

  return dinerSprite;
};

export const createDiner = (player: Player) => {
  const diner: Diner = {
    i: 0,
    j: 0,
    w: 2,
    h: 2,
    rotation: 0,
    owner: player,
    container: new PIXI.Container(),
  };
  player.diners.push(diner);
  addDinerToDrawer(player, diner);

  const background = new PIXI.Graphics();
  background.lineStyle(2, 0x000000);
  background.beginFill(player.colour);
  background.drawRect(0, 0, ts * 2, ts * 2);
  background.endFill();

  const dinerSprite = createDinerSprite(player);
  diner.sprite = dinerSprite;
  diner.container.addChild(background, dinerSprite);
};

export const enableDinerPlacement = (player: Player) => {
  const diners = player.diners;
  const dinersDrawer = player.drawers.diners;
  diners.forEach((diner) => {
    diner.sprite.interactive = true;
    diner.sprite.buttonMode = true;
    diner.sprite.on('pointerdown', () => {
      enablePlacement(
        diner,
        board.tiles,
        (square) => isValidPosition(diner, square),
        () => [],
        () => {
          board.diners.push(diner);
          disablePlacement();
        }
      );

      if (dinersDrawer.open) toggleDrawerOpen(dinersDrawer);
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
