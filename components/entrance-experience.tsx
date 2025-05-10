"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, Sky, Cloud, Text3D, PerspectiveCamera } from "@react-three/drei"
import { Vector3 } from "three"
import { useRouter } from "next/navigation"
import { easing } from "maath"

function CameraController({ isAnimating }) {
  const { camera } = useThree()
  const targetPosition = useRef(new Vector3(0, 0, 5))
  const initialPosition = useRef(new Vector3(0, 0, 5))
  const skyPosition = useRef(new Vector3(0, 100, 0))

  useFrame((state, delta) => {
    if (isAnimating) {
      // Move camera upward toward the sky
      targetPosition.current.lerp(skyPosition.current, 0.005)
      camera.position.lerp(targetPosition.current, 0.05)

      // Look slightly upward as we move
      const lookTarget = new Vector3(0, camera.position.y + 10, 0)
      camera.lookAt(lookTarget)
    }
  })

  return null
}

function FloatingText({ visible }) {
  const textRef = useRef()
  const textRef2 = useRef()

  useFrame((state, delta) => {
    if (textRef.current && visible) {
      // Make text float slightly
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2 + 2
      easing.dampE(textRef.current.rotation, [0, state.clock.elapsedTime * 0.05, 0], 0.1, delta)

      // Subtitle text
      if (textRef2.current) {
        textRef2.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2 + 0.5
      }
    }
  })

  if (!visible) return null

  return (
    <>
      <Text3D ref={textRef} font="/fonts/Geist_Bold.json" position={[0, 2, 0]} scale={[1, 1, 0.2]} size={1.5}>
        VERTURA
        <meshStandardMaterial color="white" />
      </Text3D>

      <Text3D ref={textRef2} font="/fonts/Geist_Regular.json" position={[0, 0.5, 0]} scale={[0.3, 0.3, 0.1]} size={1.5}>
        Wear the Culture RISE UP WITH A TWIST
        <meshStandardMaterial color="white" />
      </Text3D>
    </>
  )
}

function Clouds() {
  return (
    <>
      <Cloud position={[-4, -2, -10]} speed={0.2} opacity={0.5} />
      <Cloud position={[4, 0, -8]} speed={0.1} opacity={0.7} />
      <Cloud position={[0, 5, -12]} speed={0.3} opacity={0.6} />
      <Cloud position={[-6, 4, -15]} speed={0.2} opacity={0.4} />
      <Cloud position={[6, 6, -18]} speed={0.1} opacity={0.5} />
    </>
  )
}

export default function EntranceExperience() {
  const [animationPhase, setAnimationPhase] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Start animation sequence
    const timer1 = setTimeout(() => {
      setAnimationPhase(1) // Start moving up
    }, 1000)

    const timer2 = setTimeout(() => {
      setAnimationPhase(2) // Show text
    }, 5000)

    const timer3 = setTimeout(() => {
      // Navigate to main shop page after animation completes
      router.push("/shop")
    }, 10000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [router])

  return (
    <div className="w-full h-screen">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        <CameraController isAnimating={animationPhase >= 1} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />

        <Clouds />
        <FloatingText visible={animationPhase >= 2} />

        <Environment preset="sunset" />
      </Canvas>
    </div>
  )
}
