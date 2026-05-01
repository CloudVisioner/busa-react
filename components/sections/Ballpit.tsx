'use client'

import React, { useEffect, useRef } from 'react'
import {
  ACESFilmicToneMapping,
  AmbientLight,
  Color,
  InstancedMesh,
  MathUtils,
  Material,
  Mesh,
  MeshPhysicalMaterial,
  Object3D,
  PerspectiveCamera,
  Plane,
  PMREMGenerator,
  PointLight,
  Raycaster,
  Scene,
  ShaderChunk,
  SphereGeometry,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
  Timer,
  type WebGLRendererParameters,
} from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

interface ThreeConfig {
  canvas?: HTMLCanvasElement
  id?: string
  rendererOptions?: Partial<WebGLRendererParameters>
  size?: 'parent' | { width: number; height: number }
}

interface SizeData {
  width: number
  height: number
  wWidth: number
  wHeight: number
  ratio: number
  pixelRatio: number
}

interface PostprocessingController {
  setSize: (width: number, height: number) => void
  dispose?: () => void
}

type DisposableMaterial = Material & Record<string, unknown>
type MeshWithResources = Mesh & { material?: DisposableMaterial | DisposableMaterial[]; geometry?: { dispose?: () => void } }

class ThreeController {
  #config: ThreeConfig
  #postprocessing?: PostprocessingController
  #resizeObserver?: ResizeObserver
  #intersectionObserver?: IntersectionObserver
  #resizeTimer?: number
  #animationFrameId = 0
  #timer: Timer = new Timer()
  #animationState = { elapsed: 0, delta: 0 }
  #isAnimating = false
  #isVisible = false
  #boundResize = this.#onResize.bind(this)
  #boundResizeNow = this.resize.bind(this)
  #boundIntersection = this.#onIntersection.bind(this)
  #boundVisibilityChange = this.#onVisibilityChange.bind(this)

  canvas!: HTMLCanvasElement
  camera!: PerspectiveCamera
  cameraMinAspect?: number
  cameraMaxAspect?: number
  cameraFov!: number
  maxPixelRatio?: number
  minPixelRatio?: number
  scene!: Scene
  renderer!: WebGLRenderer
  size: SizeData = {
    width: 0,
    height: 0,
    wWidth: 0,
    wHeight: 0,
    ratio: 0,
    pixelRatio: 0,
  }

  render: () => void = this.#render.bind(this)
  onBeforeRender: (state: { elapsed: number; delta: number }) => void = () => {}
  onAfterRender: (state: { elapsed: number; delta: number }) => void = () => {}
  onAfterResize: (size: SizeData) => void = () => {}
  isDisposed = false

  constructor(config: ThreeConfig) {
    this.#config = { ...config }
    this.#initCamera()
    this.#initScene()
    this.#initRenderer()
    this.resize()
    this.#initObservers()
  }

