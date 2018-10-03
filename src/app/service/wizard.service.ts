import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams} from  '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WizardService {
  API_URL  =  'http://localhost:3030';
  CORE_API_URL  =  'http://localhost:3033';
  
  constructor(private  httpClient:  HttpClient) {}
  
  testDatabase(config:object)  {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    let ret=this.httpClient.put(environment.API_URL+"/wizard-controller",{cmd:"testDatabase",data:config},{headers});
    return ret;
  }
  
  testDependency(config:object)  {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    let ret=this.httpClient.put(environment.API_URL+"/wizard-controller",{cmd:"testDependency",data:config},{headers});
    return ret;
  }
  
  finishWizard(config:object){
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    let ret=this.httpClient.put(environment.API_URL+"/wizard-controller",{cmd:"finishWizard",data:config},{headers});
    return ret;
  }
  
  getCurrentConfig()
  {
    console.log("getCurrentConfig called:"+environment.API_URL);
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    let ret=this.httpClient.put(environment.API_URL+"/wizard-controller",{cmd:"getConfig"},{headers});
    return ret;
  }
  
  
}
