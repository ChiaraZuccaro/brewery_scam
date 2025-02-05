import { Routes } from '@angular/router';
import { WorkInProgressComponent } from './tmp/work-in-progress/work-in-progress.component';

export const routes: Routes = [
  { path: 'work-in-progress', component: WorkInProgressComponent },
  { path: '**', redirectTo: '/work-in-progress' }
];
