import { Component } from '@angular/core';
@Component({
  selector: 'work-in-progress',
  imports: [],
  template: `
  <div class="container">
    <picture>
      <!-- mobile -->
      <source media="(max-width: 768px)" srcset="./assets/work_in_progress_mobile.webp">
      <!-- desktop -->
      <source media="(min-width: 769px)" srcset="./assets/work_in_progress.webp">
      <!-- fallback -->
      <img src="./assets/work_in_progress.webp" alt="work_in_progress_page">
    </picture>
  </div>
  `,
  styles: `
  img {
    width: 100%;
    max-width: 100%;
    height: 100vh;
    max-height: 100vh;
    object-fit: cover;
  }
  `
})
export class WorkInProgressComponent {}