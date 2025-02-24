import { inject, Injectable, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { ThreeService } from './three.service';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  private _breakpointObserver = inject(BreakpointObserver);
  private _threeService = inject(ThreeService);

  public isMobile = signal<boolean>(false);

  private isMobileBreakpoint(state: BreakpointState) {
    const [ firstMatch, secondMath ] = Breakpoints.Handset.split(', ')
    return state.breakpoints[firstMatch] || state.breakpoints[secondMath];
  }

  private handleResize(state: BreakpointState) {
    const isMobile = this.isMobileBreakpoint(state);
    this.isMobile.set(isMobile);
    this._threeService.handleResizeScene(isMobile);
  }

  public initMediaObserver() {
    const mobileDimension = Object.values(Breakpoints);
    this._breakpointObserver.observe(mobileDimension).subscribe(resp => this.handleResize(resp));
  }
}
