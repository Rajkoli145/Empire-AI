import { useEffect, useRef, useCallback } from "react"

interface GreenWaveBackgroundProps {
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string
  backgroundColor?: string
  waveOpacity?: number
  animationSpeed?: number
}

const GreenWaveBackground = ({
  primaryColor = "34, 197, 94",
  secondaryColor = "22, 163, 74", 
  accentColor = "16, 185, 129",
  backgroundColor = "rgb(250, 250, 249)",
  waveOpacity = 0.8,
  animationSpeed = 0.003,
}: GreenWaveBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestIdRef = useRef<number | null>(null)
  const timeRef = useRef<number>(0)

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    timeRef.current += animationSpeed

    const width = canvas.width
    const height = canvas.height

    // Clear with background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)

    // Primary flowing waves
    const numPrimaryWaves = 8
    for (let i = 0; i < numPrimaryWaves; i++) {
      const yOffset = (i / numPrimaryWaves) * height * 0.3 + height * 0.3
      const amplitude = 60 + 40 * Math.sin(timeRef.current * 0.5 + i * 0.3)
      const frequency = 0.004 + 0.002 * Math.sin(timeRef.current * 0.2 + i * 0.1)
      const speed = timeRef.current * (1.2 + 0.3 * Math.sin(i * 0.2))
      const thickness = 2 + 1.5 * Math.sin(timeRef.current * 0.4 + i * 0.4)
      const opacity = (0.15 + 0.1 * Math.sin(timeRef.current * 0.3 + i * 0.2)) * waveOpacity

      ctx.beginPath()
      ctx.lineWidth = thickness
      ctx.strokeStyle = `rgba(${primaryColor}, ${opacity})` 
      ctx.shadowColor = `rgba(${primaryColor}, 0.3)` 
      ctx.shadowBlur = 8

      for (let x = -50; x < width + 50; x += 3) {
        const y = yOffset + amplitude * Math.sin(x * frequency + speed)
        if (x === -50) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    // Secondary wave layer
    const numSecondaryWaves = 6
    for (let i = 0; i < numSecondaryWaves; i++) {
      const yOffset = (i / numSecondaryWaves) * height * 0.4 + height * 0.4
      const amplitude = 80 + 30 * Math.cos(timeRef.current * 0.4 + i * 0.25)
      const frequency = 0.003 + 0.001 * Math.cos(timeRef.current * 0.15 + i * 0.12)
      const speed = timeRef.current * (0.8 + 0.4 * Math.cos(i * 0.15))
      const thickness = 1.5 + 1 * Math.cos(timeRef.current * 0.35 + i * 0.3)
      const opacity = (0.12 + 0.08 * Math.cos(timeRef.current * 0.25 + i * 0.18)) * waveOpacity

      ctx.beginPath()
      ctx.lineWidth = thickness
      ctx.strokeStyle = `rgba(${secondaryColor}, ${opacity})` 
      ctx.shadowColor = `rgba(${secondaryColor}, 0.2)` 
      ctx.shadowBlur = 6

      for (let x = -50; x < width + 50; x += 4) {
        const y = yOffset + amplitude * Math.sin(x * frequency + speed) * Math.cos(x * frequency * 0.5 + speed * 0.7)
        if (x === -50) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    // Accent wave layer
    const numAccentWaves = 4
    for (let i = 0; i < numAccentWaves; i++) {
      const yOffset = (i / numAccentWaves) * height * 0.5 + height * 0.25
      const amplitude = 100 + 50 * Math.sin(timeRef.current * 0.3 + i * 0.4)
      const frequency = 0.002 + 0.001 * Math.sin(timeRef.current * 0.1 + i * 0.08)
      const speed = timeRef.current * (0.6 + 0.2 * Math.sin(i * 0.18))
      const thickness = 1 + 0.8 * Math.sin(timeRef.current * 0.3 + i * 0.25)
      const opacity = (0.08 + 0.06 * Math.sin(timeRef.current * 0.2 + i * 0.15)) * waveOpacity

      ctx.beginPath()
      ctx.lineWidth = thickness
      ctx.strokeStyle = `rgba(${accentColor}, ${opacity})` 
      ctx.shadowColor = `rgba(${accentColor}, 0.15)` 
      ctx.shadowBlur = 4

      for (let x = -50; x < width + 50; x += 5) {
        const y = yOffset + 
          amplitude * Math.sin(x * frequency + speed) + 
          amplitude * 0.3 * Math.sin(x * frequency * 2 + speed * 1.3)
        if (x === -50) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    // Subtle background waves
    const numBackgroundWaves = 12
    for (let i = 0; i < numBackgroundWaves; i++) {
      const yOffset = (i / numBackgroundWaves) * height
      const amplitude = 30 + 20 * Math.sin(timeRef.current * 0.6 + i * 0.5)
      const frequency = 0.005 + 0.003 * Math.sin(timeRef.current * 0.25 + i * 0.15)
      const speed = timeRef.current * (1.5 + 0.5 * Math.sin(i * 0.25))
      const thickness = 0.8 + 0.4 * Math.sin(timeRef.current * 0.5 + i * 0.35)
      const opacity = (0.05 + 0.03 * Math.sin(timeRef.current * 0.4 + i * 0.25)) * waveOpacity

      ctx.beginPath()
      ctx.lineWidth = thickness
      ctx.strokeStyle = `rgba(${primaryColor}, ${opacity})`

      for (let x = -50; x < width + 50; x += 6) {
        const y = yOffset + amplitude * Math.sin(x * frequency + speed)
        if (x === -50) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
    }

    requestIdRef.current = requestAnimationFrame(animate)
  }, [backgroundColor, primaryColor, secondaryColor, accentColor, waveOpacity, animationSpeed])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    resizeCanvas()

    const handleResize = () => resizeCanvas()
    window.addEventListener("resize", handleResize)

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)

      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current)
        requestIdRef.current = null
      }

      timeRef.current = 0
    }
  }, [animate, resizeCanvas])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}

export default GreenWaveBackground
