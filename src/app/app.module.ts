import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS  } from  '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WizardComponent } from './wizard/wizard.component';
import { TestComponent } from './test/test.component';

import { TestService } from  './service/test.service';
import { UserService } from  './service/user.service';
import { SystemService } from  './service/system.service';
import { CookieService } from 'ngx-cookie-service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopmenuComponent } from './dashboard/topmenu/topmenu.component';
import {ErrorInterceptor } from './interceptor/errorInterceptor';
import {JwtInterceptor } from './interceptor/jwtinterceptor';
import { LeftmenuComponent } from './dashboard/leftmenu/leftmenu.component';
import { StatusPanelComponent} from './dashboard/statuspanel/statuspanel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WizardComponent,
    TestComponent,
    DashboardComponent,
    TopmenuComponent,
    LeftmenuComponent,
    StatusPanelComponent
  ],
  entryComponents: [StatusPanelComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    CookieService,
    SystemService,
    TestService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
