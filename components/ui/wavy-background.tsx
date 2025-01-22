"use client"
import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export const WavyBackground = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, theme === "dark" ? "#4a00e0" : "#8e2de2")
      gradient.addColorStop(1, theme === "dark" ? "#8e2de2" : "#4a00e0")
      ctx.fillStyle = gradient

      const wavelength = 0.01
      const amplitude = 20

      for (let x = 0; x < canvas.width; x += 5) {
        const y = Math.sin(x * wavelength + time) * amplitude + canvas.height / 2
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      }

      time += 0.05
      animationFrameId = requestAnimationFrame(animate)
    }

    resize()
    animate()

    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

