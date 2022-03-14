import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const CameraController = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    camera.position.set(1, 1, 2);
  }, []);

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);

    controls.minDistance = 2;
    controls.maxDistance = 10;
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};
