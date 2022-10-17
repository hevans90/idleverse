export type JoinOptions = {
  accessToken: string;
  displayName: string;
  avatarUrl: string;
  userId: string;
};

export enum PlayerMessage {
  Impulse = 'impulse',
  ImpulseStopped = 'impulse_stopped',
}

export enum ServerMessage {
  PlayerJoined = 'player_joined',
  PlayerLeft = 'player_left',
  PlayerDisconnected = 'player_disconnected',
}

export type Impulse = {
  direction: 'left' | 'right' | 'down' | 'up';
};
