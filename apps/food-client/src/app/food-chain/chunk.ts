import * as PIXI from 'pixi.js';
import { Anim } from './animation';
import { addTileContentsToBoard, Board } from './board';
import { createEmptySquare } from './emptySquare';
import { Chunk, parseTileConfig, rotateAboutCenter, TileConfig } from './tile';

export const drawChunk = (
  app: PIXI.Application,
  animations: Anim[],
  board: Board,
  p: number,
  q: number,
  chunk: Chunk
) => {
  chunk.forEach((tile) => {
    createEmptySquare(board, tile.i + p * 5, tile.j + q * 5);
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
      drawChunk(app, animations, board, p, q, chunk);
    }
  }
};
