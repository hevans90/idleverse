import React, { useCallback } from 'react';
import { Graphics } from '@inlet/react-pixi';

export type StarProps = {
  x: number,
  y: number
}



export const Star: React.FC<StarProps> = (props: StarProps) => {
  const draw = useCallback((g) => {
    g.clear();
    g.beginFill(0xffffff);
    g.drawRect(props.x, props.y, 2);
    g.endFill();
  }, [props]);

  return <Graphics
    draw={(g) => {
      g.clear();
      g.beginFill(0xffffff);
      g.drawCircle(props.x, props.y, 1);
      g.endFill();
    }}
  />;
}