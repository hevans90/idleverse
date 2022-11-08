import { Impulse, PlayerMessage, RoomState } from '@idleverse/colyseus-shared';
import { SpatialHashGrid } from './collision-detection/fast';
import { Bounds, Dimensions } from './collision-detection/models';
import { GameRoom } from './room';

const dimensions: Dimensions = { height: 200, width: 200 };

const bounds: Bounds = {
  upper: { x: dimensions.width / 2, y: dimensions.height / 2 },
  lower: { x: -dimensions.width / 2, y: -dimensions.height / 2 },
};

export const onCreate = (options: any, room: GameRoom) => {
  room.setSimulationInterval((deltaTime) => room.update(deltaTime));

  room.setState(new RoomState(dimensions));

  room.clock.start();

  room.onMessage(PlayerMessage.Impulse, (client, message: Impulse) => {
    room.state.impulses.find(
      ({ colyseusUserId }) => colyseusUserId === client.id
    )[message.direction] = true;
  });

  room.onMessage(PlayerMessage.ImpulseStopped, (client, message: Impulse) => {
    room.state.impulses.find(
      ({ colyseusUserId }) => colyseusUserId === client.id
    )[message.direction] = false;
  });

  room.grid = new SpatialHashGrid(bounds, {
    height: dimensions.height / 10,
    width: dimensions.width / 10,
  });
};
