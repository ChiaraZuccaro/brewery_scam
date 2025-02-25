import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeviceService } from '@services/device.service';
import WebGL from 'three/addons/capabilities/WebGL.js';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />'
})
export class AppComponent implements OnInit {
  private _deviceService = inject(DeviceService);

  ngOnInit() {
    if(WebGL.isWebGL2Available()) {
      this._deviceService.initMediaObserver();
    } else {
      const warning = WebGL.getWebGL2ErrorMessage();
      document.body.appendChild(warning);
    }
  }
}
