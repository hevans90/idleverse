import { IsometricStack } from '../models/isometric-stack';

export const mouseUpInteraction = (
  draggedx: number,
  draggedy: number,
  callback: () => void,
  myContainer: IsometricStack,
  delx: number,
  dely: number,
) => {
  // if true, this will trigger a click rather than a drag
  const dragBreakpointCondition =
    Math.abs(draggedx) > 1 || Math.abs(draggedy) > 1;

  if (!dragBreakpointCondition) {
    callback();
  }

  return {
    dragIndicatorText: 'not dragging',
    draggedIndicatorText: '',
    dragged: dragBreakpointCondition
      ? {
          velx: Math.floor(myContainer.position.x - delx),
          vely: Math.floor(myContainer.position.y - dely),
          delx: 0,
          dely: 0,
        }
      : undefined,
  };
};
