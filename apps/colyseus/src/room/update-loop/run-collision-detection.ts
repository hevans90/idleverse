import { GameRoom } from '../room';

export const runCollisionDetection = (room: GameRoom) => {
  const nearby = room.grid.findNearby(
    { x: 500, y: 500 },
    { width: 50, height: 50 }
  );

  if (nearby.length) {
    console.log(nearby);
  }
};
