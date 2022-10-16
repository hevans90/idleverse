import 'reflect-metadata';

import { useApp } from '@inlet/react-pixi';
import { Room } from 'colyseus.js';
import { useControls } from './use-controls';
export const ColyseusGame = ({ room }: { room: Room }) => {
  const app = useApp();

  useControls(room);

  return <></>;
};