  #initCamera() {
    this.camera = new PerspectiveCamera()
    this.cameraFov = this.camera.fov
  }

  #initScene() {
    this.scene = new Scene()
  }

  #initRenderer() {
    if (this.#config.canvas) {
      this.canvas = this.#config.canvas
    } else if (this.#config.id) {
      const elem = document.getElementById(this.#config.id)
      if (elem instanceof HTMLCanvasElement) this.canvas = elem
    }
    if (!this.canvas) {
      throw new Error('Three: Missing canvas or id parameter')
    }
    this.canvas.style.display = 'block'
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      powerPreference: 'high-performance',
      ...(this.#config.rendererOptions ?? {}),
    })
    this.renderer.outputColorSpace = SRGBColorSpace
  }

  #initObservers() {
    if (!(this.#config.size instanceof Object)) {
      window.addEventListener('resize', this.#boundResize)
      if (this.#config.size === 'parent' && this.canvas.parentNode) {
        this.#resizeObserver = new ResizeObserver(this.#boundResize)
        this.#resizeObserver.observe(this.canvas.parentNode as Element)
      }
    }
    this.#intersectionObserver = new IntersectionObserver(this.#boundIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    })
    this.#intersectionObserver.observe(this.canvas)
    document.addEventListener('visibilitychange', this.#boundVisibilityChange)
  }

  #onResize() {
    if (this.#resizeTimer) clearTimeout(this.#resizeTimer)
    this.#resizeTimer = window.setTimeout(this.#boundResizeNow, 100)
  }

  resize() {
    let w: number
    let h: number
    if (this.#config.size instanceof Object) {
      w = this.#config.size.width
      h = this.#config.size.height
    } else if (this.#config.size === 'parent' && this.canvas.parentNode) {
      w = (this.canvas.parentNode as HTMLElement).offsetWidth
      h = (this.canvas.parentNode as HTMLElement).offsetHeight
    } else {
      w = window.innerWidth
      h = window.innerHeight
    }
    this.size.width = w
    this.size.height = h
    this.size.ratio = w / h
    this.#updateCamera()
    this.#updateRenderer()
    this.onAfterResize(this.size)
  }

  #updateCamera() {
    this.camera.aspect = this.size.width / this.size.height
    if (this.camera.isPerspectiveCamera && this.cameraFov) {
      if (this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect) this.#adjustFov(this.cameraMinAspect)
      else if (this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect) this.#adjustFov(this.cameraMaxAspect)
      else this.camera.fov = this.cameraFov
    }
    this.camera.updateProjectionMatrix()
    this.updateWorldSize()
  }

  #adjustFov(aspect: number) {
    const tanFov = Math.tan(MathUtils.degToRad(this.cameraFov / 2))
    const newTan = tanFov / (this.camera.aspect / aspect)
    this.camera.fov = 2 * MathUtils.radToDeg(Math.atan(newTan))
  }

  updateWorldSize() {
    const fovRad = (this.camera.fov * Math.PI) / 180
    this.size.wHeight = 2 * Math.tan(fovRad / 2) * this.camera.position.length()
    this.size.wWidth = this.size.wHeight * this.camera.aspect
  }

  #updateRenderer() {
    this.renderer.setSize(this.size.width, this.size.height)
    this.#postprocessing?.setSize(this.size.width, this.size.height)
    let pr = window.devicePixelRatio
    if (this.maxPixelRatio && pr > this.maxPixelRatio) pr = this.maxPixelRatio
    else if (this.minPixelRatio && pr < this.minPixelRatio) pr = this.minPixelRatio
    this.renderer.setPixelRatio(pr)
    this.size.pixelRatio = pr
  }

  #onIntersection(entries: IntersectionObserverEntry[]) {
    this.#isAnimating = entries[0].isIntersecting
    if (this.#isAnimating) this.#startAnimation()
    else this.#stopAnimation()
  }

  #onVisibilityChange() {
    if (this.#isAnimating) {
      if (document.hidden) this.#stopAnimation()
      else this.#startAnimation()
    }
  }

  #startAnimation() {
    if (this.#isVisible) return
    const animateFrame = () => {
      this.#animationFrameId = requestAnimationFrame(animateFrame)
      this.#timer.update()
      this.#animationState.delta = this.#timer.getDelta()
      this.#animationState.elapsed = this.#timer.getElapsed()
      this.onBeforeRender(this.#animationState)
      this.render()
      this.onAfterRender(this.#animationState)
    }
    this.#isVisible = true
    this.#timer.reset()
    animateFrame()
  }

  #stopAnimation() {
    if (!this.#isVisible) return
    cancelAnimationFrame(this.#animationFrameId)
    this.#isVisible = false
  }

  #render() {
    this.renderer.render(this.scene, this.camera)
  }

  clear() {
    this.scene.traverse((obj) => {
      const mesh = obj as MeshWithResources
      if (mesh.isMesh && mesh.material && typeof mesh.material === 'object') {
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        materials.forEach((material) => {
          const materialRecord = material as unknown as Record<string, unknown>
          Object.values(materialRecord).forEach((matProp) => {
            if (matProp && typeof matProp === 'object' && 'dispose' in matProp && typeof matProp.dispose === 'function') {
              matProp.dispose()
            }
          })
          material.dispose?.()
        })
        mesh.geometry?.dispose?.()
      }
    })
    this.scene.clear()
  }

  dispose() {
    this.#onResizeCleanup()
    this.#stopAnimation()
    this.clear()
    this.#postprocessing?.dispose?.()
    this.renderer.dispose()
    this.isDisposed = true
  }

  #onResizeCleanup() {
    if (this.#resizeTimer) clearTimeout(this.#resizeTimer)
    window.removeEventListener('resize', this.#boundResize)
    this.#resizeObserver?.disconnect()
    this.#intersectionObserver?.disconnect()
    document.removeEventListener('visibilitychange', this.#boundVisibilityChange)
  }
}

interface PhysicsConfig {
  count: number
  maxX: number
  maxY: number
  maxZ: number
  maxSize: number
  minSize: number
  size0: number
  gravity: number
  friction: number
  wallBounce: number
  maxVelocity: number
  controlSphere0?: boolean
  followCursor?: boolean
}

class PhysicsEngine {
  config: PhysicsConfig
  positionData: Float32Array
  velocityData: Float32Array
  sizeData: Float32Array
  center: Vector3 = new Vector3()

  constructor(config: PhysicsConfig) {
    this.config = config
    this.positionData = new Float32Array(3 * config.count).fill(0)
    this.velocityData = new Float32Array(3 * config.count).fill(0)
    this.sizeData = new Float32Array(config.count).fill(1)
    this.#initializePositions()
    this.setSizes()
  }

  #initializePositions() {
    const { config, positionData } = this
    this.center.toArray(positionData, 0)
    for (let i = 1; i < config.count; i += 1) {
      const idx = 3 * i
      positionData[idx] = MathUtils.randFloatSpread(2 * config.maxX)
      positionData[idx + 1] = MathUtils.randFloatSpread(2 * config.maxY)
      positionData[idx + 2] = MathUtils.randFloatSpread(2 * config.maxZ)
    }
  }

  setSizes() {
    const { config, sizeData } = this
    sizeData[0] = config.size0
    for (let i = 1; i < config.count; i += 1) sizeData[i] = MathUtils.randFloat(config.minSize, config.maxSize)
  }

  update(deltaInfo: { delta: number }) {
    const { config, center, positionData, sizeData, velocityData } = this
    let startIdx = 0
    if (config.controlSphere0) {
      startIdx = 1
      new Vector3().fromArray(positionData, 0).lerp(center, 0.1).toArray(positionData, 0)
      new Vector3().toArray(velocityData, 0)
    }
    for (let idx = startIdx; idx < config.count; idx += 1) {
      const base = 3 * idx
      const pos = new Vector3().fromArray(positionData, base)
      const vel = new Vector3().fromArray(velocityData, base)
      vel.y -= deltaInfo.delta * config.gravity * sizeData[idx]
      vel.multiplyScalar(config.friction)
      vel.clampLength(0, config.maxVelocity)
      pos.add(vel)
      pos.toArray(positionData, base)
      vel.toArray(velocityData, base)
    }

    for (let idx = startIdx; idx < config.count; idx += 1) {
      const base = 3 * idx
      const pos = new Vector3().fromArray(positionData, base)
      const vel = new Vector3().fromArray(velocityData, base)
      const radius = sizeData[idx]

      for (let jdx = idx + 1; jdx < config.count; jdx += 1) {
        const otherBase = 3 * jdx
        const otherPos = new Vector3().fromArray(positionData, otherBase)
        const otherVel = new Vector3().fromArray(velocityData, otherBase)
        const diff = new Vector3().copy(otherPos).sub(pos)
        const dist = diff.length()
        const sumRadius = radius + sizeData[jdx]
        if (dist > 0 && dist < sumRadius) {
          const overlap = sumRadius - dist
          const correction = diff.normalize().multiplyScalar(0.5 * overlap)
          const velCorrection = correction.clone().multiplyScalar(Math.max(vel.length(), 1))
          pos.sub(correction)
          vel.sub(velCorrection)
          pos.toArray(positionData, base)
          vel.toArray(velocityData, base)

          otherPos.add(correction)
          otherVel.add(correction.clone().multiplyScalar(Math.max(otherVel.length(), 1)))
          otherPos.toArray(positionData, otherBase)
          otherVel.toArray(velocityData, otherBase)
        }
      }

      if (config.controlSphere0) {
        const diff = new Vector3().fromArray(positionData, 0).sub(pos)
        const dist = diff.length()
        const sumRadius0 = radius + sizeData[0]
        if (dist > 0 && dist < sumRadius0) {
          const correction = diff.normalize().multiplyScalar(sumRadius0 - dist)
          const velCorrection = correction.clone().multiplyScalar(Math.max(vel.length(), 2))
          pos.sub(correction)
          vel.sub(velCorrection)
        }
      }

      if (Math.abs(pos.x) + radius > config.maxX) {
        pos.x = Math.sign(pos.x) * (config.maxX - radius)
        vel.x = -vel.x * config.wallBounce
      }
      if (config.gravity === 0) {
        if (Math.abs(pos.y) + radius > config.maxY) {
          pos.y = Math.sign(pos.y) * (config.maxY - radius)
          vel.y = -vel.y * config.wallBounce
        }
      } else if (pos.y - radius < -config.maxY) {
        pos.y = -config.maxY + radius
        vel.y = -vel.y * config.wallBounce
      }

      const maxBoundary = Math.max(config.maxZ, config.maxSize)
      if (Math.abs(pos.z) + radius > maxBoundary) {
        pos.z = Math.sign(pos.z) * (config.maxZ - radius)
        vel.z = -vel.z * config.wallBounce
      }

      pos.toArray(positionData, base)
      vel.toArray(velocityData, base)
    }
  }
}

class GooMaterial extends MeshPhysicalMaterial {
  uniforms: Record<string, { value: number }> = {
    thicknessDistortion: { value: 0.1 },
    thicknessAmbient: { value: 0 },
    thicknessAttenuation: { value: 0.1 },
    thicknessPower: { value: 2 },
    thicknessScale: { value: 10 },
  }
  defines: { USE_UV: string } = { USE_UV: '' }

  constructor(params: ConstructorParameters<typeof MeshPhysicalMaterial>[0] = {}) {
    super(params)
    this.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, this.uniforms)
      shader.fragmentShader =
        `
        uniform float thicknessPower;
        uniform float thicknessScale;
        uniform float thicknessDistortion;
        uniform float thicknessAmbient;
        uniform float thicknessAttenuation;
        ` + shader.fragmentShader
      shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        `
        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {
          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));
          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;
          #ifdef USE_COLOR
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor.rgb;
          #else
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;
          #endif
          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;
        }
        void main() {
        `
      )
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <lights_fragment_begin>',
        ShaderChunk.lights_fragment_begin.replaceAll(
          'RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );',
          `
          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);
          `
        )
      )
    }
  }
}

