import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Product } from '@/types/product';

interface GiftBasket3DProps {
  items: Product[];
}

const Basket = ({ items }: { items: Product[] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <cylinderGeometry args={[2, 1.5, 2, 32]} />
      <meshPhongMaterial color="#700100" />
      {items.map((item, index) => (
        <mesh
          key={index}
          position={[
            Math.cos(index * (Math.PI * 2) / items.length),
            0.5,
            Math.sin(index * (Math.PI * 2) / items.length),
          ]}
        >
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshPhongMaterial color="#F1F0FB" />
        </mesh>
      ))}
    </mesh>
  );
};

const GiftBasket3D = ({ items }: GiftBasket3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (containerRef.current) {
      containerRef.current.style.border = '2px dashed #700100';
    }
  };

  const handleDragLeave = () => {
    if (containerRef.current) {
      containerRef.current.style.border = '2px solid transparent';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleDragLeave();
    
    try {
      const item = JSON.parse(e.dataTransfer.getData('application/json'));
      // Handle the dropped item here
    } catch (error) {
      console.error('Error parsing dropped item:', error);
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-[400px] rounded-xl bg-white shadow-lg transition-all duration-300"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Canvas camera={{ position: [0, 2, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Basket items={items} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default GiftBasket3D;