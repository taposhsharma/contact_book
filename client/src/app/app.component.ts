import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError } from 'rxjs';
import { TenancyServiceService } from './tenancy-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(private http:HttpClient,
    private tenancyService: TenancyServiceService){
    const subdomain = this.tenancyService.getCurrentTenant()

    const url = `http://${subdomain}.com:3000/db/dbconnect`
    this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error sending POST request', error);
        throw error;
      })
    )
    .subscribe((response) => {
      console.log('POST request successful', response);
    });     
  }
}
