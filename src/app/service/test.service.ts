import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams} from  '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private  httpClient:  HttpClient) { }
  
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
  
  testRunWizard()
  {
    const config={
      loginName:"123@123",
      password:"123123",
      dbAddress:"localhost",
      dbUSer:"postelf",
      dbPassword:"postelfPass",
      dbName:"postelf",
      emailDomain:"zishuozihua.com",
      emailUser:"admin",
      emailPassword:"cao198",
      baseMailFolder:"/var/mailboxes",
      runasuser:"chaojinn",
      sudoPassword:"nc18441900",
      selfsign:{
        countryName:"AU",
        stateOrProvinceName:"VIC",
        localityName:"MEL",
        organizationName:"zishuozihua.com",
        organizationalUnitName:"",
        commonName: [
            'zishuozihua.com'
        ],
        emailAddress: 'admin@zishuozihua.com'
      }
    };
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    let ret=this.httpClient.put(environment.API_URL+"/wizard-controller",{cmd:"finishWizard",data:config},{headers});
    return ret;
  }
  
  testCreateFolder()
  {
    const config={
      path: '/etc/postfix/certs'
    };
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    let ret=this.httpClient.put(environment.CORE_API_URL+"/postelf-core",{cmd:"createFolder",data:config},{headers});
    return ret;
  }
  
  testWriteFile()
  {
    const config={
      path: '/etc/postfix/certs/server.csr',
      content:"aaaaaaaaaaaddddddddddsssssssss"
    };
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    let ret=this.httpClient.put(environment.CORE_API_URL+"/postelf-core",{cmd:"writeFile",data:config},{headers});
    return ret;
    
  }
  
  testRestartService(){
    const config={
      service: 'saslauthds'
    };
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    let ret=this.httpClient.put(environment.CORE_API_URL+"/postelf-core",{cmd:"restartService",data:config},{headers});
    return ret;
  }
  
  testStartCore(){
    const config={
      password: 'nc18441900'
    };
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    let ret=this.httpClient.put(environment.API_URL+"/wizard-controller",{cmd:"startCoreService",data:config},{headers});
    return ret;
  }
  
  testDependencyMock()
  {
    
    const config={
      loginName:"123@123",
      password:"123123",
      dbAddress:"localhost",
      dbUSer:"postelf",
      dbPassword:"postelfPass",
      dbName:"postelf",
      emailDomain:"zishuozihua.com",
      emailUser:"admin",
      emailPassword:"cao198",
      baseMailFolder:"/var/mailboxes",
      runasuser:"chaojinn",
      sudoPassword:"nc18441900",
      selfsign:{
        countryName:"AU",
        stateOrProvinceName:"VIC",
        localityName:"MEL",
        organizationName:"zishuozihua.com",
        organizationalUnitName:"",
        commonName: [
            'zishuozihua.com'
        ],
        emailAddress: 'admin@zishuozihua.com'
      }
    };
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    let ret=this.httpClient.put(environment.API_URL+"/wizard-controller",{cmd:"testDependency",data:config},{headers});
    return ret;
  }
  
  testLogin(){
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    let ret=this.httpClient.post(environment.API_URL+"/authentication",{"strategy":"local","email":"123@123","password":"123123"},{headers});
    return ret;
  }
  
  testGetUser(){
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    let params = new HttpParams().set("email","123@123").set("$limit","1");
    let ret=this.httpClient.get(environment.API_URL+"/users",{headers:headers,params:params});
    return ret;
  }
  
  testGetServices(){
    let ret=this.httpClient.get(environment.API_URL+"/systemservices");
    return ret;
  }
}
