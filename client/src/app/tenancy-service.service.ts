import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TenancyServiceService {
  private currentTenant: string;

  // setCurrentTenant() {
  //   const host = window.location.host;
  //   const subdomain = host.split('.')[0];
  //   console.log(subdomain)
  //   this.currentTenant = subdomain;
  // }
  

  getCurrentTenant() {
    const host = window.location.host;
    const subdomain = host.split('.')[0];
    console.log(subdomain)
    this.currentTenant = subdomain;
    return this.currentTenant;
  }
}
