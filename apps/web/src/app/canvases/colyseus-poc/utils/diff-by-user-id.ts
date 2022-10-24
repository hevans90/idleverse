import { ColyseusShip } from '@idleverse/colyseus-shared';

export const diffByUserId = <T extends { userId: string }>(
  prev: T[],
  curr: T[]
): { additions: T[]; deletions: T[] } => {
  const additions = curr.filter(
    ({ userId }) => !prev.find(({ userId: id }) => id === userId)
  );

  const deletions = prev.filter(
    ({ userId }) => !curr.find(({ userId: id }) => id === userId)
  );

  return {
    additions: additions.length ? additions : undefined,
    deletions: deletions.length ? deletions : undefined,
  };
};

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
