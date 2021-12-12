import * as PIXI from 'pixi.js';
import { Board, BoardObject } from './board';
import { parseDrinkConfig } from './drink';
import { foodKinds } from './food';
import { parseHouseConfig, setHouseTint } from './house';
import {
  drawPlacementIndicator,
  drawRangeIndicator,
  PlacementIndicatorColour,
} from './indicators';
import { parseRoadConfig } from './road';
import { lineColour } from './types';
import { tileConfigRegex, ts } from './utils/constants';
import { createSprite } from './utils/graphics-utils';
import { app, board, keyEventMap, mainLayer } from './utils/singletons';
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

export const generateTileTexture = (fillColor: number, alpha = 1) => {
  const square = new PIXI.Graphics();
  square.lineStyle(2, lineColour, alpha);
  //square.beginFill(fillColor, alpha);
  square.drawRect(2, 2, ts - 2, ts - 2);
  square.endFill();

  const renderContainer = new PIXI.Container();
  renderContainer.addChild(square);

  const baseTexture = new PIXI.BaseRenderTexture({
    width: ts,
    height: ts,
  });
  const renderTexture = new PIXI.RenderTexture(baseTexture);

  app.renderer.render(renderContainer, { renderTexture });

  return renderTexture;
};
const outerTileTexture = generateTileTexture(0xc8c1be, 0);

export const parseTileContents = (contents: string, zOffset = 0) => {
  const match = tileConfigRegex.exec(contents);

  if (match[1] === 'r') {
    return parseRoadConfig(match, zOffset);
  } else if (match[1] === 'h') {
    return parseHouseConfig(match);
  } else if (
    Object.values(foodKinds)
      .map((kind) => kind.letter)
      .includes(match[1])
  ) {
    return parseDrinkConfig(match, zOffset);
  } else {
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
  tile.container.parentLayer = mainLayer;
  tile.container.zOrder = 0;
  tile.container.position.x = tile.i * ts;
  tile.container.position.y = tile.j * ts;
  tile.container.addChild(squareSprite);

  board.outerTiles.push(tile);
  board.container.addChild(tile.container);
};

export const addTileToBoard = (
  tile: Tile,
  iOffset: number,
  jOffset: number
) => {
  const squareSprite = createSprite('grass', ts - 4);
  tile.sprite = squareSprite;
  tile.container = new PIXI.Container();
  tile.i += iOffset;
  tile.j += jOffset;
  tile.container.x = tile.i * ts;
  tile.container.y = tile.j * ts;
  tile.container.parentLayer = mainLayer;
  tile.container.zOrder = 0;
  tile.container.addChild(squareSprite);

  board.tiles.push(tile);
  board.container.addChild(tile.container);
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
  object.rotation = (object.rotation + 1) % 4;

  const w = object.w;
  const h = object.h;

  object.h = w;
  object.w = h;
};

export const applyRotation = (object: BoardObject) => {
  const rotMap = {
    0: { x: 0, y: 0 },
    1: { x: object.w * ts, y: 0 },
    2: { x: object.w * ts, y: object.h * ts },
    3: { x: 0, y: object.h * ts },
  };

  object.container.rotation = (object.rotation * Math.PI) / 2;
  object.container.x = object.baseX + rotMap[object.rotation].x;
  object.container.y = object.baseY + rotMap[object.rotation].y;
  if (object.rotate) object.rotate(object.rotation);
};

export const enablePlacement = (
  item: BoardObject,
  validTiles: Tile[],
  isValidPosition: (tile: Tile) => boolean,
  rangeFunction: (tile: Tile) => Tile[],
  callback?: () => void
) => {
  let invalidIndicator = drawPlacementIndicator(
    item.w,
    item.h,
    item.rotation,
    PlacementIndicatorColour.invalid
  );
  let validIndicator = drawPlacementIndicator(
    item.w,
    item.h,
    item.rotation,
    PlacementIndicatorColour.valid
  );
  let _square: Tile = null;

  let activeIndicator = validIndicator;

  keyEventMap.Space = () => {
    setRotation(item);
    invalidIndicator = drawPlacementIndicator(
      item.w,
      item.h,
      item.rotation,
      PlacementIndicatorColour.invalid
    );
    validIndicator = drawPlacementIndicator(
      item.w,
      item.h,
      item.rotation,
      PlacementIndicatorColour.valid
    );
    if (_square) _square.container.emit('mouseover');
  };

  validTiles.forEach((square) => {
    square.container.removeAllListeners();
    square.container.interactive = true;
    square.container.buttonMode = true;
    square.container.on('mouseover', () => {
      _square = square;
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
        const tint = drawRangeIndicator();
        tint.name = 'tint';
        _square.container.addChild(tint);
      });

      board.houses.forEach((house) => {
        setHouseTint(house, 0xffffff);
        if (rangeOverlapsItem(house, tilesInRange))
          setHouseTint(house, 0x5b6ee1);
      });
    });

    square.container.on('mouseout', () => {
      _square = null;
      board.container.removeChild(activeIndicator);
      board.tiles.forEach((tile) =>
        removeChildrenByName(tile.container, 'tint')
      );
      board.houses.forEach((house) => {
        setHouseTint(house, 0xffffff);
      });
    });

    square.container.on('pointerdown', () => {
      if (isValidPosition(square)) {
        board.container.addChild(item.container);
        item.container.parentLayer = mainLayer;
        item.container.zOrder = 1;
        item.i = square.i;
        item.j = square.j;
        item.baseX = square.i * ts;
        item.baseY = square.j * ts;
        applyRotation(item);

        if (callback) callback();
      }
    });
  });
};

export const disablePlacement = () => {
  console.log('disabling placement');
  removeChildrenByName(board.container, 'indicator');
  [].concat(board.tiles, board.outerTiles).forEach((square) => {
    square.container.removeAllListeners();
    square.container.interactive = true;
    square.container.buttonMode = true;
  });
  [].concat(board.tiles, board.outerTiles).forEach((tile) => {
    removeChildrenByName(tile.container, 'tint');
  });
  board.houses.forEach((house) => setHouseTint(house, 0xffffff));
  keyEventMap.Space = () => {
    return;
  };
};