const BALL_CONFIG = {
  count: 200,
  colors: [0x1a237e, 0x283593, 0x6534ac, 0x7c3aed, 0xd1d5db, 0x9ca3af, 0xffffff],
  ambientColor: 0xffffff,
  ambientIntensity: 1,
  lightIntensity: 200,
  materialParams: {
    metalness: 0.5,
    roughness: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0.15,
  },
  minSize: 0.5,
  maxSize: 1,
  size0: 1,
  gravity: 0.5,
  friction: 0.9975,
  wallBounce: 0.95,
  maxVelocity: 0.15,
  maxX: 5,
  maxY: 5,
  maxZ: 2,
  controlSphere0: false,
  followCursor: true,
}

const TMP = new Object3D()
const pointerPosition = new Vector2()
const pointerMap = new Map<HTMLElement, { nPosition: Vector2; onMove: () => void; onLeave: () => void }>()
let pointerActive = false

function bindPointer() {
  if (pointerActive) return
  pointerActive = true
  document.body.addEventListener('pointermove', onPointerMove)
  document.body.addEventListener('pointerleave', onPointerLeave)
}

function unbindPointer() {
  if (!pointerActive) return
  pointerActive = false
  document.body.removeEventListener('pointermove', onPointerMove)
  document.body.removeEventListener('pointerleave', onPointerLeave)
}

