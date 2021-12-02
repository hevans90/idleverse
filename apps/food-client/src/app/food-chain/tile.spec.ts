import { isHouse } from './house';
import { parseTileConfig } from './tile';

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
    const tileContainsHouse = tileArray[2];
    expect(isHouse(tileContainsHouse.occupants[0]));
  });

  it('should shift a tile array so it is centered', () => {
    const tileArray = parseTileConfig(tileConfig);
    const centeredTileArray = translateChunk(
      tileArray,
      -(tileConfig.length - 1) / 2
    );
    console.log(tileArray);
    console.log(centeredTileArray);
  });

  it('should rotate a tile array', () => {
    const tileArray = parseTileConfig(tileConfig2);
    const centeredTileArray = translateChunk(
      tileArray,
      -(tileConfig2.length - 1) / 2
    );
    const rotatedTileArray = rotateChunk(centeredTileArray, 1);
    const finalTileArray = translateChunk(
      rotatedTileArray,
      (tileConfig2.length - 1) / 2
    );
    console.log(tileArray);
    console.log(finalTileArray);
  });
});
