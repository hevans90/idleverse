import { addObjectToBoard, Board } from './board';
import { Chunk, addTileToBoard, parseTileConfig, TileConfig } from './tile';
import { rotationConstants } from './utils/constants';

export const translateChunk = (chunk: Chunk, distance: number) => {
  const shiftedTileArray = chunk.map((tile) => ({
    ...tile,
    i: tile.i + distance,
    j: tile.j + distance,
  }));
  return shiftedTileArray;
};

export const rotateChunk = (chunk: Chunk, orientation: number) => {
  const rc = rotationConstants[orientation];

  const rotatedTileArray = chunk.map((tile) => ({
    ...tile,
    i: tile.i * rc.i,
    j: tile.j * rc.j,
  }));
  return rotatedTileArray;
};

export const rotateAboutCenter = (
  chunk: Chunk,
  orientation: number,
  distance: number
) => {
  const centeredChunk = translateChunk(chunk, -(distance - 1) / 2);
  const rotatedChunk = rotateChunk(centeredChunk, orientation);
  const finalChunk = translateChunk(rotatedChunk, (distance - 1) / 2);
  return finalChunk;
};

export const drawChunks = (board: Board, tileConfigs: TileConfig[]) => {
  const chunks = tileConfigs.map((tileConfig) => parseTileConfig(tileConfig));

  for (let p = 0; p < board.chunksWide; p++) {
    for (let q = 0; q < board.chunksHigh; q++) {
      const chunk = chunks[Math.floor(Math.random() * chunks.length)];
      // const rotatedChunk = rotateAboutCenter(
      //   chunk,
      //   Math.floor(Math.random() * 4),
      //   5
      // );
      chunks.splice(chunks.indexOf(chunk), 1);
      drawChunk(board, p, q, chunk);
    }
  }

  for (let i = -2; i < board.chunksWide * 5 + 2; i++) {
    //createOuterSquare(board, i, -2);
    //createOuterSquare(board, i, -1);
    //createOuterSquare(board, i, board.chunksHigh * 5);
    //createOuterSquare(board, i, board.chunksHigh * 5 + 1);
  }

  for (let j = 0; j < board.chunksHigh * 5; j++) {
    // createOuterSquare(board, -2, j);
    // createOuterSquare(board, -1, j);
    // createOuterSquare(board, board.chunksWide * 5, j);
    // createOuterSquare(board, board.chunksWide * 5 + 1, j);
  }
};

export const drawChunk = (board: Board, p: number, q: number, chunk: Chunk) => {
  chunk.forEach((tile) => {
    addTileToBoard(board, tile, p * 5, q * 5);
    tile.occupants.forEach((occupant, i) => {
      addObjectToBoard(board, tile, occupant);
    });
  });
};
