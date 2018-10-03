import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent }   from './login/login.component';
import { WizardComponent }   from './wizard/wizard.component';
import { TestComponent }   from './test/test.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { StatusPanelComponent }   from './dashboard/statuspanel/statuspanel.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'wizard', component: WizardComponent },
  { path: 'test', component: TestComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
