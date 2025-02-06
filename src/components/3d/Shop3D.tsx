import { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

export function Shop3D() {
  const shopRef = useRef<Mesh>();

  return (
    <group>
      {/* Shop Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Shop Walls */}
      <mesh position={[-10, 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 4, 20]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      <mesh position={[10, 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 4, 20]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      <mesh position={[0, 2, -10]} castShadow receiveShadow>
        <boxGeometry args={[20, 4, 0.5]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>

      {/* Counter */}
      <mesh position={[0, 1, -5]} castShadow receiveShadow>
        <boxGeometry args={[8, 2, 1]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>

      {/* Shelves */}
      {[-3, 0, 3].map((x) => (
        <mesh key={x} position={[x, 2, -9]} castShadow receiveShadow>
          <boxGeometry args={[2, 0.2, 1]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
      ))}
    </group>
  );
}
