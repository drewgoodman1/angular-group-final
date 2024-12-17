import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { WorkerNavbarComponent } from './worker-navbar/worker-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminNavbarComponent,
    WorkerNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
