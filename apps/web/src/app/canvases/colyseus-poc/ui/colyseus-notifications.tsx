import { useToast } from '@chakra-ui/react';
import { ServerMessage } from '@idleverse/colyseus-shared';
import { Room } from 'colyseus.js';
import { useEffect } from 'react';

export const ColyseusNotifications = ({ room }: { room: Room }) => {
  const toast = useToast();

  useEffect(() => {
    room.onMessage(ServerMessage.PlayerJoined, (message: string) =>
      toast({
        title: message,
        status: 'info',
      })
    );
    room.onMessage(ServerMessage.PlayerLeft, (message: string) =>
      toast({
        title: message,
        status: 'info',
      })
    );
    room.onMessage(ServerMessage.PlayerDisconnected, (message: string) =>
      toast({
        title: message,
        status: 'warning',
      })
    );
  }, []);

  return <></>;
};
