import { Injectable, signal } from '@angular/core';
import { AmbientLight, AxesHelper, DirectionalLight, LoadingManager, PerspectiveCamera, Scene } from 'three/src/Three.Core.js';
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';
import { WebGLRenderer } from 'three';

@Injectable({
  providedIn: 'root'
})
export class ThreeService {
  private loadManager = new LoadingManager();
  private gltfLoader = new GLTFLoader(this.loadManager);

  private scene: Scene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private animationFrameId: number = 0;
  private controls: OrbitControls;

  public ready = signal<boolean>(false);

  public animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    // dev mode
    this.controls.update();
    // dev mode 
    this.renderer.render(this.scene, this.camera);
  }

  public async initSceneById(element: HTMLElement) {
    const { offsetWidth: width, offsetHeight: height } = element;

    const light = new DirectionalLight(0xffffff, 1.5);
    light.position.set(5,5,5);
    const ambLight = new AmbientLight(0xffffff, 0.5);

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, width / height, .1, 150);
    this.renderer = new WebGLRenderer({ antialias: window.devicePixelRatio < 2, logarithmicDepthBuffer: true });

    // dev mode
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    const axes = new AxesHelper(3);
    // dev mode

    this.scene.add(light, ambLight, axes);
    this.camera.position.set(0,0,5);

    this.renderer.setSize(width, height);

    element.appendChild(this.renderer.domElement);

    this.renderer.render(this.scene, this.camera);
  }

  public uploadModel(path: string) {
    this.gltfLoader.load(
      path, resp => { resp.scene.position.set(0,2,0); this.scene.add(resp.scene) }
    );
  }

  public stopAnimation() {
    cancelAnimationFrame(this.animationFrameId);
  }
}
