import { Impulse, PlayerMessage } from '@idleverse/colyseus-shared';
import { Room } from 'colyseus.js';
import { useKeypress, useKeyUp } from '../../hooks/use-keypress';

export const useControls = (room: Room) => {
  // left
  useKeypress('ArrowLeft', () =>
    room.send(PlayerMessage.Impulse, { direction: 'left' } as Impulse)
  );
  useKeypress('KeyA', () =>
    room.send(PlayerMessage.Impulse, { direction: 'left' } as Impulse)
  );

  useKeyUp('ArrowLeft', () =>
    room.send(PlayerMessage.ImpulseStopped, { direction: 'left' } as Impulse)
  );
  useKeyUp('KeyA', () =>
    room.send(PlayerMessage.ImpulseStopped, { direction: 'left' } as Impulse)
  );

  // up
  useKeypress('ArrowUp', () =>
    room.send(PlayerMessage.Impulse, { direction: 'up' } as Impulse)
  );
  useKeypress('KeyW', () =>
    room.send(PlayerMessage.Impulse, { direction: 'up' } as Impulse)
  );
  useKeyUp('ArrowUp', () =>
    room.send(PlayerMessage.ImpulseStopped, { direction: 'up' } as Impulse)
  );
  useKeyUp('KeyW', () =>
    room.send(PlayerMessage.ImpulseStopped, { direction: 'up' } as Impulse)
  );

  // right
  useKeypress('ArrowRight', () =>
    room.send(PlayerMessage.Impulse, { direction: 'right' } as Impulse)
  );
  useKeypress('KeyD', () =>
    room.send(PlayerMessage.Impulse, { direction: 'right' } as Impulse)
  );
  useKeyUp('ArrowRight', () =>
    room.send(PlayerMessage.ImpulseStopped, { direction: 'right' } as Impulse)
  );
  useKeyUp('KeyD', () =>
    room.send(PlayerMessage.ImpulseStopped, { direction: 'right' } as Impulse)
  );

  // down
  useKeypress('ArrowDown', () =>
    room.send(PlayerMessage.Impulse, { direction: 'down' } as Impulse)
  );
  useKeypress('KeyS', () =>
    room.send(PlayerMessage.Impulse, { direction: 'down' } as Impulse)
  );
  useKeyUp('ArrowDown', () =>
    room.send(PlayerMessage.ImpulseStopped, { direction: 'down' } as Impulse)
  );
  useKeyUp('KeyS', () =>
    room.send(PlayerMessage.ImpulseStopped, { direction: 'down' } as Impulse)
  );
};
