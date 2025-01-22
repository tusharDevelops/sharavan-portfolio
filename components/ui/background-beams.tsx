"use client"
import React, { useEffect, useRef, useState, useCallback } from "react"
import { useTheme } from "next-themes"

export const BackgroundBeams = () => {
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const beamsRef = useRef<
    Array<{
      x: number
      y: number
      radius: number
      speedX: number
      speedY: number
      color: string
    }>
  >([])

  const colors = ["#FFD700", "#4CAF50", "#2196F3", "#9C27B0", "#FF5722"]

  const initBeams = useCallback(() => {
    beamsRef.current = Array.from({ length: 20 }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      radius: Math.random() * 2 + 1,
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * 2 - 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
  }, [dimensions.width, dimensions.height])

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect()
        setDimensions({ width, height })
        canvasRef.current.width = width
        canvasRef.current.height = height
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    initBeams()
  }, [dimensions, initBeams])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      beamsRef.current = beamsRef.current.map((beam) => {
        const newX = beam.x + beam.speedX
        const newY = beam.y + beam.speedY

        if (newX < 0 || newX > dimensions.width) beam.speedX *= -1
        if (newY < 0 || newY > dimensions.height) beam.speedY *= -1

        return {
          ...beam,
          x: newX,
          y: newY,
        }
      })

      beamsRef.current.forEach((beam) => {
        ctx.beginPath()
        ctx.arc(beam.x, beam.y, beam.radius, 0, Math.PI * 2)
        ctx.fillStyle = theme === "dark" ? beam.color : `${beam.color}40`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [dimensions.width, dimensions.height, theme])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
}

