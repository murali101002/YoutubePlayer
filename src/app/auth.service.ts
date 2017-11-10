import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  errorMsg:string;
  constructor(private firebaseAuth: AngularFireAuth, private router:Router) {
    this.user = firebaseAuth.authState;
  }
  signup(email: string, password: string) {
    this.errorMsg = '';
    this.firebaseAuth
        .auth
        .createUserWithEmailAndPassword(email, password)
        .then(value => {
          console.log('success', value);
        })
        .catch(error => {
          console.log('error', error.message);
          this.errorMsg += error.message;
        });
  }
  login(email: string, password: string) {
    this.errorMsg ='';
    return this.firebaseAuth
        .auth
        .signInWithEmailAndPassword(email, password)
        .then(value => {
          console.log('success');
          this.router.navigate(['/home']);
        })
        .catch(error=>{
          console.log('error', error.message);
          this.errorMsg = error.message;
        });
  }
  logout() {
    this.firebaseAuth
        .auth
        .signOut();
  }

}
