import { ColyseusShip } from '@idleverse/colyseus-shared';

export const detectPositionalChanges = <
  T extends Pick<ColyseusShip, 'userId' | 'positionX' | 'positionY'>
>(
  prev: T[],
  curr: T[]
): { shipsWithUpdatedPositions: T[] } => {
  const shipsWithUpdatedPositions: T[] = [];

  curr.forEach((currShip) => {
    const prevShip = prev.find(({ userId }) => userId === currShip.userId);

    if (
      prevShip &&
      (prevShip.positionX !== currShip.positionX ||
        prevShip.positionY !== currShip.positionY)
    ) {
      shipsWithUpdatedPositions.push(currShip);
    }
  });

  return {
    shipsWithUpdatedPositions:
      shipsWithUpdatedPositions?.length > 0
        ? shipsWithUpdatedPositions
        : undefined,
  };
};

export const detectRotationalChanges = <
  T extends Pick<ColyseusShip, 'userId' | 'rotation'>
>(
  prev: T[],
  curr: T[]
): { shipsWithUpdatedRotations: T[] } => {
  const shipsWithUpdatedRotations: T[] = [];

  curr.forEach((currShip) => {
    const prevShip = prev.find(({ userId }) => userId === currShip.userId);

    if (prevShip && prevShip.rotation !== currShip.rotation) {
      shipsWithUpdatedRotations.push(currShip);
    }
  });

  return {
    shipsWithUpdatedRotations:
      shipsWithUpdatedRotations?.length > 0
        ? shipsWithUpdatedRotations
        : undefined,
  };
};
