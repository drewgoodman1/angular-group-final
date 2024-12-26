import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TeamsComponent } from './teams/teams.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { ProjectsComponent } from './projects/projects.component';
import { CompanyComponent } from './company/company.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" }, // Redirect default path to the login page
  { path: "login", component: LoginComponent },
  { path: "teams", component: TeamsComponent },
  { path: "users", component: UsersPageComponent },
  { path: "home", component: HomepageComponent },
  { path: "projects/:id", component: ProjectsComponent },
  { path: "company", component: CompanyComponent },
  { path: "**", redirectTo: "login" } // Wildcard route for undefined paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
