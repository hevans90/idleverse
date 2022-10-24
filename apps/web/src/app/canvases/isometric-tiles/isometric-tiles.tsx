import { useApp } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

import { AssetCollection, Vector2D } from '../../_state/models';
import { useFpsTracker } from '../galaxy-generator/utils/fps-counter';
import { useResize } from '../_utils/use-resize.hook';
import { useViewport } from '../_utils/use-viewport.hook';
import { gameConfigFactory } from './factories/game-config.factory';

import { useReactiveVar } from '@apollo/client';
import { Container } from 'pixi.js';
import { planetSurfaceVar } from '../../_state/planet-surface';
import { GameConfig } from './models/game-config';
import { IsometricLayer } from './models/isometric-layer';
import { IsometricContainer } from './models/isometric-stack';
import { Tile } from './models/tile';
import { mouseDownInteraction } from './mouse/mouse-down';
import {
  isCoordsUpdate,
  isPositionalUpdate,
  mouseMoveInteraction,
} from './mouse/mouse-move';
import { mouseUpInteraction } from './mouse/mouse-up';
import { initMapUnderlay, initTile } from './tiles/create-isometric-graphics';
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
  const { baseTexture } = useReactiveVar(planetSurfaceVar);

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
      { mapRadius: 5, tileWidth: 64, tileGap: 0.02 }
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
  const isometricContainer = useRef<IsometricContainer>();
  const mapUnderlay = useRef<PIXI.Sprite>();

  const keyboardListeners = useRef<KeyboardItem[]>();

  const app = useApp();

  useViewport({
    app,
    size,
    containerRef: gameContainer,
    center: false,
    clampDrag: true,
  });
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
    const layers: {
      container: PIXI.Container;
      texture: any;
      sprite: PIXI.Sprite;
    }[] = [
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
                isometricContainer.current,
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
                isometricContainer.current,
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
        if (isometricContainer.current && isometricContainer.current.selected) {
          setPreviouslySelectedTile(isometricContainer.current.selected);
        }

        isometricContainer.current = new PIXI.Container() as IsometricContainer;
        isometricContainer.current.interactive = true;
        isometricContainer.current.sortableChildren = true;

        // create a single background sprite with the texture
        const layerSprite = new PIXI.Sprite(layers[0].texture);
        layerSprite.zIndex = 2;

        isometricContainer.current.addChild(layerSprite);
        isometricContainer.current.selected =
          previouslySelectedTile || undefined;

        if (isometricContainer.current.selected) {
          indicators.current.topRight.selectedIndicator.text = `Selected {i, j}: ${isometricContainer.current.selected.i}, ${isometricContainer.current.selected.j}`;
        }
        layer.sprite = layerSprite;
        return;
      }
      // TODO: remove above, make this generic
      layer.sprite = new PIXI.Sprite(layer.texture);
      layer.sprite.y -= index * config.current.tileWidth; // vertical separation of tile isometricLayers
      layer.sprite.zIndex = index;
    });

    layers.forEach(({ container, texture }) =>
      app.renderer.render(container, { renderTexture: texture })
    );

    isometricLayers.current = layers;

    bindMouseEvents();
  };

  const tearDownScene = () => {
    isometricContainer.current.destroy({
      children: true,
      texture: true,
      baseTexture: true,
    });
    isometricContainer.current.removeAllListeners();
    keyboardListeners.current.forEach((item) => item.unsubscribe());
  };

  const tickerFunction = () => {
    indicators.current.topRight.mapVelocityIndicator.text = `Velocity: { x: ${velocity.x}, y: ${velocity.y} }`;

    const itemsToMove = [isometricContainer.current];

    if (dragging) {
      dragFrameCount += 1;
      indicators.current.bottomLeft.dragIndicator.text = `dragging for ${dragFrameCount} animation frames`;
    } else {
      dragFrameCount = 1;
    }

    if (velocity.x > 0) {
      isometricContainer.current.position.x += velocity.x;
      velocity = { x: velocity.x - 1, y: velocity.y };
    }

    if (velocity.x < 0) {
      isometricContainer.current.position.x += velocity.x;
      velocity = { x: velocity.x + 1, y: velocity.y };
    }

    if (velocity.y > 0) {
      isometricContainer.current.position.y += velocity.y;
      velocity = { x: velocity.x, y: velocity.y - 1 };
    }

    if (velocity.y < 0) {
      isometricContainer.current.position.y += velocity.y;
      velocity = { x: velocity.x, y: velocity.y + 1 };
    }

    if (isometricContainer.current.position.x < config.current.borderL) {
      isometricContainer.current.position.x = config.current.borderL;
    }
    if (isometricContainer.current.position.x > config.current.borderR) {
      isometricContainer.current.position.x = config.current.borderR;
    }
    if (isometricContainer.current.position.y < config.current.borderD) {
      isometricContainer.current.position.y = config.current.borderD;
    }
    if (isometricContainer.current.position.y > config.current.borderU) {
      isometricContainer.current.position.y = config.current.borderU;
    }
  };

  // #region Mouse/Keyboard event binding
  const bindMouseEvents = () => {
    const mouseDownHandler = (event: PIXI.InteractionEvent) => {
      const handledEvent = mouseDownInteraction(
        event,
        isometricContainer.current,
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
          if (isometricContainer.current.selected) {
            // TODO: layer context
            unSelectTile({
              tile: isometricContainer.current.selected,
              layerContainer: isometricLayers.current[0].container,
              layers: isometricLayers.current,
              config: config.current,
              renderer: app.renderer,
              defaultColor: colors.tileColor,
            });

            indicators.current.topRight.oldSelectedIndicator.text = `Prev. selected : ${isometricContainer.current.selected.i}, ${isometricContainer.current.selected.j}`;
          }
          // TODO: layer context
          selectTile({
            tile: selectedTile.current,
            layerContainer: isometricLayers.current[0].container,
            layers: isometricLayers.current,
            config: config.current,
            renderer: app.renderer,
            selectionCallback: (tile) =>
              (isometricContainer.current.selected = tile),
            selectedColor: colors.selectedColor,
          });

          indicators.current.topRight.selectedIndicator.text = `Selected {i, j}: ${isometricContainer.current.selected.i}, ${isometricContainer.current.selected.j}`;
        },
        isometricContainer.current,
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
        isometricContainer.current,
        config.current,
        dragging,
        dragged.x,
        dragged.y,
        selectedTile.current
      );

      if (isPositionalUpdate(handledEvent)) {
        positionDelta = { x: handledEvent.delx, y: handledEvent.dely };

        dragged = { x: handledEvent.draggedx, y: handledEvent.draggedy };

        isometricContainer.current.position.x =
          handledEvent.newContainerPositionX;
        isometricContainer.current.position.y =
          handledEvent.newContainerPositionY;

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
            stack: isometricContainer.current,
            layers: isometricLayers.current,
            renderer: app.renderer,
            hoverCallback: (tile) => {
              isometricContainer.current.hovered = tile;
              setHoveredTile(tile);
            },
            outlineColor: colors.hoverColor,
          });
        }
      }
    };

    isometricContainer.current.addListener('mousedown', (event) =>
      mouseDownHandler(event)
    );
    isometricContainer.current.addListener('touchstart', (event) =>
      mouseDownHandler(event)
    );

    isometricContainer.current.addListener('mouseup', mouseUpHandler);
    isometricContainer.current.addListener('touchend', mouseUpHandler);

    isometricContainer.current.addListener('mousemove', (event) =>
      mouseMoveHandler(event)
    );
    isometricContainer.current.addListener('touchmove', (event) =>
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

    mapUnderlay.current = new PIXI.Sprite(new PIXI.Texture(baseTexture));

    const underlayGraphic = initMapUnderlay(config.current);
    underlayGraphic.zIndex = 1;
    mapUnderlay.current.zIndex = 1;

    mapUnderlay.current.scale = {
      x: config.current.mapRadius + 1,
      y: config.current.mapRadius + 1,
    };

    underlayGraphic.y = -(config.current.tileWidth * config.current.mapRadius);

    isometricContainer.current.addChild(mapUnderlay.current);
    isometricContainer.current.addChild(underlayGraphic);

    mapUnderlay.current.mask = underlayGraphic;

    gameContainer.current.addChild(isometricContainer.current);
  }, []);

  useEffect(() => {
    addOrRemoveIndicators('remove');
    indicators.current = buildIndicators(size.height, size.width);
    addOrRemoveIndicators('add');
  }, [size]);

  return <></>;
};
