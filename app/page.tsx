"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import PremiumIntro from "@/components/premium-intro"

export default function Home() {
  const [started, setStarted] = useState(false)

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#0a0f1c]">
      {!started ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">VERTURA</h1>
          <Button
            onClick={() => setStarted(true)}
            className="bg-white text-black hover:bg-gray-400 border-0 px-8 py-6 text-lg rounded-none"
          >
            ENTER
          </Button>
        </div>
      ) : (
        <PremiumIntro />
      )}
    </main>
  )
}
