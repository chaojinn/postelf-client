import { Component, OnInit,Input } from '@angular/core';
import { UserService } from  '../../service/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.scss']
})
export class TopmenuComponent implements OnInit {
  loaded=false;
  userCap="U";
  username="test@test.com";
  userrole="";
  clsName="TopmenuComponent ";
  
  @Input()
  loginInfo: string;

  
  constructor(private userService: UserService,private cookieService: CookieService,private router: Router) { }

  ngOnInit() {
    console.log(this.clsName+"[ngOnInit] "+"start load user");
    this.loaded=false;
    if(this.loginInfo!=""){
      let currentUserInfo=JSON.parse(this.loginInfo);
      this.userService.getUser(currentUserInfo.userId).subscribe( data => {
        if(!data["error"]){
          this.userCap=data["email"][0].toUpperCase();
          this.username=data["email"];
          this.userrole="Administrator";
          this.loaded=true;
        }
        console.log(this.clsName+"[ngOnInit] "+"data:"+JSON.stringify(data));
      },err=>{
        console.log(this.clsName+"[ngOnInit] "+"error:"+err);
      });
    }
  }
  
  logoff(){
    this.cookieService.set( 'accessToken',"");
    this.router.navigate(['/login']);
  }
}
