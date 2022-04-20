import { useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import {
  DataTexture,
  DoubleSide,
  Euler,
  Mesh,
  TextureLoader,
  Vector3,
} from 'three';
import { RingConfig } from '../../_state/models';

export const World = ({
  atmosphere,
  rotate,
  atmosphericDistance,
  worldTexture,
  ringTextures,
  rings,
  planetRadius,
}: {
  atmosphere: boolean;
  rotate: boolean;
  atmosphericDistance: number;
  worldTexture: DataTexture;
  ringTextures: { [ringId: string]: DataTexture };
  rings: RingConfig[];
  planetRadius: number;
}) => {
  const cloudsColorMap = useLoader(TextureLoader, 'clouds.png');

  const worldRef = useRef<Mesh>();
  const cloudsRef = useRef<Mesh>();
  const hoverRef = useRef<Mesh>();
  const ringRef = useRef<Mesh[]>([]);

  const addRingToRef = (el) => {
    if (el && !ringRef.current.includes(el)) ringRef.current.push(el);
  };

  useFrame(({ clock, raycaster, gl }) => {
    if (worldTexture && rotate) {
      worldRef.current.rotation.y = clock.getElapsedTime() / 5;

      if (cloudsRef.current) {
        cloudsRef.current.rotation.y = clock.getElapsedTime() / 10;
      }

      if (ringRef.current) {
        ringRef.current.forEach((ring) => {
          if (ring) {
            ring.rotation.z = -clock.getElapsedTime() / 20;
          }
        });
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
      <ambientLight intensity={1} />
      <directionalLight />

      {rings.map(({ innerRadius, outerRadius, id, rotation }, index) => (
        <mesh
          key={index}
          ref={addRingToRef}
          rotation={new Euler(rotation[0], rotation[1], rotation[2])}
        >
          <ringGeometry args={[innerRadius, outerRadius, 50]} />
          <meshStandardMaterial
            side={DoubleSide}
            map={ringTextures && ringTextures[id]}
            transparent={true}
          />
        </mesh>
      ))}

      <mesh ref={hoverRef}>
        <circleGeometry args={[planetRadius * 0.025, 20]} />
        <meshBasicMaterial side={DoubleSide} color={0xff0000} />
      </mesh>

      <mesh ref={worldRef}>
        <icosahedronGeometry args={[planetRadius, 5]} />
        <meshStandardMaterial map={worldTexture} />
      </mesh>
      {atmosphere && (
        <mesh ref={cloudsRef}>
          <sphereGeometry
            args={[planetRadius + atmosphericDistance / 100, 32, 32]}
          />
          <meshStandardMaterial map={cloudsColorMap} transparent={true} />
        </mesh>
      )}
    </>
  );
};
