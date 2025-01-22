"use client"

import { useEffect } from "react"
import { motion, stagger, useAnimate } from "framer-motion"

export const TextGenerateEffect = ({ words }: { words: string }) => {
  const [scope, animate] = useAnimate()
  const wordsArray = words.split(" ")
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      },
    )
  }, [scope.current])

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span key={word + idx} className="opacity-0 dark:text-white text-black">
              {word}{" "}
            </motion.span>
          )
        })}
      </motion.div>
    )
  }

  return <div className="text-base sm:text-xl md:text-3xl lg:text-5xl font-bold">{renderWords()}</div>
}

