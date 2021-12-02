import * as PIXI from 'pixi.js';
import { Board, BoardObject, getAdjacentRoads } from './board';
import { ts } from './utils/constants';
import { getRandomValidPosition } from './utils/utils';

const dinerTexture = PIXI.Texture.from('https://i.imgur.com/gPK9T8l.png');

export type Diner = BoardObject & {
  time?: number;
  duration?: number;
  previousPosition?: number;
  nextPosition?: number;
  update?: () => void;
};

export const createDinerSprite = (ts: number) => {
  const dinerSprite = new PIXI.Sprite(dinerTexture);

  dinerSprite.width = ts * 2;
  dinerSprite.height = ts * 2;

  return dinerSprite;
};

export const addDinerToBoard = (board: Board) => {
  const dinerSprite = createDinerSprite(ts);
  const diner: Diner = {
    i: 0,
    j: 0,
    w: 2,
    h: 2,
    sprite: dinerSprite,
  };
  const randomPosition = getRandomValidPosition(board, diner, 20);
  console.log(randomPosition);
  diner.i = randomPosition.i;
  diner.j = randomPosition.j;
  dinerSprite.x = randomPosition.i * ts;
  dinerSprite.y = randomPosition.j * ts;
  dinerSprite.interactive = true;
  dinerSprite.buttonMode = true;
  dinerSprite.on('pointerdown', () => {
    const adjacentRoads = getAdjacentRoads(board, diner);
    board.roads.forEach((road) => (road.sprite.tint = 0xffffff));
    adjacentRoads.forEach((road) => (road.sprite.tint = 0x9b39f7));
  });
  board.diner = diner;
  board.container.addChild(dinerSprite);
};
