import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Product } from '@/types/product';

interface GiftBasket3DProps {
  items: Product[];
}

const BasketMesh = ({ items }: { items: Product[] }) => {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = 0.2;
    }
  }, []);

  return (
    <group ref={groupRef}>
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[2, 1.5, 2, 32]} />
        <meshPhongMaterial color="#700100" />
      </mesh>
      
      {items.map((item, index) => (
        <mesh
          key={index}
          position={[
            Math.cos(index * (Math.PI * 2) / Math.max(items.length, 1)) * 0.8,
            0,
            Math.sin(index * (Math.PI * 2) / Math.max(items.length, 1)) * 0.8,
          ]}
        >
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshPhongMaterial color="#F1F0FB" />
        </mesh>
      ))}
    </group>
  );
};

const GiftBasket3D = ({ items }: GiftBasket3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="h-[400px] rounded-xl bg-white shadow-lg transition-all duration-300"
    >
      <Canvas
        camera={{ position: [0, 2, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <BasketMesh items={items} />
        <OrbitControls 
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default GiftBasket3D;