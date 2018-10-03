import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    if(this.cookieService.check("accessToken")){
      let accessToken = this.cookieService.get("accessToken")
      if (accessToken ) {
        request = request.clone({
          setHeaders: { 
            Authorization: `Bearer ${accessToken}`
          }
        });
      }
    }
    return next.handle(request);
  }
}