"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PremiumIntro() {
  const [step, setStep] = useState(0);
  const [currentBg, setCurrentBg] = useState(0);
  const router = useRouter();

  const gifBackgrounds = [
    "https://64.media.tumblr.com/db8472cfbb89a155148003b053d5f3de/4d6d987e0cee7307-8e/s400x225/158142e8e876044a6191733a02f6ee5ac1643b58.gif",
    "https://i.pinimg.com/originals/14/f4/35/14f435eaaf8d107cca5055ce150eaf47.gif",
  ];

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % gifBackgrounds.length);
    }, 3000);

    const timers = [
      setTimeout(() => setStep(1), 1000),
      setTimeout(() => setStep(2), 1500),
      setTimeout(() => setStep(3), 4800),
      setTimeout(() => router.push("/shop"), 8500),
    ];

    return () => {
      clearInterval(bgInterval);
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [router]);

  return (
    <div
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: `url(${gifBackgrounds[currentBg]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay gelap agar teks tetap terbaca */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-10 z-10">
        <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0eiIvPjwvZz48L2c+PC9zdmc+')]" />
      </div>

      {/* Animated content */}
      <div className="relative w-full max-w-2xl mx-auto px-4 z-20">
        <motion.div
          className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: step >= 1 ? 1 : 0,
            y: step >= 1 ? 0 : 100,
            height: step >= 2 ? "auto" : "12rem",
          }}
          transition={{
            duration: 1.2,
            ease: [0.23, 1, 0.32, 1],
            height: { delay: 0.5, duration: 0.8 },
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <div className="flex items-center">
              <motion.div
                className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: step >= 1 ? 1 : 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <Image
                  src="/logo.png"
                  alt="Vertura Icon"
                  width={20}
                  height={20}
                  className="" 
                />
              </motion.div>
              <motion.div
                className="ml-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: step >= 1 ? 1 : 0, x: step >= 1 ? 0 : -20 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <div className="text-white font-light text-xs">
                  PREMIUM CULTURE
                </div>
                <div className="text-white font-medium">VERTURA AIRLINES</div>
              </motion.div>
            </div>
            <motion.div
              className="text-right"
              initial={{ opacity: 0 }}
              animate={{ opacity: step >= 1 ? 1 : 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >
              <div className="text-white/70 text-xs">BOARDING PASS</div>
              <div className="text-white font-light">
                {new Date().toLocaleDateString()}
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex justify-between mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 20 }}
                transition={{ delay: 1.8, duration: 0.5 }}
                className="w-1/2"
              >
                <div className="text-white/70 text-xs">PASSENGER</div>
                <div className="text-white font-medium">VERTURER PASS</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 20 }}
                transition={{ delay: 2.0, duration: 0.5 }}
                className="w-1/2 text-right"
              >
                <div className="text-white/70 text-xs">DESTINATION</div>
                <div className="text-white font-medium">YOU</div>
              </motion.div>
            </div>

            <div className="flex justify-between">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 20 }}
                transition={{ delay: 2.2, duration: 0.5 }}
                className="w-1/3"
              >
                <div className="text-white/70 text-xs">FLIGHT</div>
                <div className="text-white font-medium">VT-2025</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 20 }}
                transition={{ delay: 2.4, duration: 0.5 }}
                className="w-1/3 text-center"
              >
                <div className="text-white/70 text-xs">GATE</div>
                <div className="text-white font-medium">PREMIUM</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 20 }}
                transition={{ delay: 2.6, duration: 0.5 }}
                className="w-1/3 text-right"
              >
                <div className="text-white/70 text-xs">SEAT</div>
                <div className="text-white font-medium">CREATIVE CLASS</div>
              </motion.div>
            </div>
          </div>

          {/* Barcode */}
          {step >= 2 && (
            <motion.div
              className="mt-4 p-6 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center">
                <div className="relative">
                  <div className="h-16 w-64 flex items-center">
                    {[...Array(30)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-full bg-white mx-0.5"
                        style={{ width: Math.random() * 3 + 1 }}
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        transition={{
                          delay: 2.8 + i * 0.02,
                          duration: 0.4,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </div>
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 300, opacity: [0, 1, 0] }}
                    transition={{
                      delay: 3.5,
                      duration: 1,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>
              <div className="text-center text-white/50 text-xs mt-2">
                SCAN TO BOARD
              </div>
            </motion.div>
          )}
        </motion.div>

        {step >= 3 && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0f1c]/0 via-[#0a0f1c]/90 to-[#0a0f1c] z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.img
              src="/vertura.png"
              alt="Vertura Logo"
              className="h-20 md:h-64"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />

            <motion.div
              className="h-0.5 w-16 bg-[#7EBDE6] mx-auto mb-4"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 1, duration: 0.8 }}
            />
            <motion.p
              className="text-xl md:text-2xl text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              Wear the Culture RISE UP WITH A TWIST
            </motion.p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
