import { Box, Button } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import init, { run_game } from '@idleverse/bevy-game';
import { useResize } from '../../canvases/_utils/use-resize.hook';

export const BevyTest = () => {
  const [gameRunning, setGameRunning] = useState<boolean>(false);

  const { width, height } = useResize();

  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    if (gameRunning) {
      const context = canvasRef.current.getContext('webgl2');
      context.canvas.width = width;
      context.canvas.height = height;
    }
  }, [gameRunning, width, height]);

  const runBevyApp = async () => {
    await init().catch((e) => console.error('something nasty', e));
    try {
      setGameRunning(true);
      run_game();
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <canvas
        className="game"
        height="100%"
        width="100%"
        style={{
          width: gameRunning ? '100%' : 'unset',
          height: gameRunning ? '100%' : 'unset',
        }}
        ref={canvasRef}
      />
      {!gameRunning && <Button onClick={runBevyApp}>Click me daddy</Button>}
    </Box>
  );
};
