import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent {

  loginForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    // Create the Form with Validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Handle Login
  onLogin() {
    this.submitted = true;

    if (this.loginForm.valid) {
      console.log('Login Successful', this.loginForm.value);
      alert('Login Successful');
      this.router.navigate(['/profile']);
    } else {
      alert('Invalid email or password');
    }
  }

  // Navigate to Registration Page
  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  //  Helper function to show error messages instantly
  hasError(controlName: string, errorName: string) {
    return this.loginForm.get(controlName)?.hasError(errorName) &&
           (this.loginForm.get(controlName)?.touched || this.submitted);
  }
}
