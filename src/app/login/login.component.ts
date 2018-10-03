import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from  '../service/user.service';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})


export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted=false;
  wrongPassword=false;
  
  constructor(private router: Router, private formBuilder: FormBuilder,private userService: UserService,private cookieService: CookieService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        loginName: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  login(){
    
    this.submitted = true;
    if (this["loginForm"].invalid) {
      return;
    }
    console.log("no error");
    let email=this["loginForm"].controls["loginName"].value;
    let password=this["loginForm"].controls["password"].value;
    this.userService.login(email,password).subscribe( data => {
      console.log(JSON.stringify(data));
      this.cookieService.set( 'accessToken', data["accessToken"]);
      this.router.navigate(['/dashboard']);
    },err=>{
      console.log("error:"+JSON.stringify(err));
      this.wrongPassword=true;
    });
    
  }
}
