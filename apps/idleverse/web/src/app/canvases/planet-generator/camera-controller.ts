import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const CameraController = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    camera.position.set(1, 10, 10);
  }, []);

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);

    // controls.minDistance = 1;
    controls.maxDistance = 100;
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};
