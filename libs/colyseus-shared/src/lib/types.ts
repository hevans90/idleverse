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

export type Impulse = {
  direction: 'left' | 'right' | 'down' | 'up';
};
