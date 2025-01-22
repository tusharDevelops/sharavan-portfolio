"use client"
import type React from "react"
import { motion } from "framer-motion"

export const GlowingStarsBackgroundCard = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="relative w-full max-w-4xl">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 dark:from-blue-800 dark:to-purple-900 transform scale-[0.80] rounded-3xl blur-3xl" />
      <div className="relative shadow-xl bg-white/30 dark:bg-black/30 backdrop-blur-lg rounded-3xl p-8 overflow-hidden">
        <div className="absolute inset-0 bg-stars-pattern opacity-30" />
        <div className="relative z-10">{children}</div>
        <Stars />
      </div>
    </div>
  )
}

const Stars = () => {
  const stars = new Array(50).fill(null)
  return (
    <>
      {stars.map((_, i) => (
        <motion.span
          key={i}
          className="absolute inline-flex h-1 w-1 bg-white rounded-full opacity-0"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 10,
          }}
        />
      ))}
    </>
  )
}

