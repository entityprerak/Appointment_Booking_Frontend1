import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-doctor-appointments',
  templateUrl: './view-doctor-appointments.component.html',
  styleUrls: ['./view-doctor-appointments.component.scss'],
  standalone: true,
  imports: [CommonModule] // Required for Angular Standalone Components
})
export class ViewDoctorAppointmentsComponent {
  
  activeTab: string = 'today'; // Default tab is Today's Appointments

  todayAppointments = [
    { patientName: 'John Doe', date: '2025-03-17', time: '10:00 AM', reason: 'Fever & Cough', status: 'Active' },
    { patientName: 'Alice Johnson', date: '2025-03-17', time: '11:30 AM', reason: 'Headache', status: 'Active' },
    { patientName: 'Robert Smith', date: '2025-03-17', time: '02:00 PM', reason: 'Diabetes Checkup', status: 'Active' }
  ];

  pastAppointments = [
    { patientName: 'Emma Williams', date: '2025-03-10', time: '09:00 AM', reason: 'Flu Symptoms', status: 'Completed' },
    { patientName: 'William Brown', date: '2025-03-09', time: '01:30 PM', reason: 'Back Pain', status: 'Completed' }
  ];

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  completeAppointment(appointment: any) {
    appointment.status = 'Completed';
  }
}
