import { SceneConfig } from "@interfaces/three.interface";
import { BaseScene } from "./base-scene.config";
import { Color, Mesh, PlaneGeometry, ShaderMaterial } from "three";

export class HomeScene extends BaseScene {
  private backgroundMesh: Mesh;
  private backgroundMaterial: ShaderMaterial;

  private config: SceneConfig;

  constructor(el: HTMLElement) {
    const config: SceneConfig = { background: 0xffffff };
    super({ domEl: el, isMobile: false, config });
    this.config = config;
    this.objsPaths = this.get3dPaths();
    this.setupScene();
  }

  public get3dPaths() {
    return ["assets/3d/digimon_greymon.glb"];
  }

  private setupScene() {
    if (this.config?.background !== undefined) {
      this.scene.background = new Color(this.config.background);
    }

    this.addShaderBackground();
  }

  private addShaderBackground() {
    const geometry = new PlaneGeometry(10, 10);
    
    this.backgroundMaterial = new ShaderMaterial({
      uniforms: {
        time: { value: 0.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;

        void main() {
          float lines = sin(vUv.y * 10.0 + time) * 0.5 + 0.5;
          vec3 color = vec3(0.0, lines, 1.0);
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });

    this.backgroundMesh = new Mesh(geometry, this.backgroundMaterial);
    this.backgroundMesh.position.set(0, 0, -2);
    this.scene.add(this.backgroundMesh);
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);

    // Aggiorna l'animazione dello shader
    if (this.backgroundMaterial) {
      this.backgroundMaterial.uniforms["time"].value += 0.02;
    }
  }
}
