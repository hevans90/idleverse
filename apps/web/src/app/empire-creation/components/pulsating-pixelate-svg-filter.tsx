import { useEffect, useState } from 'react';

export const PulsatingPixelateSVGFilter = () => {
  const [opacity, setOpacity] = useState<number>(1);
  let zeroOpacity = false;

  const [distortion, setDistortion] = useState<number>(1);
  let fullDistortion = false;

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity((prevOpacity) => {
        if (prevOpacity < 0.1) {
          zeroOpacity = true;
        }

        if (prevOpacity > 1) {
          zeroOpacity = false;
        }

        return zeroOpacity ? prevOpacity + 0.005 : prevOpacity - 0.005;
      });

      setDistortion((prevDistortion) => {
        if (prevDistortion < 0.1) {
          fullDistortion = true;
        }

        if (prevDistortion > 20) {
          fullDistortion = false;
        }

        return fullDistortion ? prevDistortion + 0.05 : prevDistortion - 0.05;
      });
    });
    return () => clearInterval(interval);
  }, []);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0">
      <defs>
        <filter id="pixelate" x="0" y="0">
          <feFlood x="2" y="2" height="1" width="1" floodOpacity={opacity} />
          <feComposite width={distortion} height={distortion} />
          <feTile result="a" />
          <feComposite in="SourceGraphic" in2="a" operator="in" />
          <feMorphology operator="dilate" radius={distortion / 2} />
        </filter>
      </defs>
    </svg>
  );
};
