import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { ApiResponse } from '../shared/api-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {

    if(this.authService.isAuthenticated()){
      this.router.navigate(['home']);
    }

    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });

  }

  onLogin() {
    var email = this.loginForm.value['email'];
    var password = this.loginForm.value['password'];
    this.authService.authenticateUser(email, password).then((response: boolean) => {
      if (response) {
        this.router.navigate(['home']);
      }
    })
  }

}
