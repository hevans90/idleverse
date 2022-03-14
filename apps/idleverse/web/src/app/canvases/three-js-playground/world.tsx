import { useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { TextureLoader, Mesh } from 'three';

export const World = ({ weather }: { weather: boolean }) => {
  const worldColorMap = useLoader(TextureLoader, 'world.jpeg');
  const cloudsColorMap = useLoader(TextureLoader, 'clouds.png');

  const worldRef = useRef<Mesh>();
  const cloudsRef = useRef<Mesh>();

  useFrame(({ clock }) => {
    worldRef.current.rotation.y = clock.getElapsedTime() / 5;
    cloudsRef.current.rotation.y = clock.getElapsedTime() / 10;
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight />
      <mesh ref={worldRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={worldColorMap} />
      </mesh>
      {weather && (
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[1.03, 32, 32]} />
          <meshStandardMaterial map={cloudsColorMap} transparent={true} />
        </mesh>
      )}
    </>
  );
};
