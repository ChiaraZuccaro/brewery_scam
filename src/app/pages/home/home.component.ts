import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { descrHome, keywordsHome } from '@meta/meta-home';
import { ThreeService } from '@services/three.service';

@Component({
  selector: 'home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private id = 'home';
  
  constructor(
    private _threeService: ThreeService,
    private _titleService: Title,
    private _metaService: Meta
  ) { this.setHomeMetatag(); }

  ngAfterViewInit() {
    const heroNode = document.getElementById('hero');
    if(heroNode) {
      this._threeService.initSceneById(heroNode, this.id).then(() => {
        this._threeService.uploadModel('assets/3d/digimon_greymon.glb', this.id);
        
        // this._threeService.animate();
      });
    }
  }

  ngOnDestroy() {
    // this._threeService.stopAnimation();
  }

  private setHomeMetatag() {
    this._titleService.setTitle('Digimon Codex');
    this._metaService.addTags([
      { name: 'description', content: descrHome },
      { name: 'keywords', content: keywordsHome },
      { name: 'robots', content: 'index, follow' }
    ]);
  }
}
