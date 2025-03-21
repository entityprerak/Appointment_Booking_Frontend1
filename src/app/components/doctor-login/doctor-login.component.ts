// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-doctor-login',
//   imports: [ReactiveFormsModule],
//   templateUrl: './doctor-login.component.html',
//   styleUrl: './doctor-login.component.css',
//   standalone: true
// })
// export class DoctorLoginComponent {
//   loginForm: FormGroup;
//   submitted = false;
//   apiUrl = 'http://localhost:8010/logindoctor';

//   constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   onLogin() {
//     this.submitted = true;

//     if (this.loginForm.valid) {
//       this.http.post(this.apiUrl, this.loginForm.value, { responseType: 'text' }).subscribe({
//         next: (response) => {
//           alert('✅ Doctor Login Successful!');
//           sessionStorage.setItem('doctorEmail', this.loginForm.value.email);
//           this.router.navigate(['/doctor-dashboard']);
//         },
//         error: (error) => {
//           alert('❌ Doctor Login Failed. ' + (error.error || 'Invalid credentials.'));
//         }
//       });
//     } else {
//       alert('Invalid email or password');
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DoctorAuthService } from '../../services/doctor-auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class DoctorLoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private authService: DoctorAuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.loginForm.get(controlName)?.hasError(errorName) || false;
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.loginDoctor(this.loginForm.value).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        sessionStorage.setItem('doctorId', response.doctorId);
        sessionStorage.setItem('role', 'ROLE_DOCTOR');
        alert(response.message);
        this.router.navigate(['/doctor-profile']);
      },
      (error) => {
        console.error('Login failed:', error);
        alert('Login Failed: Admin approval pending.');
      }
    );
  }

  navigateToRegisterDoctor() {
    this.router.navigate(['/register-doctor']);
  }
}
