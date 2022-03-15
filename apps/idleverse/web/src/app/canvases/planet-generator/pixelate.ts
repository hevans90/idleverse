import { useThree, useFrame } from '@react-three/fiber';
import { useMemo, useEffect } from 'react';
import { Vector2, Color } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { useResize } from '../common-utils/use-resize.hook';
import PixelatePass from './pixel-shader/pixelate-pass';
import RenderPixelatedPass from './pixel-shader/render-pixelate-pass';

export const Pixelate = ({
  bgColor,
  pixelSize,
}: {
  bgColor: THREE.ColorRepresentation;
  pixelSize: number;
}) => {
  const { width, height } = useResize();

  const { gl, scene, camera } = useThree();

  const [base] = useMemo(() => {
    const screenResolution = new Vector2(width, height);
    const renderResolution = screenResolution.clone().divideScalar(pixelSize);
    renderResolution.x |= 0;
    renderResolution.y |= 0;
    const composer = new EffectComposer(gl);
    composer.addPass(new RenderPixelatedPass(renderResolution, scene, camera));
    const bloomPass = new UnrealBloomPass(screenResolution, 0.4, 0.1, 0.9);
    composer.addPass(bloomPass);
    composer.addPass(new PixelatePass(renderResolution));

    scene.background = new Color(bgColor);

    return [composer];
  }, [pixelSize]);

  useEffect(() => {
    base.setSize(width, height);
  }, [base, pixelSize, width, height]);

  useFrame(() => {
    base.render();
  }, 1);

  return null;
};
