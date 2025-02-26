import { Injectable, signal } from '@angular/core';
import { LoadingManager } from 'three/src/Three.Core.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { HomeScene } from '@configs/home-scene.config';
import { BaseScene } from '@configs/base-scene.config';
import { Scenes } from '@enums/scenes';

@Injectable({
  providedIn: 'root'
})
export class ThreeService {
  private loadManager = new LoadingManager();
  private gltfLoader = new GLTFLoader(this.loadManager);
  private scenes = new Map<Scenes, BaseScene>();

  public ready = signal<boolean>(false);

  public animate = (sceneId: Scenes): void => {
    const instance = this.scenes.get(sceneId);
    if(instance) {
      instance.animationFrameId = requestAnimationFrame(() => this.animate(sceneId));
      // dev mode
      instance.controls.update();
      // dev mode 
      instance.renderer.render(instance.scene, instance.camera);
    }
  }

  public async initSceneById(element: HTMLElement, sceneId: Scenes): Promise<void> {
    if(this.scenes.has(sceneId)) return Promise.reject(`Scene ${sceneId} already instantiated!`);

    let sceneData: BaseScene;

    switch(sceneId) {
      case Scenes.Home:
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

  public uploadModels(sceneId: Scenes) {
    const instance = this.scenes.get(sceneId);
    if(instance) {
      instance.objsPaths.forEach(obj => this.gltfLoader.load(
        obj, resp => { resp.scene.position.set(0,2,0); instance.scene.add(resp.scene); }
      ));
    }
  }

  public destroyScene(sceneId: Scenes) {
    const instance = this.scenes.get(sceneId);
    if(instance) {
      cancelAnimationFrame(instance.animationFrameId);
      instance.destroy();
    }
  }
}
