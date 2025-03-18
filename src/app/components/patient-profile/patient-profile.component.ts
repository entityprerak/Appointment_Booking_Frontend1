import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PatientProfileComponent {
  // patient: any = {};
  // userId: string | null = sessionStorage.getItem('userId');
  
  // constructor(private http: HttpClient, private router: Router) {}

  // ngOnInit(): void {
  //   if (!this.userId) {
  //     alert('User not logged in!');
  //     this.router.navigate(['/login']);
  //     return;
  //   }

  //   this.http.get(`http://localhost:8020/user/profile/${this.userId}`).subscribe({
  //     next: (data) => {
  //       this.patient = data;
  //     },
  //     error: (error) => {
  //       console.error('Error fetching profile:', error);
  //       alert('Error fetching profile. Please try again.');
  //     }
  //   });
  // }

  // editProfile() {
  //   this.router.navigate(['/edit-profile'], {
  //     queryParams: this.patient

  // Dummy data
  patient = {
    id: 101,
    name: 'John Doe',
    username: 'john_doe',
    email: 'johndoe@example.com',
    mobile: '+91 9876543210',
    gender: 'Male',
    age: 29,
    address: '456 Elm Street, Mumbai, India'
  };

  constructor(private router: Router) {}

  editProfile() {
    this.router.navigate(['/edit-profile'], {
      queryParams: {
        id: this.patient.id,
        name: this.patient.name,
        username: this.patient.username,
        email: this.patient.email,
        mobile: this.patient.mobile,
        gender: this.patient.gender,
        age: this.patient.age,
        address: this.patient.address
      }
    });
  }

}
