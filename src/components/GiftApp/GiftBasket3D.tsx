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
      {/* Base cylinder (basket) */}
      <mesh position={[0, -1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2, 1.5, 2, 32]} />
        <meshStandardMaterial 
          color="#700100"
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>
      
      {/* Items in the basket */}
      {items.map((item, index) => {
        const angle = (index / items.length) * Math.PI * 2;
        const radius = 0.8;
        return (
          <mesh
            key={item.id}
            position={[
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius
            ]}
            castShadow
          >
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial 
              color="#F1F0FB"
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const GiftBasket3D = ({ items }: GiftBasket3DProps) => {
  return (
    <div className="h-[400px] w-full rounded-xl bg-white shadow-lg overflow-hidden">
      <Canvas
        shadows
        camera={{
          position: [0, 2, 5],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
      >
        <color attach="background" args={['#ffffff']} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
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