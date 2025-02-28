import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { WorkerNavbarComponent } from './worker-navbar/worker-navbar.component';
import { LoginComponent } from './login/login.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamViewComponent } from './component/team-view/team-view.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { ProjectsComponent } from './projects/projects.component';
import { CompanyComponent } from './company/company.component';
import { AnnouncementCardComponent } from './announcement-card/announcement-card.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminNavbarComponent,
    WorkerNavbarComponent,
    LoginComponent,
    TeamsComponent,
    TeamViewComponent,
    HomepageComponent,
    UsersPageComponent,
    ProjectsComponent,
    CompanyComponent,
    AnnouncementCardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
