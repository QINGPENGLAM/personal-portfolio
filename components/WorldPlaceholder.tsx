'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

const landmarks = [
  { className: 'landmark-projects', href: '/projects', label: 'Projects', detail: 'Systems I have built' },
  { className: 'landmark-experience', href: '/experience', label: 'Experience', detail: 'Professional journey' },
  { className: 'landmark-about', href: '/about', label: 'About', detail: 'Who I am' },
  { className: 'landmark-contact', href: '/contact', label: 'Contact', detail: 'Let’s connect' },
] as const

function drawWorld(canvas: HTMLCanvasElement, time: number, reduceMotion: boolean) {
  const context = canvas.getContext('2d')
  if (!context) return

  const { width, height } = canvas.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const pixelWidth = Math.max(1, Math.floor(width * dpr))
  const pixelHeight = Math.max(1, Math.floor(height * dpr))

  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth
    canvas.height = pixelHeight
  }

  context.setTransform(dpr, 0, 0, dpr, 0, 0)
  context.clearRect(0, 0, width, height)

  const sky = context.createLinearGradient(0, 0, 0, height)
  sky.addColorStop(0, '#071225')
  sky.addColorStop(0.55, '#143d72')
  sky.addColorStop(1, '#6b70a1')
  context.fillStyle = sky
  context.fillRect(0, 0, width, height)

  for (let index = 0; index < 56; index += 1) {
    const x = ((index * 83) % 997) / 997 * width
    const y = ((index * 47) % 431) / 431 * height * 0.62
    const pulse = reduceMotion ? 0.72 : 0.58 + Math.sin(time * 0.001 + index) * 0.2
    context.fillStyle = `rgba(190, 225, 255, ${pulse})`
    context.beginPath()
    context.arc(x, y, index % 8 === 0 ? 1.45 : 0.8, 0, Math.PI * 2)
    context.fill()
  }

  const mist = context.createRadialGradient(width * 0.52, height * 0.48, 12, width * 0.52, height * 0.48, width * 0.42)
  mist.addColorStop(0, 'rgba(61, 216, 255, .26)')
  mist.addColorStop(0.48, 'rgba(111, 103, 255, .12)')
  mist.addColorStop(1, 'rgba(3, 8, 18, 0)')
  context.fillStyle = mist
  context.fillRect(0, 0, width, height)

  const ground = context.createLinearGradient(0, height * 0.58, 0, height)
  ground.addColorStop(0, 'rgba(12, 48, 65, .12)')
  ground.addColorStop(1, '#07120f')
  context.fillStyle = ground
  context.beginPath()
  context.moveTo(0, height * 0.76)
  context.quadraticCurveTo(width * 0.25, height * 0.59, width * 0.48, height * 0.72)
  context.quadraticCurveTo(width * 0.75, height * 0.56, width, height * 0.69)
  context.lineTo(width, height)
  context.lineTo(0, height)
  context.closePath()
  context.fill()

  const coreX = width * 0.53
  const coreY = height * 0.43
  const glow = context.createRadialGradient(coreX, coreY, 1, coreX, coreY, Math.min(width, height) * 0.22)
  glow.addColorStop(0, 'rgba(139, 245, 255, .92)')
  glow.addColorStop(0.18, 'rgba(113, 125, 255, .48)')
  glow.addColorStop(1, 'rgba(123, 76, 255, 0)')
  context.fillStyle = glow
  context.fillRect(0, 0, width, height)

  context.strokeStyle = 'rgba(132, 225, 255, .72)'
  context.lineWidth = 2
  context.beginPath()
  context.moveTo(coreX, height * 0.72)
  context.lineTo(coreX, coreY - height * 0.15)
  context.stroke()

  const orbit = reduceMotion ? 0 : time * 0.00025
  context.save()
  context.translate(coreX, coreY)
  context.rotate(orbit)
  context.strokeStyle = 'rgba(177, 142, 255, .9)'
  context.lineWidth = 1.5
  context.beginPath()
  context.ellipse(0, 0, Math.min(width, height) * 0.08, Math.min(width, height) * 0.027, 0, 0, Math.PI * 2)
  context.stroke()
  context.restore()
}

export function WorldPlaceholder({ compact = false }: { compact?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frameId = 0

    const render = (time: number) => {
      drawWorld(canvas, time, reduceMotion)
      if (!reduceMotion) frameId = window.requestAnimationFrame(render)
    }

    render(0)
    const handleResize = () => drawWorld(canvas, 0, reduceMotion)
    window.addEventListener('resize', handleResize)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className={`world-placeholder${compact ? ' is-compact' : ''}`}>
      <canvas aria-hidden="true" ref={canvasRef} />
      <div aria-hidden="true" className="world-mountain">
        <span className="world-core" />
        <span className="world-waterfall" />
      </div>
      <div aria-hidden="true" className="world-path" />
      <div aria-hidden="true" className="world-explorer"><span /></div>

      {landmarks.map((landmark) => (
        <Link className={`world-landmark ${landmark.className}`} href={landmark.href} key={landmark.href}>
          <span className="landmark-icon" aria-hidden="true" />
          <span><strong>{landmark.label}</strong><small>{landmark.detail}</small></span>
        </Link>
      ))}

      <div className="world-status">
        <span aria-hidden="true" className="status-dot" />
        Portfolio world · landmarks online
      </div>
      <p className="sr-only">Lightweight portfolio-world preview with direct links to projects, experience, about, and contact. The complete accessible 3D experience is available from Enter My World.</p>
    </div>
  )
}
