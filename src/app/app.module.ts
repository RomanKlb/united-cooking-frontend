import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { RouterModule } from '@angular/router';
import { BsDropdownModule,BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { authInterceptorProviders } from './_common/_helpers/auth-interceptor';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CatalogueComponent } from './catalogue/catalogue.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    CatalogueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    NgxNavbarModule,
    BsDropdownModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes ,{ useHash: true })
  ],
  providers: [BsDropdownConfig, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
