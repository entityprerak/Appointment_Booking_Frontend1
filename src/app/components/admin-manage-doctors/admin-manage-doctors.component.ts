import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-manage-doctors',
  templateUrl: './admin-manage-doctors.component.html',
  styleUrls: ['./admin-manage-doctors.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AdminManageDoctorsComponent {
  activeTab: 'slots' | 'doctors' = 'slots'; // Default Tab
  searchQuery: string = '';
  selectedSpecialty: string | null = 'All';
  selectedDate: string = new Date().toISOString().split('T')[0]; // Default to today
  editClicked = false;
  confirmClicked = false;
  showToast = false;
  toastMessage = '';
  editMode: boolean = false;

  specialties: string[] = ['All', 'Cardiology', 'Neurology', 'Pediatrics', 'Dermatology', 'Orthopedics'];

  doctors = [
    { id: 1, name: 'Dr. Jane Smith', specialty: 'Dermatology', rating: 5, reviews: 48 },
    { id: 2, name: 'Dr. Michael Johnson', specialty: 'Dermatology', rating: 4, reviews: 36 },
    { id: 3, name: 'Dr. Sarah Williams', specialty: 'Cardiology', rating: 5, reviews: 52 },
    { id: 4, name: 'Dr. John Doe', specialty: 'Neurology', rating: 4.5, reviews: 40 }
  ];

  filteredDoctors = [...this.doctors];
  timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

  doctorSlots: { 
    [date: string]: { 
      [doctorId: number]: { 
        [slot: string]: 'available' | 'selected' | 'confirmed' 
      } 
    } 
  } = {};

  constructor(private router: Router) {
    this.initializeSlots();
  }

  initializeSlots() {
    if (!this.doctorSlots[this.selectedDate]) {
      this.doctorSlots[this.selectedDate] = {};
    }
    this.doctors.forEach(doctor => {
      if (!this.doctorSlots[this.selectedDate][doctor.id]) {
        this.doctorSlots[this.selectedDate][doctor.id] = {};
      }
      this.timeSlots.forEach(slot => {
        if (!this.doctorSlots[this.selectedDate][doctor.id][slot]) {
          this.doctorSlots[this.selectedDate][doctor.id][slot] = 'available';
        }
      });
    });
  }

  searchDoctors() {
    this.filteredDoctors = this.doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  filterBySpecialty(specialty: string) {
    this.selectedSpecialty = specialty;
    this.filteredDoctors = specialty === 'All' ? [...this.doctors] : this.doctors.filter(doctor => doctor.specialty === specialty);
  }

  changeDate() {
    this.initializeSlots();
  }

  toggleSlot(doctorId: number, slot: string) {
    if (!this.selectedDate || !doctorId || !slot) return;

    if (!this.doctorSlots[this.selectedDate]) {
      this.doctorSlots[this.selectedDate] = {};
    }
    if (!this.doctorSlots[this.selectedDate][doctorId]) {
      this.doctorSlots[this.selectedDate][doctorId] = {};
    }

    const currentState = this.doctorSlots[this.selectedDate][doctorId][slot] || 'available';

    if (this.editMode) {
      if (currentState === 'confirmed') {
        this.doctorSlots[this.selectedDate][doctorId][slot] = 'available';
      } else if (currentState === 'available') {
        this.doctorSlots[this.selectedDate][doctorId][slot] = 'selected';
      }
    } else {
      if (currentState === 'available') {
        this.doctorSlots[this.selectedDate][doctorId][slot] = 'selected';
      } else if (currentState === 'selected') {
        this.doctorSlots[this.selectedDate][doctorId][slot] = 'available';
      }
    }
  }

  toggleEditMode() {
    if (this.editMode) {
      this.saveSlotEdits();
    }
    this.editMode = !this.editMode;
  }

  saveSlotEdits() {
    this.toastMessage = "Edits saved successfully!";
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  updateSlotsForDate() {
    if (!this.selectedDate) {
      this.selectedDate = new Date().toISOString().split('T')[0]; 
    }

    if (!this.doctorSlots[this.selectedDate]) {
      this.doctorSlots[this.selectedDate] = {};
    }

    this.filteredDoctors.forEach(doctor => {
      if (!this.doctorSlots[this.selectedDate][doctor.id]) {
        this.doctorSlots[this.selectedDate][doctor.id] = {};
        this.timeSlots.forEach(slot => {
          this.doctorSlots[this.selectedDate][doctor.id][slot] = 'available';
        });
      }
    });
  }

  removeDoctor(doctorId: number) {
    this.doctors = this.doctors.filter(doctor => doctor.id !== doctorId);
    this.filteredDoctors = this.filteredDoctors.filter(doctor => doctor.id !== doctorId);
    if (this.doctorSlots[this.selectedDate]) {
      delete this.doctorSlots[this.selectedDate][doctorId];
    }
    this.showToastMessage("Doctor removed successfully!");
  }

  saveDoctors() {
    this.showToastMessage("Doctor details saved successfully!");
  }

  confirmSlots() {
    this.confirmClicked = true;
    setTimeout(() => (this.confirmClicked = false), 200);
    this.showToastMessage("Slots confirmed!");
  }

  enableEdit() {
    this.editClicked = true;
    this.editMode = true;
    setTimeout(() => (this.editClicked = false), 200);
    this.showToastMessage("Edit mode enabled!");
  }

  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 3000);
  }
}
