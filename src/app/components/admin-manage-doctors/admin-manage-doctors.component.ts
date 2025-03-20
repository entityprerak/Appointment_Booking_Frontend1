import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ManageDoctorService } from '../../services/manage-doctor.service';

@Component({
  selector: 'app-admin-manage-doctors',
  templateUrl: './admin-manage-doctors.component.html',
  styleUrls: ['./admin-manage-doctors.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AdminManageDoctorsComponent {
  activeTab: 'approvals' | 'doctors' = 'approvals';
  pendingApprovals: any[] = [];
  approvedDoctors: any[] = [];
  showToast = false;
  toastMessage = '';

  constructor(private manageDoctorService: ManageDoctorService) {}

  ngOnInit(): void {
    this.fetchPendingDoctors();
    this.fetchApprovedDoctors();
  }

  // Fetch pending doctors
  async fetchPendingDoctors() {
    try {
      this.pendingApprovals = await this.manageDoctorService.getPendingDoctors();
    } catch (error) {
      console.error('Error fetching pending doctors:', error);
    }
  }

  // Fetch approved doctors
  async fetchApprovedDoctors() {
    try {
      this.approvedDoctors = await this.manageDoctorService.getApprovedDoctors();
    } catch (error) {
      console.error('Error fetching approved doctors:', error);
    }
  }

  // Approve doctor and move to approved tab
  async approveDoctor(doctorId: number) {
    if (confirm('Are you sure you want to approve this doctor?')) {
      try {
        await this.manageDoctorService.approveDoctor(doctorId);
        this.showToastMessage('Doctor approved successfully!');
        this.fetchPendingDoctors();
        this.fetchApprovedDoctors();
      } catch (error) {
        console.error('Error approving doctor:', error);
      }
    }
  }

  // Reject doctor after confirmation
  async rejectDoctor(doctorId: number) {
    if (confirm('Are you sure you want to reject this doctor? This action cannot be undone.')) {
      try {
        await this.manageDoctorService.rejectDoctor(doctorId);
        this.showToastMessage('Doctor rejected successfully!');
        this.fetchPendingDoctors();
      } catch (error) {
        console.error('Error rejecting doctor:', error);
      }
    }
  }

  // Toast Notification
  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 3000);
  }
}
