import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import { ThreeService } from '@services/three.service';

@Component({
  selector: 'home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private _threeService = inject(ThreeService);

  constructor() { }

  ngAfterViewInit() {
    const heroNode = document.getElementById('hero');
    if(heroNode) {
      this._threeService.initSceneById(heroNode).then(() => {
        this._threeService.uploadModel('assets/3d/digimon_greymon.glb');
        
        this._threeService.animate();
      });
    }
  }

  ngOnDestroy() {
    this._threeService.stopAnimation();
  }
}
