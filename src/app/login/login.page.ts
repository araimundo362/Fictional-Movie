import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthServiceService } from '../services/auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isSubmitted  =  false;

  invalidLogin = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthServiceService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ionViewWillEnter() {
    this.loginForm.reset();
    this.isSubmitted = false;
  }

  ionViewWillLeave() {
    this.invalidLogin = false;
  }

  /** getters properties */
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  login = async () => {
    this.loginForm.markAllAsTouched();
    this.isSubmitted = true;
    if(this.loginForm.valid) {
      const response = await this.authService.login(this.loginForm.value);
      if(response) {
        this.isSubmitted = false;
        this.router.navigateByUrl('/home');
      } else {
        this.invalidLogin = true;
        this.isSubmitted = false;
        console.log('INVALID FORM');
      }
    } else {
      this.isSubmitted = false;
      return ;
    }
  };

}
