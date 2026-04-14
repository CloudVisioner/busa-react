'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const STAR_COUNT = 220
const MAX_DEPTH = 70

interface StarNode {
  position: THREE.Vector3
  seed: number
}

function createStarTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  const center = 64
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, 58)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.3, 'rgba(255,255,255,0.9)')
  gradient.addColorStop(0.65, 'rgba(255,255,255,0.2)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 128, 128)

  ctx.strokeStyle = 'rgba(255,255,255,0.7)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(center, 18)
  ctx.lineTo(center, 110)
  ctx.moveTo(18, center)
  ctx.lineTo(110, center)
  ctx.moveTo(30, 30)
  ctx.lineTo(98, 98)
  ctx.moveTo(98, 30)
  ctx.lineTo(30, 98)
  ctx.stroke()

  return new THREE.CanvasTexture(canvas)
}

function StarField() {
  const groupRef = useRef<THREE.Group>(null)
  const spritesRef = useRef<THREE.Sprite[]>([])
  const { pointer } = useThree()
  const starTexture = useMemo(() => createStarTexture(), [])
  const stars = useMemo<StarNode[]>(
    () =>
      Array.from({ length: STAR_COUNT }, () => ({
        position: new THREE.Vector3((Math.random() - 0.5) * 22, (Math.random() - 0.5) * 12, -Math.random() * MAX_DEPTH),
        seed: Math.random() * Math.PI * 2,
      })),
    []
  )

  useFrame((state) => {
    if (!groupRef.current) return

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, pointer.y * -0.1, 0.045)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.12, 0.045)

    const t = state.clock.getElapsedTime()
    spritesRef.current.forEach((sprite, index) => {
      const node = stars[index]
      if (!node) return

      sprite.position.z += 0.095
      if (sprite.position.z > 4) {
        sprite.position.z = -MAX_DEPTH
        sprite.position.x = (Math.random() - 0.5) * 22
        sprite.position.y = (Math.random() - 0.5) * 12
      }

      const twinkle = 0.5 + 0.5 * Math.sin(t * 1.8 + node.seed)
      const scale = THREE.MathUtils.lerp(0.09, 0.3, twinkle)
      sprite.scale.set(scale, scale, 1)
      ;(sprite.material as THREE.SpriteMaterial).opacity = THREE.MathUtils.lerp(0.25, 0.95, twinkle)
    })
  })

  return (
    <group ref={groupRef}>
      {stars.map((node, i) => (
        <sprite
          key={i}
          ref={(el) => {
            if (el) spritesRef.current[i] = el
          }}
          position={[node.position.x, node.position.y, node.position.z]}
        >
          <spriteMaterial map={starTexture ?? undefined} color="#ffffff" transparent opacity={0.8} depthWrite={false} />
        </sprite>
      ))}
      {/* faint haze for depth */}
      <mesh position={[0, 0, -20]}>
        <planeGeometry args={[40, 24]} />
        <meshBasicMaterial transparent opacity={0.08} color="#ffffff" />
      </mesh>
      {Array.from({ length: 18 }).map((_, i) => {
        const x = (i % 6) * 4 - 10
        const y = Math.floor(i / 6) * 3 - 4
        return (
          <mesh key={`flare-${i}`} position={[x, y, -35 - i * 0.8]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
          </mesh>
        )
      })}
    </group>
  )
}

interface PartnerNetworkBackgroundProps {
  className?: string
}

export function PartnerNetworkBackground({ className }: PartnerNetworkBackgroundProps) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 5], fov: 70 }} gl={{ antialias: true, alpha: false }} onCreated={({ gl }) => gl.setClearColor('#eceef1')}>
        <fog attach="fog" args={['#eceef1', 6, 80]} />
        <StarField />
      </Canvas>
    </div>
  )
}

export default PartnerNetworkBackground
