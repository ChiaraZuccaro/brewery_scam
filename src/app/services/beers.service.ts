import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BeersService {
  public data = signal<number | null>(null);
  
}
