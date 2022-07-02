import { useEffect, useState } from 'react';

export const PixelateSVGFilter = () => {
  const [distortionState, setDistortionState] = useState<{
    opacity: number;
    distortion: number;
  }>({ opacity: 1, distortion: 0.1 });

  const maxDistortion = 20;

  useEffect(() => {
    const interval = setInterval(() => {
      setDistortionState(
        ({ opacity: prevOpacity, distortion: prevDistortion }) => {
          // console.log('distorting');

          if (prevOpacity < 0 && prevDistortion >= maxDistortion) {
            // console.log('finished distorting');
            clearInterval(interval);
          }

          return {
            opacity: prevOpacity < 0 ? 0 : prevOpacity - 0.002,
            distortion:
              prevDistortion < maxDistortion
                ? prevDistortion + 0.05
                : prevDistortion,
          };
        }
      );
    });
  }, []);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0">
      <defs>
        <filter id="pixelate" x="0" y="0">
          <feFlood
            x="2"
            y="2"
            height="1"
            width="1"
            floodOpacity={distortionState.opacity}
          />
          <feComposite
            width={distortionState.distortion}
            height={distortionState.distortion}
          />
          <feTile result="a" />
          <feComposite in="SourceGraphic" in2="a" operator="in" />
          <feMorphology
            operator="dilate"
            radius={distortionState.distortion / 2}
          />
        </filter>
      </defs>
    </svg>
  );
};
