import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

const useGameLoop = (callback: (delta: number) => void) => {
    const callbackRef = useRef(callback)

    // Update the callback reference on every render
    useEffect(() => {
        callbackRef.current = callback
    })

    // Use the frame hook to call our callback on every frame
    useFrame((_state, delta) => {
        callbackRef.current(delta)
    })
}

export default useGameLoop
