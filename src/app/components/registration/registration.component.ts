import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
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
    alert('Registration Successful!');
    console.log(this.registrationForm.value);
  }
}
