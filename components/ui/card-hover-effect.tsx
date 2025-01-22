"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string
    description: string
  }[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-4 ${className}`}>
      {items.map((item, idx) => (
        <div
          key={item.title}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-300 to-pink-300 dark:from-blue-800 dark:to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
            initial={false}
            animate={hoveredIndex === idx ? { opacity: 1 } : { opacity: 0 }}
          />
          <div className="relative z-10 p-4 bg-white/30 dark:bg-black/30 backdrop-blur-lg rounded-lg h-full">
            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
            <p className="text-sm">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

