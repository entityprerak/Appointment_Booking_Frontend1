import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DoctorProfileComponent {
  doctor = {
    id: 1,
    name: 'Dr. Emily Carter',
    email: 'emily.carter@example.com',
    gender: 'Female',
    specialization: 'Cardiology',
    experience: 12,
    address: '123 Main Street, Bangalore, India',
    phone: '+91 9876543210',
    qualifications: 'MBBS, MD (Cardiology)',
    fee: 800,
    availability: 'Mon - Fri (9 AM - 5 PM)',
    imageUrl: 'https://via.placeholder.com/150'
  };

  constructor(private router: Router) {}

  editProfile() {
    this.router.navigate(['/edit-profile'], {
      queryParams: {
        id: this.doctor.id,
        name: this.doctor.name,
        email: this.doctor.email,
        gender: this.doctor.gender,
        specialization: this.doctor.specialization,
        experience: this.doctor.experience,
        address: this.doctor.address,
        phone: this.doctor.phone,
        qualifications: this.doctor.qualifications,
        fee: this.doctor.fee,
        availability: this.doctor.availability
      }
    });
  }
}
