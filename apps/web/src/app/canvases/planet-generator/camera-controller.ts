import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

export const CameraController = () => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);

    camera.zoom = 2; // Set the default zoom level
    camera.updateProjectionMatrix(); // Update the projection matrix
  }, [camera, camera.position]);

  return null;
};
