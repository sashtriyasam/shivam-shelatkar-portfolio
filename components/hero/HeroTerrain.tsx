"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  Float,
  Environment,
} from "@react-three/drei";
import gsap from "gsap";

function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    const mesh = meshRef.current;
    const ctx = gsap.context(() => {
      gsap.to(mesh.rotation, {
        y: Math.PI * 2,
        duration: 24,
        repeat: -1,
        ease: "none",
      });
    });
    return () => ctx.revert();
  }, []);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -0.4, 0]}>
      <planeGeometry args={[12, 12, 64, 64]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#0b0e10"
        roughness={0.85}
        metalness={0.15}
        emissive="#c7f35a"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

function FloatingShapes() {
  const shapes = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!shapes.current) return;
    const group = shapes.current;
    const ctx = gsap.context(() => {
      gsap.to(group.rotation, {
        y: Math.PI * 2,
        duration: 30,
        repeat: -1,
        ease: "none",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <group ref={shapes}>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh position={[-2.5, 1.2, -1]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#c7f35a" emissive="#c7f35a" emissiveIntensity={0.3} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh position={[2.2, 0.8, -2]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial color="#66e3ff" emissive="#66e3ff" emissiveIntensity={0.3} />
        </mesh>
      </Float>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0.5, 1.8, -3]}>
          <torusGeometry args={[0.2, 0.05, 16, 64]} />
          <meshStandardMaterial color="#ff7a4d" emissive="#ff7a4d" emissiveIntensity={0.3} />
        </mesh>
      </Float>
    </group>
  );
}

export function HeroTerrain() {
  return (
    <div className="hero__canvas">
      <Canvas
        camera={{ position: [0, 2.5, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#0b0e10"]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} color="#c7f35a" />
        <pointLight position={[-5, 3, -5]} intensity={0.8} color="#66e3ff" />
        <Terrain />
        <FloatingShapes />
        <Stars radius={80} depth={50} count={800} factor={2} saturation={0} fade speed={0.5} />
        <Environment preset="night" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
