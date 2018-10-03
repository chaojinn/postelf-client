import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams} from  '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  constructor(private  httpClient:  HttpClient,private cookieService: CookieService) { }
  
  login(username,password){
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    let ret=this.httpClient.post(environment.API_URL+"/authentication",{"strategy":"local","email":username,"password":password},{headers});
    return ret;
  }
  
  getUser(userId){
    let ret=this.httpClient.get(environment.API_URL+"/users/"+userId);
    return ret;
  }
  
  
}
