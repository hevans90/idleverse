import { useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { DataTexture, Mesh, TextureLoader } from 'three';

export const World = ({
  atmosphere,
  rotate,
  atmosphericDistance,
  worldTexture,
}: {
  atmosphere: boolean;
  rotate: boolean;
  atmosphericDistance: number;
  worldTexture: DataTexture;
}) => {
  const worldColorMap = useLoader(TextureLoader, 'world.jpeg');
  const cloudsColorMap = useLoader(TextureLoader, 'clouds.png');

  const worldRef = useRef<Mesh>();
  const cloudsRef = useRef<Mesh>();

  useFrame(({ clock }) => {
    if (worldTexture && rotate) {
      worldRef.current.rotation.y = clock.getElapsedTime() / 5;

      if (cloudsRef.current) {
        cloudsRef.current.rotation.y = clock.getElapsedTime() / 10;
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight />
      <mesh ref={worldRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={worldTexture} />
      </mesh>
      {atmosphere && (
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[1 + atmosphericDistance / 100, 32, 32]} />
          <meshStandardMaterial map={cloudsColorMap} transparent={true} />
        </mesh>
      )}
    </>
  );
};
