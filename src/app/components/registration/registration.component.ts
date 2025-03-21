import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  submitted = false;
  apiUrl = 'http://localhost:8020/registeruser'

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      username: ['', [Validators.required, Validators.minLength(4)]], 
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], 
      gender: ['', Validators.required], 
      age: ['', [Validators.required, Validators.min(1), Validators.max(200)]], 
      address: ['', [Validators.required, Validators.minLength(10)]], 
      password: ['', [Validators.required, Validators.minLength(6)]], 
      confirmPassword: ['', Validators.required] 
    }, { validators: this.matchPassword }); 
  }

  matchPassword(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return; 
    }
    
    const formData = this.registrationForm.value;
    delete formData.confirmPassword; // Remove confirmPassword before sending

    this.http.post(this.apiUrl, formData, { responseType: 'text' }).subscribe({
      next: (response) => {
        console.log('✅ Backend Response:', response);

        if (typeof response === 'string' && response.toLowerCase().includes('success')) {
          alert('✅ Registration Successful! 🎉');
          sessionStorage.setItem('userEmail', formData.email); // Store user email
          this.router.navigate(['/login']); // Redirect to profile page
        } else {
          console.warn('⚠ Unexpected response format:', response);
          alert('⚠ Registration completed, but unexpected response received.');
        }
      },
      error: (error) => {
        console.error('❌ Registration Failed:', error);
        alert('❌ Registration Failed. ' + (error.error || 'Please try again.'));
      }
    });
  }
}
