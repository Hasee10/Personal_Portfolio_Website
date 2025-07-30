import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const GlobeMesh = () => {
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    
    if (meshRef.current) {
      meshRef.current.rotation.y = elapsedTime * 0.05;
    }
    
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsedTime;
    }
  });
  
  // Create a custom shader material for the globe
  const globeMaterial = {
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color(0x3a0ca3) },
      uColor2: { value: new THREE.Color(0x4361ee) },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      // Simple noise function
      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }
      
      void main() {
        // Create grid pattern
        float gridSize = 20.0;
        vec2 grid = fract(vUv * gridSize);
        float gridLine = step(0.95, grid.x) + step(0.95, grid.y);
        
        // Add some noise and time-based animation
        float n = noise(vUv + uTime * 0.1) * 0.1;
        
        // Create latitude/longitude lines
        float lat = step(0.98, abs(sin(vUv.y * 3.14159 * 8.0 + n)));
        float lon = step(0.98, abs(sin(vUv.x * 3.14159 * 16.0 + n)));
        
        // Combine effects
        float lines = max(gridLine, max(lat, lon)) * 0.3;
        
        // Create gradient based on position
        float gradient = vUv.y * 0.7 + 0.3 + sin(uTime * 0.2) * 0.1;
        vec3 color = mix(uColor1, uColor2, gradient);
        
        // Add glow at the edges
        float fresnel = pow(1.0 - abs(dot(normalize(vPosition), vec3(0.0, 0.0, 1.0))), 2.0);
        color += vec3(0.1, 0.3, 0.8) * fresnel * 0.5;
        
        // Add lines
        color += vec3(0.5, 0.7, 1.0) * lines;
        
        gl_FragColor = vec4(color, 0.7);
      }
    `,
  };
  
  return (
    <Sphere args={[2, 64, 64]} ref={meshRef}>
      <shaderMaterial 
        ref={materialRef}
        args={[globeMaterial]}
        transparent={true}
        side={THREE.FrontSide}
      />
    </Sphere>
  );
};

const Globe = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <GlobeMesh />
    </Canvas>
  );
};

export default Globe;
