import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.css']
})
export class DoctorRegistrationComponent {
  doctorRegistrationForm: FormGroup;
  submitted = false;
  apiUrl = 'http://localhost:8020/doctors/register';
  specializations = ['Cardiology', 'Neurology', 'Pediatrics', 'Dermatology', 'Orthopedics'];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.doctorRegistrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      doctorName: ['', [Validators.required, Validators.minLength(4)]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      gender: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(0)]],
      specialization: ['', Validators.required],
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
    if (this.doctorRegistrationForm.invalid) {
      return;
    }

    const formData = this.doctorRegistrationForm.value;
    delete formData.confirmPassword; // Remove confirmPassword before sending

    this.http.post(this.apiUrl, formData, { responseType: 'text', 
      withCredentials: true
    }).subscribe({
      next: (response) => {
        console.log('✅ Backend Response:', response);

        if (typeof response === 'string' && response.toLowerCase().includes('success')) {
          alert('✅ Registration Successful! 🎉');
          sessionStorage.setItem('userEmail', formData.email); // Store user email
        } else {
          console.warn('⚠ Unexpected response format:', response);
          alert('⚠ Registration completed, waiting for admin approval.');
        }
      },
      error: (error) => {
        console.error('❌ Registration Failed:', error);
        alert('❌ Registration Failed. ' + (error.error || 'Please try again.'));
      }
    });
  }
}
