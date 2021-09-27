import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../interface/user';
import { AuthServiceService } from '../services/auth/auth-service.service';
import { mustMatch } from '../validators/matching';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  invalidForm = false;
  isSubmitted = false;
  usernameTaken = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthServiceService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      matchPassword: ['', Validators.required]
    },
    {
      validator: mustMatch('password', 'matchPassword')
    });
  }

  ionViewWillEnter() {
    this.registerForm.reset();
    this.invalidForm = false;
    this.isSubmitted = false;
    this.usernameTaken = false;
  }

  /** getters properties */
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }

  get matchPassword() {
    return this.registerForm.get('matchPassword');
  }

  register = async () => {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      this.invalidForm = true;
      return;
    }
    this.isSubmitted = true;
    const user: User = {
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value
    };
    const response = await this.authService.register(user);
    if (response) {
      this.isSubmitted = false;
      this.router.navigateByUrl('/login');
    } else {
      this.invalidForm = true;
    }
  };

}
