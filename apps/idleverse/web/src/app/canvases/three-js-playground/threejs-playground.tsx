import { Box } from '@chakra-ui/react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Vector2 } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { useResize } from '../common-utils/use-resize.hook';
import { CameraController } from './camera-controller';
import PixelatePass from './pixel-shader/pixelate-pass';
import RenderPixelatedPass from './pixel-shader/render-pixelate-pass';

const FloatingBox = (props: JSX.IntrinsicElements['mesh']) => {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};

const Pixelate = () => {
  const { width, height } = useResize();

  const { gl, scene, camera } = useThree();

  const [base] = useMemo(() => {
    const screenResolution = new Vector2(width, height);
    const renderResolution = screenResolution.clone().divideScalar(5);
    renderResolution.x |= 0;
    renderResolution.y |= 0;
    const composer = new EffectComposer(gl);
    composer.addPass(new RenderPixelatedPass(renderResolution, scene, camera));
    const bloomPass = new UnrealBloomPass(screenResolution, 0.4, 0.1, 0.9);
    composer.addPass(bloomPass);
    composer.addPass(new PixelatePass(renderResolution));

    return [composer];
  }, []);

  useEffect(() => {
    base.setSize(width, height);
  }, [base, width, height]);

  useFrame(() => {
    base.render();
  }, 1);

  return null;
};

export const ThreeJsPlayground = () => {
  const { width } = useResize();

  return (
    <Box position="relative" width={`${width}px`} height="100%">
      <Canvas>
        <CameraController />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <FloatingBox position={[-1.2, 0, 0]} />
        <FloatingBox position={[1.2, 0, 0]} />
        <Pixelate />
      </Canvas>
    </Box>
  );
};
