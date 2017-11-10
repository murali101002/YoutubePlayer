import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { RouterModule, Routes } from '@angular/router';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';
import {appConfig} from './firebase';
import {AuthService} from './auth.service';
import { SignupComponent } from './signup/signup.component';
import {HttpClientModule} from '@angular/common/http';
import { YoutubePlayerModule } from 'ng2-youtube-player';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CookieService} from 'angular2-cookie';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'home', component: AppComponent},
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: '**', redirectTo: 'home', pathMatch: 'full'}
    ]),
    FormsModule,
    AngularFireModule.initializeApp(appConfig),
    YoutubePlayerModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [AuthService, AngularFireAuth, CookieService],
  bootstrap: [AppComponent],
  schemas:[ CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
