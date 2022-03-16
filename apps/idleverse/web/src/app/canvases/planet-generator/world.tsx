import { useFrame, useLoader } from '@react-three/fiber';
import { wrap } from 'comlink';
import { useEffect, useRef, useState } from 'react';
import { DataTexture, Mesh, TextureLoader } from 'three';

const worker = new Worker(
  new URL('./texture-generation/worker.ts', import.meta.url)
);

const { textureGen } =
  wrap<import('./texture-generation/worker').RunTextureGenWorker>(worker);

export const World = ({
  weather,
  rotate,
  atmosphericDistance,
}: {
  weather: boolean;
  rotate: boolean;
  atmosphericDistance: number;
}) => {
  const worldColorMap = useLoader(TextureLoader, 'world.jpeg');
  const cloudsColorMap = useLoader(TextureLoader, 'clouds.png');

  const [dataTexture, setDataTexture] = useState<DataTexture>(undefined);

  const worldRef = useRef<Mesh>();
  const cloudsRef = useRef<Mesh>();

  const runTextureGenOnWorker = async () => {
    const { data, height, width } = await textureGen();

    const texture = new DataTexture(data, width, height);
    texture.needsUpdate = true;

    setDataTexture(texture);
  };

  // on initial render, run texture gen
  useEffect(() => {
    // setDataTexture(worldColorMap as any);

    setTimeout(() => runTextureGenOnWorker(), 2000);
  }, []);

  useFrame(({ clock }) => {
    if (dataTexture && rotate) {
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
        <meshStandardMaterial map={dataTexture} />
      </mesh>
      {/* {dataTexture && (
      )} */}
      {weather && (
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[1 + atmosphericDistance / 100, 32, 32]} />
          <meshStandardMaterial map={cloudsColorMap} transparent={true} />
        </mesh>
      )}
    </>
  );
};
