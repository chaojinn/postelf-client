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
  
  restartService(name:string){
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    let ret=this.httpClient.put(environment.API_URL+"/systemservices/"+name,{"cmd":"restart"},{headers});
    return ret;
  }
  
  getDiskUsage(){
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    let ret=this.httpClient.get(environment.API_URL+"/systemstat/diskusage",{headers:headers});
    return ret;
  }
  
  getEmailUsage(){
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    //let params = new HttpParams().set("path",path);
    let ret=this.httpClient.get(environment.API_URL+"/systemstat/emailusage",{headers:headers});
    return ret;
  }
}
