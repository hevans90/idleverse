export const parseTileConfig = (tileConfig) => {
  const tileArray = [];
  tileConfig.forEach((row, i) =>
    row.forEach((element, j) => {
      tileArray.push({
        i: i,
        j: j,
        contents: element,
      });
    })
  );
  return tileArray;
};

export const translateTileArray = (tileArray, distance) => {
  const shiftedTileArray = tileArray.map((tile) => ({
    ...tile,
    i: tile.i + distance,
    j: tile.j + distance,
    contents: tile.contents,
  }));
  return shiftedTileArray;
};

export const rotateTileArray = (tileArray, orientation) => {
  const rotationConstants = {
    0: { i: 1, j: 1 },
    1: { i: -1, j: 1 },
    2: { i: -1, j: -1 },
    3: { i: 1, j: -1 },
  };

  const rc = rotationConstants[orientation];

  const rotatedTileArray = tileArray.map((tile) => ({
    ...tile,
    i: tile.i * rc.i,
    j: tile.j * rc.j,
  }));
  return rotatedTileArray;
};
