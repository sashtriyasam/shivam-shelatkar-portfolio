"use client";

import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";

function TopoTerrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(18, 18, 70, 70);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dist = Math.sqrt(x * x + y * y);
      const elevation =
        Math.sin(x * 0.45) * Math.cos(y * 0.45) * 1.1 +
        Math.sin(x * 1.2 + y * 0.8) * 0.4 -
        Math.pow(dist / 14, 2) * 1.5;
      pos.setZ(i, elevation);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.z = t * 0.035;
    }
    if (wireRef.current) {
      wireRef.current.rotation.z = t * 0.035;
    }
  });

  return (
    <group position={[0, -1.2, -2]} rotation={[-Math.PI / 2.5, 0, 0]}>
      {/* Base shaded surface */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#0a0c10"
          roughness={0.7}
          metalness={0.4}
          wireframe={false}
        />
      </mesh>

      {/* Glowing neon contour wireframe */}
      <mesh ref={wireRef} geometry={geometry} position={[0, 0, 0.03]}>
        <meshBasicMaterial
          wireframe
          color="#ff3b30"
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

function FloatingConstellation() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      group.current.rotation.y = t * 0.02;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh position={[-3.5, 1.8, -2]}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="#00f59b" emissive="#00f59b" emissiveIntensity={0.6} wireframe />
        </mesh>
      </Float>

      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={1.0}>
        <mesh position={[3.8, 1.2, -3]}>
          <icosahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.6} wireframe />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.7}>
        <mesh position={[1.2, 2.8, -4]}>
          <dodecahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial color="#ff3b30" emissive="#ff3b30" emissiveIntensity={0.6} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

function InteractiveParallax() {
  useFrame(({ camera, pointer }) => {
    camera.position.x += (pointer.x * 0.8 - camera.position.x) * 0.035;
    camera.position.y += (2.2 + pointer.y * 0.5 - camera.position.y) * 0.035;
    camera.lookAt(0, -0.4, -2);
  });
  return null;
}

export function HeroTerrain() {
  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <Canvas
        camera={{ position: [0, 2.2, 6], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 8, 3]} intensity={1.8} color="#00d4ff" />
        <pointLight position={[-4, 3, 2]} intensity={2.0} color="#ff3b30" />
        <pointLight position={[0, -1, 3]} intensity={1.2} color="#00f59b" />

        <TopoTerrain />
        <FloatingConstellation />
        <Stars radius={60} depth={40} count={900} factor={3} saturation={0.5} fade speed={0.8} />
        <InteractiveParallax />
      </Canvas>
    </div>
  );
}
