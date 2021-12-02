import { BoardObject } from './board';

export type TileConfig = string[][];

export type Tile = {
  i: number;
  j: number;
  contents?: string;
  occupant?: BoardObject;
};

export type Chunk = Tile[];

export const parseTileConfig = (tileConfig: TileConfig) => {
  const tileArray = [];
  tileConfig.forEach((row, j) =>
    row.forEach((element, i) => {
      tileArray.push({
        i: i,
        j: j,
        contents: element,
      });
    })
  );
  return tileArray;
};

export const translateChunk = (chunk: Chunk, distance: number) => {
  const shiftedTileArray = chunk.map((tile) => ({
    ...tile,
    i: tile.i + distance,
    j: tile.j + distance,
    contents: tile.contents,
  }));
  return shiftedTileArray;
};

export const rotateChunk = (chunk: Chunk, orientation: number) => {
  const rotationConstants = {
    0: { i: 1, j: 1 },
    1: { i: -1, j: 1 },
    2: { i: -1, j: -1 },
    3: { i: 1, j: -1 },
  };

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

export const tileConfigs: TileConfig[] = [
  [
    ['e', 'e', 'r23', 'r13', 'r14'],
    ['e', 'e', 'e', 'l', 'r24'],
    ['r14', 'e', 'e', 'e', 'r23'],
    ['r24', 'c', 'e', 'e', 'e'],
    ['r23', 'r13', 'r14', 'e', 'e'],
  ],
  [
    ['e', 'e', 'r24', 'e', 'e'],
    ['e', 'e', 'r24', 'e', 'e'],
    ['r13', 'r13', 'r123', 'r13', 'r13'],
    ['e', 'e', 'e', 'l', 'e'],
    ['e', 'e', 'e', 'e', 'e'],
  ],
  [
    ['e', 'e', 'r24', 'e', 'e'],
    ['e', 'e', 'r24', 'e', 'e'],
    ['r13', 'r13', 'r123', 'r13', 'r13'],
    ['e', 'c', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e'],
  ],
  [
    ['e', 'e', 'r24', 'e', 'e'],
    ['e', 'b', 'r24', 'e', 'e'],
    ['r13', 'r13', 'r123', 'r13', 'r13'],
    ['e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e'],
  ],
  [
    ['e', 'e', 'r24', 'e', 'e'],
    ['e', 'l', 'r24', 'e', 'e'],
    ['r13', 'r13', 'r1234', 'r13', 'r13'],
    ['e', 'e', 'r24', 'e', 'e'],
    ['e', 'e', 'r24', 'e', 'e'],
  ],
  [
    ['e', 'b', 'r24', 'e', 'e'],
    ['e', 'e', 'r24', 'e', 'e'],
    ['r13', 'r13', 'r1234', 'r13', 'r13'],
    ['e', 'e', 'r24', 'e', 'e'],
    ['e', 'e', 'r24', 'e', 'e'],
  ],
  [
    ['e', 'e', 'r24', 'c', 'e'],
    ['e', 'e', 'r24', 'e', 'e'],
    ['r13', 'r13', 'r1234', 'r13', 'r13'],
    ['b', 'e', 'r24', 'e', 'e'],
    ['e', 'e', 'r24', 'e', 'e'],
  ],
  [
    ['e', 'e', 'r24', 'e', 'e'],
    ['e', 'c', 'r24', 'e', 'e'],
    ['r13', 'r13', 'r1234', 'r13', 'r13'],
    ['e', 'e', 'r24', 'e', 'e'],
    ['e', 'e', 'r24', 'e', 'e'],
  ],
  [
    ['e', 'e', 'r24', 'e', 'e'],
    ['l', 'e', 'r24', 'e', 'e'],
    ['r13', 'r13', 'r1234', 'r13', 'r13'],
    ['e', 'e', 'r24', 'e', 'e'],
    ['e', 'e', 'r24', 'b', 'e'],
  ],
  [
    ['e', 'e', 'r24', 'e', 'e'],
    ['e', 'e', 'r24', 'e', 'e'],
    ['r13', 'r13', 'r1234', 'r13', 'r13'],
    ['h2-2', 'e', 'r24', 'e', 'e'],
    ['e', 'e', 'r24', 'e', 'e'],
  ],
  [
    ['e', 'e', 'r24', 'h4-4', 'e'],
    ['e', 'e', 'r24', 'e', 'e'],
    ['r13', 'r13', 'r1234', 'r13', 'r13'],
    ['e', 'e', 'r24', 'e', 'e'],
    ['e', 'e', 'r24', 'e', 'e'],
  ],
  [
    ['r34', 'r13', 'r123', 'r13', 'r14'],
    ['r24', 'e', 'h3-5', 'e', 'r24'],
    ['r124', 'e', 'e', 'e', 'r234'],
    ['r24', 'e', 'e', 'e', 'r24'],
    ['r23', 'r13', 'r134', 'r13', 'r12'],
  ],
  [
    ['r34', 'r13', 'r123', 'r13', 'r14'],
    ['r24', 'h1-7', 'e', 'e', 'r24'],
    ['r12', 'e', 'e', 'e', 'r23'],
    ['e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e'],
  ],
  [
    ['r34', 'r13', 'r12', 'e', 'e'],
    ['r24', 'b', 'e', 'e', 'e'],
    ['r12', 'e', 'h4-8', 'e', 'r34'],
    ['e', 'e', 'e', 'e', 'r24'],
    ['e', 'e', 'r34', 'r13', 'r12'],
  ],
  [
    ['h4-10', 'e', 'r24', 'e', 'e'],
    ['e', 'e', 'r24', 'e', 'e'],
    ['r13', 'r13', 'r123', 'r13', 'r13'],
    ['e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e'],
  ],
  [
    ['h4-12', 'e', 'r24', 'e', 'e'],
    ['e', 'e', 'r24', 'e', 'e'],
    ['r13', 'r13', 'r13', 'r13', 'r13'],
    ['e', 'e', 'r24', 'e', 'e'],
    ['e', 'e', 'r24', 'e', 'e'],
  ],
  [
    ['e', 'e', 'r24', 'e', 'e'],
    ['e', 'e', 'r24', 'e', 'e'],
    ['r13', 'r13', 'r123', 'r13', 'r13'],
    ['e', 'h2-13', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e'],
  ],
  [
    ['e', 'e', 'r24', 'e', 'e'],
    ['e', 'e', 'r24', 'e', 'e'],
    ['r13', 'r13', 'r123', 'r13', 'r13'],
    ['e', 'e', 'e', 'h2-15', 'e'],
    ['e', 'e', 'e', 'e', 'e'],
  ],
  [
    ['e', 'e', 'r23', 'r13', 'r14'],
    ['e', 'h1-16', 'e', 'e', 'r24'],
    ['r14', 'e', 'e', 'e', 'r23'],
    ['r24', 'e', 'e', 'e', 'e'],
    ['r23', 'r13', 'r14', 'e', 'e'],
  ],
  [
    ['r34', 'r13', 'r123', 'r13', 'r14'],
    ['r24', 'e', 'h2-18', 'e', 'r24'],
    ['r12', 'e', 'e', 'e', 'r23'],
    ['e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e'],
  ],
];
