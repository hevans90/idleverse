import { useCallback } from 'react';

export const useDisableWheelZoom = () => {
  const disableZoomCallback = useCallback((element: HTMLElement) => {
    if (element) {
      element.addEventListener(
        'wheel',
        (e) => {
          e.preventDefault();
        },
        { passive: false }
      );
    }
  }, []);

  return { disableZoomCallback };
};
