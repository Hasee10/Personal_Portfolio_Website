import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

const COUNT = 1200;

const ParticleField = ({ basePositions, positions, colors }) => {
  const pointsRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y = t * 0.04;

    const buf = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      buf[i3 + 1] = basePositions[i3 + 1] + Math.sin(t * 0.18 + basePositions[i3] * 0.5) * 0.025;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={COUNT} array={colors} itemSize={3} />
      </bufferGeometry>
      <PointMaterial size={0.05} sizeAttenuation depthWrite={false} vertexColors transparent opacity={0.5} />
    </Points>
  );
};

const ParticlesCanvas = () => {
  const [failed, setFailed] = useState(false);

  const { basePositions, positions, colors } = useMemo(() => {
    const basePositions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      basePositions[i3]     = (Math.random() - 0.5) * 10;
      basePositions[i3 + 1] = (Math.random() - 0.5) * 10;
      basePositions[i3 + 2] = (Math.random() - 0.5) * 10;
      colors[i3]     = 0.5 + Math.random() * 0.5;
      colors[i3 + 1] = 0.2 + Math.random() * 0.3;
      colors[i3 + 2] = 0.8 + Math.random() * 0.2;
    }
    return { basePositions, positions: new Float32Array(basePositions), colors };
  }, []);

  if (failed) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      onCreated={({ gl }) => {
        if (!gl || gl.getParameter(gl.VERSION) === '') setFailed(true);
      }}
      onError={() => setFailed(true)}
    >
      <ambientLight intensity={0.5} />
      <ParticleField basePositions={basePositions} positions={positions} colors={colors} />
    </Canvas>
  );
};

export default ParticlesCanvas;
