import { useEffect, useRef } from 'react';

export const useKeypress = (key: string, handler: () => unknown) => {
  const eventListenerRef = useRef<(event: KeyboardEvent) => unknown>();

  useEffect(() => {
    eventListenerRef.current = (event: KeyboardEvent) => {
      if (event.code === key) {
        // don't fire custom keydown event handlers for inputs... or users can't type in chat etc.
        if ((event.target as HTMLElement)?.nodeName === 'INPUT') {
          return;
        }
        handler();
      }
    };
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

export const useKeyUp = (key: string, handler: () => unknown) => {
  const eventListenerRef = useRef<(event: KeyboardEvent) => unknown>();

  useEffect(() => {
    eventListenerRef.current = (event: KeyboardEvent) => {
      if (event.code === key) {
        // don't fire custom keyup event handlers for inputs... or users can't type in chat etc.
        if ((event.target as HTMLElement)?.nodeName === 'INPUT') {
          return;
        }
        handler();
      }
    };
  }, [key, handler]);

  useEffect(() => {
    const eventListener = (event: KeyboardEvent) =>
      eventListenerRef.current(event);

    window.addEventListener('keyup', eventListener);
    return () => {
      window.removeEventListener('keyup', eventListener);
    };
  }, []);
};
