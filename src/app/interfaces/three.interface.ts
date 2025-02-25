import { Object3D, PerspectiveCamera, Scene, WebGLRenderer } from "three"
import { OrbitControls } from "three/examples/jsm/Addons.js"

export interface Coordinates {
  x: number,
  y: number,
  z: number
}

export interface SceneConfig {
  cameraPosition?: Coordinates,
  lights?: Object3D[],
  background?: string | number
}

export interface SceneData {
  scene: Scene,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer,
  controls: OrbitControls,
  animationFrameId: number,
  config: SceneConfig,
  init(): void,
  animate(): void,
  destroy(): void
}