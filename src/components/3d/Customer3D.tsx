import { useRef, useEffect } from "react";
import { Vector3, Group } from "three";
import { useFrame } from "@react-three/fiber";
import { Customer } from "../../types/game";

interface Customer3DProps {
  customer: Customer;
  position: [number, number, number];
}

export function Customer3D({ customer, position }: Customer3DProps) {
  const meshRef = useRef<Group | null>(null);
  const targetPos = useRef(new Vector3(...position));

  useEffect(() => {
    if (meshRef.current) {
      // Start position outside the shop
      meshRef.current.position.set(position[0], position[1], position[2] + 20);
    }
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current && !customer.satisfied) {
      // Move towards target position
      meshRef.current.position.lerp(targetPos.current, delta * 2);

      // Simple idle animation
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    } else if (meshRef.current && customer.satisfied) {
      // Leave the shop
      meshRef.current.position.z += delta * 5;
    }
  });

  return (
    <mesh>
      <group ref={meshRef}>
        {/* Customer body */}
        <mesh castShadow>
          <capsuleGeometry args={[0.3, 1, 4, 8]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>

        {/* Customer head */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#ecf0f1" />
        </mesh>
      </group>
    </mesh>
  );
}
