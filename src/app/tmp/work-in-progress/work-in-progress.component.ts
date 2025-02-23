import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BeersService } from '../../services/digi.service';
import { DigiApisService } from '../../services/digi-apis.service';

@Component({
  selector: 'app-work-in-progress',
  imports: [ ],
  templateUrl: './work-in-progress.component.html',
  styleUrl: './work-in-progress.component.scss'
})
export class WorkInProgressComponent {
  
  constructor(private _http: HttpClient,
    private _digiApi: DigiApisService
  ) {
    console.log(_digiApi.baseUrl)

    // console.log('production ????',env.isProd);
    
  }

  public getData() {
    // this.beersService.data.set(10);
    // const headers = new HttpHeaders({
    //   ''
    // })
    
    
  }
}
