import { ThreeEvent } from "@react-three/fiber";
import { Vector3 } from "three";

interface GroundProps {
  onMove?: (position: Vector3) => void;
}

export function Ground({ onMove }: GroundProps) {
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (onMove) {
      // Get the point of intersection
      const position = new Vector3();
      position.copy(event.point);
      position.y = 0; // Keep the y position at ground level
      onMove(position);
    }
  };

  return (
    <mesh 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -0.1, 0]} 
      receiveShadow
      onClick={handleClick}
    >
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#3a5a40" />
    </mesh>
  );
}