function onPointerMove(e: PointerEvent) {
  pointerPosition.set(e.clientX, e.clientY)
  for (const [elem, data] of pointerMap) {
    const rect = elem.getBoundingClientRect()
    const inside = pointerPosition.x >= rect.left && pointerPosition.x <= rect.right && pointerPosition.y >= rect.top && pointerPosition.y <= rect.bottom
    if (!inside) {
      data.onLeave()
      continue
    }
    const x = ((pointerPosition.x - rect.left) / rect.width) * 2 - 1
    const y = (-(pointerPosition.y - rect.top) / rect.height) * 2 + 1
    data.nPosition.set(x, y)
    data.onMove()
  }
}

function onPointerLeave() {
  pointerMap.forEach((data) => data.onLeave())
}

class BallMesh extends InstancedMesh {
  config: typeof BALL_CONFIG
  physics: PhysicsEngine
  ambientLight: AmbientLight
  light: PointLight
  pmremGenerator: PMREMGenerator

  constructor(renderer: WebGLRenderer, params: Partial<typeof BALL_CONFIG> = {}) {
    const config = { ...BALL_CONFIG, ...params }
    const pmremGenerator = new PMREMGenerator(renderer)
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment()).texture
    const geometry = new SphereGeometry()
    const material = new GooMaterial({ envMap: envTexture, ...config.materialParams })
    material.envMapRotation.x = -Math.PI / 2
    super(geometry, material, config.count)
    this.pmremGenerator = pmremGenerator
    this.config = config
    this.physics = new PhysicsEngine(config)
    this.ambientLight = new AmbientLight(this.config.ambientColor, this.config.ambientIntensity)
    this.light = new PointLight(this.config.colors[0], this.config.lightIntensity)
    this.add(this.ambientLight)
    this.add(this.light)
    this.applySizeBasedPalette()
  }

  applySizeBasedPalette() {
    const navyA = new Color('#1a237e')
    const navyB = new Color('#283593')
    const purpleA = new Color('#6534ac')
    const purpleB = new Color('#7c3aed')
    const grayA = new Color('#d1d5db')
    const grayB = new Color('#9ca3af')
    const white = new Color('#ffffff')
    const sample = new Color()

    for (let idx = 0; idx < this.count; idx += 1) {
      const size = this.physics.sizeData[idx]
      const toneMix = Math.random()

      if (size >= 0.86) {
        sample.copy(navyA).lerp(navyB, toneMix)
      } else if (size >= 0.74) {
        sample.copy(purpleA).lerp(purpleB, toneMix)
      } else if (size >= 0.6) {
        sample.copy(grayA).lerp(grayB, toneMix)
      } else {
        sample.copy(white)
      }
      this.setColorAt(idx, sample)
    }

    this.light.color.copy(navyB)
    if (this.instanceColor) this.instanceColor.needsUpdate = true
  }

  update(deltaInfo: { delta: number }) {
    this.physics.update(deltaInfo)
    for (let idx = 0; idx < this.count; idx += 1) {
      TMP.position.fromArray(this.physics.positionData, 3 * idx)
      TMP.scale.setScalar(idx === 0 && this.config.followCursor === false ? 0 : this.physics.sizeData[idx])
      TMP.updateMatrix()
      this.setMatrixAt(idx, TMP.matrix)
      if (idx === 0) this.light.position.copy(TMP.position)
    }
    this.instanceMatrix.needsUpdate = true
  }

  dispose(): void {
    this.pmremGenerator.dispose()
    super.dispose()
  }
}

