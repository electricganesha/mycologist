import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'

import useGameLoop from './hooks/useGameLoop'
import { useRef } from 'react'
import { Mesh } from 'three'

export const Box = () => {
    const meshRef = useRef<Mesh>(null!)

    useGameLoop((delta: number) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta
            meshRef.current.rotation.y += delta
        }
    })

    return (
        <mesh ref={meshRef} position={[0, 0, 3]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="yellow" />
        </mesh>
    )
}

function App() {
    return (
        <div id="canvas-container">
            <Canvas>
                <ambientLight intensity={0.1} />
                <directionalLight position={[2, 2, 2]} intensity={1.5} />
                <Box />
            </Canvas>
        </div>
    )
}

createRoot(document.getElementById('root')!).render(<App />)
export default App
