import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Shop3D } from "./Shop3D";
import { Ground } from "./Ground";
import { Customer3D } from "./Customer3D";
import { Player3D } from "./Player3D";
import { GameState } from "../../types/game";
import { Vector3 } from "three";

interface ShopSceneProps {
  gameState: GameState;
  onInteract: (itemId: string | number) => void;
}

export function ShopScene({ gameState }: ShopSceneProps) {
  const [targetPosition, setTargetPosition] = useState<Vector3 | undefined>();

  const handleMove = (position: Vector3) => {
    setTargetPosition(position);
  };

  const handleMoveComplete = () => {
    setTargetPosition(undefined);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={75} />
        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minDistance={5}
          maxDistance={15}
        />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <Ground onMove={handleMove} />
        <Shop3D />
        <Player3D
          player={gameState.player}
          targetPosition={targetPosition}
          onMoveComplete={handleMoveComplete}
        />
        {gameState.customers.map((customer, index) => (
          <Customer3D
            key={index}
            customer={customer}
            position={[2 + index * 2, 0, 2]}
          />
        ))}
      </Canvas>
    </div>
  );
}
