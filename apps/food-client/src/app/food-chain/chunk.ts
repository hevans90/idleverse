import { addObjectToBoard, Board } from './board';
import { isHouse, rotateHouse } from './house';
import { isRoad, rotateRoad } from './road';
import {
  Chunk,
  addTileToBoard,
  parseTileConfig,
  TileConfig,
  addOuterTileToBoard,
} from './tile';
import { rotationConstants } from './utils/constants';
import { board } from './utils/singletons';

export const translateChunk = (chunk: Chunk, distance: number) => {
  const shiftedTileArray = chunk.map((tile) => ({
    ...tile,
    i: tile.i + distance,
    j: tile.j + distance,
  }));
  return shiftedTileArray;
};

export const rotateChunk = (
  chunk: Chunk,
  rotation: keyof typeof rotationConstants
) => {
  const rc = rotationConstants[rotation];

  const rotatedChunk = chunk.map((tile) => ({
    ...tile,
    i: tile.i * rc.tile.cos - tile.j * rc.tile.sin,
    j: tile.i * rc.tile.sin + tile.j * rc.tile.cos,
  }));

  const rotatedHouses = [];
  rotatedChunk.forEach((tile) =>
    tile.occupants.forEach((occupant, i) => {
      if (isRoad(occupant)) {
        rotateRoad(occupant, rotation);
      } else if (isHouse(occupant) && !rotatedHouses.includes(occupant)) {
        rotateHouse(rotatedChunk, tile, occupant, rotation);
        rotatedHouses.push(occupant);
      }
    })
  );

  return rotatedChunk;
};

export const rotateAboutCenter = (
  chunk: Chunk,
  rotation: keyof typeof rotationConstants,
  size: number
) => {
  const centeredChunk = translateChunk(chunk, -(size - 1) / 2);
  const rotatedChunk = rotateChunk(centeredChunk, rotation);
  const finalChunk = translateChunk(rotatedChunk, (size - 1) / 2);
  return finalChunk;
};

export const drawChunks = (tileConfigs: TileConfig[]) => {
  const chunks = tileConfigs.map((tileConfig) => parseTileConfig(tileConfig));

  for (let p = 0; p < board.chunksWide; p++) {
    for (let q = 0; q < board.chunksHigh; q++) {
      const chunk = chunks[Math.floor(Math.random() * chunks.length)];
      const rotatedChunk = rotateAboutCenter(
        chunk,
        Math.floor(Math.random() * 4) as keyof typeof rotationConstants,
        5
      );

      chunks.splice(chunks.indexOf(chunk), 1);
      drawChunk(board, p, q, rotatedChunk);
    }
  }
};

export const drawOuterSquares = () => {
  for (let i = -2; i < board.chunksWide * 5 + 2; i++) {
    addOuterTileToBoard(board, i, -2);
    addOuterTileToBoard(board, i, -1);
    addOuterTileToBoard(board, i, board.chunksHigh * 5);
    addOuterTileToBoard(board, i, board.chunksHigh * 5 + 1);
  }

  for (let j = 0; j < board.chunksHigh * 5; j++) {
    addOuterTileToBoard(board, -2, j);
    addOuterTileToBoard(board, -1, j);
    addOuterTileToBoard(board, board.chunksWide * 5, j);
    addOuterTileToBoard(board, board.chunksWide * 5 + 1, j);
  }
};

export const drawChunk = (board: Board, p: number, q: number, chunk: Chunk) => {
  chunk.forEach((tile) => {
    addTileToBoard(tile, p * 5, q * 5);
    tile.occupants.forEach((occupant, i) => {
      addObjectToBoard(tile, occupant);
    });
  });
};
