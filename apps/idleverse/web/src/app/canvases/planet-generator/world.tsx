import { useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { DataTexture, DoubleSide, Mesh, TextureLoader, Vector3 } from 'three';

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
  const cloudsColorMap = useLoader(TextureLoader, 'clouds.png');

  const worldRef = useRef<Mesh>();
  const cloudsRef = useRef<Mesh>();
  const hoverRef = useRef<Mesh>();

  useFrame(({ clock, raycaster, gl }) => {
    if (worldTexture && rotate) {
      worldRef.current.rotation.y = clock.getElapsedTime() / 5;

      if (cloudsRef.current) {
        cloudsRef.current.rotation.y = clock.getElapsedTime() / 10;
      }
    }

    if (worldTexture) {
      const intersects = raycaster.intersectObjects([worldRef.current], true);

      if (intersects[0]) {
        hoverRef.current.position.x = intersects[0].point.x * 1.01;
        hoverRef.current.position.y = intersects[0].point.y * 1.01;
        hoverRef.current.position.z = intersects[0].point.z * 1.01;

        hoverRef.current.lookAt(new Vector3(0, 0, 0));
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight />

      <mesh ref={hoverRef}>
        <circleGeometry args={[0.02, 20]} />
        <meshBasicMaterial side={DoubleSide} color={0xff0000} />
      </mesh>

      <mesh ref={worldRef}>
        <icosahedronGeometry args={[1, 5]} />
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
