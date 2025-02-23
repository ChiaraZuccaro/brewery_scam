import { Component } from '@angular/core';
@Component({
  selector: 'error',
  imports: [],
  template: `
  <div class="container">
    <picture>
      <!-- mobile -->
      <source media="(max-width: 768px)" srcset="./assets/404_not_found_mobile.webp">
      <!-- desktop -->
      <source media="(min-width: 769px)" srcset="./assets/404_not_found.webp">
      <!-- fallback -->
      <img src="./assets/404_not_found.webp" alt="404_page">
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
export class ErrorComponent {}