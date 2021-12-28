import { useEffect, useRef } from 'react';

export const useKeypress = (key: string, handler: () => unknown) => {
  const eventListenerRef = useRef<(event: KeyboardEvent) => unknown>();

  useEffect(() => {
    eventListenerRef.current = (event: KeyboardEvent) =>
      event.key === key ? handler() : null;
  }, [key, handler]);

  useEffect(() => {
    const eventListener = (event: KeyboardEvent) =>
      eventListenerRef.current(event);

    window.addEventListener('keydown', eventListener);
    return () => {
      window.removeEventListener('keydown', eventListener);
    };
  }, []);
};
