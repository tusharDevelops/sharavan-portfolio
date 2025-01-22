"use client"
import React, { useRef, useEffect, useState, useCallback } from "react"
import { useTheme } from "next-themes"

interface SparklesProps {
  id?: string
  className?: string
  background?: string
  minSize?: number
  maxSize?: number
  particleDensity?: number
  particleColor?: string
  particleSpeed?: number
  particleBlendingMode?: GlobalCompositeOperation
}

export const SparklesCore = (props: SparklesProps) => {
  const {
    id,
    className,
    background,
    minSize = 0.4,
    maxSize = 1,
    particleDensity = 100,
    particleColor = "#FFD700",
    particleSpeed = 0.5,
    particleBlendingMode = "lighter",
  } = props

  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const particlesRef = useRef<
    Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
    }>
  >([])

  const colors = ["#FFD700", "#4CAF50", "#2196F3", "#9C27B0", "#FF5722"]

  const initParticles = useCallback(() => {
    particlesRef.current = Array.from({ length: particleDensity }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: Math.random() * (maxSize - minSize) + minSize,
      speedX: (Math.random() - 0.5) * particleSpeed,
      speedY: (Math.random() - 0.5) * particleSpeed,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
  }, [dimensions.width, dimensions.height, particleDensity, minSize, maxSize, particleSpeed])

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const { width, height } = canvasRef.current.parentElement.getBoundingClientRect()
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
    initParticles()
  }, [dimensions, initParticles])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)
      ctx.globalCompositeOperation = particleBlendingMode

      particlesRef.current = particlesRef.current.map((particle) => {
        let newX = particle.x + particle.speedX
        let newY = particle.y + particle.speedY

        if (newX > dimensions.width) newX = 0
        else if (newX < 0) newX = dimensions.width

        if (newY > dimensions.height) newY = 0
        else if (newY < 0) newY = dimensions.height

        return { ...particle, x: newX, y: newY }
      })

      particlesRef.current.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = theme === "dark" ? particle.color : `${particle.color}40`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [dimensions.width, dimensions.height, particleBlendingMode, theme])

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        background: background || "transparent",
      }}
    />
  )
}

