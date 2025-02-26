import { SceneConfig, SceneData } from "@interfaces/three.interface";
import { BaseScene } from "./base-scene.config";

export class HomeScene extends BaseScene {

  constructor(el: HTMLElement) {
    const config: SceneConfig = {};    
    super({
      domEl: el,
      isMobile: false,
      config
    });
    this.objsPaths = this.get3dPaths();
  }

  public get3dPaths() {
    return [
      'assets/3d/digimon_greymon.glb'
    ];
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}