import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  data: any = {};
  constructor(public authService: AuthService) { }
  signup(){
    const{username, password} = this.data;
    this.authService.signup(username, password);
  }
  ngOnInit() {
  }

}
