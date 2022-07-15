import { useReactiveVar } from '@apollo/client';
import { useApp } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { useEffect, useState } from 'react';
import { gameConfigVar } from '../../_state/isometric-tiles';
import { Vector2D } from '../../_state/models';
import { useResize } from '../_utils/use-resize.hook';
import { bindKeyboardListeners } from './keyboard/bind-keyboard-listeners';
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
import { hoverTile, selectTile, unSelectTile } from './tiles/interactivity';
import {
  cartesianIndicator,
  GameIndicators,
  selectedIndicator,
  tileIndicator,
} from './ui/indicators';
import { buildZoomButtons, ZoomButtons } from './ui/zoom-buttons';
import { KeyboardItem } from './utils/keyboard';

export const IsometricTiles = () => {
  const config = useReactiveVar(gameConfigVar);

  const [velocity, setVelocity] = useState<Vector2D>({ x: 0, y: 0 });
  const [positionDelta, setPositionDelta] = useState<Vector2D>({ x: 0, y: 0 });
  const [dragged, setDragged] = useState<Vector2D>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState<boolean>(false);
  const [dragFrameCount, setDragFrameCount] = useState<number>(0);

  const [indicators, setIndicators] = useState<GameIndicators>();
  const [zoomButtons, setZoomButtons] = useState<ZoomButtons>();

  const [isometricLayers, setIsometricLayers] = useState<IsometricLayer[]>();
  const [isometricStack, setIsometricStack] = useState<IsometricStack>();

  const [previouslySelectedTile, setPreviouslySelectedTile] = useState<Tile>();
  const [selectedTile, setSelectedTile] = useState<Tile>();
  const [hoveredTile, setHoveredTile] = useState<Tile>();

  const [keyboardListeners, setKeyboardListeners] = useState<KeyboardItem[]>();

  const { stage, renderer } = useApp();

  const size = useResize();

  // #region Mouse/Keyboard event binding
  const bindMouseEvents = () => {
    const mouseDownHandler = (event: PIXI.InteractionEvent) => {
      const handledEvent = mouseDownInteraction(event, isometricStack, config);

      setDragging(handledEvent.dragging);
      setDragged({ x: handledEvent.draggedx, y: handledEvent.draggedy });
      setPositionDelta({ x: handledEvent.delx, y: handledEvent.dely });
      setVelocity({ x: handledEvent.velx, y: handledEvent.vely });

      indicators.bottomLeft.draggedIndicator.text =
        handledEvent.dragIndicatorText;

      setSelectedTile(handledEvent.tileClicked);
    };

    const mouseUpHandler = () => {
      const handledEvent = mouseUpInteraction(
        dragged.x,
        dragged.y,
        () => {
          if (isometricStack.selected) {
            // TODO: layer context
            unSelectTile({
              tile: isometricStack.selected,
              layerContainer: isometricLayers[0].container,
              layers: isometricLayers,
              config,
              renderer,
            });
          }
          // TODO: layer context
          selectTile({
            tile: isometricStack.selected,
            layerContainer: isometricLayers[0].container,
            layers: isometricLayers,
            config,
            renderer,
            selectionCallback: (tile) => (isometricStack.selected = tile),
          });

          selectedIndicator.text = `Selected: i: ${
            (isometricStack.selected as Tile).i
          }, j: ${(isometricStack.selected as Tile).j}`;
        },
        isometricStack,
        positionDelta.x,
        positionDelta.y
      );
      indicators.bottomLeft.dragIndicator.text = handledEvent.dragIndicatorText;
      indicators.bottomLeft.draggedIndicator.text =
        handledEvent.draggedIndicatorText;

      setDragging(false);

      if (handledEvent.dragged) {
        setVelocity({
          x: handledEvent.dragged.velx,
          y: handledEvent.dragged.vely,
        });

        setPositionDelta({
          x: handledEvent.dragged.delx,
          y: handledEvent.dragged.dely,
        });
      }
    };

    const mouseMoveHandler = (event: PIXI.InteractionEvent) => {
      const handledEvent = mouseMoveInteraction(
        event,
        isometricStack,
        config,
        dragging,
        dragged.x,
        dragged.y,
        selectedTile
      );

      if (isPositionalUpdate(handledEvent)) {
        setPositionDelta({ x: handledEvent.delx, y: handledEvent.dely });

        setDragged({ x: handledEvent.draggedx, y: handledEvent.draggedy });

        isometricStack.position.x = handledEvent.newContainerPositionX;
        isometricStack.position.y = handledEvent.newContainerPositionY;

        indicators.bottomLeft.draggedIndicator.text =
          handledEvent.draggedIndicatorText;
        indicators.topLeft.myContainerIndicator.text =
          handledEvent.containerIndicatorText;
        indicators.topLeft.myContainerParentIndicator.text =
          handledEvent.containerParentIndicatorText;
      } else if (isCoordsUpdate(handledEvent)) {
        cartesianIndicator.text = handledEvent.cartesianIndicatorText;

        if (handledEvent.tileHovered) {
          tileIndicator.text = handledEvent.tileIndicatorText;

          hoverTile({
            tile: handledEvent.tileHovered,
            layer: isometricLayers[0].container,
            config,
            stack: isometricStack,
            layers: isometricLayers,
            renderer,
            hoverCallback: (tile) => (isometricStack.hovered = tile),
          });

          setHoveredTile(handledEvent.tileHovered);
        }
      }
    };

    isometricStack.addListener('mousedown', (event) => mouseDownHandler(event));
    isometricStack.addListener('touchstart', (event) =>
      mouseDownHandler(event)
    );

    isometricStack.addListener('mouseup', mouseUpHandler);
    isometricStack.addListener('touchend', mouseUpHandler);

    isometricStack.addListener('mousemove', (event) => mouseMoveHandler(event));
    isometricStack.addListener('touchmove', (event) => mouseMoveHandler(event));
  };

  const bindKeyboardEvents = () =>
    setKeyboardListeners(
      bindKeyboardListeners(
        indicators.bottomRight.upArrowIndicator,
        indicators.bottomRight.downArrowIndicator,
        indicators.bottomRight.rightArrowIndicator,
        indicators.bottomRight.leftArrowIndicator,
        ({ dvelx, dvely, hardSetX, hardSetY }) => {
          if (hardSetX !== undefined) {
            setVelocity({ x: hardSetX, y: velocity.y });
          }

          if (dvelx) {
            setVelocity({ x: velocity.x + dvelx, y: velocity.y });
          }

          if (hardSetY !== undefined) {
            setVelocity({ x: velocity.x, y: hardSetY });
          }

          if (dvely) {
            setVelocity({ x: velocity.x, y: velocity.y + dvely });
          }
        }
      )
    );

  // #endregion

  useEffect(() => {
    stage.sortableChildren = true;

    setZoomButtons(
      buildZoomButtons(size.height, size.width, undefined, undefined)
    );
  });

  useEffect(() => {
    stage.removeChild(...zoomButtons);
    setZoomButtons(
      buildZoomButtons(size.height, size.width, undefined, undefined)
    );
  }, [size]);

  return <></>;
};
