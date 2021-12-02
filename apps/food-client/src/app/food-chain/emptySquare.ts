import * as PIXI from 'pixi.js';
import { Board } from './board';
import { drawIndicator } from './indicators';
import { Tile } from './tile';
import { lineColour } from './types';
import { ts } from './utils/constants';
import { isValidPosition } from './utils/utils';

const invalidIndicator = drawIndicator('invalid');
const validIndicator = drawIndicator('valid');

let activeIndicator = validIndicator;
let inactiveIndicator = invalidIndicator;

export const createEmptySquareSprite = () => {
  const square = new PIXI.Graphics();
  square.lineStyle(2, lineColour, 1);
  square.beginFill(0xffffff);
  square.drawRect(2, 2, ts - 2, ts - 2);
  square.endFill();

  return square;
};

export const createEmptySquare = (board: Board, i: number, j: number) => {
  const emptySquare: Tile = {
    i: i,
    j: j,
  };
  const squareSprite = createEmptySquareSprite();
  squareSprite.position.x = emptySquare.i * ts;
  squareSprite.position.y = emptySquare.j * ts;
  squareSprite.interactive = true;
  squareSprite.buttonMode = true;
  squareSprite.on('mouseover', () => {
    if (isValidPosition(board, { ...board.diner, i: i, j: j })) {
      activeIndicator = validIndicator;
      inactiveIndicator = invalidIndicator;
    } else {
      activeIndicator = invalidIndicator;
      inactiveIndicator = validIndicator;
    }
    activeIndicator.position.x = i * ts;
    activeIndicator.position.y = j * ts;
    board.container.addChild(activeIndicator);
    board.container.removeChild(inactiveIndicator);
  });
  squareSprite.on('mouseout', () => {
    board.container.removeChild(activeIndicator);
  });
  squareSprite.on('pointerdown', () => {
    console.log(i, j);
    if (isValidPosition(board, { ...board.diner, i: i, j: j })) {
      board.roads.forEach((road) => (road.sprite.tint = 0xffffff));
      board.diner.i = i;
      board.diner.j = j;
      board.diner.sprite.x = i * ts;
      board.diner.sprite.y = j * ts;
    }
  });
  board.container.addChild(squareSprite);
};
