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
  const diner: Diner = {
    i: 0,
    j: 0,
    w: 2,
    h: 2,
    rotation: 0,
    container: new PIXI.Container(),
  };
  board.diner = diner;
  const dinerSprite = createDinerSprite(ts);
  diner.sprite = dinerSprite;
  diner.container.addChild(dinerSprite);

  const randomPosition = getRandomValidPosition(board, diner, 20, true);
  console.log(randomPosition);
  diner.i = randomPosition.i;
  diner.j = randomPosition.j;
  diner.container.x = randomPosition.i * ts;
  diner.container.y = randomPosition.j * ts;
  diner.container.interactive = true;
  diner.container.buttonMode = true;
  diner.container.on('pointerdown', () => {
    const adjacentRoads = getAdjacentRoads(board, diner);
    board.roads.forEach((road) => (road.sprite.tint = 0xffffff));
    adjacentRoads.forEach((road) => (road.sprite.tint = 0x9b39f7));
  });
  board.container.addChild(diner.container);
};