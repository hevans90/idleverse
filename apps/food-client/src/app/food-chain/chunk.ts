import * as PIXI from 'pixi.js';
import { Anim } from './animation';
import { addTileContentsToBoard, Board } from './board';
import { createEmptySquareSprite } from './emptySquare';
import { drawIndicator } from './indicators';
import {
  Chunk,
  parseTileConfig,
  rotateAboutCenter,
  Tile,
  TileConfig,
} from './tile';
import { ts } from './utils/constants';
import { isValidPosition } from './utils/utils';

const invalidIndicator = drawIndicator('invalid');
const validIndicator = drawIndicator('valid');

let activeIndicator = validIndicator;
let inactiveIndicator = invalidIndicator;

export const drawChunk = (
  app: PIXI.Application,
  animations: Anim[],
  board: Board,
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
    squareSprite.position.x = emptySquare.i * ts;
    squareSprite.position.y = emptySquare.j * ts;
    squareSprite.interactive = true;
    squareSprite.buttonMode = true;
    squareSprite.on('mouseover', () => {
      if (isValidPosition(board, { i: i, j: j, h: 1, w: 1 })) {
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
      if (isValidPosition(board, { i: i, j: j, w: 1, h: 1 })) {
        board.roads.forEach((road) => (road.sprite.tint = 0xffffff));
        board.diner.i = i;
        board.diner.j = j;
        board.diner.sprite.x = i * ts;
        board.diner.sprite.y = j * ts;
      }
    });
    container.addChild(squareSprite);
  });

  chunk.forEach((tile) => {
    addTileContentsToBoard(app, board, animations, tile, p, q);
  });
};

export const drawChunks = (
  app: PIXI.Application,
  animations: Anim[],
  board: Board,
  tileConfigs: TileConfig[]
) => {
  const chunks = tileConfigs.map((tileConfig) => parseTileConfig(tileConfig));

  for (let p = 0; p < 5; p++) {
    for (let q = 0; q < 4; q++) {
      const chunk = chunks[Math.floor(Math.random() * chunks.length)];
      const rotatedChunk = rotateAboutCenter(
        chunk,
        Math.floor(Math.random() * 4),
        5
      );
      chunks.splice(chunks.indexOf(chunk), 1);
      drawChunk(app, animations, board, p, q, board.container, chunk);
    }
  }
};
