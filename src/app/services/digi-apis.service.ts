import { inject, Injectable, resource } from '@angular/core';
import { BeersService } from './digi.service';

@Injectable({ providedIn: 'root' })

export class DigiApisService {
  public baseUrl = 'http://digimon.local/api';

  // public test = resource({
  //   request: () => this.beersService.data(),
  //   loader: async ({ request, abortSignal }) => {
  //     const response = await fetch('http://brewery_proxy.local/api/list?page=1&limit=10', {
  //       signal: abortSignal
  //     });

  //     console.log(await response.json());
      
  //   }
  // })

  public getList() {
    // const test = resource()

    // try {
    //   // const url = 'http://brewery_proxy.local/api/list?page=1&limit=10';
    //   // const response = await lastValueFrom(this._http.get(url));
    //   // console.log(response);
    // } catch (e) {
    //   // return Promise.reject(e);
    // }
  }

  public getDetail() {
    
  }
  
}
