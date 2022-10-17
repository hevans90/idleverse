import { Impulse, PlayerMessage, RoomState } from '@idleverse/colyseus-shared';
import { GameRoom } from './room';

export const onCreate = (options: any, room: GameRoom) => {
  room.setSimulationInterval((deltaTime) => room.update(deltaTime));

  room.setState(new RoomState());

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
};
