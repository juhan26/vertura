"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function VideoIntro() {
  const [showText, setShowText] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isMounted = useRef(true)
  const router = useRouter()

  // Handle video loading
  const handleVideoLoaded = () => {
    setVideoLoaded(true)
    // Only attempt to play if the component is still mounted
    if (isMounted.current && videoRef.current) {
      // Play with error handling
      const playPromise = videoRef.current.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Video playback started successfully")
          })
          .catch((error) => {
            console.error("Error playing video:", error)
            // If we can't play the video, still show the text
            setShowText(true)
          })
      }
    }
  }

  useEffect(() => {
    // Set up cleanup function to track component mount status
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (!videoLoaded) return

    // Show text after video has been playing for 3 seconds
    const textTimer = setTimeout(() => {
      if (isMounted.current) {
        setShowText(true)
      }
    }, 3000)

    // Navigate to shop page after video completes
    const navigationTimer = setTimeout(() => {
      if (isMounted.current) {
        router.push("/shop")
      }
    }, 10000) // Adjust based on your video length

    return () => {
      clearTimeout(textTimer)
      clearTimeout(navigationTimer)
    }
  }, [router, videoLoaded])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute w-full h-full object-cover"
        playsInline
        muted
        preload="auto"
        onLoadedData={handleVideoLoaded}
        onError={(e) => {
          console.error("Video failed to load", e)
          setShowText(true)
        }}
      >
        <source src="/placeholder-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback image in case video fails */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <p className="text-white text-lg">Loading experience...</p>
        </div>
      )}

      {/* Overlay for text */}
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <AnimatePresence>
          {showText && (
            <motion.div
              className="text-center text-white"
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
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
