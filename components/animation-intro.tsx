"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function AnimationIntro() {
  const [animationPhase, setAnimationPhase] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Animation sequence
    const phase1 = setTimeout(() => setAnimationPhase(1), 500) // Start clouds moving
    const phase2 = setTimeout(() => setAnimationPhase(2), 2000) // Start upward movement
    const phase3 = setTimeout(() => setAnimationPhase(3), 4000) // Show text
    const phase4 = setTimeout(() => router.push("/shop"), 8000) // Navigate to shop

    return () => {
      clearTimeout(phase1)
      clearTimeout(phase2)
      clearTimeout(phase3)
      clearTimeout(phase4)
    }
  }, [router])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-black via-blue-900 to-purple-900"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 3 + 1 + "px",
                height: Math.random() * 3 + 1 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                opacity: Math.random() * 0.8 + 0.2,
                animation: `twinkle ${Math.random() * 5 + 3}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Clouds */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/20 rounded-full blur-xl"
            style={{
              width: Math.random() * 300 + 200 + "px",
              height: Math.random() * 100 + 50 + "px",
              left: Math.random() * 100 + "%",
              bottom: i * 15 - 10 + "%",
            }}
            initial={{ x: 0, y: 0 }}
            animate={
              animationPhase >= 1
                ? {
                    x: i % 2 === 0 ? -100 : 100,
                    y: animationPhase >= 2 ? -1000 : 0,
                  }
                : {}
            }
            transition={{
              x: { duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
              y: { duration: 8, ease: "easeInOut" },
            }}
          />
        ))}
      </div>

      {/* Camera movement effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ y: 0 }}
        animate={animationPhase >= 2 ? { y: "-100%" } : {}}
        transition={{ duration: 6, ease: "easeInOut" }}
      >
        {/* Ground elements */}
        <div className="absolute bottom-0 w-full h-[30vh] bg-gradient-to-t from-gray-900 to-transparent" />
      </motion.div>

      {/* Text overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatedText visible={animationPhase >= 3} />
      </div>
    </div>
  )
}

function AnimatedText({ visible }: { visible: boolean }) {
  if (!visible) return null

  return (
    <motion.div
      className="text-center text-white z-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <motion.h1
        className="text-6xl md:text-8xl font-bold mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        VERTURA
      </motion.h1>
      <motion.div
        className="h-0.5 w-16 bg-white mx-auto mb-4"
        initial={{ width: 0 }}
        animate={{ width: 64 }}
        transition={{ delay: 1, duration: 0.8 }}
      />
      <motion.p
        className="text-xl md:text-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        Wear the Culture RISE UP WITH A TWIST
      </motion.p>
    </motion.div>
  )
}
