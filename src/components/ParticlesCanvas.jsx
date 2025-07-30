import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate random points in a 3D space
const generatePoints = (count) => {
  const points = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    points[i3] = (Math.random() - 0.5) * 10;
    points[i3 + 1] = (Math.random() - 0.5) * 10;
    points[i3 + 2] = (Math.random() - 0.5) * 10;
    
    // Add some color variation
    colors[i3] = 0.5 + Math.random() * 0.5; // R
    colors[i3 + 1] = 0.2 + Math.random() * 0.3; // G
    colors[i3 + 2] = 0.8 + Math.random() * 0.2; // B
  }
  
  return { positions: points, colors };
};

const ParticleField = () => {
  const pointsRef = useRef();
  const { positions, colors } = generatePoints(1500);
  
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    
    if (pointsRef.current) {
      // Rotate the entire point cloud
      pointsRef.current.rotation.y = elapsedTime * 0.05;
      
      // Create subtle wave motion
      const positions = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        
        // Apply subtle wave motion
        positions[i + 1] = y + Math.sin(elapsedTime * 0.2 + x * 0.5) * 0.02;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <Points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors
        transparent
        opacity={0.6}
      />
    </Points>
  );
};

const ParticlesCanvas = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <ParticleField />
    </Canvas>
  );
};

export default ParticlesCanvas;
