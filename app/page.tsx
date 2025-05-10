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
          <img
            src="/public/vertura.svg"
            alt="Vertura Logo"
            className="w-48 md:w-72 mb-8"
          />
          
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
