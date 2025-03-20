import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthResponse } from '../../models/auth-response.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule]
})
export class LoginComponent {

  loginForm: FormGroup;
  submitted = false;
  apiUrl = 'http://localhost:8020/loginuser';

  constructor(
    private fb: FormBuilder,
    private router: Router, 
    private http: HttpClient
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
      const loginData = this.loginForm.value;

      if (loginData.email === 'admin@gmail.com' && loginData.password === 'admin123') {
        console.log('Admin Login Successful');

        sessionStorage.setItem('role', 'ROLE_ADMIN');

        this.router.navigate(['/admin-dashboard']);
        return;
      }

      this.http.post<AuthResponse>('http://localhost:8020/loginuser', loginData).subscribe({
        next: (response) => {
    // this.http.post(this.apiUrl, loginData, { withCredentials: true }).subscribe({
    // next: (response: any) => {
      console.log('Login Successful', response);

      // Store only the userId in sessionStorage
      sessionStorage.setItem('userId', response.userId.toString());
      sessionStorage.setItem('role', 'ROLE_USER');
      

      alert('Login Successful');
      this.router.navigate(['/patient-profile']);
    },
    error: (error) => {
      console.error('Login Failed', error);
      alert('Invalid email or password');
    }
  });
    } else {
      alert('Invalid email or password');
    }
  }

  // Navigate to User Registration Page
  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  // Navigate to Doctor Registration Page
  navigateToRegisterDoctor() {
    this.router.navigate(['/register-doctor']);
  }

  // Helper function to show error messages instantly
  hasError(controlName: string, errorName: string) {
    return this.loginForm.get(controlName)?.hasError(errorName) &&
           (this.loginForm.get(controlName)?.touched || this.submitted);
  }
}
