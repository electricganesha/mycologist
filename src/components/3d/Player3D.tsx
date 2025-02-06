import { useRef } from "react";
import { Group, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { Player } from "../../types/game";

interface Player3DProps {
  player: Player;
  targetPosition?: Vector3;
  onMoveComplete?: () => void;
}

export function Player3D({
  player,
  targetPosition,
  onMoveComplete,
}: Player3DProps) {
  const groupRef = useRef<Group>(null);
  const currentVelocity = useRef(new Vector3());
  const isMoving = useRef(false);
  console.log(" player > ", player);

  useFrame((_, delta) => {
    if (!groupRef.current || !targetPosition) return;

    const currentPosition = groupRef.current.position;
    const distance = currentPosition.distanceTo(targetPosition);

    if (distance > 0.1) {
      isMoving.current = true;

      // Calculate direction to target
      const direction = targetPosition.clone().sub(currentPosition).normalize();

      // Smooth movement using lerp
      const speed = 5;
      currentVelocity.current.lerp(direction.multiplyScalar(speed), 0.1);
      currentPosition.add(
        currentVelocity.current.clone().multiplyScalar(delta)
      );

      // Rotate player to face movement direction
      if (currentVelocity.current.length() > 0.1) {
        const angle = Math.atan2(
          currentVelocity.current.x,
          currentVelocity.current.z
        );
        groupRef.current.rotation.y = angle;
      }
    } else if (isMoving.current) {
      isMoving.current = false;
      currentVelocity.current.set(0, 0, 0);
      if (onMoveComplete) onMoveComplete();
    }
  });

  return (
    <group ref={groupRef} position={[-2, 0, 0]}>
      {/* Player body */}
      <mesh castShadow>
        <capsuleGeometry args={[0.3, 1, 4, 8]} />
        <meshStandardMaterial color="#3498db" />
      </mesh>

      {/* Player head */}
      <mesh castShadow position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#3498db" />
      </mesh>

      {/* Player apron */}
      <mesh position={[0, -0.2, 0.15]} castShadow>
        <boxGeometry args={[0.6, 0.8, 0.1]} />
        <meshStandardMaterial color="#95a5a6" />
      </mesh>
    </group>
  );
}
