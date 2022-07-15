import * as PIXI from 'pixi.js';
import { GameConfig } from '../models/game-config';
import { IsometricStack } from '../models/isometric-stack';
import { Tile } from '../models/tile';
import { isoToIndex } from '../utils/iso-to-index';

export interface CoordsUpdate {
  cartesianIndicatorText: string;
  tileIndicatorText: string;
  tileHovered: Tile;
}

export interface PositionalUpdate {
  delx: number;
  dely: number;
  draggedx: number;
  draggedy: number;
  newContainerPositionX: number;
  newContainerPositionY: number;
  draggedIndicatorText: string;
  containerIndicatorText: string;
  containerParentIndicatorText: string;
}

export const isCoordsUpdate = (
  update: CoordsUpdate | PositionalUpdate,
): update is CoordsUpdate =>
  (update as CoordsUpdate).cartesianIndicatorText !== undefined &&
  (update as CoordsUpdate).tileIndicatorText !== undefined;

export const isPositionalUpdate = (
  update: CoordsUpdate | PositionalUpdate,
): update is PositionalUpdate =>
  (update as PositionalUpdate).delx !== undefined &&
  (update as PositionalUpdate).dely !== undefined;

export const mouseMoveInteraction = (
  { data }: PIXI.InteractionEvent,
  myContainer: IsometricStack,
  config: GameConfig,
  dragging: boolean,
  draggedx: number,
  draggedy: number,
  tileClicked?: Tile,
): CoordsUpdate | PositionalUpdate => {
  const { x, y } = data.getLocalPosition(myContainer);
  const [i, j] = isoToIndex(x, y, config);
  const parentPosition = data.getLocalPosition(myContainer.parent);

  if (!dragging) {
    return {
      cartesianIndicatorText: `${x.toFixed(2)}, ${y.toFixed(2)}`,
      tileIndicatorText: isoToIndex(x, y, config).toString(),
      tileHovered: {
        i,
        j,
        x: x * myContainer.scale.x,
        y: y * myContainer.scale.y,
        z: 0,
      },
    };
  } else {
    const tileDragged = tileClicked || {
      x: 0,
      y: 0,
    };

    return {
      delx: myContainer.position.x,
      dely: myContainer.position.y,
      draggedx: draggedx + myContainer.position.x / 1000,
      draggedy: draggedy + myContainer.position.y / 1000,
      newContainerPositionX: parentPosition.x - tileDragged.x,
      newContainerPositionY: parentPosition.y - tileDragged.y,

      draggedIndicatorText: `dragged: { x: ${draggedx.toFixed(
        2,
      )}, y: ${draggedy.toFixed(2)}}`,

      containerIndicatorText: `myContainer = { x: ${(x - tileDragged.x).toFixed(
        2,
      )}, y: ${(y - tileDragged.y).toFixed(2)}}`,

      containerParentIndicatorText: `myContainer.parent = { x: ${data
        .getLocalPosition(myContainer.parent)
        .x.toFixed(2)}, y: ${data
        .getLocalPosition(myContainer.parent)
        .y.toFixed(2)} }`,
    };
  }
};
