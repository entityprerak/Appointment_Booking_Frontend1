import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
  specializations = ['Cardiology', 'Neurology', 'Pediatrics', 'Dermatology', 'Orthopedics'];

  constructor(private fb: FormBuilder) {
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
    alert('Doctor Registration Successful!');
    console.log(this.doctorRegistrationForm.value);
  }
}
