import { ServerMessage } from '@idleverse/colyseus-shared';
import { Client } from 'colyseus';
import { GameRoom } from './room';

export const onLeave = (client: Client, consented: boolean, room: GameRoom) => {
  const user = room.state.connectedUsers.find(
    ({ colyseusUserId }) => colyseusUserId === client.id
  );
  const impulse = room.state.impulses.find(
    ({ colyseusUserId }) => colyseusUserId === client.id
  );

  room.broadcast(
    consented ? ServerMessage.PlayerLeft : ServerMessage.PlayerDisconnected,
    `${user.displayName} ${consented ? 'left' : 'disconnected'}`
  );

  const userIndex = room.state.connectedUsers.indexOf(user);
  room.state.connectedUsers.splice(userIndex, 1);

  const impulseIndex = room.state.impulses.indexOf(impulse);
  room.state.impulses.splice(impulseIndex, 1);

  console.log(
    `${user.displayName} (${client.sessionId}) ${
      consented ? 'left voluntarily' : 'was disconnected'
    }.`
  );
};
