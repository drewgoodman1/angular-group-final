import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [{ path: "login", component: LoginComponent }, { path: "teams", component: TeamsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
