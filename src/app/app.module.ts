import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './home/login/login.component';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    NgxNavbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
