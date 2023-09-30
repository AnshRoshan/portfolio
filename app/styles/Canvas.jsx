"use client"
import React, { useEffect, useRef } from "react"

const ColorfulCanvas = () => {
  const canvasRef = useRef(null)
  const tRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const col = (x, y, r, g, b) => {
      ctx.fillStyle = `rgb(${r},${g},${b})`
      ctx.fillRect(x, y, 1, 1)
    }

    const R = (x, y, t) => Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t))
    const G = (x, y, t) =>
      Math.floor(192 + 64 * Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300))
    const B = (x, y, t) =>
      Math.floor(
        192 +
          64 *
            Math.sin(
              5 * Math.sin(t / 9) + ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
            )
      )

    const run = () => {
      for (let x = 0; x <= 35; x++) {
        for (let y = 0; y <= 35; y++) {
          col(x, y, R(x, y, tRef.current), G(x, y, tRef.current), B(x, y, tRef.current))
        }
      }
      tRef.current += 0.01
      requestAnimationFrame(run)
    }

    run()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width='8' // Adjust canvas dimensions as needed
      height='8'
      className='canvas '
    />
  )
}

export default ColorfulCanvas
