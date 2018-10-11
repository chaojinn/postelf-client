import { Component, OnInit, NgModule,Input,ComponentFactory,ComponentRef, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from  '../service/user.service';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StatusPanelComponent }   from './statuspanel/statuspanel.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  jwtPayload="";
  @ViewChild("mainContent", { read: ViewContainerRef }) container;
  componentRef: ComponentRef<StatusPanelComponent>;
  
  constructor(private userService: UserService,private cookieService: CookieService,private resolver: ComponentFactoryResolver) { 
    
    const helper = new JwtHelperService();
    let decodedToken = helper.decodeToken(this.cookieService.get( 'accessToken'));
    this.jwtPayload=JSON.stringify(decodedToken);
  }
  
  showStatusPanel() {
    this.container.clear();
    const factory: ComponentFactory<StatusPanelComponent> = this.resolver.resolveComponentFactory(StatusPanelComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.showMessage.subscribe(result => this.onShowMessage(result));
    //this.componentRef.getShowMessageListener().subscribe(result => this.onShowMessage(result));
  }
  
  ngOnInit() {
    
  }
  
  onMenuClicked(name:string){
    if(name="statuspanel")
      this.showStatusPanel();
    
   
  }
  
  onShowMessage(result:any){
    console.log(JSON.stringify(result));
    let msgBox = document.getElementById("messageBox");
    if(result.code==200){
      msgBox.innerHTML=result.message;
    }
    else{
      msgBox.innerHTML=result.error;
    }
    let newNode = msgBox.cloneNode(true);
    msgBox.parentNode.replaceChild(newNode, msgBox);
    
    (document.querySelector('.alert') as HTMLElement).style["display"]="block";
  }
  
  ngOnDestroy() {
    this.componentRef.destroy();
  }
  
 
}
