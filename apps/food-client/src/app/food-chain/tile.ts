import * as PIXI from 'pixi.js';
import { Board, BoardObject } from './board';
import { drinkKinds, parseDrinkConfig } from './drink';
import { parseHouseConfig } from './house';
import { drawIndicator, IndicatorColour } from './indicators';
import { parseRoadConfig } from './road';
import { lineColour } from './types';
import { tileConfigRegex, ts } from './utils/constants';
import { app, keyEventMap } from './utils/singletons';
import { calcDistance, rangeOverlapsItem } from './utils/utils';

export type TileConfig = Array<Array<string | Array<string>>>;

export type Tile = {
  i?: number;
  j?: number;
  w: number;
  h: number;
  toGoal?: number;
  fromStart?: number;
  previousTile?: Tile;
  occupants?: BoardObject[];
  container?: PIXI.Container;
  sprite?: PIXI.Sprite;
};

export type Chunk = Tile[];

export const generateTileTexture = (fillColor: number) => {
  const square = new PIXI.Graphics();
  square.lineStyle(2, lineColour, 1);
  square.beginFill(fillColor);
  square.drawRect(2, 2, ts - 2, ts - 2);
  square.endFill();
  return app.renderer.generateTexture(square);
};

const tileTexture = generateTileTexture(0xffffff);
const outerTileTexture = generateTileTexture(0xc8c1be);

export const parseTileContents = (contents: string, zOffset = 0) => {
  const match = tileConfigRegex.exec(contents);

  if (match[1] === 'r') {
    return parseRoadConfig(match, zOffset);
  } else if (match[1] === 'h') {
    return parseHouseConfig(match, zOffset);
  } else if (
    Object.values(drinkKinds)
      .map((kind) => kind.letter)
      .includes(match[1])
  )
    return parseDrinkConfig(match, zOffset);
  else {
    console.log(`${match[1]} not matched`);
  }

  return null;
};

export const parseTileConfig = (tileConfig: TileConfig): Chunk => {
  const tileArray: Tile[] = [];
  tileConfig.forEach((row, j) =>
    row.forEach((element, i) => {
      const tile: Tile = {
        i: i,
        j: j,
        w: 1,
        h: 1,
        occupants: [],
      };

      if (typeof element === 'string') {
        if (element !== 'e') tile.occupants.push(parseTileContents(element));
      } else
        element.forEach((subElement, i) =>
          tile.occupants.push(parseTileContents(subElement, i * 2))
        );
      tileArray.push(tile);
    })
  );
  return tileArray;
};

export const addOuterTileToBoard = (board: Board, i: number, j: number) => {
  const tile: Tile = {
    i: i,
    j: j,
    w: 1,
    h: 1,
  };
  const squareSprite = new PIXI.Sprite(outerTileTexture);
  tile.container = new PIXI.Container();
  tile.container.position.x = tile.i * ts;
  tile.container.position.y = tile.j * ts;
  tile.container.addChild(squareSprite);

  board.outerTiles.push(tile);
  board.container.addChild(tile.container);
};

export const addTileToBoard = (
  board: Board,
  tile: Tile,
  iOffset: number,
  jOffset: number
) => {
  const squareSprite = new PIXI.Sprite(tileTexture);
  tile.sprite = squareSprite;
  tile.container = new PIXI.Container();
  tile.i += iOffset;
  tile.j += jOffset;
  tile.container.x = tile.i * ts;
  tile.container.y = tile.j * ts;
  tile.container.zIndex = 0;
  tile.container.addChild(squareSprite);

  board.tiles.push(tile);
  board.container.addChild(tile.container);
};

export const disablePlacement = (board: Board) => {
  removeChildrenByName(board.container, 'indicator');
  [].concat(board.tiles, board.outerTiles).forEach((square) => {
    square.container.removeAllListeners();
    square.container.interactive = true;
    square.container.buttonMode = true;
  });
  [].concat(board.tiles, board.outerTiles).forEach((tile) => {
    removeChildrenByName(tile.container, 'tint');
  });
  board.houses.forEach((house) => (house.sprite.tint = 0xffffff));
  keyEventMap.Space = () => {
    return;
  };
};

