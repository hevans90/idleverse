export const orientations = [
  'top-to-bottom',
  'bottom-to-top',
  'left-to-right',
  'right-to-left',
] as const;

export type Orientation = typeof orientations[number];

export const orientationConfig = (
  orientiation: Orientation
): { depth: { axis: 'x' | 'y'; start: 1 | -1 }; separationAxis: 'x' | 'y' } => {
  switch (orientiation) {
    case 'top-to-bottom': {
      return {
        depth: { axis: 'y', start: 1 },
        separationAxis: 'x',
      };
    }
    case 'bottom-to-top': {
      return {
        depth: { axis: 'y', start: -1 },
        separationAxis: 'x',
      };
    }
    case 'left-to-right': {
      return {
        depth: { axis: 'x', start: 1 },
        separationAxis: 'y',
      };
    }
    case 'right-to-left': {
      return {
        depth: { axis: 'x', start: -1 },
        separationAxis: 'y',
      };
    }
  }
};
