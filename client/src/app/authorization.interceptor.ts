import { AuthService } from './auth.service';

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TenancyServiceService } from './tenancy-service.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
    private tenancyService: TenancyServiceService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
 
    const token = this.authService.getAuthToken();
     console.log("interceptor",token)
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          tenant:this.tenancyService.getCurrentTenant()
        }
        
      });
      
    }else{
      request = request.clone({
        setHeaders: {
        
          tenant:this.tenancyService.getCurrentTenant()
        }
        
      });
    }
    console.log(request)
    // Pass the modified request to the next handler
    return next.handle(request);
  }
}