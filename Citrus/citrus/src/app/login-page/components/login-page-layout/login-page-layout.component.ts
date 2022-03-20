import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page-layout',
  templateUrl: './login-page-layout.component.html',
  styleUrls: ['./login-page-layout.component.scss']
})
export class LoginPageLayoutComponent implements OnInit {
  loginForm: FormGroup
  hide = true;

  constructor() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]),
      'password': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'checkbox': new FormControl()
    });
  }

  submit() {
    console.log(this.loginForm.value);
  }

  ngOnInit(): void {
  }

  getErrorMessage(inputName: string) {
    switch (inputName) {
      case 'email': {
        if (this.loginForm.controls['email'].hasError('required')) {
          return 'You must enter a value';
        }
        return this.loginForm.controls['email'].hasError('pattern') ? 'Not a valid email' : '';
      }
      case 'password': {
        if (this.loginForm.controls['password'].hasError('required')) {
          return 'You must enter a value';
        }
        return this.loginForm.controls['password'].hasError('minlength') ? 'Min lenght is 5' : '';
      }
      default: return 'SomeError'
    }
    
    
  }
}




