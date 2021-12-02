import * as PIXI from 'pixi.js';
import { Board, BoardObject } from './board';
import { createDrinkSprite, Drink, drinkKinds } from './drink';
import { createHouseSprite, House } from './house';
import { drawIndicator, IndicatorColour } from './indicators';
import { createRoadSprite, Road } from './road';
import { lineColour } from './types';
import { tileConfigRegex, ts } from './utils/constants';
import { app } from './utils/singletons';
import { getSquaresInRange, isValidPosition } from './utils/utils';

export type TileConfig = Array<Array<string | Array<string>>>;

export type Tile = {
  i: number;
  j: number;
  w: number;
  h: number;
  occupants?: BoardObject[];
  container?: PIXI.Container;
  sprite?: PIXI.Sprite;
};

export type Chunk = Tile[];

const square = new PIXI.Graphics();
square.lineStyle(2, lineColour, 1);
square.beginFill(0xffffff);
square.drawRect(2, 2, ts - 2, ts - 2);
square.endFill();
const tileTexture = app.renderer.generateTexture(square);

export const parseTileContents = (contents: string, zOffset = 0) => {
  const match = tileConfigRegex.exec(contents);

  if (match[1] === 'r') {
    const road: Road = {
      w: 1,
      h: 1,
      connections: match[2].split('').map((i) => parseInt(i)),
    };
    road.sprite = createRoadSprite(road);
    road.sprite.zIndex = 10 + zOffset;
    return road;
  } else if (match[1] === 'h') {
    const house: House = {
      w: 2,
      h: 2,
      orient: parseInt(match[2]),
      num: parseInt(match[3]),
    };
    house.sprite = createHouseSprite(house);
    house.sprite.zIndex = 10 + zOffset;
    return house;
  } else if (match[1] in drinkKinds) {
    const drink: Drink = {
      w: 1,
      h: 1,
      kind: drinkKinds[match[1]],
    };
    drink.sprite = createDrinkSprite(drink);
    drink.sprite.zIndex = 10 + zOffset;
    return drink;
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
          tile.occupants.push(parseTileContents(subElement, i))
        );
      tileArray.push(tile);
    })
  );
  return tileArray;
};

export const createOuterSquareSprite = () => {
  const square = new PIXI.Graphics();
  square.lineStyle(2, lineColour, 1);
  square.beginFill(0xc8c1be);
  square.drawRect(2, 2, ts - 2, ts - 2);
  square.endFill();

  return square;
};

export const addOuterTileToBoard = (board: Board, i: number, j: number) => {
  const tile: Tile = {
    i: i,
    j: j,
    w: 1,
    h: 1,
  };
  const squareSprite = createOuterSquareSprite();
  squareSprite.position.x = tile.i * ts;
  squareSprite.position.y = tile.j * ts;

  board.container.addChild(squareSprite);
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

export const enablePlacement = (
  board: Board,
  item: BoardObject,
  adjacentRoadRequired: boolean,
  callback?: () => void
) => {
  const invalidIndicator = drawIndicator(
    item.w,
    item.h,
    IndicatorColour.invalid
  );
  const validIndicator = drawIndicator(item.w, item.h, IndicatorColour.valid);

  let activeIndicator = validIndicator;
  let inactiveIndicator = invalidIndicator;

  board.tiles.forEach((square) => {
    square.container.removeAllListeners();
    square.container.interactive = true;
    square.container.buttonMode = true;
    square.container.on('mouseover', () => {
      if (
        isValidPosition(
          board,
          { ...item, i: square.i, j: square.j },
          adjacentRoadRequired
        )
      ) {
        activeIndicator = validIndicator;
        inactiveIndicator = invalidIndicator;
      } else {
        activeIndicator = invalidIndicator;
        inactiveIndicator = validIndicator;
      }
      activeIndicator.position.x = square.i * ts;
      activeIndicator.position.y = square.j * ts;
      board.container.addChild(activeIndicator);
      board.container.removeChild(inactiveIndicator);

      getSquaresInRange(
        board,
        { ...item, i: square.i, j: square.j },
        3
      ).forEach((_square) => {
        const tint = drawIndicator(1, 1, IndicatorColour.range);
        tint.name = 'tint';
        _square.container.addChild(tint);
      });
    });

    square.container.on('mouseout', () => {
      board.container.removeChild(activeIndicator);

      board.tiles.forEach((_square) => {
        const tint = _square.container.getChildByName('tint');
        if (tint) tint.destroy();
      });
    });

    square.container.on('pointerdown', () => {
      console.log(square);
      if (
        isValidPosition(
          board,
          { ...item, i: square.i, j: square.j },
          adjacentRoadRequired
        )
      ) {
        board.roads.forEach((road) => (road.sprite.tint = 0xffffff));
        board.container.addChild(item.container);
        item.i = square.i;
        item.j = square.j;
        item.container.x = square.i * ts;
        item.container.y = square.j * ts;

        if (callback) callback();
      }
    });
  });
};
