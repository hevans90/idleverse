import { BoardObject } from './board';

export type TileConfig = Array<Array<string | Array<string>>>;

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
      if (typeof element === 'string')
        tileArray.push({
          i: i,
          j: j,
          contents: element,
        });
      else {
        element.forEach((subElement) =>
          tileArray.push({
            i: i,
            j: j,
            contents: subElement,
          })
        );
      }
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
