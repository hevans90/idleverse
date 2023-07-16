import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import THREE, {
  BufferAttribute,
  BufferGeometry,
  Color,
  ShaderMaterial,
  Vector3,
} from 'three';

const VERTEX_SHADER = `
  uniform vec3 sphereCenter;
  attribute float size;
  attribute float startTime;
  attribute vec3 color;
  varying vec3 vColor;
  varying float vTime;
  varying float vDotProduct;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vec3 direction = normalize(worldPosition - sphereCenter);  // Use sphere center here
    float dotProduct = dot(direction, normalize(cameraPosition - sphereCenter)); // And here
    vDotProduct = dotProduct;
    vTime = startTime;
    vColor = color;
    gl_PointSize = size;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = `
  uniform float amplitude;
  uniform float time;
  uniform float twinkleVariation;
  uniform float twinkleSmoothness;
  varying float vTime;
  varying vec3 vColor;
  varying float vDotProduct;
  void main() {
    float twinkle = (sin((vTime + time) * twinkleSmoothness * 43758.5453123) + 1.0) * 0.5;
    float brightness = mix(twinkleVariation, 1.0, twinkle) * amplitude;
    gl_FragColor = vec4(vColor, 1.0) * brightness;
    if (vDotProduct > 0.0) {
      discard;
    };
  }
`;

const generateStarData = (radius, count, colorVariation, starBrightness) => {
  const positions = [];
  const startTimes = [];
  const colors = [];
  const sizes = [];
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    positions.push(x, y, z);
    startTimes.push(Math.random());

    const color = new Color();
    let h;
    if (Math.random() < colorVariation) {
      h = Math.random(); // Random hue
    } else {
      h = 0.6 + Math.random() * 0.4; // Blue-white hue
    }
    color.setHSL(h, 0.5, starBrightness);
    colors.push(color.r, color.g, color.b);
    sizes.push(Math.random() + 0.5);
  }
  return {
    positions: new Float32Array(positions),
    startTimes: new Float32Array(startTimes),
    colors: new Float32Array(colors),
    sizes: new Float32Array(sizes),
  };
};

interface StarsProps {
  radius?: number;
  twinkleSpeed?: number;
  colorVariation?: number;
  twinkleVariation?: number;
  twinkleSmoothness?: number;
  rotationSpeed?: number;
  starCount?: number;
  starBrightness?: number; // New prop
}

export const Stars = ({
  radius = 400,
  twinkleSpeed = 0.0005,
  colorVariation = 0.1,
  twinkleVariation = 0.4,
  twinkleSmoothness = 0.1,
  rotationSpeed = 0.01,
  starCount = 100,
  starBrightness = 0.7,
}: StarsProps): JSX.Element => {
  const { positions, startTimes, colors, sizes } = useMemo(
    () =>
      generateStarData(radius, starCount * 100, colorVariation, starBrightness),
    [radius, starCount, colorVariation, starBrightness]
  );
  const [lastElapsedTime, setLastElapsedTime] = useState(0);

  const materialRef = useRef<ShaderMaterial>();
  const geometryRef = useRef<BufferGeometry>();
  const pointsRef = useRef<THREE.Points>(null);

  useEffect(() => {
    if (geometryRef.current && materialRef.current) {
      geometryRef.current.setAttribute(
        'position',
        new BufferAttribute(positions, 3)
      );
      geometryRef.current.setAttribute(
        'startTime',
        new BufferAttribute(startTimes, 1)
      );
      geometryRef.current.setAttribute('color', new BufferAttribute(colors, 3));
      geometryRef.current.setAttribute('size', new BufferAttribute(sizes, 1)); // Added 'size' attribute

      materialRef.current.uniforms = {
        amplitude: { value: 0.7 },
        time: { value: 0.0 },
        twinkleVariation: { value: twinkleVariation },
        twinkleSmoothness: { value: twinkleSmoothness },
        cameraPosition: { value: new Vector3() },
        cameraDirection: { value: new Vector3(0, 0, -1) },
        sphereCenter: { value: new Vector3(0, 0, 0) },
      };
    }
  }, [
    positions,
    startTimes,
    colors,
    twinkleVariation,
    twinkleSmoothness,
    sizes,
  ]);
  useFrame(({ clock, camera }) => {
    const material = materialRef.current;
    if (material) {
      materialRef.current.uniforms.time.value =
        clock.getElapsedTime() * twinkleSpeed;
      material.uniforms.cameraPosition.value = camera.position;
      material.uniforms.cameraDirection.value = camera.getWorldDirection(
        new Vector3()
      );
    }

    const points = pointsRef.current;
    if (points) {
      const deltaTime = clock.elapsedTime - lastElapsedTime;
      setLastElapsedTime(clock.elapsedTime);
      points.rotation.y += rotationSpeed * deltaTime;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef} />
      <shaderMaterial
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        attach="material"
        ref={materialRef}
      />
    </points>
  );
};
