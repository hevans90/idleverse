import { GameRoom } from '../room';

export const runCollisionDetection = (room: GameRoom) => {
  const nearby = room.grid.findNearby(
    { x: 0, y: 0 },
    { width: 100, height: 100 }
  );

  if (nearby.length) {
    console.log(nearby);
  }
};
