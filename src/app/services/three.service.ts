import { Injectable, signal } from '@angular/core';
import { LoadingManager } from 'three/src/Three.Core.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { SceneData } from '@interfaces/three.interface';
import { HomeScene } from '@configs/home-scene.config';

@Injectable({
  providedIn: 'root'
})
export class ThreeService {
  private loadManager = new LoadingManager();
  private gltfLoader = new GLTFLoader(this.loadManager);
  private scenes = new Map<string, SceneData>();

  public ready = signal<boolean>(false);

  // public animate = (): void => {
  //   this.animationFrameId = requestAnimationFrame(this.animate);
  //   // dev mode
  //   this.controls.update();
  //   // dev mode 
  //   this.renderer.render(this.scene, this.camera);
  // }

  public async initSceneById(element: HTMLElement, sceneId: string): Promise<void> {
    if(!this.scenes.has(sceneId)) return;

    let sceneData: SceneData;

    switch(sceneId) {
      case 'home':
        sceneData = new HomeScene(element);
      break;
      default:
      return Promise.reject(`Scene ${sceneId} not found!`);
    }
    this.scenes.set(sceneId, sceneData);
  }

  // public handleResizeScene(isMobile: boolean) {
  //   if (!this.renderer || !this.camera || !this.scene) return;
    
  //   const element = this.renderer.domElement.parentElement;
    
  //   if (element) {
  //     const { offsetWidth: width, offsetHeight: height } = element;
  //     this.camera.aspect = width / height;
  //     this.camera.fov = isMobile ? 60 : 75;
  //     this.camera.updateProjectionMatrix();
  //     this.renderer.setSize(width, height);
  //   }
  // }

  public uploadModel(path: string, sceneId: string) {
    const istanceScene = this.scenes.get(sceneId);
    if(istanceScene) {
      this.gltfLoader.load(
        path, resp => { resp.scene.position.set(0,2,0); istanceScene.scene.add(resp.scene) }
      );
    }
  }

  // public stopAnimation() {
  //   cancelAnimationFrame(this.animationFrameId);
  // }
}
