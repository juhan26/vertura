"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import PremiumIntro from "@/components/premium-intro"

const images = [
  "https://64.media.tumblr.com/db8472cfbb89a155148003b053d5f3de/4d6d987e0cee7307-8e/s400x225/158142e8e876044a6191733a02f6ee5ac1643b58.gif",
  "https://i.pinimg.com/originals/14/f4/35/14f435eaaf8d107cca5055ce150eaf47.gif",
]

export default function Home() {
  const [started, setStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) 

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="relative w-full h-screen overflow-hidden">
      <img
        src={images[currentIndex]}
        alt="Background animation"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {!started ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white bg-black/50">
          <img
            src="/vertura.png"
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
        <div className="relative z-10">
          <PremiumIntro />
        </div>
      )}
    </main>
  )
}
