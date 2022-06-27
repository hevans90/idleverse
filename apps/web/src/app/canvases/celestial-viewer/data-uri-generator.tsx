import { useEffect, useRef } from 'react';
import { celestialViewerPlanetDataUris } from '../../_state/celestial-viewer';

export const DataUriGenerator = ({
  celestialId,
  input,
  onGenerationFinished,
}: {
  onGenerationFinished: () => void;
  celestialId: string;
  input: { seed: string; data: Uint8Array; width: number; height: number }[];
}) => {
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const uris: { seed: string; uri: string }[] = [];

    input.forEach(({ seed, data, width, height }) => {
      const canvasContext = canvasRef.current.getContext('2d');
      canvasRef.current.width = width;
      canvasRef.current.height = height;

      const pixels = canvasContext.createImageData(width, height);

      let row = 4 * width;
      let col = 4 * width;
      const k = 4 * width;

      for (let i = 0; i < data.length; i++) {
        row = Math.floor(i / k);
        col = i % k;
        pixels.data[(width - row) * k + col] = data[i];
      }

      canvasContext.putImageData(pixels, 0, 0);

      const uri = canvasRef.current.toDataURL();

      uris.push({ seed, uri });
    });

    celestialViewerPlanetDataUris({ celestialId, uris });
    onGenerationFinished();
  }, []);

  return <canvas ref={canvasRef} />;
};
