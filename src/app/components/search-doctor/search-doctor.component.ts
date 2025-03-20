// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';  // ✅ Required for [(ngModel)]
// import { CommonModule } from '@angular/common';


// @Component({
//   selector: 'app-search-doctor',
//   templateUrl: './search-doctor.component.html',
//   styleUrls: ['./search-doctor.component.scss'],
//   standalone: true,
//   imports: [CommonModule, FormsModule] // ✅ Add necessary modules here
// })
// export class SearchDoctorComponent {
//   searchQuery: string = '';
//   selectedSpecialty: string | null = null;

//   specialties: string[] = [
//     'Cardiology', 'Neurology', 'Pediatrics', 'Dermatology', 'Orthopedics'
//   ];

//   doctors = [
//     { name: 'Dr. Jane Smith', specialty: 'Dermatology', rating: 5, reviews: 48 },
//     { name: 'Dr. Michael Johnson', specialty: 'Dermatology', rating: 4, reviews: 36 },
//     { name: 'Dr. Sarah Williams', specialty: 'Cardiology', rating: 5, reviews: 52 },
//     { name: 'Dr. John Doe', specialty: 'Neurology', rating: 4.5, reviews: 40 }
//   ];

//   filteredDoctors = [...this.doctors];

//   constructor(private router: Router) {}

//   searchDoctors() {
//     this.filteredDoctors = this.doctors.filter(doctor =>
//       doctor.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
//       doctor.specialty.toLowerCase().includes(this.searchQuery.toLowerCase())
//     );
//   }

//   filterBySpecialty(specialty: string) {
//     this.selectedSpecialty = specialty;
//     this.filteredDoctors = this.doctors.filter(doctor => doctor.specialty === specialty);
//   }

//   bookAppointment(doctor: any) {
//     this.router.navigate(['/book-appointment'], {
//       queryParams: { doctor: doctor.name, specialty: doctor.specialty } // ✅ Pass both values
//     });
//   }
  
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-search-doctor',
  templateUrl: './search-doctor.component.html',
  styleUrls: ['./search-doctor.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SearchDoctorComponent {
  searchQuery: string = '';
  selectedSpecialty: string | null = null;
  specialties: string[] = ['Cardiology', 'Neurology', 'Pediatrics', 'Dermatology', 'Orthopedics'];
  doctors: any[] = [];
  filteredDoctors: any[] = [];

  constructor(private router: Router, private appointmentService: AppointmentService) {}

  // Search doctors by specialty
  async filterBySpecialty(specialty: string) {
    this.selectedSpecialty = specialty;
    try {
      this.doctors = await firstValueFrom(this.appointmentService.getDoctorsBySpecialization(specialty));
      console.log('Doctors fetched:', this.doctors);
      this.filteredDoctors = [...this.doctors];
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  }

  // Search doctors by name or specialty
  searchDoctors() {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      this.filteredDoctors = [...this.doctors];
    } else {
      this.filteredDoctors = this.doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialization.toLowerCase().includes(query)
      );
    }
  }

  // Navigate to book appointment
  bookAppointment(doctor: any) {
    this.router.navigate(['/book-appointment'], { queryParams: { doctorId: doctor.id, specialty: doctor.specialization } });
  }
}