export const getAdjacentSquares = (tiles: Tile[], tile1: Tile) => {
  return tiles.filter((tile2) => calcDistance(tile1, tile2) === 1);
};

export const removeChildrenByName = (
  object: PIXI.Container,
  childName: string
) => {
  let tint = object.getChildByName(childName);
  while (tint) {
    tint.destroy();
    tint = object.getChildByName(childName);
  }
};

export const setRotation = (object: BoardObject) => {
  object.rotation += 0.5 * Math.PI;
  if (object.rotation === 2 * Math.PI) object.rotation = 0;

  const w = object.w;
  const h = object.h;

  object.h = w;
  object.w = h;
};

export const applyRotation = (object: BoardObject) => {
  object.sprite.rotation = object.rotation;

  if (object.sprite.rotation === 0.5 * Math.PI) {
    object.sprite.x = object.sprite.height;
    object.sprite.y = 0;
  } else if (object.sprite.rotation === 1.0 * Math.PI) {
    object.sprite.x = object.sprite.width;
    object.sprite.y = object.sprite.height;
  } else if (object.sprite.rotation === 1.5 * Math.PI) {
    object.sprite.x = 0;
    object.sprite.y = object.sprite.width;
  } else {
    object.sprite.x = 0;
    object.sprite.y = 0;
  }
};

export const enablePlacement = (
  board: Board,
  item: BoardObject,
  validTiles: Tile[],
  isValidPosition: (tile: Tile) => boolean,
  rangeFunction: (tile: Tile) => Tile[],
  callback?: () => void
) => {
  let invalidIndicator = drawIndicator(item.w, item.h, IndicatorColour.invalid);
  let validIndicator = drawIndicator(item.w, item.h, IndicatorColour.valid);

  let activeIndicator = validIndicator;

  keyEventMap.Space = () => {
    setRotation(item);
    invalidIndicator = drawIndicator(item.w, item.h, IndicatorColour.invalid);
    validIndicator = drawIndicator(item.w, item.h, IndicatorColour.valid);
    // TODO: Reset indicator when tile is rotated
    // removeChildrenByName(board.container, 'indicator');
    // board.container.addChild(activeIndicator);
  };

  validTiles.forEach((square) => {
    square.container.removeAllListeners();
    square.container.interactive = true;
    square.container.buttonMode = true;
    square.container.on('mouseover', () => {
      if (isValidPosition(square)) {
        activeIndicator = validIndicator;
      } else {
        activeIndicator = invalidIndicator;
      }
      activeIndicator.position.x = square.i * ts;
      activeIndicator.position.y = square.j * ts;
      removeChildrenByName(board.container, 'indicator');
      board.container.addChild(activeIndicator);

      const tilesInRange = rangeFunction(square);

      tilesInRange.forEach((_square) => {
        const tint = drawIndicator(1, 1, IndicatorColour.range);
        tint.name = 'tint';
        _square.container.addChild(tint);
      });

      board.houses.forEach((house) => {
        house.sprite.tint = 0xffffff;
        if (rangeOverlapsItem(house, tilesInRange))
          house.sprite.tint = 0x5b6ee1;
      });
    });

    square.container.on('mouseout', () => {
      board.container.removeChild(activeIndicator);
      board.tiles.forEach((tile) =>
        removeChildrenByName(tile.container, 'tint')
      );
      board.houses.forEach((house) => {
        house.sprite.tint = 0xffffff;
      });
    });

    square.container.on('pointerdown', () => {
      console.log(square);
      if (isValidPosition(square)) {
        board.roads.forEach((road) => (road.sprite.tint = 0xffffff));
        board.container.addChild(item.container);
        item.i = square.i;
        item.j = square.j;
        applyRotation(item);
        item.container.x = square.i * ts;
        item.container.y = square.j * ts;

        if (callback) callback();
      }
    });
  });
};