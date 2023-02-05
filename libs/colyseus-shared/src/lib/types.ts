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

export enum ServerStatusMessage {
  PlayerJoined = 'player_joined',
  PlayerLeft = 'player_left',
  PlayerDisconnected = 'player_disconnected',
  PlayerReconnected = 'player_reconnected',
  ClientDisconnected = 'client_disconnected',
}

export enum ServerGameMessage {
  Collision = 'collision',
}

export type ColyseusEntity = ColyseusRectangleEntity | ColyseusCircleEntity;

export type ColyseusEntityBase = {
  name: string;
  position: { x: number; y: number };
  geometry: 'circle' | 'rectangle';
  bounciness: number;
};

export type ColyseusRectangleEntity = ColyseusEntityBase & {
  geometry: 'rectangle';
  height: number;
  width: number;
};

export type ColyseusCircleEntity = ColyseusEntityBase & {
  geometry: 'circle';
  radius: number;
};

export const isRectangleEntity = (
  entity: ColyseusEntity
): entity is ColyseusRectangleEntity => entity.geometry === 'rectangle';

export const isCircleEntity = (
  entity: ColyseusEntity
): entity is ColyseusCircleEntity => entity.geometry === 'circle';

export type Collision = {
  id: string;
  target: ColyseusEntity;
  client: ColyseusEntity;
};

export type Impulse = {
  direction: 'left' | 'right' | 'down' | 'up';
};
