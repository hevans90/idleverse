import { useEffect, useState } from 'react';

export const PixelateSVGFilter = ({
  start,
  reversed,
  minDistortion,
  maxDistortion,
}: {
  start: boolean;
  reversed: boolean;
  minDistortion: number;
  maxDistortion: number;
}) => {
  const [distortionState, setDistortionState] = useState<{
    opacity: number;
    distortion: number;
  }>({
    opacity: reversed ? 0 : 1,
    distortion: reversed ? maxDistortion : minDistortion,
  });

  const opacityIterator = 0.002;
  const distortionIterator = 0.05;

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (start && reversed) {
      interval = setInterval(() => {
        setDistortionState(
          ({ opacity: prevOpacity, distortion: prevDistortion }) => {
            if (prevOpacity >= 1 && prevDistortion <= minDistortion) {
              // console.log('finished distorting');
              clearInterval(interval);
            }

            return {
              opacity: prevOpacity >= 1 ? 1 : prevOpacity + opacityIterator,
              distortion:
                prevDistortion > minDistortion
                  ? prevDistortion - distortionIterator
                  : prevDistortion,
            };
          }
        );
      });
    } else if (start) {
      interval = setInterval(() => {
        setDistortionState(
          ({ opacity: prevOpacity, distortion: prevDistortion }) => {
            if (prevOpacity < 0 && prevDistortion >= maxDistortion) {
              // console.log('finished distorting');
              clearInterval(interval);
            }

            return {
              opacity: prevOpacity < 0 ? 0 : prevOpacity - opacityIterator,
              distortion:
                prevDistortion < maxDistortion
                  ? prevDistortion + distortionIterator
                  : prevDistortion,
            };
          }
        );
      });
    }
  }, [start, maxDistortion, minDistortion, reversed]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0">
      <defs>
        <filter id="pixelate" x="0" y="0">
          {start && (
            <>
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
                radius={distortionState.distortion}
              />
            </>
          )}
        </filter>
      </defs>
    </svg>
  );
};
