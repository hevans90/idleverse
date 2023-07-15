import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

export const CameraController = () => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(1.5, 1, 5);
    camera.lookAt(0, 0, 0);
  }, [camera, camera.position]);

  return null;
};
