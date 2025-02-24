import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeviceService } from '@services/device.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />'
})
export class AppComponent implements OnInit {
  private _deviceService = inject(DeviceService);

  ngOnInit() {
    this._deviceService.initMediaObserver();
  }
}
