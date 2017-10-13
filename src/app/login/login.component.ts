import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AngularFireAuth]
})
export class LoginComponent implements OnInit {

  data: any = {};
  errMsg: string;
  login() {
    const{username, password} = this.data;
    this.authService.login(username, password);
  }
  constructor(public authService: AuthService) {
   }

  ngOnInit() {
  }
}
