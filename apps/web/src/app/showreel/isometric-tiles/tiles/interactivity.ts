import * as PIXI from 'pixi.js';
import { GameConfig } from '../models/game-config';
import { IsometricGraphic } from '../models/isometric-graphic';
import { IsometricLayer } from '../models/isometric-layer';
import { IsometricContainer } from '../models/isometric-stack';
import { Tile } from '../models/tile';
import { getTileGraphic } from '../utils/get-tile-graphic';
import {
  removeTileOutline,
  setGraphicTileColor,
  setTileOutline,
} from './styling';

const setTileSelection = ({
  select,
  tile,
  layerContainer,
  config,
  layers,
  renderer,
  selectionCallback,
  selectedColor,
  defaultColor,
}: {
  select: boolean;
  tile: Tile;
  layerContainer: PIXI.Container;
  config: GameConfig;
  layers: IsometricLayer[];
  renderer: PIXI.IRenderer;
  selectionCallback?: (tile: Tile) => unknown;
  selectedColor?: string;
  defaultColor?: string;
}) => {
  if (!selectedColor) selectedColor = '0xff0000';
  if (!defaultColor) defaultColor = '0x009900';

  let tileGraphic: IsometricGraphic;
  if (select && selectionCallback) {
    selectionCallback(tile);
  } else if (select && !selectionCallback) {
    console.warn(
      `Tried to select tile {i: ${tile.i}, j: ${tile.j}} but no selection callback was passed.`
    );
  }

  if (!tile) {
    return;
  }

  const { i, j } = tile;
  try {
    tileGraphic = getTileGraphic(i, j, layerContainer, config);
    setGraphicTileColor(tileGraphic, select ? selectedColor : defaultColor);

    select ? (tileGraphic.alpha = 0.6) : (tileGraphic.alpha = 0.2);

    layers.forEach(({ container, texture }) =>
      renderer.render(container, { renderTexture: texture })
    );
  } catch (error) {
    console.warn(error);
  }
};

export const selectTile = ({
  tile,
  layerContainer,
  config,
  layers,
  renderer,
  selectionCallback,
  selectedColor,
}: {
  tile: Tile;
  layerContainer: PIXI.Container;
  config: GameConfig;
  layers: IsometricLayer[];
  renderer: PIXI.IRenderer;
  selectionCallback: (tile: Tile) => unknown;
  selectedColor?: string;
  defaultColor?: string;
}) =>
  setTileSelection({
    select: true,
    tile,
    layerContainer,
    config,
    layers,
    renderer,
    selectionCallback,
    selectedColor,
  });

export const unSelectTile = ({
  tile,
  layerContainer,
  config,
  layers,
  renderer,
  defaultColor,
}: {
  tile: Tile;
  layerContainer: PIXI.Container;
  config: GameConfig;
  layers: IsometricLayer[];
  renderer: PIXI.IRenderer;
  defaultColor?: string;
}) =>
  setTileSelection({
    select: false,
    tile,
    layerContainer,
    config,
    layers,
    renderer,
    defaultColor,
  });

export const hoverTile = ({
  tile,
  layer,
  config,
  stack,
  layers,
  renderer,
  hoverCallback,
  outlineColor,
}: {
  tile: Tile;
  layer: PIXI.Container;
  config: GameConfig;
  stack: IsometricContainer;
  layers: IsometricLayer[];
  renderer: PIXI.IRenderer;
  hoverCallback: (tile: Tile) => unknown;
  outlineColor?: string;
}) => {
  if (!outlineColor) outlineColor = '0x009900';

  if (stack.hovered) {
    const { i, j } = stack.hovered;

    const prevHoveredGraphic = getTileGraphic(i, j, layer, config);

    if (prevHoveredGraphic) {
      removeTileOutline(prevHoveredGraphic);

      // if (stack.selected) {
      //   if (stack.selected?.i === tile.i && stack.selected?.j === tile.j) {
      //     prevHoveredGraphic.alpha = 0.2;
      //   }
      // }
    }
  }

  if (stack.selected?.i === tile.i && stack.selected?.j === tile.j) {
    console.warn('not hovering already selected tile');
    return;
  }

  hoverCallback(tile);

  try {
    const tileGraphic = getTileGraphic(tile.i, tile.j, layer, config);
    setTileOutline(tileGraphic, outlineColor);
    layers.forEach(({ container, texture }) =>
      renderer.render(container, { renderTexture: texture })
    );
  } catch (error) {
    console.warn(`NOT hightlighting: ${error}`);
  }
};