interface BallpitRuntime {
  dispose: () => void
}

function createBallpit(canvas: HTMLCanvasElement, config: Partial<typeof BALL_CONFIG> = {}): BallpitRuntime {
  const three = new ThreeController({
    canvas,
    size: 'parent',
    rendererOptions: { antialias: true, alpha: true },
  })
  three.renderer.toneMapping = ACESFilmicToneMapping
  three.camera.position.set(0, 0, 20)
  three.camera.lookAt(0, 0, 0)
  three.cameraMaxAspect = 1.5
  three.resize()

  const spheres = new BallMesh(three.renderer, config)
  three.scene.add(spheres)

  const raycaster = new Raycaster()
  const plane = new Plane(new Vector3(0, 0, 1), 0)
  const intersectionPoint = new Vector3()
  const pointer = { nPosition: new Vector2() }

  pointerMap.set(canvas, {
    nPosition: pointer.nPosition,
    onMove: () => {
      raycaster.setFromCamera(pointer.nPosition, three.camera)
      three.camera.getWorldDirection(plane.normal)
      raycaster.ray.intersectPlane(plane, intersectionPoint)
      spheres.physics.center.copy(intersectionPoint)
      spheres.config.controlSphere0 = true
    },
    onLeave: () => {
      spheres.config.controlSphere0 = false
    },
  })
  bindPointer()

  three.onBeforeRender = (deltaInfo) => spheres.update(deltaInfo)
  three.onAfterResize = (size) => {
    spheres.config.maxX = size.wWidth / 2
    spheres.config.maxY = size.wHeight / 2
  }

  return {
    dispose: () => {
      pointerMap.delete(canvas)
      if (pointerMap.size === 0) unbindPointer()
      three.dispose()
    },
  }
}

interface BallpitProps {
  className?: string
  followCursor?: boolean
  count?: number
  gravity?: number
  friction?: number
  wallBounce?: number
}

const Ballpit: React.FC<BallpitProps> = ({
  className = '',
  followCursor = true,
  count = 100,
  gravity = 0.01,
  friction = 0.9975,
  wallBounce = 0.95,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const runtimeRef = useRef<BallpitRuntime | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    try {
      runtimeRef.current = createBallpit(canvas, { followCursor, count, gravity, friction, wallBounce })
    } catch (error) {
      console.error('Ballpit initialization failed:', error)
      runtimeRef.current = null
    }
    return () => runtimeRef.current?.dispose()
  }, [followCursor, count, gravity, friction, wallBounce])

  return <canvas className={`${className} h-full w-full`} ref={canvasRef} />
}

export default Ballpit
