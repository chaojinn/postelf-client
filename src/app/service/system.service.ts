import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams} from  '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private  httpClient:  HttpClient) { }
  
  getSystemServices(){
    let ret=this.httpClient.get(environment.API_URL+"/systemservices");
    return ret;
  }
  
}
