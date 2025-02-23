import { Routes } from '@angular/router';
import { WorkInProgressComponent } from './tmp/work-in-progress/work-in-progress.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'work-in-progress', component: WorkInProgressComponent },
  { path: 'not-found', component: ErrorComponent },
  { path: '**', redirectTo: '/work-in-progress' }
];
