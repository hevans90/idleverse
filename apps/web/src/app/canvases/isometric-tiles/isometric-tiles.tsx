import { useApp } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

import { AssetCollection, Vector2D } from '../../_state/models';
import { useFpsTracker } from '../galaxy-generator/utils/fps-counter';
import { useResize } from '../_utils/use-resize.hook';
import { useViewport } from '../_utils/use-viewport';
import { gameConfigFactory } from './factories/game-config.factory';

import { Container } from 'pixi.js';
import { GameConfig } from './models/game-config';
import { IsometricLayer } from './models/isometric-layer';
import { IsometricStack } from './models/isometric-stack';
import { Tile } from './models/tile';
import { mouseDownInteraction } from './mouse/mouse-down';
import {
  isCoordsUpdate,
  isPositionalUpdate,
  mouseMoveInteraction,
} from './mouse/mouse-move';
import { mouseUpInteraction } from './mouse/mouse-up';
import { initTile } from './tiles/init-tile';
import { hoverTile, selectTile, unSelectTile } from './tiles/interactivity';
import { setTile } from './tiles/styling';
import { buildIndicators, GameIndicators } from './ui/indicators';
import { KeyboardItem } from './utils/keyboard';

export const IsometricTiles = ({
  assetCollection,
  colors,
}: {
  assetCollection: AssetCollection;
  colors: {
    tileColor: string;
    hoverColor: string;
    selectedColor: string;
  };
}) => {
  const gameContainer = useRef(new Container());
  const indicatorContainer = useRef(new Container());

  const size = useResize();

  const config = useRef<GameConfig>(
    gameConfigFactory(
      size.width,
      size.height,
      () => {
        tearDownScene();
        initScene();
      },
      { mapRadius: 8, tileWidth: 64, tileGap: 0.02 }
    )
  );

  let velocity: Vector2D = { x: 0, y: 0 };
  let positionDelta: Vector2D = { x: 0, y: 0 };
  let dragged: Vector2D = { x: 0, y: 0 };
  let dragging = false;
  let dragFrameCount = 0;

  const indicators = useRef<GameIndicators>();

  const isometricLayers = useRef<IsometricLayer[]>();

  const [previouslySelectedTile, setPreviouslySelectedTile] = useState<Tile>();
  const [hoveredTile, setHoveredTile] = useState<Tile>();

  const selectedTile = useRef<Tile>();
  const isometricStack = useRef<IsometricStack>();

  const keyboardListeners = useRef<KeyboardItem[]>();

  const app = useApp();

  useViewport(app, size, gameContainer, false);
  useFpsTracker(app, size);

  const addOrRemoveIndicators = (val: 'add' | 'remove') => {
    const items = [
      ...Object.values(indicators.current.topRight),
      ...Object.values(indicators.current.bottomLeft),
    ];

    val === 'add'
      ? indicatorContainer.current.addChild(...items)
      : indicatorContainer.current.removeChild(...items);
  };

  const initScene = () => {
    const layers = [
      {
        container: new PIXI.Container(),
        texture: undefined as any,
        sprite: undefined as any,
      },
      // {
      //   container: new PIXI.Container(),
      //   texture: undefined as any,
      //   sprite: undefined as any,
      // },
    ];

    layers.forEach(({ container }, index) => {
      const { mapRadius } = config.current;

      for (let i = -mapRadius; i <= mapRadius; i++) {
        for (let j = -mapRadius; j <= mapRadius; j++) {
          const tile = initTile(i, j, config.current);
          container.addChild(tile);

          switch (index) {
            case 0:
              setTile(
                i,
                j,
                container,
                config.current,
                isometricStack.current,
                colors.tileColor,
                colors.selectedColor
              );
              break;

            default:
              setTile(
                i,
                j,
                container,
                config.current,
                isometricStack.current,
                '0xFFFFFF',
                '0xFFFFFF',
                0.5
              );
          }
        }
      }
    });

    layers.forEach(
      (layer) =>
        // render the tilemap to a render texture
        (layer.texture = PIXI.RenderTexture.create({
          width: config.current.offsetX * 2,
          height:
            (config.current.offsetY +
              config.current.tileWidth / config.current.ai) *
            2,
        }))
    );

    layers.forEach((layer, index) => {
      if (index === 0) {
        if (isometricStack.current && isometricStack.current.selected) {
          setPreviouslySelectedTile(isometricStack.current.selected);
        }

        // create a single background sprite with the texture
        isometricStack.current = new PIXI.Sprite(
          layers[0].texture
        ) as IsometricStack;
        isometricStack.current.selected = previouslySelectedTile || undefined;
        isometricStack.current.interactive = true;

        if (isometricStack.current.selected) {
          indicators.current.topRight.selectedIndicator.text = `Selected {i, j}: ${isometricStack.current.selected.i}, ${isometricStack.current.selected.j}`;
        }
        layer.sprite = isometricStack.current;

        gameContainer.current.addChild(isometricStack.current);
        return;
      }
      // TODO: remove above, make this generic
      layer.sprite = new PIXI.Sprite(layer.texture);
      layer.sprite.y -= index * config.current.tileWidth; // vertical separation of tile isometricLayers
      isometricStack.current.addChild(layer.sprite);
    });

    layers.forEach(({ container, texture }) =>
      app.renderer.render(container, { renderTexture: texture })
    );

    isometricLayers.current = layers;

    bindMouseEvents();
  };

  const tearDownScene = () => {
    isometricStack.current.destroy({
      children: true,
      texture: true,
      baseTexture: true,
    });
    isometricStack.current.removeAllListeners();
    keyboardListeners.current.forEach((item) => item.unsubscribe());
  };

  const tickerFunction = () => {
    indicators.current.topRight.mapVelocityIndicator.text = `Velocity: { x: ${velocity.x}, y: ${velocity.y} }`;

    if (dragging) {
      dragFrameCount += 1;
      indicators.current.bottomLeft.dragIndicator.text = `dragging for ${dragFrameCount} animation frames`;
    } else {
      dragFrameCount = 1;
    }

    if (velocity.x > 0) {
      isometricStack.current.position.x += velocity.x;
      velocity = { x: velocity.x - 1, y: velocity.y };
    }

    if (velocity.x < 0) {
      isometricStack.current.position.x += velocity.x;
      velocity = { x: velocity.x + 1, y: velocity.y };
    }

    if (velocity.y > 0) {
      isometricStack.current.position.y += velocity.y;
      velocity = { x: velocity.x, y: velocity.y - 1 };
    }

    if (velocity.y < 0) {
      isometricStack.current.position.y += velocity.y;
      velocity = { x: velocity.x, y: velocity.y + 1 };
    }

    if (isometricStack.current.position.x < config.current.borderL) {
      isometricStack.current.position.x = config.current.borderL;
    }
    if (isometricStack.current.position.x > config.current.borderR) {
      isometricStack.current.position.x = config.current.borderR;
    }
    if (isometricStack.current.position.y < config.current.borderD) {
      isometricStack.current.position.y = config.current.borderD;
    }
    if (isometricStack.current.position.y > config.current.borderU) {
      isometricStack.current.position.y = config.current.borderU;
    }
  };

  // #region Mouse/Keyboard event binding
  const bindMouseEvents = () => {
    const mouseDownHandler = (event: PIXI.InteractionEvent) => {
      const handledEvent = mouseDownInteraction(
        event,
        isometricStack.current,
        config.current
      );

      dragging = handledEvent.dragging;
      dragged = { x: handledEvent.draggedx, y: handledEvent.draggedy };
      positionDelta = { x: handledEvent.delx, y: handledEvent.dely };
      velocity = { x: handledEvent.velx, y: handledEvent.vely };

      indicators.current.bottomLeft.draggedIndicator.text =
        handledEvent.dragIndicatorText;

      selectedTile.current = handledEvent.tileClicked;
      // isometricStack.current.selected = handledEvent.tileClicked;
    };

    const mouseUpHandler = () => {
      const handledEvent = mouseUpInteraction(
        dragged.x,
        dragged.y,
        () => {
          if (isometricStack.current.selected) {
            // TODO: layer context
            unSelectTile({
              tile: isometricStack.current.selected,
              layerContainer: isometricLayers.current[0].container,
              layers: isometricLayers.current,
              config: config.current,
              renderer: app.renderer,
              defaultColor: colors.tileColor,
            });

            indicators.current.topRight.oldSelectedIndicator.text = `Prev. selected : ${isometricStack.current.selected.i}, ${isometricStack.current.selected.j}`;
          }
          // TODO: layer context
          selectTile({
            tile: selectedTile.current,
            layerContainer: isometricLayers.current[0].container,
            layers: isometricLayers.current,
            config: config.current,
            renderer: app.renderer,
            selectionCallback: (tile) =>
              (isometricStack.current.selected = tile),
            selectedColor: colors.selectedColor,
          });

          indicators.current.topRight.selectedIndicator.text = `Selected {i, j}: ${isometricStack.current.selected.i}, ${isometricStack.current.selected.j}`;
        },
        isometricStack.current,
        positionDelta.x,
        positionDelta.y
      );
      indicators.current.bottomLeft.dragIndicator.text =
        handledEvent.dragIndicatorText;
      indicators.current.bottomLeft.draggedIndicator.text =
        handledEvent.draggedIndicatorText;

      dragging = false;

      if (handledEvent.dragged) {
        velocity = {
          x: handledEvent.dragged.velx,
          y: handledEvent.dragged.vely,
        };

        positionDelta = {
          x: handledEvent.dragged.delx,
          y: handledEvent.dragged.dely,
        };
      }
    };

    const mouseMoveHandler = (event: PIXI.InteractionEvent) => {
      const handledEvent = mouseMoveInteraction(
        event,
        isometricStack.current,
        config.current,
        dragging,
        dragged.x,
        dragged.y,
        selectedTile.current
      );

      if (isPositionalUpdate(handledEvent)) {
        positionDelta = { x: handledEvent.delx, y: handledEvent.dely };

        dragged = { x: handledEvent.draggedx, y: handledEvent.draggedy };

        isometricStack.current.position.x = handledEvent.newContainerPositionX;
        isometricStack.current.position.y = handledEvent.newContainerPositionY;

        indicators.current.bottomLeft.draggedIndicator.text =
          handledEvent.draggedIndicatorText;
      } else if (isCoordsUpdate(handledEvent)) {
        indicators.current.topRight.cartesianIndicator.text =
          handledEvent.cartesianIndicatorText;

        if (handledEvent.tileHovered) {
          indicators.current.topRight.tileIndicator.text =
            handledEvent.tileIndicatorText;

          hoverTile({
            tile: handledEvent.tileHovered,
            layer: isometricLayers.current[0].container,
            config: config.current,
            stack: isometricStack.current,
            layers: isometricLayers.current,
            renderer: app.renderer,
            hoverCallback: (tile) => {
              isometricStack.current.hovered = tile;
              setHoveredTile(tile);
            },
            outlineColor: colors.hoverColor,
          });
        }
      }
    };

    isometricStack.current.addListener('mousedown', (event) =>
      mouseDownHandler(event)
    );
    isometricStack.current.addListener('touchstart', (event) =>
      mouseDownHandler(event)
    );

    isometricStack.current.addListener('mouseup', mouseUpHandler);
    isometricStack.current.addListener('touchend', mouseUpHandler);

    isometricStack.current.addListener('mousemove', (event) =>
      mouseMoveHandler(event)
    );
    isometricStack.current.addListener('touchmove', (event) =>
      mouseMoveHandler(event)
    );
  };

  // #endregion

  useEffect(() => {
    app.stage.sortableChildren = true;
    gameContainer.current.sortableChildren = true;
    gameContainer.current.zIndex = 1;
    indicatorContainer.current.zIndex = 2;
    indicators.current = buildIndicators(size.height, size.width);
    addOrRemoveIndicators('add');

    initScene();
    app.ticker.add(tickerFunction);
    app.stage.addChild(indicatorContainer.current);
  }, []);

  useEffect(() => {
    addOrRemoveIndicators('remove');
    indicators.current = buildIndicators(size.height, size.width);
    addOrRemoveIndicators('add');
  }, [size]);

  return <></>;
};
