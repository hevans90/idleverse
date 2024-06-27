import { DashLine } from '@idleverse/pixi-utils';

import { Graphics } from '@pixi/react';
import { Graphics as PixiGraphics } from 'pixi.js';
import { useEffect, useRef } from 'react';

export const OrbitalDash = ({
  radius,
  center,
}: {
  radius: number;
  center: { x: number; y: number };
}) => {
  const graphicsRef = useRef<PixiGraphics>();

  useEffect(() => {
    graphicsRef.current.removeChildren();
    graphicsRef.current.clear();

    console.log(radius);

    if (graphicsRef.current) {
      const dash = new DashLine(graphicsRef.current, {
        dash: [50, 30],
        width: 10,
        alpha: 0.8,
      });
      dash.drawCircle(0, 0, radius);
    }
  }, [radius]);

  return <Graphics position={center} ref={graphicsRef} anchor={0.5} />;
};
