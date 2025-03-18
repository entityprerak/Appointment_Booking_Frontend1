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
  activeTab: 'approvals' | 'doctors' = 'approvals'; // Default tab to Pending Approvals
  searchQuery: string = '';
  selectedSpecialty: string | null = 'All';
  showToast = false;
  toastMessage = '';

  specialties: string[] = ['All', 'Cardiology', 'Neurology', 'Pediatrics', 'Dermatology', 'Orthopedics'];

  // List of doctors waiting for approval
  pendingApprovals = [
    { id: 1, name: 'Dr. Alex Brown', specialty: 'Pediatrics', rating: 4.7, reviews: 30 },
    { id: 2, name: 'Dr. Emily Green', specialty: 'Cardiology', rating: 4.8, reviews: 25 },
    { id: 3, name: 'Dr. Ryan Cooper', specialty: 'Neurology', rating: 4.6, reviews: 28 }
  ];

  // List of approved doctors
  approvedDoctors = [
    { id: 4, name: 'Dr. Jane Smith', specialty: 'Dermatology', rating: 5, reviews: 48 },
    { id: 5, name: 'Dr. Michael Johnson', specialty: 'Dermatology', rating: 4, reviews: 36 },
    { id: 6, name: 'Dr. Sarah Williams', specialty: 'Cardiology', rating: 5, reviews: 52 },
    { id: 7, name: 'Dr. John Doe', specialty: 'Neurology', rating: 4.5, reviews: 40 }
  ];

  constructor(private router: Router) {}

  // Approve a doctor
  approveDoctor(doctorId: number) {
    const doctor = this.pendingApprovals.find(doc => doc.id === doctorId);
    if (doctor) {
      this.approvedDoctors.push(doctor);
      this.pendingApprovals = this.pendingApprovals.filter(doc => doc.id !== doctorId);
      this.showToastMessage(`Approved Dr. ${doctor.name}`);
    }
  }

  // Reject a doctor
  rejectDoctor(doctorId: number) {
    const doctor = this.pendingApprovals.find(doc => doc.id === doctorId);
    if (doctor) {
      this.pendingApprovals = this.pendingApprovals.filter(doc => doc.id !== doctorId);
      this.showToastMessage(`Rejected Dr. ${doctor.name}`);
    }
  }

  // Search doctors based on query
  searchDoctors() {
    this.approvedDoctors = this.approvedDoctors.filter(doctor =>
      doctor.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Filter doctors by specialty
  filterBySpecialty(specialty: string) {
    this.selectedSpecialty = specialty;
    this.approvedDoctors = specialty === 'All' ? [...this.approvedDoctors] : this.approvedDoctors.filter(doctor => doctor.specialty === specialty);
  }

  // Remove doctor from approved list
  removeDoctor(doctorId: number) {
    this.approvedDoctors = this.approvedDoctors.filter(doctor => doctor.id !== doctorId);
    this.showToastMessage("Doctor removed successfully!");
  }

  // Save doctor list changes
  saveDoctors() {
    this.showToastMessage("Doctor details saved successfully!");
  }

  // Display toast notification
  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 3000);
  }
}
