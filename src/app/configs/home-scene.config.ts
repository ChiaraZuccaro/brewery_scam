import { SceneConfig, SceneData } from "@interfaces/three.interface";
import { AmbientLight, AxesHelper, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export class HomeScene implements SceneData {
  private sizes: { width: number, height: number };
  private element: HTMLElement;

  public scene: Scene;
  public camera: PerspectiveCamera;
  public renderer: WebGLRenderer;
  public controls: OrbitControls;
  public animationFrameId: number;
  public config: SceneConfig;

  constructor(el: HTMLElement, isMobile: boolean = false) {
    this.element = el;
    this.sizes = this.setSizeFromEl();

    this.init();
  }

  private setSizeFromEl() {
    const { offsetWidth: width, offsetHeight: height } = this.element;
    return { width, height };
  }

  private initRendererParams() {
    return {
      antialias: window.devicePixelRatio < 2,
      logarithmicDepthBuffer: true
    }
  }
  
  private initCameraParams() {
    return Object.values({
      fov: 75,
      aspect: this.sizes.width / this.sizes.height,
      near: .1,
      far: 150
    });
  }

  init(): void {
    const cameraConfig = this.initCameraParams();
    const rendererConfig = this.initRendererParams();
    
    const light = new DirectionalLight(0xffffff, 3);
    light.position.set(5,5,5);
    const ambLight = new AmbientLight(0xffffff, 0.5);

    // dev mode
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    const axes = new AxesHelper(3);
    // dev mode

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(...cameraConfig);
    this.renderer = new WebGLRenderer(rendererConfig);

    this.scene.add(axes, light, ambLight);
    this.camera.position.set(0,0,5);

    this.renderer.setSize(this.sizes.width, this.sizes.height);

    this.element.appendChild(this.renderer.domElement);

    this.renderer.render(this.scene, this.camera);
  }

  animate(): void {
    this.animationFrameId = requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  destroy(): void {
    cancelAnimationFrame(this.animationFrameId);
    this.renderer.dispose();
    this.controls.dispose();
    this.scene.clear();
  }
}