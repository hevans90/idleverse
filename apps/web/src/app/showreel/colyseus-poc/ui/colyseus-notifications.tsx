import { useToast } from '@chakra-ui/react';
import { ServerStatusMessage } from '@idleverse/colyseus-shared';
import { Room } from 'colyseus.js';
import { useEffect } from 'react';

export const ColyseusNotifications = ({ room }: { room: Room }) => {
  const toast = useToast();

  useEffect(() => {
    room.onMessage(ServerStatusMessage.PlayerJoined, (message: string) =>
      toast({
        title: message,
        status: 'success',
      })
    );
    room.onMessage(ServerStatusMessage.PlayerLeft, (message: string) =>
      toast({
        title: message,
        status: 'info',
      })
    );
    room.onMessage(ServerStatusMessage.PlayerReconnected, (message: string) =>
      toast({
        title: message,
        status: 'info',
      })
    );
    room.onMessage(ServerStatusMessage.PlayerDisconnected, (message: string) =>
      toast({
        title: message,
        status: 'warning',
      })
    );
    room.onMessage(ServerStatusMessage.ClientDisconnected, (message: string) =>
      toast({
        title: message,
        status: 'error',
      })
    );

    room.onError((code, title) => {
      toast({ title, status: 'error' });
    });
  }, []);

  return <></>;
};
