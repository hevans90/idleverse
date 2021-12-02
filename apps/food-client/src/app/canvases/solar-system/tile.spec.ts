import {
  translateTileArray,
  parseTileConfig,
  rotateTileArray,
} from './tile';

const tileConfig = [
  ['e', 'r24', 'h1'],
  ['e', 'r24', 'e'],
  ['r13', 'r12', 'e'],
];

const tileConfig2 = [
  ['e', 'e', 'r24', 'e', 'e'],
  ['e', 'e', 'r24', 'h4', 'e'],
  ['r13', 'r13', 'r124', 'e', 'e'],
  ['d', 'e', 'r24', 'e', 'e'],
  ['e', 'e', 'r24', 'e', 'e'],
];

describe('tile reader', () => {
  it('should generate a tile array from a config', () => {
    const tileArray = parseTileConfig(tileConfig);
    console.log(JSON.stringify(tileArray[2].contents));
    expect(tileArray[2].contents).toStrictEqual('h1');
  });

  it('should shift a tile array so it is centered', () => {
    const tileArray = parseTileConfig(tileConfig);
    const centeredTileArray = translateTileArray(
      tileArray,
      -(tileConfig.length - 1) / 2
    );
    console.log(tileArray);
    console.log(centeredTileArray);
  });

  it('should rotate a tile array', () => {
    const tileArray = parseTileConfig(tileConfig2);
    const centeredTileArray = translateTileArray(
      tileArray,
      -(tileConfig2.length - 1) / 2
    );
    const rotatedTileArray = rotateTileArray(centeredTileArray, 1);
    const finalTileArray = translateTileArray(
      rotatedTileArray,
      (tileConfig2.length - 1) / 2
    );
    console.log(tileArray);
    console.log(finalTileArray);
  });
});
